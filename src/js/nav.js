$(document).ready(function () {
  var trigger = $('.hamburger'),
    overlay = $('.overlay'),
    isClosed = false,
    nav1 = $('#nav-1'),
    nav2 = $('#nav-2'),
    nav3 = $('#nav-3'),
    nav4 = $('#nav-4'),
    content1 = $('#content-1'),
    content2 = $('#content-2'),
    content3 = $('#content-3'),
    content4 = $('#content-4'),
    welcome = $('.welcome');

  let current = welcome;
  //handle toggle content;
  nav1.click(() => {
    let LandsCount;
    current.hide();
    content1.show();
    current = content1;
  });

  nav2.click(() => {
    current.hide();
    content2.show();
    current = content2;

  });

  nav3.click(() => {
    current.hide();
    content3.show();
    current = content3;
  });

  nav4.click(() => {
    current.hide();
    content4.show();
    current = content4;

  });


  trigger.click(function () {
    hamburger_cross();
  });

  function hamburger_cross() {

    if (isClosed == true) {
      overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = false;
    } else {
      overlay.show();
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      isClosed = true;
    }
  }

  $('[data-toggle="offcanvas"]').click(function () {
    $('#wrapper').toggleClass('toggled');
  });
});