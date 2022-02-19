import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { StaticRoutingModule } from './static-routing.module';
import {MyChartComponent} from "./my-chart/my-chart.component";
import {MyMultiLineChartComponent} from "./my-multi-line-chart/my-multi-line-chart.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'my-chart', component: MyChartComponent},
  {path: 'my-multiline-chart', component: MyMultiLineChartComponent},
]

@NgModule({
  declarations: [
    MyChartComponent,
    MyMultiLineChartComponent,
  ],
  imports: [
    CommonModule,
    // StaticRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class StaticModule { }
