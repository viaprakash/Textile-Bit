import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/env';
import { convertToBitmap } from '../services/bitmapConverter';
import { extractColors } from '../services/colorExtractor';
import { intelligentUpscale } from '../services/upscaler';
import { ConversionOptions } from '../types';
import { getOutputPath } from '../utils/imageUtils';

export async function convertImage(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      filename,
      mode = 'bw',
      threshold = 128,
      dithering = false,
      ditheringType = 'floyd-steinberg',
      enhance = true,
      sharpen = true,
      denoise = true,
      contrast = 1,
      brightness = 1,
      colors = 8,
      customPalette = [],
      crop,
    } = req.body;

    const inputPath = path.resolve(
      __dirname,
      '../../',
      config.uploadDir,
      filename
    );

    if (!fs.existsSync(inputPath)) {
      res.status(404).json({ error: 'Source image not found' });
      return;
    }

    const options: ConversionOptions = {
      mode,
      threshold: Number(threshold),
      dithering: Boolean(dithering),
      ditheringType,
      enhance: Boolean(enhance),
      sharpen: Boolean(sharpen),
      denoise: Boolean(denoise),
      contrast: Number(contrast),
      brightness: Number(brightness),
      colors: Number(colors),
      customPalette: customPalette || [],
      crop: crop
        ? {
            x: Number(crop.x),
            y: Number(crop.y),
            width: Number(crop.width),
            height: Number(crop.height),
          }
        : undefined,
    };

    const resultBuffer = await convertToBitmap(inputPath, options);

    const outputId = uuidv4();
    const outputFilename = `${outputId}.png`;
    const outputPath = getOutputPath(outputFilename);

    fs.writeFileSync(outputPath, resultBuffer);

    const metadata = await sharp(resultBuffer).metadata();

    res.status(200).json({
      id: outputId,
      filename: outputFilename,
      url: `/api/files/output/${outputFilename}`,
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: 'png',
    });
  } catch (error: any) {
    console.error('Conversion error:', error);
    res
      .status(500)
      .json({ error: 'Conversion failed', message: error.message });
  }
}

export async function extractImageColors(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { filename, count = 8 } = req.body;
    const inputPath = path.resolve(
      __dirname,
      '../../',
      config.uploadDir,
      filename
    );

    if (!fs.existsSync(inputPath)) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    const colors = await extractColors(inputPath, Number(count));
    res.status(200).json({ colors });
  } catch (error: any) {
    console.error('Color extraction error:', error);
    res
      .status(500)
      .json({ error: 'Color extraction failed', message: error.message });
  }
}

export async function enhanceAndUpscale(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { filename, factor = 2 } = req.body;
    const inputPath = path.resolve(
      __dirname,
      '../../',
      config.uploadDir,
      filename
    );

    if (!fs.existsSync(inputPath)) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    const inputBuffer = fs.readFileSync(inputPath);
    const resultBuffer = await intelligentUpscale(
      inputBuffer,
      Number(factor)
    );

    const outputId = uuidv4();
    const outputFilename = `${outputId}.png`;
    const outputPath = getOutputPath(outputFilename);

    fs.writeFileSync(outputPath, resultBuffer);

    const metadata = await sharp(resultBuffer).metadata();

    res.status(200).json({
      id: outputId,
      filename: outputFilename,
      url: `/api/files/output/${outputFilename}`,
      width: metadata.width || 0,
      height: metadata.height || 0,
    });
  } catch (error: any) {
    console.error('Upscale error:', error);
    res
      .status(500)
      .json({ error: 'Upscale failed', message: error.message });
  }
}
