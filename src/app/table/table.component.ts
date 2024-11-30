import { Component, Input } from '@angular/core';

import { IFile } from '../upload-file/file.model';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() files: IFile[] = [];

  deleteFile(file: IFile) {
    console.log(file.id) // do something
  }
}
