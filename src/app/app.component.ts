import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api-service';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    HeaderComponent,
    FileUploadComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'full_stack_practice';
  message = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get<{message: string}>(`${this.apiService.baseUrl}/api/data`).subscribe((data) => {
      console.log(data);
      this.message = data ? data['message'] : '';
    });
  }
}
