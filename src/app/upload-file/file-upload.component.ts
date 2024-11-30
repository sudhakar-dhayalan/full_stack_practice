import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ApiService } from '../api-service';
import { TableComponent } from '../table/table.component';
import { IFile } from './file.model';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, TableComponent],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  fileUploadForm: FormGroup;
  fileSizeError = false;
  responseMessage = '';
  fileList: IFile[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.fileUploadForm = this.fb.group({
      file: [null, Validators.required],
    });

    this.apiService.getUploadedFiles<IFile[]>().subscribe({
      next: (res) => {
        this.fileList = [...res]; // Ensure a new array is assigned
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  onFileSelected(event: Event): void {
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
}
