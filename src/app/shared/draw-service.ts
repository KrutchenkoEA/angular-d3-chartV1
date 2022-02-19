import {Injectable} from '@angular/core';
import * as d3 from "d3-selection";
import * as d3Axis from "d3-axis";
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import {STOCKS} from "./stocks";
import {TEMPERATURES} from "./temperatures";
import * as d3Shape from "d3-shape";
import * as d3ScaleChromatic from "d3-scale-chromatic";

export interface IMultiLine {
  id: string
  values: {
    date: Date,
    temperature: number
  }
}

export interface ILine {
  date: Date,
  value: number
}

@Injectable()
export class DrawService {

  svg: any
  x: any
  y: any
  line: any
  color: any
  arc: any
  label: any
  pie: any

  constructor() { }


  initSVG(width: number, height: number,marginLeft: number, marginTop: number) {
    this.svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate (${marginLeft},${marginTop})`)
  }


  initAxisSingleLine(innerData: any, width: any, height: any) {
    this.x = d3Scale.scaleTime().range([0, width])
    this.y = d3Scale.scaleLinear().range([height, 0])

    this.x.domain(d3Array.extent(innerData,((d: any) => d.date)))
    this.y.domain(d3Array.extent(innerData,((d: any) => d.value)))
  }


  initAxisMultiLine(innerData: any, width: any, height: any) {
    this.x = d3Scale.scaleTime().range([0, width])
    this.y = d3Scale.scaleLinear().range([height, 0])
    this.x.domain([
      d3Array.min(innerData, (c: any) => d3Array.min(c.values, (d: any) => d.date)),
      d3Array.max(innerData, (c: any) => d3Array.max(c.values, (d: any) => d.date))
    ])

    this.y.domain([
      d3Array.min(innerData, (c: any) => d3Array.min(c.values, (d: any) => d.value)),
      d3Array.max(innerData, (c: any) => d3Array.max(c.values, (d: any) => d.value))
    ])
  }


  drawAxis(height: number, x: any, y: any) {
    this.svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3Axis.axisBottom(this.x))

    this.svg.append('g')
      .attr('class', 'y-axis')
      .call(d3Axis.axisLeft(this.y))
  }

  initLine(){
    this.line = d3Shape.line()
      .curve(d3Shape.curveBasis)
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value))
  }

  initColor() {
    this.color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10)
  }

  initColorSet3() {
    this.color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeSet3)
  }

  initSVGCircle(radius: number, labelRadius: number) {
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', `translate(${labelRadius}, ${labelRadius})`)
  }


  initAxisCircle(radius: number, labelRadius: number){
    this.arc = d3Shape.arc()
      .innerRadius(radius / 2)
      .outerRadius(radius)
    this.label = d3Shape.arc()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius)
    this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.value)
  }


}


