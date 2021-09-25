function createLine(data,X_Label,keys,Y_Label,y_max,value,Lines,output_clone){
  console.log(data);
  console.log(Lines);
  console.log(X_Label);
  console.log(Y_Label);
  console.log(keys);
  console.log(y_max);
  var P=keys[0];
  var TI=keys[1];
  var TB=keys[2];

  console.log(output_clone);
  console.log(Lines);

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

  if(value=="Line Chart"){
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

  var legendRectSize = 18,
  legendSpacing = 4,
  legendWidth=120;

  var legend_div_1 = d3.select("#DivLegend")
  .append("div")
  .attr("id", "InnerDiv");

  var lar,lar1,lar2=[];
  console.log(lar);

  var legend_div_2=d3.select("#InnerDiv");

 
  const margin = { top: 10, right: 20, bottom: 30, left: 90 };
  const width = 400 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  console.log(width);

  console.log(width + margin.left + margin.right); 
  var svg=d3.select("#svg")
    .append("svg")
    .attr("id","svg4")
    .attr("width",width + margin.left + margin.right + 100)
    .attr("height",height + margin.top + margin.bottom )
    .call(responsivefy) 
  .append("g")
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

 

  var svg2=d3.select("#svg4");
  
  var x = d3.scaleBand().range([0, width]).padding(1),
  y = d3.scaleLinear().range([height, 0]);
  var z= d3.scaleOrdinal(['#e15f41','#575fcf','#FC427B']);
  var colors=['#e15f41','#575fcf','#FC427B'];

  var line = d3.line()
  .x(function(d) {  return x(d.Year); })
  .y(function(d) { return y(d.total); });

  z.domain(d3.keys(output_clone[0]).filter(function(key) {
    return key !== X_Label;
  }));
  
  var trends = z.domain().map(function(name) {
    return {
      name: name,
      values: output_clone.map(function(d) {
        return {
          Year: d[X_Label],
          total: +d[name]
        };
      })
    };
  });

  console.log(trends);
  var val1=0,val2=0,val3=0,year,X_POS,Y_POS;
  function display(dis,years,x_pos,y_pos){
    console.log(dis);
    year=years;
    x_pos=X_POS;
    y_pos=Y_POS;
    console.log(x_pos,y_pos);
    console.log(year);
    console.log(year);
    val1=dis[0];
    val2=dis[1];
    val3=dis[2];
  }
  
  var tip = d3.tip()
  //.attr("style","left:20px")
  // .attr("transform", "translate(" + "2" + ",0)")
  .attr('class', 'd3-tip-line')
  .attr('id', 'd3-tip-lines')
  .offset([-50, 20])
  //.offset([-10, 0])
  .html(function(d){console.log(val1,val2,val3);
  return "<span style='color:#26de81'>" + X_Label + ":</span>" +"<span style='color:#26de81'>" + year +"</span>"
+"<br/><br><span style='color:#e15f41'>" + P + ":</span>" +"<span style='color:#e15f41'>" + numberwithcommas(val1) +"</span>"
+"<br/><br/><span style='color:#575fcf'>" + TI + ":</span>" +"<span style='color:#575fcf'>" + numberwithcommas(val2) +"</span>"
+"<br/><br/><span style='color:#FC427B'>" + TB + ":</span>" +"<span style='color:#FC427B'>" + numberwithcommas(val3) +"</span>"})

  svg.call(tip);

  x.domain(output_clone.map(function(d) { return d[X_Label]; }));
  y.domain([0, d3.max(trends, function(c) {
    return d3.max(c.values, function(v) {
    console.log(v.total); return v.total;
    });
  })]);

  var trend = svg.selectAll(".trend")
    .data(trends)
    .enter()
    .append("g")
    .attr("class", "trend");

  var path= trend.append("path")
    .attr("class", "line")
    .attr("d", function(d) { return line(d.values); })
    .style("stroke", function(d) { return z(d.name); });

  var points = svg.selectAll('.points')
    .data(trends)
    .enter()
    .append('g')
    .attr('class', 'points')
    .append('text');

  trend
    .style("fill", function(d) { return z(d.name); })
    .style("stroke", function(d) { return z(d.name); })
    .selectAll("circle.line")
    .data(function(d){ return d.values })
    .enter()
    .append("circle")
    .attr("r", 3)
    .attr("fill-opacity",0.5)
    .style("stroke-width", 1)
    .attr("cx", function(d) { return x(d.Year); })
    .attr("cy", function(d) { return y(d.total); });

  svg.append("g")
    .attr("class", "xLines")
    .attr("transform", "translate(0, " + height + ")")
    //.call(d3.axisBottom(x).ticks(5));
    .call(d3.axisBottom(x).tickValues(x.domain().filter(function(d,i){return !(i%5)})));

  svg.append("g")
    .attr("class", "yLines")
    //.attr("transform", "translate(23, 0)")
    .call(d3.axisLeft(y));

  let totalLength = path.node().getTotalLength();
  console.log(totalLength);

  path.each(function(d) { d.totalLength = this.getTotalLength(); })
    .attr("stroke-dasharray", function(d) { console.log(d.totalLength); return d.totalLength + " " + d.totalLength; })
    .attr("stroke-dashoffset", function(d) { return d.totalLength; })
    .transition()
    .delay(function(d, i) { return i * 1000; })
    .duration(1000)
    .attr("stroke-dashoffset", 0);

  var focus = svg.append('g')
    .attr('class', 'focus')
    .style('display', 'none');

  focus.append('line')
    .attr('class', 'x-hover-line hover-line')
    .attr('y1' , 0)
    .attr('y2', height)

  svg2.append('rect')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)
  .attr("class", "overlay")
  .attr("width", width)
  .attr("height", height)
  .on("mouseover", function(d,i){
    mouseover(d);
  })
  .on("mouseout", mouseout)
  .on("mousemove",  mousemove)
  
  var YearScales = output_clone.map(function(name) { return x(name[X_Label]); });
  console.log(YearScales);

  var tooltip = legend_div_2.append("div")
            //.data(trends)
            .attr('id', 'tooltips')
            .style('position', 'absolute')
            .style("background-color", "#D3D3D3")
             .style('padding', 6)
            .style('display', 'none')

  for(var i=0;i<keys.length;i++){
    var labels=keys[i];
    legend_div_2.append("text")
    .data(trends)
    .attr("class", "legend") 
    .style("color", function(d, j) { 
          return colors[i];
          })
    .text(function(d){return (labels);}); 
  }
  
  
  function mouseover() {
    focus.style("display", null);
    d3.selectAll('.points text').style("display", null);
  }
  function mouseout() {
    focus.style("display", "none");
    d3.selectAll('.points text').style("display", "none");
    tip.hide(this);
  }
  
  function mousemove() {
    lar2=[];
    var i = d3.bisect(YearScales, d3.mouse(this)[0], 1);
    console.log(i);
    var di = output_clone[i-1];
    var j=di[X_Label];
    focus.attr("transform", "translate(" + (+x(di[X_Label])) + ",0)");
    d3.selectAll('.points text')
      .attr('x', function(d) { X_POS=x(di[X_Label]) + 15; console.log(d3.bisect(YearScales,d3.mouse(this)));return x(di[X_Label]) + 15; })
      .attr('y', function(d) { console.log(d.values[i-1]); Y_POS=y(d.values[i-1].total) + 4; return y(d.values[i-1].total) + 4; })
      .text(function(d) { lar=d.values[i-1].total; lar2.push(lar); /*console.log(numberwithcommas(d.values[i-1].total));*/ return (numberwithcommas(d.values[i-1].total)); })
      .style('fill', function(d) { return z(d.name); })
   tip.show(this);
   d3.select(".d3-tip-line")
   .style("left", d3.event.pageX + 5 +"px")     
   .style("top", d3.event.pageY+"px")   
    display(lar2,j,X_POS,Y_POS);
  
    //var lo=(function(d) { var l=numberwithcommas(d.values[i-1].total);   console.log(l);});
  
    // tooltip
    // .data(trends).enter()
    // //.append('div')
    // .html(d=>{
    //   var j = d3.bisect(YearScales, d3.mouse(this)[0], 1);
    //   //var di = output_clone[j-1];
    //   return(numberwithcommas(d.values[j-1].total));
    // })
    //.html("Hello")
    //.html('<p>' + function(d) { return (numberwithcommas(d.values[i-1].total)); } + '</p>')
    //.style('display', 'block')
    //.style('left', d3.event.pageX + 20)
    //.style('top', d3.event.pageY - 20)

  }

  d3.select("#download").on("click", function(){
    saveSvgAsPng(document.getElementById("svg4"), "Plotmydata-LineChart.png",{"backgroundColor":"white"});
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