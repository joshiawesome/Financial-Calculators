function createBar(data,x,y,value){
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

  console.log(data);

  if(value=="Bar Chart"){
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
  if(value=="Pie and Bars"){
    if(bar_svg){
      bar_svg.remove();
    }
    if(pie_svg)
    {
      pie_svg.remove();
    }
    if(pie_tooltip){
      pie_tooltip.remove();
    }
  }

  var Maximum_Years=Math.max.apply(Math,data.map(function(o){
    return o[x];
  }))
  var Maximum_Balance=Math.max.apply(Math,data.map(function(o){
    return o[y];
  }))

  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .attr('id', 'd3-tip-bars')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Total Interest:</strong> <span style='color:red'>" + numberwithcommas(d[y]) + "</span>" + "<br/><br/><strong>Years:</strong> <span style='color:red'>" + d[x] +"</span>";
  })

  const margin = { top: 10, right: 20, bottom: 30, left: 90 };
  const width = 400 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;


  const xScale = d3.scaleBand()
    .padding(0.2)
    .domain(data.map(function(d) { return d[x]; }))
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d[y]; })])
    .range([height, 0]);

  const svg = d3.select('#svg')
    .append('svg')
    .attr("id","svg1")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy) 
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  svg.call(tip);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .attr('x', d => xScale(d[x]))
    .attr('width', d => xScale.bandwidth())
    .attr("y",  d => { return height; })
    .attr("height", 0)
        .transition()
        .duration(500)
        .delay(function (d, i) {
            return i * 150;
        })
    .attr('y', d => yScale(d[y]))
    .attr('height', d => height - yScale(d[y]))
   
  svg.append('g')
    .attr("class","yLine")
    //.style("fill","black")
    .call(d3.axisLeft(yScale));

  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .attr("class","xLine")
    .call(d3.axisBottom(xScale).tickValues(xScale.domain().filter(function(d,i){return !(i%2)})));

  svg.append("text")
    .attr("x", width / 2 )
    .attr("y", 2)
    .style("text-anchor", "middle")
    .style("fill","#4b6584")
    .text("Annual Interest");

  d3.select("#svg1").selectAll("rect").attr("class","Bar_rect");

  d3.select("#download").on("click", function(){
    saveSvgAsPng(document.getElementById("svg1"), "Plotmydata-BarChart.png",{"backgroundColor":"white"});
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