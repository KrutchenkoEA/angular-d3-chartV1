import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyChangedChartComponent} from "./my-changed-chart/my-changed-chart.component";
import {MyArcChartComponent} from "./my-arc-chart/my-arc-chart.component";
import {FormsChartComponent} from "./forms-chart/forms-chart.component";

const routes: Routes = [
  {path: 'my-changed-chart', component: MyChangedChartComponent},
  {path: 'my-arc-chart', component: MyArcChartComponent},
  {path: 'form-chart', component: FormsChartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicRoutingModule { }
