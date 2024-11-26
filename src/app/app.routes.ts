import { Routes } from '@angular/router';
import { FileUploadComponent } from './upload-file/file-upload.component';
import { UserManagementComponent } from './user-management/user-management.component';

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
    path: 'user-management',
    component: UserManagementComponent,
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
