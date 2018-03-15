var popup_up = false;

function open_popup(mimic_object, link){
  // console.log(mimic_object.left, mimic_object.top, mimic_object.outerHeight(), mimic_object.width());
  var $mimic_object = $(mimic_object);
  var initial_top = $mimic_object.position().top;
  var initial_left = $mimic_object.position().left;
  var initial_height = $mimic_object.outerHeight();
  var initial_width = $mimic_object.width();

	popup_html = '<div class="click_to_close"><iframe class="popup_iframe" src="' + link + '"></iframe></div>';
	$(".work_section_clicked").html(popup_html);
	$(".work_section_clicked:hidden").fadeIn("fast");
  $(".click_to_close")
    .css({
      'height': initial_height,
      'width': initial_width,
      'top': initial_top,
      'left': initial_left
    })
    .on("click", close_popup);

  transition_popup();

	var svg_width = 120;
	var svg_height = 120;
	var svg_left = $('.work_section_clicked').position().left + 0.95*document.body.clientWidth;
	var svg_top = $('.work_section_clicked').position().top;
	var x = 15;
	var y = 15;
	var radius = 15;

	var svg = d3.select("body").append("svg")
			.attr("width", svg_width+"px")
			.attr("height", svg_height+"px")
			.style("position", "fixed")
			.style("top", svg_top+"px")
			.style("left", svg_left+"px")
			.style("z-index", 3);
      // .style('background-color', 'blue');

	var close_circle = svg.append("circle")
			.attr("cx", x+"px")
			.attr("cy", y+"px")
			.attr("r", radius+"px")
			.style("fill", "grey")
			.style("opacity", 0.7)
      .on("mouseover", function(){
        close_circle.style("fill", "red");
      })
      .on("mouseout", function(){
        close_circle.style("fill", "grey");
      })
			.on("click", close_popup);

	var close = svg.append("path")
			.attr("d", "M 10,10 L 20,20 M 20,10 L 10,20")
			.style("fill","transparent")
			.style("stroke", "white")
			.style("stroke-linecap", "round")
			.style("stroke-width", "3px")
			.style("opacity", 0.9)
      .on("mouseover", function(){
        close_circle.style("fill", "red");
      })
      .on("mouseout", function(){
        close_circle.style("fill", "grey");
      })
			.on("click", close_popup);


  var open_in_new_tab_circle = svg.append("circle")
			.attr("cx", x+"px")
			.attr("cy", y+radius*2.5+"px")
			.attr("r", radius+"px")
			.style("fill", "grey")
			.style("opacity", 0.7)
      .on("mouseover", function(){
        open_in_new_tab_circle.style("fill", "green");
      })
      .on("mouseout", function(){
        open_in_new_tab_circle.style("fill", "grey");
      })
			.on("click", function(){
        open_in_new_tab_and_close_popup(link);
      });

	var open_in_new_tab = svg.append("path")
			.attr("d", "M473.562,227.063L407.5,161L262.75,305.75c-25,25-49.563,41-74.5,16c-25-25-9-49.5,16-74.5L349,102.5 l-65.062-65.094c-14.188-14.188-2-37.906,19-37.906h170.625C494.5-0.5,511.5,16.469,511.5,37.406v170.688 C511.5,229.031,487.812,241.281,473.562,227.063z M63.5,447.5h320V259.312l64,64V447.5c0,35.375-28.625,64-64,64h-320 c-35.375,0-64-28.625-64-64v-320c0-35.344,28.625-64,64-64h124.188l64,64H63.5V447.5z")
      .style("position","absolute")
      .style("transform","translate(8px, 45px) scale(0.03)")
      .style("-webkit-transform","translate(8px, 45px) scale(0.03)")
      .style("-moz-transform","translate(8px, 45px) scale(0.03)")
      .style("-ms-transform","translate(8px, 45px) scale(0.03)")
      .style("-o-transform","translate(8px, 45px) scale(0.03)")
			.style("stroke", "white")
      .style("fill", "white")
			.style("stroke-linecap", "round")
			.style("stroke-width", "20px")
			.style("opacity", 0.9)
      .on("mouseover", function(){
        open_in_new_tab_circle.style("fill", "green");
      })
      .on("mouseout", function(){
        open_in_new_tab_circle.style("fill", "grey");
      })
      .on("click", function(){
        open_in_new_tab_and_close_popup(link);
      });

var download_circle;
var download_arrow;
var download_holder;

if (link.includes(".pdf")){
  download_circle = svg.append("circle")
      .attr("cx", x+"px")
      .attr("cy", y+radius*5+"px")
      .attr("r", radius+"px")
      .style("fill", "grey")
      .style("opacity", 0.7)
      .on("mouseover", function(){
        download_circle.style("fill", "#f9c62a");
      })
      .on("mouseout", function(){
        download_circle.style("fill", "grey");
      })
      .on("click", function(){
        download(link);
      });

  download_arrow = svg.append("path")
      .attr("d", "M150,211.67l47.94-60.54h-36v-110a12,12,0,0,0-12-12h0a12,12,0,0,0-12.38,11.53q0,.22,0,.43V150.81H102Z")
      .style("transform","translate(6px, 80px) scale(0.06)")
      .style("-webkit-transform","translate(6px, 80px) scale(0.06)")
      .style("-moz-transform","translate(6px, 80px) scale(0.06)")
      .style("-ms-transform","translate(6px, 80px) scale(0.06)")
      .style("-o-transform","translate(6px, 80px) scale(0.06)")
      .style("stroke", "white")
      .style("fill", "white")
      .style("stroke-linecap", "round")
      .style("stroke-width", 30+"px")
      .style("opacity", 0.9)
      .on("mouseover", function(){
        download_circle.style("fill", "#f9c62a");
      })
      .on("mouseout", function(){
        download_circle.style("fill", "grey");
      })
      .on("click", function(){
        download(link);
      });


  download_holder = svg.append("path")
      .attr("d", "M246.59,271.57H54.82a24,24,0,0,1-23.07-24.66V197.17a7.94,7.94,0,0,1,15.88,0v49.74a8.15,8.15,0,0,0,7.3,8.89H246.59a8.15,8.15,0,0,0,7.3-8.89V197.17a7.94,7.94,0,0,1,15.87,0v49.74A24,24,0,0,1,246.59,271.57Z")
      .style("transform","translate(6px, 80px) scale(0.06)")
      .style("-webkit-transform","translate(6px, 80px) scale(0.06)")
      .style("-moz-transform","translate(6px, 80px) scale(0.06)")
      .style("-ms-transform","translate(6px, 80px) scale(0.06)")
      .style("-o-transform","translate(6px, 80px) scale(0.06)")
      .style("stroke", "white")
      .style("fill", "white")
      .style("stroke-linecap", "round")
      .style("stroke-width", 30)
      .style("opacity", 0.9)
      .on("mouseover", function(){
        download_circle.style("fill", "#f9c62a");
      })
      .on("mouseout", function(){
        download_circle.style("fill", "grey");
      })
      .on("click", function(){
        download(link);
      });

}

  popup_up = true;
}

function close_popup(){
	$(".work_section_clicked").css("display", "none");
	d3.selectAll("svg").remove();
  popup_up = false;
}

function open_in_new_tab_and_close_popup(link){
  close_popup();
  var win = window.open(link, '_blank');
  win.focus();
}

function transition_popup(){
  $(".click_to_close").css({
      'height': '100%',
      'width': '100%',
      'top': '0',
      'left': '0'
    });
}

function download(link){
  var link_element = document.createElement("a");
  link_element.download = link.substring(link.lastIndexOf("/")+1);
  link_element.href = link;
  link_element.click();
}

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        close_popup();
    }
});