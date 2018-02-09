window.onload = function() {

  function jump() {
    newX = Math.random()*width;
    newY = Math.random()*height;

    while(width - newX < 150 || newX < 150){
      newX = Math.random()*width;
    }

    while(height - newY < 150 || newY < 150){
      newY = Math.random()*height;
    }

    d3.select("#mainCircle")
      .attr("cx", newX)
      .attr("cy", newY);
    d3.select("#catch")
      .attr("x", newX-25)
      .attr("y", newY-10);
    d3.select("#if")
      .attr("x", newX-30)
      .attr("y", newY+10);
  }

  // var width =  d3.select("#blurb").node().getBoundingClientRect().width,//document.body.clientWidth,
      // height =  d3.select("#blurb").node().getBoundingClientRect().height,//window.innerHeight,
  var width =  document.body.clientWidth,
      height =  window.innerHeight,
      radius = 50,
      currX = Math.random()*width,
      currY = Math.random()*height;

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("position", "fixed")
      .style("top", "0")
      .style("left", "0");

  var circle = svg.append("circle")
      .attr("cx", currX)
      .attr("cy", currY)
      .attr("r", radius)
      .style("fill", "red")
      .style("opacity", 0.5)
      .attr("class","moveontouch")
      .attr("id", "mainCircle")
      .on("mouseover", jump);

  var catch_me = svg.append("text")
      .attr("x", currX-25)
      .attr("y", currY-10)
      .attr("dy", "0.35em")
      .attr("font-size","10px")
      .text("CATCH ME")
      .attr("fill","white")
      .attr("id", "catch")
      .attr("font-family", "Avenir");

  var if_you_can = svg.append("text")
      .attr("x", currX-30)
      .attr("y", currY+10)
      .attr("dy", "0.35em")
      .attr("font-size","10px")
      .text("IF YOU CAN")
      .attr("fill","white")
      .attr("id", "if")
      .attr("font-family", "Avenir");

  // d3plus.textwrap()
  //     .container(d3.select("#circleWrap"))
  //     .resize(true)
  //     .draw();

  // d3plus.textwrap()
  //     .container(d3.select('.wrap'))
  //     .resize(true)
  //     .draw();
};



// wrap(text);