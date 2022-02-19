import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'static', loadChildren: () => import('./static/static.module').then(m => m.StaticModule)},
  {path: 'dynamic', loadChildren: () => import('./dynamic/dynamic.module').then(m => m.DynamicModule)},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
