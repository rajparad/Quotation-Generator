import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditquotationpagePage } from './editquotationpage.page';

const routes: Routes = [
  {
    path: '',
    component: EditquotationpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditquotationpagePageRoutingModule {}
