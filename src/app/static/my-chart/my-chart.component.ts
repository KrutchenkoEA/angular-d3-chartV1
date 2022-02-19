import {Component, OnInit,} from '@angular/core';

import {STOCKS} from "../../shared/stocks";
import {DrawService} from "../../shared/draw-service";

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.scss']
})
export class MyChartComponent implements OnInit {

  title = 'My-line-chart'

  margin = {top: 20, right: 20, bottom: 30, left: 50};

  widthSVG = 900
  heightSVG = 400
  width: any
  height: any

  svg: any
  x: any
  y: any
  line: any


  constructor( private dw: DrawService) {
    this.width = this.widthSVG - this.margin.left - this.margin.right
    this.height = this.heightSVG - this.margin.top - this.margin.bottom
  }


  ngOnInit() {
    this.dw.initSVG(this.widthSVG, this.heightSVG ,this.margin.left, this.margin.top)
    this.dw.initAxisSingleLine(STOCKS, this.width, this.height)
    this.dw.drawAxis(this.height, this.x, this.y)
    this.drawLine()
  }


  drawLine() {
    this.dw.initLine()

    this.dw.svg.append('path')
      .datum(STOCKS)
      .attr('class', 'line')
      .attr('d', this.dw.line)
      .style('fill', 'none')
      .style('stroke', 'steelblue')
      .style('stroke-width', '1.5px')
  }
}
