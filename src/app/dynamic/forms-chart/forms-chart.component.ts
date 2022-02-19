import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as d3 from "d3-selection";
import * as d3Shape from "d3-shape";
import {DrawService} from "../../shared/draw-service";

@Component({
  selector: 'app-forms-chart',
  templateUrl: './forms-chart.component.html',
  styleUrls: ['./forms-chart.component.scss']
})
export class FormsChartComponent implements OnInit {

  title = 'Add data and see graphic'
  form!: FormGroup
  items = [{name: 'text1', data: 1 }, {name: 'text2', data: 2 }, {name: 'text3', data: 3 },  ]

  margin = {top: 20, right: 20, bottom: 30, left: 50}
  width: number
  height: number
  svg: any
  arc: any
  label: any
  pie: any
  radius: any
  lab = 20


  constructor(private dw: DrawService) {
    this.width = 900 - this.margin.left - this.margin.right
    this.height = 900 - this.margin.top - this.margin.bottom
    this.radius = Math.min(this.width, this.height) / 4;
  }


  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null),
      data: new FormControl(null, Validators.pattern(/[0-9]/))
    })

    this.initSVG()
    this.initAxis()
    this.drawLine()
  }


  get name(){
    return this.form.get('name')
  }


  get data(){
    return this.form.get('data')
  }


  addItem(nameNew: any, dataNew: any) {
    const obj = {name: nameNew.value , data: dataNew.value}
    this.items.push(obj)
    this.deleteLineAxis()
    this.initAxis()
    this.drawLine()
  }


  deleteItem(task: any, idx: number) {
    this.items.splice(idx,1)
    this.deleteLineAxis()
    this.initAxis()
    this.drawLine()
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
      .value((d: any) => d.data)
  }


  drawLine() {
    this.dw.initColorSet3()
    let g = this.svg.selectAll('.arc')
      .data(this.pie(this.items))
      .enter().append('g')
      .attr('class', 'arc')

    g.append('path')
      .attr('class', 'line')
      .attr('d', this.arc)
      .style('fill', (d: any) => this.dw.color(d.data.data))
      .style('stroke', 'black')
      .style('stroke-width', '1.5px')

    g.append('text')
      .attr('transform', (d: any) => `translate( ${this.arc.centroid(d)})`)
      .attr('dx', '-1rem')
      .attr('font-size', '14px')
      .text((d: any) => (d.data.name + ': ' + d.data.data))
  }


  deleteLineAxis() {
    this.svg.selectAll('g').remove()
  }
}
