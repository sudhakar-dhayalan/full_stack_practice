import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { ApiService } from '../api-service';
import { IFile } from './file.model';
import { DynamicTableComponent } from '../shared/dynamic-table/dynamic-table.component';
import { IDynamicTableAction } from '../shared/dynamic-table-action.model';
import { VideoPlayerComponent } from '../shared/video-player/video-player.component';
import { UploadButtonComponent } from '../shared/upload-button/upload-button.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    MatTabsModule,
    NgIf,

    DynamicTableComponent,
    UploadButtonComponent,
    VideoPlayerComponent,
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  imageFileSize: number = 10 * 1024 * 1024; // 10 mb
  imageFileTypes = ['png', 'jpeg'];
  imageFileList: IFile[] = [];
  imageTableOption: IDynamicTableAction = {
    actionName: 'Delete',
  };

  videoFileSize: number = 100 * 1024 * 1024; // 100 mb
  videoFileTypes = ['mp4'];
  videoFileList: IFile[] = [];
  videoTableOption: IDynamicTableAction = {
    actionName: 'Delete',
    options: {
      enableVideo: true,
    }
  };

  responseMessage = '';

  clearPrevSelection = false;

  constructor(private apiService: ApiService) {
    this.getFiles();
  }

  getFiles() {
    // Image
    this.apiService.getUploadedFiles<IFile[]>('./assets/json/files/images.json').subscribe({
      next: (res) => {
        this.imageFileList = [...res]; // Ensure a new array is assigned
      },
      error: (err) => console.error(err),
    });

    // Videos
    this.apiService.getUploadedFiles<IFile[]>('./assets/json/files/videos.json').subscribe({
      next: (res) => {
        this.videoFileList = [...res]; // Ensure a new array is assigned
      },
      error: (err) => console.error(err),
    });
  }

  fileUpload(file: File): void {
    console.log('File ready for upload:', file);
    // Perform file upload logic here

    if (file) {
      this.apiService.uploadFile(file).subscribe({
        next: (res: any) => {
          // Clear input value
          this.clearPrevSelection = true;

          this.responseMessage = res.message;
          this.imageFileList.push({
            id: res.id,
            storedPath: res.filePath,
            type: 'jpg',
            size: file.size.toString(),
          });
        },
        error: (err) => {
          this.responseMessage = 'File upload failed!';
        },
      });
    }
  }

  deleteItem(item: Event) {
    console.log(item);
  }
}
