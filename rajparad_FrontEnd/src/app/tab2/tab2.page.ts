import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {MongoserviceService} from '../mongoservice.service';
import { AlertController } from '@ionic/angular'
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  qid: number;
  qdate: Date;
  cName: String;
  outMsg: any = {msg: ''}
  outRec : any;
  appAgentId: String;
  constructor(private node: MongoserviceService,  public alertControl: AlertController) {}
  ngOnInit(){
  }
  retrieve() {
    var current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();

    const params = { date: cDate};
    this.node.retrieve(params)
    .subscribe(data => {
    this.outRec = data;
    this.outMsg.msg = this.outRec.length + ' records retrieved';
    console.log(this.outRec.qid)
    },
    (err: HttpErrorResponse) => {
    console.log(err.message);
    this.outMsg = err.message;
    });
    }

    deleteone(name : string) {
      console.log(name)
      const params = { cname: name };
      this.node.deleteone(params)
      .subscribe(data => {
        
     this.outRec = data;
     this.alertActionDelete();
      this.retrieve()
     
      console.log(this.outRec)
      },
      (err: HttpErrorResponse) => {
      console.log(err.message);
    
      });
      
     
      }
      
      async alertActionDelete() {
        const alert = await this.alertControl.create({
        header: 'Alert',
        subHeader: '',
        message: 'One Record is Removed',
        buttons: [
        { text: 'OK',
        handler: () => { console.log('Confirm OK!'); }
        }]
        });
        await alert.present();
        } 
}
