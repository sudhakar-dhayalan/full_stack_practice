import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ApiService } from '../api-service';
import { IFile } from './file.model';
import { DynamicTableComponent } from '../shared/dynamic-table/dynamic-table.component';
import { IDynamicTableAction } from '../shared/dynamic-table-action.model';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { UploadButtonComponent } from '../shared/upload-button/upload-button.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    DynamicTableComponent,
    UploadButtonComponent,
    VideoPlayerComponent,
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  imageFileSize: number = 10 * 1024 * 1024;
  imageFileTypes = ['png'];
  fileList: IFile[] = [];
  fileUploadForm: FormGroup;
  fileSizeError = false;
  responseMessage = '';
  options: IDynamicTableAction = {
    actionName: 'Delete',
  };

  clearPrevImage = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.fileUploadForm = this.fb.group({
      file: [null, Validators.required],
    });

    this.apiService.getUploadedFiles<IFile[]>().subscribe({
      next: (res) => {
        this.fileList = [...res]; // Ensure a new array is assigned
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
          this.clearPrevImage = true;

          this.responseMessage = res.message;
          this.fileList.push({
            id: res.id,
            storedPath: res.filePath,
            type: 'jpg',
            size: file.size.toString(),
            imageUrl: res.imageUrl,
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
