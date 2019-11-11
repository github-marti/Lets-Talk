$(document).ready(function () {

  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  $(".option-title").on("click", function (event) {
    event.preventDefault();
    window.location.href = "/vocablists"
  });

});