import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

import { IDynamicTableAction } from '../dynamic-table-action.model';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnChanges {
  @Input() tableData: any[] = [];
  @Input() tableAction: IDynamicTableAction = {};

  columns: string[] = []

  ngOnChanges() {
    this.columns = this.tableData.length ? Object.keys(this.tableData[0]): [];
  }

  delete(user: any) {
    console.log(user); // do something
  }
}