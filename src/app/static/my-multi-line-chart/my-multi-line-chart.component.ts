import {Component, OnInit} from '@angular/core';
import {TEMPERATURES} from '../../shared/temperatures';
import {DrawService} from "../../shared/draw-service";

@Component({
  selector: 'app-my-multi-line-chart',
  templateUrl: './my-multi-line-chart.component.html',
  styleUrls: ['./my-multi-line-chart.component.scss']
})
export class MyMultiLineChartComponent implements OnInit {

  title = 'My-multiline-chart'


  margin = {top: 20, right: 20, bottom: 30, left: 50}
  widthSVG = 900
  heightSVG = 400
  width: any
  height: any
  svg: any
  x: any
  y: any
  line: any
  id!: string[]


  constructor(private dw: DrawService) {
    this.width = this.widthSVG - this.margin.left - this.margin.right
    this.height = this.heightSVG - this.margin.top - this.margin.bottom
  }


  ngOnInit()  {
    this.dw.initSVG(this.widthSVG, this.heightSVG ,this.margin.left, this.margin.top)
    this.dw.initAxisMultiLine(TEMPERATURES,this.width, this.height)
    this.dw.drawAxis(this.height, this.x, this.y)
    this.drawLine()
  }


  drawLine() {
    this.dw.initLine()
    this.dw.initColor()

    let city = this.dw.svg.selectAll('.city')
      .data(TEMPERATURES)
      .enter().append('g')
      .attr('class', 'city')

      city.append('path')
      .attr('class', 'line')
      .attr('d', (d: any) => this.dw.line(d.values))
      .style('stroke', (d: any) => this.dw.color(d.id))
      .style('fill', 'none')
      .style('stroke-width', '1.5px')


  }
}

