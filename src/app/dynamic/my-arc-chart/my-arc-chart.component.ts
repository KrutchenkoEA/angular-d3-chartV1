import {Component, OnInit} from '@angular/core';
import * as d3 from "d3-selection";
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3ScaleChromatic from "d3-scale-chromatic";
import {STOCKS} from "../../shared/stocks";

@Component({
  selector: 'app-my-arc-chart',
  templateUrl: './my-arc-chart.component.html',
  styleUrls: ['./my-arc-chart.component.scss']
})
export class MyArcChartComponent implements OnInit {

  title = 'Arc-chart'

  margin = {top: 20, right: 20, bottom: 30, left: 50}
  width: number
  height: number
  svg: any
  arc: any
  label: any
  pie: any
  radius: any
  color: any
  lab = 20

  mas = STOCKS.slice(0,10)
  time: any
  timeOnButton = 1000
  timeStart = false


  constructor() {
    this.width = 900 - this.margin.left - this.margin.right
    this.height = 900 - this.margin.top - this.margin.bottom
    this.radius = Math.min(this.width, this.height) / 4;
  }


  ngOnInit()  {
    this.initSVG()
    this.initAxis()
    this.drawLine()
  }


  initTime(timeOnButton: number) { // эмуляция меняющищнся входных данных
    this.timeStart = true
    this.time = setInterval(() => {

      this.deleteLineAxis()

        this.mas = STOCKS.slice(0,10).map(({date, value}) => {
          value = Math.floor(value * Math.random())
          return {date, value}
        })

      this.initAxis()
      this.drawLine()

      console.log('Start', timeOnButton)
    }, timeOnButton)
  }


  stopTime() {
    this.timeStart = false
    clearInterval(this.time)
    console.log('Stop')
  }


  initSVG() {
    this.svg = d3.select('svg')
      .attr('width', 900)
      .attr('height', 900)
      .append('g')
      .attr('transform', `translate(${this.radius + this.lab}, ${this.radius + this.lab})`)
  }


  initAxis() {
    this.arc = d3Shape.arc()
      .innerRadius(this.radius / 2)
      .outerRadius(this.radius)
    this.label = d3Shape.arc()
      .innerRadius(this.radius + this.lab)
      .outerRadius(this.radius + this.lab)
    this.pie= d3Shape.pie()
      .sort(null)
      .value((d: any) => d.value)
    this.color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeSet3)
  }


  drawLine() {
    let g = this.svg.selectAll('.arc')
      .data(this.pie(this.mas))
      .enter().append('g')
      .attr('class', 'arc')

    g.append('path')
      .attr('class', 'line')
      .attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.date))
      .style('stroke', 'black')
      .style('stroke-width', '1.5px')

    g.append('text')
      .attr('transform', (d: any) => `translate( ${this.arc.centroid(d)})`)
      .attr('dx', '-1rem')
      .attr('font-size', '14px')
      .text((d: any) => d.data.value)
  }


  deleteLineAxis() {
    this.svg.selectAll('g').remove()
  }


}
