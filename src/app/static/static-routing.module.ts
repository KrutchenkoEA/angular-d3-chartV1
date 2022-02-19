import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyChartComponent} from "./my-chart/my-chart.component";
import {MyMultiLineChartComponent} from "./my-multi-line-chart/my-multi-line-chart.component";

const routes: Routes = [
  {path: 'my-chart', component: MyChartComponent},
  {path: 'my-multiline-chart', component: MyMultiLineChartComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule { }
