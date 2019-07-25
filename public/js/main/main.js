//IE10 Viewport hack
(function () {
  'use strict'
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    )
    document.head.appendChild(msViewportStyle)
  }
}());

//Outdated Browsers
$(function () {
  outdatedBrowser({
    bgColor: '#f25648',
    color: '#ffffff',
    lowerThan: 'transform' //IE10
  });
});

//Select Picker
$(function () {
  $('.selectpicker').selectpicker();
});

//Popover
$(function () {
  $('[data-toggle="popover"]').popover({
    html: true,
  });
  $('body').on('click', '.popover-close', function () {
    $(this).closest('.popover').popover('hide');
  });
});

//Popover workflow
$(function () {
  $('[data-popover="popover"]').popover({
    html: true,
    trigger: 'manual',
    container: '.hl_workflow--main',
    placement: 'top'
  })
    .on("mouseenter", function () {
      var _this = this;
      $(this).popover("show");
      $(".popover").on("mouseleave", function () {
        $(_this).popover('hide');
      });
    }).on("mouseleave", function () {
      var _this = this;
      setTimeout(function () {
        if (!$(".popover:hover").length) {
          $(_this).popover("hide");
        }
      }, 200);
    });
});

//Tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
$(function () {
  $('[data-tooltip="tooltip"]').tooltip({
    trigger: 'hover',
  });
});

//Nav Tooltip
$(function () {
  $('[data-tooltip="nav-tooltip"]').tooltip({
    container: '.hl_navbar'
  });
});

//Tooltip 2
$(function () {
  $(document).tooltip({
    selector: '.workflow-action'
  });
});

//Nav toggle button
$(function () {
  $('#navbar-toggler').on('click', function (event) {
    event.preventDefault();
    $(this).toggleClass('active');
    $('#navbar-collapse').slideToggle(300);
  });
});

//Nav Active
$(function () {
  var $pageID = $('.hl_wrapper--inner').attr('id');
  //console.log($pageID);
  $('#nav-links').find('#nav-' + $pageID).addClass('active').siblings('li').removeClass('active');
});


//Recent Activities
$(function () {
  $('#recent_activities-toggle').on('click', function (e) {
    e.preventDefault();
    $('.hl_recent-activities').toggleClass('--open');
  });
});


//Reviews Filter
$(function () {
  $('#hl_reviews--filter-btn').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('--open');
    if ($(this).hasClass('--open')) {
      $(this).find('.icon').removeClass('icon-settings-2').addClass('icon-close');
    } else {
      $(this).find('.icon').removeClass('icon-close').addClass('icon-settings-2');
    }
    $('#hl_reviews--filter-group').toggleClass('--open');
    $('#hl_reviews--filter').toggleClass('--open');
  });
});


//RWD Table
$(function () {
  $(".table-wrap").each(function () {
    var nmtTable = $(this);
    var nmtHeadRow = nmtTable.find("thead tr");
    nmtTable.find("tbody tr").each(function () {
      var curRow = $(this);
      for (var i = 0; i < curRow.find("td").length; i++) {
        var rowSelector = "td:eq(" + i + ")";
        var headSelector = "th:eq(" + i + ")";
        curRow.find(rowSelector).attr('data-title', nmtHeadRow.find(headSelector).text());
      }
    });
  });
});

//Table Sorting
$(function () {
  $(".table-sort").stupidtable();
});

//Sentiment Graph
$(function () {
  var $positiveReview = $('#sentiment_positive-review').find('.percentage');
  var $positiveReviewData = $('#sentiment_positive-review').find('.percentage').data('percentage');
  var $negativeReview = $('#sentiment_negative-review').find('.percentage');
  var $negativeReviewData = $('#sentiment_negative-review').find('.percentage').data('percentage');
  function getHeight(percentage) {
    return (100 - percentage);
  }
  $positiveReview.css('height', getHeight($positiveReviewData) + '%');
  $negativeReview.css('height', getHeight($negativeReviewData) + '%');
});

//Semi-Circle Progress
$(function () {
  $(".semi-progress").each(function () {
    var $bar = $(this).find(".bar");
    var $val = $(this).data('progress');
    var perc = parseInt($val, 10);
    $({ p: 0 }).animate({ p: perc }, {
      duration: 0,
      easing: "swing",
      step: function (p) {
        $bar.css({
          transform: "rotate(" + (45 + (p * 1.8)) + "deg)"
        });
      }
    });
  });
});

//Reviews Comment Collapse
$(function () {
  $('.respond-toggle').on('click', function () {
    $(this).toggleClass('active');
    $(this).closest('.hl_reviews--item').toggleClass('comment-active');
  });
});

//Object fit images
$(function () {
  objectFitImages();
});

//
$(function () {
  if ($('.hl_wrapper--inner').is("#settings")) {
    $('.hl_header').addClass('--no-shadow');
    $('.hl_recent-activities').addClass('--settings');
  }
});

//
$(function () {
  $('.hl_settings--sms-color .option label').on('click', function () {
    var $this = $(this);
    var $input = $this.siblings('input');
    if ($input.is(':checked')) {
      $this.closest('.box').removeClass('active');
    } else {
      $this.closest('.box').addClass('active');
    }
  });
});

//Location Filter
$(function () {
  $('#hl_location--filter-btn').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('--open');
    if ($(this).hasClass('--open')) {
      $(this).find('.icon').removeClass('icon-settings-2').addClass('icon-close');
    } else {
      $(this).find('.icon').removeClass('icon-close').addClass('icon-settings-2');
    }
    $('#hl_location--filter-group').toggleClass('--open');
    $('#hl_location--filter').toggleClass('--open');
  });
});

//Map Search
$(function () {
  $('#map-search').on('keyup keydown', function (e) {
    e.stopPropagation();
    if ($(this).val() != '') {
      $(this).addClass('active');
      $(this).siblings('.dropdown').addClass('show');
      $(this).siblings('.dropdown').find('.dropdown-menu').addClass('show');
    } else {
      $(this).removeClass('active');
      $(this).siblings('.dropdown').removeClass('show');
      $(this).siblings('.dropdown').find('.dropdown-menu').removeClass('show');
    }
  });
});

//Account
$(function () {
  if ($('.hl_wrapper--inner').hasClass('hl_agency')) {
    $('.hl_header').addClass('--agency');
  }
});

//Filter Dropdown
$(function () {
  $(document).on('click', '#messages-filter-dropdown .dropdown-menu', function (e) {
    e.stopPropagation();
  });
});

//Files view
$(function () {
  $('.files-heading-action a').on('click', function () {
    $(this).addClass('active').siblings('a').removeClass('active');
  });
  $('#files-list').on('click', function (e) {
    e.preventDefault();
    $('.files-group').addClass('--list');
  });
  $('#files-tiles').on('click', function (e) {
    e.preventDefault();
    $('.files-group').removeClass('--list');
  });
});

//New Chat Customer
$(function () {
  $('#new-chat-customer').on('keyup keydown', function (e) {
    e.stopPropagation();
    if ($(this).val() != '') {
      $(this).addClass('active');
      $(this).siblings('.dropdown').addClass('show');
      $(this).siblings('.dropdown').find('.dropdown-menu').addClass('show');
    } else {
      $(this).removeClass('active');
      $(this).siblings('.dropdown').removeClass('show');
      $(this).siblings('.dropdown').find('.dropdown-menu').removeClass('show');
    }
  });
});

$(function () {
  // Show the dropzone when dragging files (not folders or page
  // elements). The dropzone is hidden after a timer to prevent 
  // flickering to occur as `dragleave` is fired constantly.
  var dragTimer;
  $(document).on('dragover', '#messages-group', function (e) {
    var dt = e.originalEvent.dataTransfer;
    if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('Files'))) {
      $("#messages-group").addClass('drag-active');
      window.clearTimeout(dragTimer);
    }
  });
  $(document).on('dragleave', '#messages-group', function (e) {
    dragTimer = window.setTimeout(function () {
      $("#messages-group").removeClass('drag-active');
    }, 25);
  });

  var dragTimer2;
  $(document).on('dragover', '#message-box', function (e) {
    var dt = e.originalEvent.dataTransfer;
    if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('Files'))) {
      $("#message-box").addClass('drag-active');
      window.clearTimeout(dragTimer2);
    }
  });
  $(document).on('dragleave', '#message-box', function (e) {
    dragTimer2 = window.setTimeout(function () {
      $("#message-box").removeClass('drag-active');
    }, 25);
  });
});

//Popover
$(function () {
  // $('[data-toggle="popover"]').popover({
  //   html: true,
  // });
  $('body').on('click', '.popover-close', function () {
    $(this).closest('.popover').popover('hide');
  });
});

//
$(function () {
  $('.reputation-nav-toggle').on('click', function () {
    if ($('.reputation-nav-toggle').find('#reputation-nav-toggle').hasClass('collapsed')) {
      $('.reputation-nav-toggle').addClass('open');
    } else {
      $('.reputation-nav-toggle').removeClass('open');
    }
  });
});

//card layout change
$(function () {
  $('.hl_screen-select-item').on('change', function () {
    var $this = $(this);
    var $id = $this.find('input').attr('id');
    var $preview = $('#hl_visual-preview');
    if ($id == 'hl_phone') {
      $preview.attr({
        'width': '375px',
        'height': '700px'
      });
    } else if ($id == 'hl_table') {
      $preview.attr({
        'width': '768px',
        'height': '550px'
      });
    } else if ($id == 'hl_desktop') {
      $preview.attr({
        'width': '100%',
        'height': '500px'
      });
    }
  });
});

$(function () {
  $('.card-campaign-activity .dropdown-menu').click(function (e) {
    e.stopPropagation();
  });
});

$(function () {
  $('.form-group.with-dropdown').find('.form-control').on('keyup keydown', function (e) {
    e.stopPropagation();
    if ($(this).val() != '') {
      $(this).siblings('.dropdown').addClass('show');
      $(this).siblings('.dropdown').find('.dropdown-menu').addClass('show');
    } else {
      $(this).siblings('.dropdown').removeClass('show');
      $(this).siblings('.dropdown').find('.dropdown-menu').removeClass('show');
    }
  });
});

//
$(function () {
  $('.open-email-tab').on('shown.bs.tab', function (e) {
    $('.hl_contact-messages').find('.card-body').addClass('email-box-active');
    $('.hl_conversations--message-body').find('.messages-group').addClass('email-box-active');
  });
  $('.open-sms-tab').on('shown.bs.tab', function (e) {
    $('.hl_contact-messages').find('.card-body').removeClass('email-box-active');
    $('.hl_conversations--message-body').find('.messages-group').removeClass('email-box-active');
  })
});

//
$(function () {
  $('#hide-sidebar').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.hl_workflow--sidebar').toggleClass('hide');
    $('.hl_wrapper--inner.workflow').toggleClass('sidebar-hide');
    $('.hl_workflow--main').toggleClass('sidebar-hide');
  });
});


// $(function () {
//   $('.form-input-group-item').find('.form-control').on('keyup keydown', function (e) {
//     e.stopPropagation();
//     if ($(this).val() != '') {
//       $(this).siblings('.dropdown-menu').addClass('show');
//     } else {
//       $(this).siblings('.dropdown-menu').removeClass('show');
//     }
//   });
//   $('.form-input-group-item').find('.form-control').on('click', function (e) {
//     e.stopPropagation();
//     $(this).siblings('.dropdown-menu').addClass('show');
//   });
// });

//
$(function () {
  $('#automation-list li').on('click', function () {
    $(this).addClass('active').siblings('li').removeClass('active');
  });

  $('#automation-list .favorite').on('click', function () {
    $(this).toggleClass('active');
  });

  // Configure/customize these variables.
  var showChar = 150; // How many characters are shown by default
  var ellipsestext = "...";
  var moretext = "Read more";
  var lesstext = "Read less";

  $("#automation-list p:not(.category)").each(function () {
    var content = $(this).html();

    if (content.length > showChar) {
      var c = content.substr(0, showChar);
      var h = content.substr(showChar, content.length - showChar);

      var html =
        c +
        '<span class="moreellipses">' +
        ellipsestext +
        '&nbsp;</span><span class="morecontent"><span>' +
        h +
        '</span>&nbsp;&nbsp;<a href="" class="morelink">' +
        moretext +
        "</a></span>";

      $(this).html(html);
    }
  });

  $(".morelink").click(function () {
    if ($(this).hasClass("less")) {
      $(this).removeClass("less");
      $(this).html(moretext);
      $(this).prev().css('display', 'none');
    } else {
      $(this).addClass("less");
      $(this).html(lesstext);
      $(this).prev().css('display', 'inline');
    }
    $(this)
      .parent()
      .prev()
      .toggle();
    return false;
  });

});

//toogle add task tab
$(function () {
  $('#add-tasks-tab').on('show.bs.tab', function (e) {
    $('.hl_contact-details-right-tabs-bottom, .hl_contact-details-right-tabs').addClass('expand');
  });
  $('#add-tasks-tab').on('hide.bs.tab', function (e) {
    $('.hl_contact-details-right-tabs-bottom, .hl_contact-details-right-tabs').removeClass('expand');
  });
});


//Phone Dropdown
$(function () {
  $(document).on('click', '.hl_header--phone .dropdown-menu', function (e) {
    e.stopPropagation();
  });
});

//Page Creator Settings Group
$(function () {
  //mobile
  $('#page-creator-mobile').on('click', function() {
    $('.hl_page-creator--content').addClass('--mobile');
  });
  $('#page-creator-desktop').on('click', function () {
    $('.hl_page-creator--content').removeClass('--mobile');
  });

  //Section
  $('.hl_page-creator--section').on('mouseenter', function() {
    $(this).addClass('active');
  });
  $('.hl_page-creator--section').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  //Row
  $('.hl_page-creator--row').on('mouseenter', function () {
    $(this).addClass('active');
    $(this).parent('.hl_page-creator--section').removeClass('active');
  });
  $('.hl_page-creator--row').on('mouseleave', function () {
    $(this).removeClass('active');
    $(this).parent('.hl_page-creator--section').addClass('active');
  });
  //Element
  $('.hl_page-creator--element').on('mouseenter', function () {
    $(this).addClass('active');
    $(this).parents('.hl_page-creator--row').removeClass('active');
  });
  $('.hl_page-creator--element').on('mouseleave', function () {
    $(this).removeClass('active');
    $(this).parents('.hl_page-creator--row').addClass('active');
  });

  //settings
  $('#close-settings-group').on('click', function () {
    $('#page-creator').removeClass('--menu-active');
    $('.hl_page-creator--settings-group').removeClass('active');
  });
  $('#settings-group .dropdown-item').on('click', function () {
    $('#page-creator').addClass('--menu-active');
    $('.hl_page-creator--settings-group').addClass('active');
  });
  //sections
  $('#close-section-group').on('click', function () {
    $('#page-creator').removeClass('--menu-active');
    $('.hl_page-creator--sections-group').removeClass('active');
  });
  $('#section-group .dropdown-item').on('click', function () {
    $('#page-creator').addClass('--menu-active');
    $('.hl_page-creator--sections-group').addClass('active');
  });
  //rows
  $('#close-row-group').on('click', function () {
    $('#page-creator').removeClass('--menu-active');
    $('.hl_page-creator--rows-group').removeClass('active');
  });
  $('#row-group .dropdown-item').on('click', function () {
    $('#page-creator').addClass('--menu-active');
    $('.hl_page-creator--rows-group').addClass('active');
  });
  //columns
  $('#close-column-group').on('click', function () {
    $('#page-creator').removeClass('--menu-active');
    $('.hl_page-creator--columns-group').removeClass('active');
  });
  $('#column-group').on('click', function () {
    $('#page-creator').addClass('--menu-active');
    $('.hl_page-creator--columns-group').addClass('active');
  });
  //element
  $('#close-element-group').on('click', function () {
    $('#page-creator').removeClass('--menu-active');
    $('.hl_page-creator--element-group').removeClass('active');
  });
  $('#element-group .dropdown-item').on('click', function () {
    $('#page-creator').addClass('--menu-active');
    $('.hl_page-creator--element-group').addClass('active');
  });
});
