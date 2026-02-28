import Vibrant from 'node-vibrant';
import { ColorInfo } from '../types';

function getClosestColorName(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (r < 30 && g < 30 && b < 30) return 'Black';
  if (r > 225 && g > 225 && b > 225) return 'White';
  if (r > g && r > b) {
    if (g > 150) return 'Yellow/Orange';
    if (b > 150) return 'Pink/Magenta';
    return 'Red';
  }
  if (g > r && g > b) {
    if (b > 150) return 'Teal/Cyan';
    return 'Green';
  }
  if (b > r && b > g) {
    if (r > 150) return 'Purple';
    return 'Blue';
  }
  if (r > 150 && g > 100 && b < 80) return 'Orange';
  if (r > 100 && g > 80 && b < 60) return 'Brown';
  return 'Mixed';
}

export async function extractColors(
  imagePath: string,
  colorCount: number = 8
): Promise<ColorInfo[]> {
  try {
    const palette = await Vibrant.from(imagePath)
      .maxColorCount(colorCount * 4)
      .quality(5)
      .getPalette();

    const colors: ColorInfo[] = [];

    const swatches = [
      palette.Vibrant,
      palette.DarkVibrant,
      palette.LightVibrant,
      palette.Muted,
      palette.DarkMuted,
      palette.LightMuted,
    ];

    swatches.forEach((swatch) => {
      if (swatch) {
        const hex = swatch.hex;
        const [r, g, b] = swatch.rgb;
        colors.push({
          hex,
          rgb: { r: Math.round(r), g: Math.round(g), b: Math.round(b) },
          population: swatch.population,
          name: getClosestColorName(hex),
        });
      }
    });

    colors.sort((a, b) => b.population - a.population);

    return colors.slice(0, colorCount);
  } catch (error) {
    console.error('Color extraction error:', error);
    return [
      {
        hex: '#000000',
        rgb: { r: 0, g: 0, b: 0 },
        population: 1,
        name: 'Black',
      },
      {
        hex: '#FFFFFF',
        rgb: { r: 255, g: 255, b: 255 },
        population: 1,
        name: 'White',
      },
    ];
  }
}

export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}
