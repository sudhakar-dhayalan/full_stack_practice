import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

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

  @Output() actionOnItem = new EventEmitter<any>();

  columns: string[] = []

  ngOnChanges() {
    this.columns = this.tableData.length ? Object.keys(this.tableData[0]): [];
  }

  selectedItem(obj: any) {
    console.log(obj); // do something
    this.actionOnItem.emit(obj);
  }

  selectedItems(arr: any) {
    console.log(arr); // do something
  }
}
