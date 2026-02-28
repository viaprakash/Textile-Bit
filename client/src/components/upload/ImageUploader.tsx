import { useStore } from '../../store';
import Loader from '../common/Loader';
import DragDropZone from './DragDropZone';
import ImagePreview from './ImagePreview';

export default function ImageUploader() {
  const { uploadedImage, isUploading } = useStore();

  if (isUploading) return <div className="card"><Loader text="Uploading and analyzing image..." /></div>;
  if (uploadedImage) return <ImagePreview />;
  return <DragDropZone />;
}
