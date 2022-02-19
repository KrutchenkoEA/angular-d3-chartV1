import {Component, OnInit} from '@angular/core';
import {STOCKS} from "../../shared/stocks";
import {DrawService} from "../../shared/draw-service";


@Component({
  selector: 'app-my-arc-chart',
  templateUrl: './my-changed-chart.component.html',
  styleUrls: ['./my-changed-chart.component.scss']
})
export class MyChangedChartComponent implements OnInit {

  title = 'My-arc-chart'

  margin = {top: 20, right: 20, bottom: 30, left: 50}
  widthSVG = 900
  heightSVG = 400
  width: any
  height: any
  svg: any
  x: any
  y: any
  line: any

  mas = STOCKS
  time: any
  timeOnButton = 1000
  timeStart = false


  constructor(private dw: DrawService) {
    this.width = this.widthSVG - this.margin.left - this.margin.right
    this.height = this.heightSVG - this.margin.top - this.margin.bottom
  }


  ngOnInit()  {
    // this.initTime()
    // this.initSVG()
    // this.initAxis()
    // this.drawAxis()
    this.dw.initSVG(this.widthSVG, this.heightSVG ,this.margin.left, this.margin.top)
    this.dw.initAxisSingleLine(STOCKS, this.width, this.height)
    this.dw.drawAxis(this.height, this.x, this.y)
    this.drawLine()
  }


  initTime(timeOnButton: number) {
    this.timeStart = true
    this.time = setInterval(() => {

      this.deleteLineAxis()

      this.mas = STOCKS.map(({date, value}) => {
        value = Math.floor(value * Math.random())
        return {date, value}
      })

      this.dw.initAxisSingleLine(this.mas, this.width, this.height)
      this.dw.drawAxis(this.height, this.x, this.y)
      this.drawLine()

    }, timeOnButton)
  }


  stopTime() {
    clearInterval(this.time)
    console.log('Stop')
  }

  // initSVG() {
  //   this.svg = d3.select('svg')
  //     .append('g')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
  // }
  //
  //
  // initAxis() {
  //   this.x = d3Scale.scaleTime().range([0, this.width])
  //   this.y = d3Scale.scaleLinear().range([this.height, 0])
  //   this.x.domain(d3Array.extent(this.mas,((d) => d.date)))
  //   this.y.domain(d3Array.extent(this.mas,((d) => d.value)))
  // }
  //
  //
  // drawAxis() {
  //   this.svg.append('g')
  //     .attr('class', 'x-axis')
  //     .attr('transform', `translate(0, ${this.height})`)
  //     .call(d3Axis.axisBottom(this.x))
  //
  //   this.svg.append('g')
  //     .attr('class', 'y-axis')
  //     .call(d3Axis.axisLeft(this.y))
  // }


  drawLine() {
    this.dw.initLine()

    let g = this.dw.svg.selectAll('.gline')
      .data([this.mas])
      .enter().append('g')
      .attr('class', 'gline')

      g.append('path')
      .attr('class', 'line')
      .attr('d', this.dw.line)
      .style('fill', 'none')
      .style('stroke', 'steelblue')
      .style('stroke-width', '1.5px')
  }


  deleteLineAxis() {
    this.dw.svg.selectAll('g').remove()
  }

}

