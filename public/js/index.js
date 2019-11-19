$(document).ready(function () {

  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  $(document).on("click", ".accordion", function (e) {
    $(this).toggleClass("active");
    if ($(this).next().css("display") === "block") {
      $(this).next().slideToggle(350);
    } else {
      $(this).next().slideToggle(350);
    };
  });
});