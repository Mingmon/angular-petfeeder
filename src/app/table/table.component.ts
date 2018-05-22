import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableDataSource } from './table-datasource';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor(
    private db: AngularFireDatabase
  ) {

  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Round', 'Time'];
  log = [];
  ngOnInit() {
    this.db.list('/log').snapshotChanges().subscribe(Response => {
      this.log = Response.map(action => ({ key: action.key, value: action.payload.val() }));
      console.log(this.log);
    });
    this.dataSource = new TableDataSource(this.paginator, this.sort);
  }
}
