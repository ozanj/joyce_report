$(function() {

  if (query_id) {
    var univ_id = query_id[1];
    $univ = $(`a[data-univ-id='${query_id[1]}']`);

    loadFigures(univ_id, $univ);

    $('.slides section').wrap("<div class='pdf-page' style='height: 727px;'></div>");
    $('.reveal section.stack').unwrap();

  }

  // Keyboard Controls
  
  function handleRight() {
    Reveal.getState().indexh === verticalSlide - 1 ? Reveal.slide(verticalSlide, 0) : Reveal.right();
  }
  
  function handleLeft() {
    Reveal.getState().indexh === verticalSlide + 1 ? Reveal.slide(verticalSlide, 0) : Reveal.left();
  }

  var horizontalKeyboard = {
    78: handleRight,  // n
    34: handleRight,  // page down
    72: handleLeft,  // h
    37: handleLeft,  // left
    76: handleRight,  // l
    39: handleRight,  // right
    32: handleRight,  // space
    80: handleLeft,  // p
    33: handleLeft,  // page up
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
    if ($('iframe[src]').length) {  // univ selected
      Reveal.configure({
        keyboard: verticalKeyboard
      });
      $('.reveal .controls .navigate-down').css('display', 'inline-block');
    } else {
      Reveal.configure({
        keyboard: horizontalKeyboardDownDisabled
      });
      $('.slide-horizontal .reveal .controls .navigate-down').css('display', 'none');
      Reveal.slide(verticalSlide, 0);
    }
  }

  function handleHorizontal() {
    if ($('iframe[src]').length) {  // univ selected
      Reveal.configure({
        keyboard: horizontalKeyboardDownEnabled
      });
      $('.reveal .controls .navigate-down').css('display', 'inline-block');
    } else {
      Reveal.configure({
        keyboard: horizontalKeyboardDownDisabled
      });
      $('.slide-horizontal .reveal .controls .navigate-down').css('display', 'none');
    }
  }

  Reveal.addEventListener('ready', function(e) {
    if ($(e.currentSlide).hasClass('vertical')) {
      handleVertical();
    } else { // horizontal slide
      handleHorizontal();
    }
  });

  Reveal.addEventListener('slide-vertical', function() {
    handleVertical();
  }, false );

  Reveal.addEventListener('slide-horizontal', function() {
    handleHorizontal();
  }, false );
  
  Reveal.addEventListener( 'slidechanged', function() {
    $('.modal').fadeOut();
    $('.graphs-set img').removeClass('disabled');
    $('table tr').removeClass('active-row');
    $('table tr').removeClass('active-row-2');
    $('table td').removeClass('active-col');
    $('table th').removeClass('active-col');
  });

  // Univ Selection

  $('#univ_options a').on('click', function() {
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

    $('.vertical iframe').attr('src', '');
    $('.vertical img').attr('src', '');
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
    $('#graph-outofstate-3').attr('src', `assets/data/${univ_id}/distribution_size_pub_priv_out.png`);
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

  var headingShown = true;

  $('.desc-table').scroll(function() {
    var $cc = $(this).find('#h2');
    if ($cc.length) {
      var window_offset = $cc.offset().top - $(this).scrollTop();
      if (window_offset < -360 && headingShown) {
        $(this).find('#h1').fadeOut(200);
        headingShown = false;
      } else if (window_offset > -330 && !headingShown) {
        $(this).find('#h1').fadeIn(200);
        headingShown = true;
      }
    }
  });

  $('.desc-table td').click(function () {
    if ($(this).text().trim() !== '' && !$(this).parent().find('strong').length) {
      $('.comparison-wrapper table tr').removeClass('active-row');
      $(this).parent().addClass('active-row');
    }
  });

  $('.reg-wrapper table tr').click(function () {
    if ($(this).text().trim() !== '' && !$(this).find('strong').length) {
      $('.comparison-wrapper table tr').removeClass('active-row');
      $(this).addClass('active-row');
    }
  });

  $('.comparison-wrapper table td').click(function() {
    if ($(this).text().trim() !== '' && parseInt($(this).index()) !== 0) {
      var t = parseInt($(this).index()) + 1;
      $('.comparison-wrapper table td').removeClass('active-col');
      $('.comparison-wrapper table thead tr:last-child th').removeClass('active-col');
      $(this).closest('table').find('td:nth-child(' + t + ')').addClass('active-col');
      $(this).closest('table').find('thead tr:last-child th:nth-child(' + t + ')').addClass('active-col');
    }
  });

  $('.reg-wrapper table td').click(function() {
    if ($(this).parent().text().trim() !== '' && !$(this).parent().find('strong').length) {
      $('.reg-wrapper table tr').removeClass('active-row-2');
      var t = parseInt($(this).index()) + 1,
          row = $(this).parent();
      var $prevCell = row.prev().find('td:nth-child(' + t + ')');
      if ($prevCell.length && $prevCell.parent().text().trim() != '' && !$prevCell.parent().find('strong').length) {
        row.prev().addClass('active-row-2');
      }
      var $nextCell = row.next().find('td:nth-child(' + t + ')');
      if ($nextCell.length && $nextCell.parent().text().trim() != '' && !$nextCell.parent().find('strong').length) {
        row.next().addClass('active-row-2');
      }
    }
  });

  //$('td').hover(function() {
  //  var t = parseInt($(this).index()) + 1;
  //  $('td:nth-child(' + t + ')').addClass('highlighted');
  //},
  //function() {
  //  var t = parseInt($(this).index()) + 1;
  //  $('td:nth-child(' + t + ')').removeClass('highlighted');
  //});

});
