$(document).ready(function () {

  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  $("#your-lists > .option-title").on("click", function (event) {
    event.preventDefault();
    window.location.href = "/vocablists"
  });

  $("#word-search > .option-title").on("click", function (event) {
    event.preventDefault();
    window.location.href = "/wordsearch"
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