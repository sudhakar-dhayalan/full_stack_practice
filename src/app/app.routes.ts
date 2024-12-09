import { Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UserManagementComponent } from './user-management/user-management.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'professions',
    pathMatch: 'full',
  },
  {
    path: 'uploads',
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
    redirectTo: 'uploads',
    pathMatch: 'full',
  },
];
