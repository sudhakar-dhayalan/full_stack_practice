import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api-service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  fileUploadForm: FormGroup;
  fileSizeError = false;
  responseMessage = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.fileUploadForm = this.fb.group({
      file: [null, Validators.required],
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
          },
          error: (err) => {
            this.responseMessage = 'File upload failed!';
          },
        });
      }
    }
  }
}
