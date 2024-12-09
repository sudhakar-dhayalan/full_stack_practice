export interface IFile {
  id: string,
  storedPath: string;
  type: 'jpg' |'jpeg' | 'txt' | 'pdf' | 'xml' | 'csv' | 'mp4';
  size: string;
}
