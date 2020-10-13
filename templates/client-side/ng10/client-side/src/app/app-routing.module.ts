import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page2Component } from './page2/page2.component';
import { Page1Component } from './page1/page1.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import * as config from '../../../addon.config.json';

const routes: Routes = [
  {
    path: `settings/95501678-6687-4fb3-92ab-1155f47f839e/page1`,
    component: Page1Component
  },
  {
    path: `settings/95501678-6687-4fb3-92ab-1155f47f839e/page2`,
    component: Page2Component
  },
  {
    path: '**',
    component: EmptyRouteComponent
  }
  // {
  //   path: 'settings/95501678-6687-4fb3-92ab-1155f47f839e/themes',
  //   loadChildren: () => import('./plugin/plugin.module').then(m => m.PluginModule)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./plugin/plugin.module').then(m => m.PluginModule)
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
