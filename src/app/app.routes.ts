import { Routes } from '@angular/router';
import { FileUploadComponent } from './upload-file/file-upload.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'professions',
    pathMatch: 'full',
  },
  {
    path: 'upload',
    component: FileUploadComponent,
  },
  {
    path: 'auth',
    loadComponent: () => import('./authenticate/authenticate.component').then(m => m.AuthenticateComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
