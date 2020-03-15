import { Component,Input,ElementRef,ViewChild,ViewEncapsulation,OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { DataModel, DataModel2 } from "./barchart.model";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-barchart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnChanges {
  data: DataModel[];
  data2: DataModel2[];
  
  constructor(private http: HttpClient) {
    
    }

    @ViewChild('chart') private chartContainer: ElementRef;
    @ViewChild('chart2') private chartContainer2: ElementRef;
    margin = { top: 20, right: 20, bottom: 30, left: 40 };
    
  ngOnInit():void{

    this.http.get("http://5e6bb602d708a000160b4cd5.mockapi.io/chart/chart")
      .subscribe(val => {
        this.data =<any>val
        console.log(this.data);
      
      
      this.http.get("http://5e6bb602d708a000160b4cd5.mockapi.io/chart/linechart")
        .subscribe(val => {
          this.data2 = <any>val;
          console.log(this.data2);

          this.createChart();
          this.createChart2();

        });
      })
    }

  ngOnChanges(): void {
    if (!this.data) { return; }
    this.createChart();
    this.createChart2();

  }

  createChart(): void {
    console.log(this.data)
    d3.select('svg').remove();
    const element = this.chartContainer.nativeElement;
    const data = this.data;
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.letter));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.frequency)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.letter))
      .attr('y', d => y(d.frequency))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.frequency));
  }

  createChart2(): void {
    const element2 = this.chartContainer2.nativeElement;
    const svg2 = d3.select(element2).append('svg')
      .attr("width", element2.offsetWidth)
      .attr("height", element2.offsetHeight)
      .append("g").attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");
    let width = 960 - this.margin.left - this.margin.right,
      height = 500 - this.margin.top - this.margin.bottom;
    const contentWidth = element2.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element2.offsetHeight - this.margin.top - this.margin.bottom;
    var x = d3.scaleTime().range([0, width]);
    var y0 = d3.scaleLinear().range([height, 0]);
    var y1 = d3.scaleLinear().range([height, 0]);
    var parseTime = d3.timeParse("%d-%b-%y");
    var valueline = d3.line<any>()
      .x((d) => x(d.date))
      .y((d) => y0(parseInt(d.close)));

    // define the 2nd line
    var valueline2 = d3.line<any>()
      .x((d) => x(parseTime(d.date)))
      .y((d) => y1(parseInt(d.open)));
    const data = this.data2;

    x.domain(d3.extent(data, d => parseTime(d.date)));
    y0.domain([0, d3.max(data, d => Math.max(d.close))]);
    y1.domain([0, d3.max(data, d => Math.max(d.open))]);


    svg2.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

    svg2.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "red")
      .attr("d", valueline2);

    svg2.append("g")
      .attr("transform", "translate(0," + element2.offsetHeight + ")")
      .call(d3.axisBottom(x));

    svg2.append("g")
      .call(d3.axisLeft(y0));

    svg2.append("g")
      .call(d3.axisRight(y1));
  }
}


