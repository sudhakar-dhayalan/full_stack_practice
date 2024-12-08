import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-upload-button',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './upload-button.component.html',
  styleUrl: './upload-button.component.scss',
})
export class UploadButtonComponent implements OnChanges {
  @Input() fileSizeInBytes: number = 10 * 1024 * 1024; // 10 mb
  @Input() supportedFileTypes: string[] = [];
  @Input() clearPreviousFileSelection: boolean = false;

  @Output() upload = new EventEmitter<File>();

  @ViewChild('fileInputElement') fileInputElement!: ElementRef;

  fileUploadForm: FormGroup;
  fileSizeError = false;

  constructor(private fb: FormBuilder) {
    this.fileUploadForm = this.fb.group({
      file: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Clear the file input element
    if (this.fileInputElement && changes['clearPreviousFileSelection'].currentValue) {
      this.fileInputElement.nativeElement.value = '';

      this.clearPreviousFileSelection = false;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      // Check file size (10 MB = 10 * 1024 * 1024 bytes)
      if (file.size > this.fileSizeInBytes) {
        this.fileSizeError = true;
        this.fileUploadForm.patchValue({ file: null });
      } else {
        this.fileSizeError = false;
        this.fileUploadForm.patchValue({ file });
      }
    }
  }

  onSubmit() {
    if (this.fileUploadForm.valid) {
      const file: File = this.fileUploadForm.get('file')?.value;
      console.log('File ready for upload:', file);
      // Perform file upload logic here

      if (file) {
        // Emit the file
        this.upload.emit(file);

        // Reset the form
        this.fileUploadForm.reset();
      } else {
        console.log('something went wrong');
      }
    }
  }
}
