$(document).ready(function() {
  //add nav header
  $(".header_container").load("/header.html", function() {
    $("#writing_link").addClass("current_page");
  });

  function elemClearlyVisible(elem, downScroll) {
    var docViewTop = $(window).scrollTop();
    var docViewMiddle = docViewTop + $(window).height()/2;

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    if (downScroll) return ((elemTop <= docViewMiddle) && (elemTop >= docViewTop));
    else return ((elemBottom <= docViewMiddle) && (elemBottom >= docViewTop));
  }

  function updateCurrentHighlightedSubsection(subsection) {
    elemToRemoveHighlight = $(getLinkIdFromSubsectionId(subsections[currentHighlightedSubsection]));
    elemToRemoveHighlight.removeClass("current_subsection");
    currentHighlightedSubsection = subsection;
    elemToHighlight = $(getLinkIdFromSubsectionId(subsections[currentHighlightedSubsection]));
    elemToHighlight.addClass("current_subsection");
  }

  function getLinkIdFromSubsectionId(subsection_id){
    return subsection_id + '_link';
  }

  function configureSmoothScrolling(){
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - ($('.header').outerHeight() - 1)
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            // $target.focus();
            //TODO: Push state to URL
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              // $target.focus(); // Set focus again
            }
          });
        }
      }
    });
  }

  function mod(m, n){
    /**
    Returns m mod n
    **/
    return ((m % n) + n) % n;
  }

  var links = ['JOURNALISTIC', 'SENIOR THESIS', 'UNDERGRADUATE ESSAYS', 'CREATIVE',
  'TRAVEL'];
  var links_html = '<ul class="vertical-list">';
  var subsections = [];
  for (var i = 0; i < links.length; i++) {
    text = links[i];
    href = '#'+text.replace(/\ +/g, '_').toLowerCase();
    id = text.replace(/\ +/g, '_').toLowerCase() + '_link';
    links_html += '<li><a id=' + id + ' href=' + href + '>' + text + '</a></li>';
    subsections.push(href);
  }
  links_html += '</ul>';
  $('#writingSideNav').html(links_html);

  var currentHighlightedSubsection = 0;
  updateCurrentHighlightedSubsection(0);

  $(document).scroll(function() {
    x = $(document).width()/2;
    y = $(".header").outerHeight();
    elem_id = '#' + $(document.elementFromPoint(x, y)).attr('id');
    elem_id = elem_id.replace(/[0-9]+/i,""); //get rid of trailing numbers
    elem_id = elem_id.replace(/_title/i,""); //get rid of _title
    elem_id = elem_id.replace(/_separator/i,""); //get rid of _separator
    elem_idx = $.inArray(elem_id, subsections);
    if (elem_idx != -1){
      updateCurrentHighlightedSubsection(elem_idx);
    }
  });



  configureSmoothScrolling();

  function displayProjects(project, i, category, i_limit){
    var raw_category = category.slice(1);
    var img_width = document.body.clientWidth/2;
    var project_html;
    var link = project.link;
    var section_id = raw_category + i;
    if (link !== undefined) {
      project_html = '<br> <div class="tech_section_link tech_section" id=' + section_id + '>';
    } else {
      project_html = '<br> <div class="tech_section" id=' + section_id + '>';
    }

    project_html += '<div class="project_thumbnail_container"><img class="project_thumbnail" src=' + project.image + '>';
    if (project.image_citation !== undefined) {
      project_html += '<br> <p class="image_citation"><i>' + project.image_citation + '</i></p>';
    }
    project_html += '</div>'
    project_html += '<div class="project_details">';
    project_html += '<p class="project_title"> <b>' + project.title + '</b></p>';
    project_html += '<p class="project_date">' + project.date + '</p>';
    project_html += '<p class="project_description"><i>' + project.description + '</i></p>';
    project_html += '</div> </div> <br>';
    if (i < i_limit) project_html += '<hr class="between_story" />';
    $(category).append(project_html);

    if (document.body.clientWidth >= 600) {
      if (link !== undefined) {
        $('#'+section_id).click(function(){
          open_popup(this, link);
        });
      }
    } else {
      if (link !== undefined) {
        $('#'+section_id).click(function(){
          open_in_new_tab(link);
        });
      }
    }
  }

  $.getJSON("/writing/writing.json", function(data) {
    for (var i = 0; i < subsections.length; i++) {
      subsection = subsections[i].slice(1);
      data[subsection].forEach(function(project, j){
        displayProjects(project, j, subsections[i], data[subsection].length - 1);
      });
    }
  });
});
