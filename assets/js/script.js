$(function() {

  if (query_id) {
    var univ_id = query_id[1];
    $univ = $(`a[data-univ-id='${query_id[1]}']`);

    loadFigures(univ_id, $univ);

    $('.slides section').wrap("<div class='pdf-page' style='height: 727px;'></div>");
    $('.reveal section.stack').unwrap();

  }
  
  var verticalSlide = 4;
  var univSelected = false;

  // Keyboard Controls

  var horizontalKeyboard = {
    78: 'right',  // n
    34: 'right',  // page down
    72: 'left',  // h
    37: 'left',  // left
    76: 'right',  // l
    39: 'right',  // right
    32: 'right',  // space
    80: 'left',  // p
    33: 'left',  // page up
  };

  var horizontalKeyboardDownDisabled = $.extend(true, {}, horizontalKeyboard, {40: null});
  var horizontalKeyboardDownEnabled = $.extend(true, {}, horizontalKeyboard, {40: 'down'});

  var verticalKeyboard = {
    78: 'down',  // n
    34: 'down',  // page down
    72: null,  // h
    37: null,  // left
    76: null,  // l
    39: null,  // right
    32: 'down',  // space
    80: 'up',  // p
    33: 'up',  // page up
    40: 'down'  // down
  };

  function handleVertical() {
    console.log('verticalKeyboard');
    Reveal.configure({
      keyboard: verticalKeyboard
    });
    $('.reveal .controls .navigate-down').css('display', 'inline-block');
  }
  
  function handleHorizontal() {
    console.log('horizontalKeyboardDownEnabled');
    Reveal.configure({
      keyboard: horizontalKeyboardDownEnabled
    });
    $('.reveal .controls .navigate-down').css('display', 'inline-block');
  }
  
  function handleHorizontalConditional() {
    console.log('horizontalKeyboardDownDisabled');
    Reveal.configure({
      keyboard: horizontalKeyboardDownDisabled
    });
    $('.reveal .controls .navigate-down').css('display', 'none');
  }

  // Updating Navigation
  
  if (!univSelected && Reveal.getState().indexh === verticalSlide) {  // no univ selected
    if (Reveal.getState().indexv > 0) {
      Reveal.slide(verticalSlide, 0);
    }
    handleHorizontalConditional();
  } else if (Reveal.getState().indexv > 0) {  // regular vertical slide
    handleVertical();
  } else {  // regular horizontal slide
    handleHorizontal();
  }

  Reveal.addEventListener('slide-vertical', function() {
    handleVertical();
  }, false);

  Reveal.addEventListener('slide-horizontal', function() {
    handleHorizontal();
  }, false);
  
  Reveal.addEventListener('slide-horizontal-conditional', function() {
    if (!univSelected) {
      handleHorizontalConditional();
    } else {
      handleHorizontal();
    }
  }, false);
  
  Reveal.addEventListener('slidechanged', function() {
    $('.modal').fadeOut();
    $('.graphs-set img').removeClass('disabled');
    $('table tr').removeClass('active-row');
    $('table td').removeClass('active-col');
    $('table th').removeClass('active-col');
  });

  // Univ Selection

  $('#univ_options a').on('click', function() {
    univSelected = true;
    
    var univ_id = $(this).data('univ-id');

    loadFigures(univ_id, $(this));

    Reveal.slide(verticalSlide, 1);
  });

  // Load Figures

  function loadFigures(univ_id, sel) {
    var univ_name = sel.data('univ-name'),
        state = sel.data('state-name'),
        metro1 = sel.data('metro1-name'),
        metro2 = sel.data('metro2-name'),
        metro3 = sel.data('metro3-name');

    $('.univ-result iframe').attr('src', '');
    $('.univ-result img').attr('src', '');
    setUnivID(univ_id, univ_name, state, metro1, metro2, metro3);

    $('#table-metro-count').empty();
    $.ajax({
      type: 'GET',
      url: 'assets/data/' + univ_id + '/table_metro_count.csv',
      dataType: 'text',
      success: function(data) { populateTable(data); }
    });
  }

  // Maps + Graphs

  function setUnivID(univ_id, univ_name, state, metro1, metro2, metro3) {
    $('.univ-name').html(univ_name);

    $('#graph-overview-1').attr('src', `assets/data/${univ_id}/map.png`);
    $('#graph-overview-2').attr('src', `assets/data/${univ_id}/visit_count.png`);
    $('#graph-overview-3').attr('src', `assets/data/${univ_id}/timeline.png`);
    $('#graph-overview-4').attr('src', `assets/data/${univ_id}/urban_rural.png`);

    $('#graph-instate').prev().html(state);
    $('#graph-instate-1').attr('src', `assets/data/${univ_id}/distribution_median_in.png`);
    $('#graph-instate-2').attr('src', `assets/data/${univ_id}/distribution_size_in.png`);
    $('#graph-instate-3').attr('src', `assets/data/${univ_id}/scatterplot_income_math_in.png`);
    $('#graph-instate-4').attr('src', `assets/data/${univ_id}/distribution_race_in.png`);
    $('#graph-instate-5').attr('src', `assets/data/${univ_id}/distribution_math_in.png`);
    $('#graph-instate-6').attr('src', `assets/data/${univ_id}/scatterplot_race_math_in.png`);

    $('#graph-metro1').prev().html(metro1);
    $('#graph-metro1-1').attr('src', `assets/data/${univ_id}/distribution_median_metro1.png`);
    $('#graph-metro1-2').attr('src', `assets/data/${univ_id}/distribution_size_metro1.png`);
    $('#graph-metro1-3').attr('src', `assets/data/${univ_id}/scatterplot_income_math_metro1.png`);
    $('#graph-metro1-4').attr('src', `assets/data/${univ_id}/distribution_race_metro1.png`);
    $('#graph-metro1-5').attr('src', `assets/data/${univ_id}/distribution_math_metro1.png`);
    $('#graph-metro1-6').attr('src', `assets/data/${univ_id}/scatterplot_race_math_metro1.png`);

    $('#graph-metro2').prev().html(metro2);
    $('#graph-metro2-1').attr('src', `assets/data/${univ_id}/distribution_median_metro2.png`);
    $('#graph-metro2-2').attr('src', `assets/data/${univ_id}/distribution_size_metro2.png`);
    $('#graph-metro2-3').attr('src', `assets/data/${univ_id}/scatterplot_income_math_metro2.png`);
    $('#graph-metro2-4').attr('src', `assets/data/${univ_id}/distribution_race_metro2.png`);
    $('#graph-metro2-5').attr('src', `assets/data/${univ_id}/distribution_math_metro2.png`);
    $('#graph-metro2-6').attr('src', `assets/data/${univ_id}/scatterplot_race_math_metro2.png`);

    $('#graph-metro3').prev().html(metro3);
    $('#graph-metro3-1').attr('src', `assets/data/${univ_id}/distribution_median_metro3.png`);
    $('#graph-metro3-2').attr('src', `assets/data/${univ_id}/distribution_size_metro3.png`);
    $('#graph-metro3-3').attr('src', `assets/data/${univ_id}/scatterplot_income_math_metro3.png`);
    $('#graph-metro3-4').attr('src', `assets/data/${univ_id}/distribution_race_metro3.png`);
    $('#graph-metro3-5').attr('src', `assets/data/${univ_id}/distribution_math_metro3.png`);
    $('#graph-metro3-6').attr('src', `assets/data/${univ_id}/scatterplot_race_math_metro3.png`);

    $('#graph-outofstate-1').attr('src', `assets/data/${univ_id}/median_income.png`);
    $('#graph-outofstate-2').attr('src', `assets/data/${univ_id}/race_pub_out.png`);
    $('#graph-outofstate-3').attr('src', `assets/data/${univ_id}/size_out.png`);
    $('#graph-outofstate-4').attr('src', `assets/data/${univ_id}/race_priv_out.png`);

    $('#map-state-in').prev().html(state);
    $('#map-state-in').attr('src', `assets/data/${univ_id}/map-state-in.html`);

    $('#map-metro-in').prev().html(metro1);
    $('#map-metro-in').attr('src', `assets/data/${univ_id}/map-metro-in.html`);

    $('#map-metro-out-1').prev().html(metro2);
    $('#map-metro-out-1').attr('src', `assets/data/${univ_id}/map-metro-out-1.html`);

    $('#map-metro-out-2').prev().html(metro3);
    $('#map-metro-out-2').attr('src', `assets/data/${univ_id}/map-metro-out-2.html`);
  }

  // Graph Modal

  $('.reveal .slide .graphs-set img').on('click', function() {
    var src = $(this).attr('src'),
        title = $(this).data('title'),
        caption = $(this).data('caption');

    var $slide = $(this).closest('.slide');

    $slide.find('.modal img').attr('src', src);
    $slide.find('.modal h3')[0].innerHTML = title ? title : '';
    $slide.find('.modal p')[0].innerHTML = caption ? caption : '';

    $(this).closest('.slide').find('.modal').fadeIn();
    $(this).closest('.slide').find('.graphs-set img').addClass('disabled');
  });

  $('.close').on('click', function() {
    $(this).closest('.slide').find('.modal').fadeOut();
    $(this).closest('.slide').find('.graphs-set img').removeClass('disabled');
  });

  // Metro Table

  function populateTable(data) {
    var result = $.csv.toObjects(data);
    var table = document.getElementById('table-metro-count');

    function addCell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }

    //var headerRow = table.insertRow();
    var thead = table.createTHead();
    var headerRow = thead.insertRow();
    addCell(headerRow, 'Metro Area');
    addCell(headerRow, 'State');
    addCell(headerRow, 'Total Visits');
    addCell(headerRow, 'Public HS');
    addCell(headerRow, 'Private HS');
    addCell(headerRow, 'Cmty Coll');
    addCell(headerRow, 'Other');

    var tbody = table.createTBody();
    result.slice(0, 10).forEach(function(item) {
        var row = tbody.insertRow();
        addCell(row, item.metro_name);
        addCell(row, item.state_code);
        addCell(row, item.total_count);
        addCell(row, item.pubHS_count);
        addCell(row, item.privHS_count);
        addCell(row, item.cc_count);
        addCell(row, item.other_count);
    });
  }

  $('.scroll-wrapper td:nth-of-type(1):not(.blank)').click(function() {
    $('.scroll-wrapper tr').removeClass('active-row');
    $(this).parent().addClass('active-row');

    $('.scroll-wrapper td').removeClass('active-col');
    $('.scroll-wrapper th').removeClass('active-col');
  });

  $('.scroll-wrapper td:nth-of-type(1) ~ td:not(.blank)').click(function() {
    $('.scroll-wrapper tr').removeClass('active-row');
    $(this).parent().addClass('active-row');

    var t = parseInt($(this).index()) + 1;
    $('.scroll-wrapper td').removeClass('active-col');
    $('.scroll-wrapper th').removeClass('active-col');
    $(this).closest('table').find('td:nth-child(' + t + ')').addClass('active-col');
    $(this).closest('table').find('thead tr:last-child th:nth-child(' + t + ')').addClass('active-col');
  });

  $('.scroll-wrapper tr:last-child th:nth-of-type(1) ~ th:not(.blank)').click(function() {
    $('.scroll-wrapper tr').removeClass('active-row');

    var t = parseInt($(this).index()) + 1;
    $('.scroll-wrapper td').removeClass('active-col');
    $('.scroll-wrapper th').removeClass('active-col');
    $(this).closest('table').find('td:nth-child(' + t + ')').addClass('active-col');
    $(this).closest('table').find('thead tr:last-child th:nth-child(' + t + ')').addClass('active-col');
  });

  $('.scroll-wrapper .blank').click(function() {
    if (!$(this).hasClass('active-col') && !$(this).parent().hasClass('active-row')) {
      $('.scroll-wrapper tr').removeClass('active-row');
      $('.scroll-wrapper td').removeClass('active-col');
      $('.scroll-wrapper th').removeClass('active-col');
    }
  });

});
