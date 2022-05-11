import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'editquotationpage',
    loadChildren: () => import('./pages/editquotationpage/editquotationpage.module').then( m => m.EditquotationpagePageModule)
  },
  {
    path: 'editquotationpage/:parm',
    loadChildren: () => import('./pages/editquotationpage/editquotationpage.module').then( m => m.EditquotationpagePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
