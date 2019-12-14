$(document).ready(function () {

  $(".to-option").on("click", function (event) {
    event.preventDefault();
    $("#toLanguage").text($(this).text());
    $("#toLanguage").attr("lang-id", $(this).attr("lang-id"));
    $("#toLanguage").attr("lang-code", $(this).attr("lang-code"));
  });

  $(".from-option").on("click", function (event) {
    event.preventDefault();
    $("#fromLanguage").text($(this).text());
    $("#fromLanguage").attr("lang-id", $(this).attr("lang-id"));
    $("#fromLanguage").attr("lang-code", $(this).attr("lang-code"));
  });

  $("#search").on("click", function () {
    let fromLanguage = $("#fromLanguage").attr("lang-code");
    let toLanguage = $("#toLanguage").attr("lang-code");
    let wordSearch = $("#word").val();
    $(".results-container").attr("style", "display:block");
    $(".loader").toggle();

    if (wordSearch && toLanguage) {
      $("#translate").html("");
      $("#definition").html("");
      $("#expressions").html("");

      $.get(`/translate/${fromLanguage}/${toLanguage}/${wordSearch}`)
        .then(function (response) {
          let newP = $("<p>");
          newP.text(response);
          newP.addClass("subtitle");
          newP.attr("id", "translated-word");
          $(".loader").toggle();
          $("#translate").append(newP);
          $('#save-btn').toggle();
        })
        .catch(function (error) {
          console.log(error);
        })
    };
  });
});