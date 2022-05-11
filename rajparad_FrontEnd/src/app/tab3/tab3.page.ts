import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {MongoserviceService} from '../mongoservice.service'
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  qid: number;
  qdate: Date;
  cName: String;
  outMsg: any = {msg: ''}
  constructor(private node: MongoserviceService) {}
  retrive() {
    const params = {cid: this.qid, wday: this.qdate,
      prof: this.cName};
    this.node.retrieve(params)
    .subscribe(data => {
    this.outMsg = data;
    
    console.log(this.outMsg)
    },
    (err: HttpErrorResponse) => {
    console.log(err.message);
    this.outMsg.msg = err.message;
    });
    }
}
