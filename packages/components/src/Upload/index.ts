import { UploadDragger } from './dragger';
import { Upload as InternalUpload } from './upload';

export type {
  DraggerProps,
  UploadFile,
  UploadFileStatus,
  UploadProps,
} from './types';

type UploadType = typeof InternalUpload & {
  Dragger: typeof UploadDragger;
};

const Upload = InternalUpload as UploadType;
Upload.Dragger = UploadDragger;

export { Upload };
