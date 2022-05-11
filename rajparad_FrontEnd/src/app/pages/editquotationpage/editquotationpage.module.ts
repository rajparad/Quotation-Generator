import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditquotationpagePageRoutingModule } from './editquotationpage-routing.module';

import { EditquotationpagePage } from './editquotationpage.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditquotationpagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditquotationpagePage]
})
export class EditquotationpagePageModule {}
