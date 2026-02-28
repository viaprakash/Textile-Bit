import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { getDownloadUrl } from '../services/api';
import { useStore } from '../store';

export function useDownload() {
  const { conversionResult, scaleOptions } = useStore();

  const download = useCallback(() => {
    if (!conversionResult) {
      toast.error('No converted image to download');
      return;
    }
    try {
      const url = getDownloadUrl(conversionResult.filename, {
        scaleFactor: scaleOptions.scaleFactor,
        width: scaleOptions.width,
        height: scaleOptions.height,
        format: scaleOptions.format,
        quality: scaleOptions.quality,
      });
      const link = document.createElement('a');
      link.href = url;
      link.download = `textile-bitmap.${scaleOptions.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Download started!');
    } catch {
      toast.error('Download failed');
    }
  }, [conversionResult, scaleOptions]);

  return { download };
}
