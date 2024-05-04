$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    center: true,
    loop: true,
    margin: 0,
    // nav: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      1000: {
        items: 2.3,
      },
    },
  });
  $(".owl-prev").click(function () {
    $(".owl-carousel").trigger("prev.owl.carousel");
    changeButtonColor(this);
  });

  $(".owl-next").click(function () {
    $(".owl-carousel").trigger("next.owl.carousel");
    changeButtonColor(this);
  });
  function changeButtonColor(button) {
    $(".owl-prev, .owl-next").css("background-color", "");
    $(".owl-prev, .owl-next").find("i").css("color", "");

    $(button).css("background-color", "#5cb85f");
    $(button).find("i").css("color", "white");
  }
});
