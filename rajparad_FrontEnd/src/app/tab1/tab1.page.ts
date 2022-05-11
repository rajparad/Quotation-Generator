import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {MongoserviceService} from '../mongoservice.service';
import { AlertController } from '@ionic/angular'
interface rmType {desc1: string;  length1: number; width1:number; color4: string, typeP: string}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  qid: number;
  qdate: String;
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
  value: any;
  dname: any;
  dcname: any;
   in!: number;
   disabled:boolean=false;

  constructor(private node: MongoserviceService, public alertControl: AlertController) {}
  outMsg: any = {msg: ''}
  outRec: any = ''

storedb() {
  const params = { dn: this.dname, dcn: this.dcname,
  };
  if((this.dname == null) || (this.dcname == null)){
    this.alertActionEmpty()
    
  }else{
    this.disabled= true;
  this.node.insertdb(params)
  .subscribe(data => {

  },
  (err: HttpErrorResponse) => {
  console.log(err.message);
  this.outMsg.msg = err.message;
  });
  
 this.alertActiondbConfirm();
  }
  
  }

  roomData(){
   
    for(let i = 0; i < this.nRooms; i++){
    this.rooms[i] = {desc1: '',  length1: 1, width1: 1, color4: '', typeP: ''}
   
      }
      
    
  }

  storeData(){
    console.log(this.rooms)
    
      var current = new Date();
      let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();

      this.qdate = cDate;
      var randomNum = Math.floor(Math.random() * 733)+1;
      console.log(randomNum)
      const params = { cid: randomNum, date: this.qdate,
        cname: this.cName , cad : this.cAddress, cem: this.cEmail, room: this.rooms };
        if((this.cName == null) || (this.cAddress == null) || (this.nRooms == null)){
         this.alertActionEmpty()
        }else{
        console.log(params)
        this.node.insert(params)
        .subscribe(data => {
        this.outMsg.msg = 'Record added.';
        this.outRec = [];
        this.alertActionAdd();
       
        },
        (err: HttpErrorResponse) => {
        console.log(err.message);
        this.outMsg = err.message;
        });
      }
        
  }
    retrieve() {
      const params = { qgrp: 4 };
      this.node.retrieve(params)
      .subscribe(data => {
      this.outRec = data;
      this.outMsg = this.outRec.length + ' records retrieved';
      console.log(this.outRec)
      },
      (err: HttpErrorResponse) => {
      console.log(err.message);
      this.outMsg = err.message;
      });
      }

      deleteall() {
        const params = { qgrp: 4 };
        this.node.delete(params)
        .subscribe(data => {
        this.outRec = data;
       
        console.log(this.outRec)
        this.alertActionDelete()
        },
        (err: HttpErrorResponse) => {
        
        this.outMsg = "Deleted";
        });
        }


        async alertActionAdd() {
          const alert = await this.alertControl.create({
          header: 'Alert',
          subHeader: '',
          message: 'Record is added',
          buttons: [
          { text: 'OK',
          handler: () => { console.log('Confirm OK!'); }
          }]
          });
          await alert.present();
          } 

          async alertActiondbConfirm() {
            const alert = await this.alertControl.create({
            header: 'Alert',
            subHeader: '',
            message: 'Database is created',
            buttons: [
            { text: 'OK',
            handler: () => { console.log('Confirm OK!'); }
            }]
            });
            await alert.present();
            } 

          async alertActionDelete() {
            const alert = await this.alertControl.create({
            header: 'Alert',
            subHeader: '',
            message: 'All Records are Removed',
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
