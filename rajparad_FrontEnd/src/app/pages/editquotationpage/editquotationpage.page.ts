import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MongoserviceService } from 'src/app/mongoservice.service';
import { AlertController } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router';
interface rmType {desc1: string;  length1: number; width1:number; color4: string, typeP: string}
@Component({
  selector: 'app-editquotationpage',
  templateUrl: './editquotationpage.page.html',
  styleUrls: ['./editquotationpage.page.scss'],
})
export class EditquotationpagePage implements OnInit {
agent!: String;
data!: any;
qid: number;
qgrup: number;
qdate: Date;
cName: String;
cAddress: String;
cEmail: String;
nRooms: number;
desc1!: string;
length1!: number;
width1!: number;
color4!: string;
typeP!: string;
rooms: rmType[] = new Array();
outMsg: any = {msg: ''}
  outRec: any
  constructor( private node: MongoserviceService, public alertControl: AlertController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data = this.route.snapshot.params;
    console.log(this.data.qid)
  }
  roomData(){
    
    var date = new Date();
     
      this.qdate = date;
    
      for(let i = 0; i < this.nRooms; i++){
 this.rooms[i] = {desc1: '',  length1: 1, width1: 1, color4: '', typeP: ''}
        
      }
      
    
  }
  storeData(){
    console.log(this.rooms)
   
    
      const params = { cid: this.data.qid, 
        cname: this.cName , cad : this.cAddress, cem: this.cEmail, room: this.rooms };
        console.log(params)
        if((this.cName == null) || (this.cAddress == null) || (this.nRooms == null)){
          this.alertActionEmpty()
         }else{
        this.node.update(params)
        .subscribe(data => {
        this.outMsg.msg = 'Record Updated.';
        this.outRec = [];
       this.alertActionupdate()
        },
        (err: HttpErrorResponse) => {
        console.log(err.message);
        this.outMsg = err.message;
        });
         }
  }

  async alertActionupdate() {
    const alert = await this.alertControl.create({
    header: 'Alert',
    subHeader: '',
    message: 'One Record is Updated. Click on Updated Records button on List quotation page to view',
    buttons: [
    { text: 'OK',
    handler: () => { console.log('Confirm OK!'); }
    }]
    });
    await alert.present();
    } 

    async alertActionEmpty() {
      const alert = await this.alertControl.create({
      header: 'Alert',
      subHeader: '',
      message: 'Please fill all required feilds',
      buttons: [
      { text: 'OK',
      handler: () => { console.log('Confirm OK!'); }
      }]
      });
      await alert.present();
      } 
}
