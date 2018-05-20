import { Component, OnInit } from '@angular/core';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  wikiList: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.wikiList = db.list('/light');
  }
  wikis = [];
  isOpen = true;
  switchValue: number;
  ngOnInit(): void {
    this.wikiList.snapshotChanges().subscribe(actions => {
      this.wikis = actions.map(action => ({ key: action.key, value: action.payload.val() }));
      console.log(this.wikis[0].value);
      if (this.wikis[0].value === 0) {
        this.isOpen = true;
      } else {
        this.isOpen = false;
      }
      });
  }

  submit() {
    this.wikiList.set('/switch', this.switchValue);
  }
  checkEnter(event: any) {
    if (event.keyCode === 13) {
     this.submit();
   }
  }
}
