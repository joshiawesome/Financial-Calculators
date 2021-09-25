function createStacks(data,x,y_max,max_principal,years,value){

console.log(data);

var pie_svg=document.getElementById("svg2");
var pie_tooltip=document.getElementById("tooltip1");
var bar_svg=document.getElementById("svg1");
var stack_svg=document.getElementById("svg3");
var line_svg=document.getElementById("svg4");
var line_legend=document.getElementById("InnerDiv");
var line_tip=document.getElementById("d3-tip-lines");
var bar_tip=document.getElementById("d3-tip-bars");
var pie_tip=document.getElementById("d3-tip-pies");
var stacks_tip=document.getElementById("d3-tip-stacks");

if(value=="Stacked Bar Chart"){
  if(pie_svg)
  {
    pie_svg.remove();
  }
  if(pie_tooltip){
    pie_tooltip.remove();
  }
  if(bar_svg){
    bar_svg.remove();
  }
  if(stack_svg){
    stack_svg.remove();
  }
  if(line_svg){
    line_svg.remove();
  }
  if(line_legend){
    line_legend.remove();
  }
  if(line_tip){
    line_tip.remove();
  }
  if(bar_tip){
    bar_tip.remove();
  }
  if(pie_tip){
    pie_tip.remove();
  }
  if(stacks_tip){
    stacks_tip.remove();
  }
}

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .attr('id', 'd3-tip-stacks')
  .offset([-10, 0])
  .html(function(d) {
    var subgroupName = d3.select(this.parentNode).datum().key;
    var subgroupValue = d.data[subgroupName];
    return "<span style='color:white'>" + subgroupName + " : </span>" + "<span style='color:red'>" + numberwithcommas(subgroupValue) +"</span>" + "<br/><br/><strong>Years:</strong> <span style='color:red'>" + d.data[x] +"</span>";
  })

const margin = { top: 10, right: 20, bottom: 30, left: 90 };
const width = 400 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select('#svg')
  .append('svg')
  .attr("id","svg3")
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .call(responsivefy) 
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

svg.call(tip);

var xScale = d3.scaleBand()
  .domain(years)
  .range([0, width])
  .padding([0.2])

svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class","xline")
  .call(d3.axisBottom(xScale).tickValues(xScale.domain().filter(function(d,i){return !(i%2)})));

var yScale = d3.scaleLinear()
  .domain([0, y_max+max_principal])
  .range([ height, 0 ]);

svg.append("g")
  .attr("class","yline")
  .call(d3.axisLeft(yScale));

var color = d3.scaleOrdinal(['#ffdd59','#fa8231']);

svg.append("g")
  .selectAll("g")
  .data(data)
  .enter().append("g")
  .attr("fill", function(d) { return color(d.key); })
  .selectAll("rect")
  .data(function(d) { return d; })
  .enter().append("rect")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .attr("x", function(d) { return xScale(d.data[x]); })
    .attr("width",xScale.bandwidth())
    .attr("height", 0)
      .transition()
      .duration(500)
      .delay(function (d, i) {
          return i * 150;
      })
    .attr("y", function(d) {console.log(yScale(d[1])); return yScale(d[1]); })
    .attr("height", function(d) {console.log(yScale(d[0]) - yScale(d[1])); return yScale(d[0]) - yScale(d[1]); })

svg.append("text")
  .attr("x", width / 2 )
  .attr("y", 2)
  .style("text-anchor", "middle")
  .style("fill","#4b6584")
  .text("Principal vs Interest Gained");


d3.select("#svg3").selectAll("rect").attr("class","Stack_rect");

d3.select("#download").on("click", function(){
  saveSvgAsPng(document.getElementById("svg3"), "Plotmydata-StackedBarChart.png",{"backgroundColor":"white"});
})



function responsivefy(svg) {

  const container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style('width'), 10),
      height = parseInt(svg.style('height'), 10),
      aspect = width / height;

  svg.attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMid')
      .call(resize);

  d3.select(window).on('resize.' + container.attr('id'), resize);

  function resize() {
      const targetWidth = parseInt(container.style('width'));
      svg.attr('width', targetWidth);
      svg.attr('height', Math.round(targetWidth / aspect));
  }
}
}