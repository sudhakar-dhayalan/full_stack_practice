export interface IFile {
  id: string,
  storedPath: string;
  type: 'jpg' |'jpeg' | 'txt' | 'pdf' | 'xml' | 'csv';
  size: string;
  imageUrl: string;
}
