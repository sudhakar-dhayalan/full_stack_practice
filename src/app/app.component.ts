import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api-service';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './upload-file/file-upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FileUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'full_stack_practice';
  message = ''

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData().subscribe((data) => {
      console.log(data);
      this.message = data ? data['message']: ''
    });
  }
}
