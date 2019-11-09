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

    if (wordSearch && toLanguage) {

      $("#translate").html("");
      $("#definition").html("");
      $("#expressions").html("");

      $(".results-container").attr("style", "display:block");

      let queryURLTranslate = `https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=${fromLanguage}&target=${toLanguage}&input=${wordSearch}`;

      $.get(`/translate/${fromLanguage}/${toLanguage}/${wordSearch}`)
        .then(function (response) {
          console.log(response);
          let newP = $("<p>");
          newP.text(response);
          newP.addClass("subtitle");
          newP.attr("id", "translated-word")
          $("#translate").append(newP);
        });
      let queryURLExpression = `https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/resources/dictionary/lookup?source=${fromLanguage}&target=${toLanguage}&input=${wordSearch}`;

      $.ajax(`/expressions/${fromLanguage}/${toLanguage}/${wordSearch}`).then(function (response) {

        let totalNoOfExpressions = response.outputs[0].output.matches[0].targets[0].expressions.length;
        for (let i = 0; i < totalNoOfExpressions; i++) {

          let newPTarget = $("<p>");
          newPTarget.text(response.outputs[0].output.matches[0].targets[0].expressions[i].target);

          let newPSource = $("<p>");
          newPSource.text(response.outputs[0].output.matches[0].targets[0].expressions[i].source);
          newPSource.attr("style", "font-style:italic");

          $("#expressions").append(newPTarget);
          $("#expressions").append(newPSource);
        };
      });
    };
  });
});