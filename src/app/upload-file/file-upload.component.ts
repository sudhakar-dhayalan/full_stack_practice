import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DynamicTableComponent, VideoPlayerComponent],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @ViewChild('fileInputElement') fileInputElement!: ElementRef;
  options: IDynamicTableAction = {
    actionName: 'Delete',
  };

  fileUploadForm: FormGroup;
  fileSizeError = false;
  responseMessage = '';
  fileList: IFile[] = [];
  clearNotification = true;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {
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

  onFileSelected(event: Event): void {
    this.clearNotification = true;

    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      // Check file size (10 MB = 10 * 1024 * 1024 bytes)
      if (file.size > 10 * 1024 * 1024) {
        this.fileSizeError = true;
        this.fileUploadForm.patchValue({ file: null });
      } else {
        this.fileSizeError = false;
        this.fileUploadForm.patchValue({ file });
      }
    }
  }

  onSubmit(): void {
    if (this.fileUploadForm.valid) {
      const file = this.fileUploadForm.get('file')?.value;
      console.log('File ready for upload:', file);
      // Perform file upload logic here

      if (file) {
        this.apiService.uploadFile(file).subscribe({
          next: (res: any) => {
            // Clear input value
          this.fileInputElement.nativeElement.value = '';

          // Clear form control value
          this.fileUploadForm.reset();

            this.clearNotification = false;
            this.responseMessage = res.message;
            this.fileList.push({
              id: res.id,
              storedPath: res.filePath,
              type: 'jpg',
              size: file.size,
              imageUrl: res.imageUrl,
            });
          },
          error: (err) => {
            this.responseMessage = 'File upload failed!';
          },
        });
      }
    }
  }

  deletItem(item: Event) {
    console.log(item);
  }
}
