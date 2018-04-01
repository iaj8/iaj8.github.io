window.onload = function() {

  if (document.body.clientWidth < 800){
    return;
  }

  function win(){
    alert("You outsmarted me!");
  }

  function jump() {
    console.log("JUMP");
    newX = Math.random()*width;
    newY = Math.random()*height;

    while(width - newX < 150 || newX < 150){
      newX = Math.random()*width;
    }

    while(height - newY < 100 || newY < 100){
      newY = Math.random()*height;
    }

    d3.select("#circleContainer")
      .style("top", newY+"px")
      .style("left", newX+"px");

  }

  var width =  document.body.clientWidth,
      height =  3.0*window.innerHeight/5.0,
      radius = 50,
      currX = Math.random()*width,
      currY = Math.random()*height;

  while(width - currX < 150 || currX < 150){
    currX = Math.random()*width;
  }

  while(height - currY < 100 || currY < 100){
    currY = Math.random()*height;
  }

  var svg = d3.select("body").append("svg")
      .attr("width", radius*3+"px")
      .attr("height", radius*3+"px")
      .attr("id", "circleContainer")
      .style("position", "fixed")
      .style("top", currY+"px")
      .style("left", currX+"px");

  var circle = svg.append("circle")
      .attr("cx", radius*1.5+"px")
      .attr("cy", radius*1.5+"px")
      .attr("r", radius+"px")
      .style("fill", "red")
      .style("opacity", 0.5)
      .attr("class","moveontouch")
      .attr("id", "mainCircle");

  var catch_me = svg.append("text")
      .attr("x", radius*1.5-25+"px")
      .attr("y", 70+"px")
      .attr("dy", "0.35em")
      .attr("font-size","10px")
      .text("CATCH ME")
      .attr("fill","white")
      .attr("id", "catch")
      .attr("font-family", "Avenir");

  var if_you_can = svg.append("text")
      .attr("x", radius*1.5-28+"px")
      .attr("y", 85+"px")
      .attr("dy", "0.35em")
      .attr("font-size","10px")
      .text("IF YOU CAN")
      .attr("fill","white")
      .attr("id", "if")
      .attr("font-family", "Avenir");

  var untouchableCircle = svg.append("circle")
        .attr("cx", radius*1.5+"px")
        .attr("cy", radius*1.5+"px")
        .attr("r", radius*1.3+"px")
        .style("opacity", 0.0)
        .attr("id", "untouchableCircle")
        .style("fill","orange")
        .on("mouseover", jump);

  var hiddenCircle = svg.append("circle")
      .attr("cx", radius*1.5+"px")
      .attr("cy", radius*1.5+"px")
      .attr("r", radius/2.2+"px")
      .style({"opacity": 0.0, "cursor": "pointer"})
      .attr("id", "hiddenCircle")
      .style("fill","green")
      .on("click", win);
};
