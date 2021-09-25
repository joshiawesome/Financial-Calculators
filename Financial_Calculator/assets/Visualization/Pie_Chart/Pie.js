function createPie(data,value){
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

  if(value=="Pie Chart"){
    if(pie_svg){
      pie_svg.remove();
    }
    if(pie_tooltip){
      pie_tooltip.remove();
    }
    if(bar_svg)
    {
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
    if(pie_svg){
      pie_svg.remove();
    }
    if(pie_tooltip){
      pie_tooltip.remove();
    }
  }
  console.log(data);

  let res=data.map(x=> Object.keys(x));

  var headers=res[0];
  var x=headers[0];
  var y=headers[1];

  console.log(x,y)

  /*const margin = { top: 10, right: 20, bottom: 30, left: 90 };
  const widths = 400 - margin.left - margin.right;
  const heights = 400 - margin.top - margin.bottom;*/

  var height=350,
  width=500,
  radius=Math.min(width,height)/2;

  var legendRectSize = 18,
  legendSpacing = 4,
  legendWidth=120;

  var color = d3.scaleOrdinal(['#ffda79','#ffb142', '#ff3f34','#88f5ff', '#007aa4']);

  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .attr('id', 'd3-tip-pies')
  .offset([-10, 0])
  .html(function(d) {
    return  d.data[x] + " : </span>" + "<span style='color:red'>" + numberwithcommas(d.data[y]) + "%";
  })


  var svg=d3.select("#svg").append("svg")
  .attr("id","svg2")
  .attr("width",480 + legendWidth)
  .attr("height",440)
  .call(responsivefy)
  .append("g")
  .attr("transform","translate("+ 240 + "," +height/2 +")");

  svg.call(tip);

  var pie=d3.pie().value(function(d){
    return d[y];
  })

  var path=d3.arc()
  .outerRadius(radius-10)
  .innerRadius(0);

  var label=d3.arc()
  .outerRadius(radius)
  .innerRadius(radius-80);

  var arc = svg.selectAll(".arc")
  .data(pie(data))
  .enter().append("g")
  .attr("class","arc")
  .on('mouseover',  function(d,i){
    tip.show(d,this);
    console.log(d.data);
    var current = this;  
      var others = svg.selectAll(".arc").filter(function(el) {
        return this != current
      });
      others.selectAll("path").style('opacity', 0.3);
  })
  .on('mouseout',  function(d,i){
    tip.hide(d,this);
    var current = this;
    d3.select(this)
      .style('opacity', 1);
    var others = svg.selectAll(".arc").filter(function(el) {
      return this != current
    });
    others.selectAll("path").style('opacity', 1);
  })

  arc.append("path")
  .attr("d",path)
  .attr("fill",function(d){return color(d.data[x])})
  .transition()
  .duration(500)
  .attrTween('d', arcTweenStart);

  var legend = svg.selectAll('.legend')
		.data(color.domain())
		.enter()
		.append('g')
		.attr('class', 'PieLegend')
		.attr('transform', function(d, i) {
			var height = legendRectSize + legendSpacing;
			var offset =  height * color.domain().length / 2;
			var horz = 10 * legendRectSize;
			var vert = (i * height - offset)+190;
			return 'translate(' + width/7 + ',' + vert + ')';
    }); 
    
		legend.append('rect')
		.attr('width', legendRectSize)
		.attr('height', legendRectSize)
		.style('fill', color)
		.style('stroke', color)
		.on('click', function(label) {
			var rect = d3.select(this);
			var enabled = true;
			var totalEnabled = d3.sum(data.map(function(d) {
				return (d.enabled) ? 1 : 0;
      }));

      if (rect.attr('class') === 'disabled') {
        rect.attr('class', '');
      } else {
        if (totalEnabled < 2) return;
        rect.attr('class', 'disabled');
        enabled = false;
      }

    //   pie.value(function(d) {
		// 		if (d.label === label) d.enabled = enabled;
		// 		return (d.enabled) ? d.value : 0;
		// 	});

		// path = path.data(pie(data));

		// 	path.transition()
		// 	.duration(750)
		// 	.attrTween('d', function(d) {
		// 		var interpolate = d3.interpolate(this._current, d);
		// 		this._current = interpolate(0);
		// 		return function(t) {
		// 			return arc(interpolate(t));
		// 		};
		// 	});
  
    });

    legend.append('text')
		.attr('x', legendRectSize + legendSpacing)
		.attr('y', legendRectSize - legendSpacing)
		.text(function(d) { return d; }) 

  function arcTweenStart(b) {
    var start = {
      startAngle: b.startAngle,
      endAngle: b.startAngle
    };
    var i = d3.interpolate(start, b);
    return function(t) {
      return path(i(t));
    };
  }

  pie.value(function(d) {
    if (d.label === label) d.enabled = enabled;
    return (d.enabled) ? d.value : 0;
  });

  d3.select("#download").on("click", function(){
    saveSvgAsPng(document.getElementById("svg2"), "Plotmydata-PieChart.png",{"backgroundColor":"white"});
  })


  function responsivefy(vis) {
    var container = d3.select(vis.node().parentNode),
        width = parseInt(vis.style("width"), 10),
        height = parseInt(vis.style("height"), 10),
        aspect = width / height;
   
        vis.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize);

    d3.select(window).on("resize." + container.attr("id"), resize);

    
    function resize() {
        const w=parseInt(container.style("width"));
        vis.attr("width", w);
        vis.attr("height", Math.round(w / aspect));
    }

  } 
}