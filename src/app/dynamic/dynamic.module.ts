import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DynamicRoutingModule} from './dynamic-routing.module';
import { MyArcChartComponent } from './my-arc-chart/my-arc-chart.component';
import {MyChangedChartComponent} from "./my-changed-chart/my-changed-chart.component";
import { FormsChartComponent } from './forms-chart/forms-chart.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MyArcChartComponent,
    MyChangedChartComponent,
    FormsChartComponent,
  ],
    imports: [
        CommonModule,
        DynamicRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class DynamicModule { }
