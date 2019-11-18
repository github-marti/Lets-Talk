$(document).ready(function () {

    $("#save-btn").on("click", function () {
        let newWord = $("#translated-word").text();
        $(".modal").addClass("is-active");
        $("#word-to-save").text(newWord)
    });

    $(".list-option").on('click', function (event) {
        event.preventDefault();
        $("#target-list").text($(this).text());
        $("#target-list").attr("list-id", $(this).attr("list-id"));
    })

    $("#existing-list-save").on("click", function () {
        let newWord = $("#translated-word").text();
        let nativeWord = $("#word").val();
        let newLang = $("#toLanguage").attr("lang-id");
        let vocabListId = $("#target-list").attr("list-id");
        let nativelanguage = $("#fromLanguage").text();
        let difficulty = $("input[type=radio][name=answer]:checked").attr("data-value");
        let definition = $("#add-definition").val();
        let note = $("#add-note").val();
    
        let newVocab = {
          nativeword: nativeWord,
          nativelanguage: nativelanguage,
          translatedword: newWord,
          difficulty: difficulty,
          definition: definition,
          note: note,
          LanguageId: newLang,
          VocabListId: vocabListId
        };
    
        $.post('/api/vocab', newVocab, function (data) {
          console.log("Word successfully saved");
        });
    
        location.reload();
      });
    
      $("#new-list-save").on("click", function () {
        let newWord = $("#translated-word").text();
        let nativeWord = $("#word").val();
        let newLang = $("#toLanguage").attr("lang-id");
        let newVocabList = $("#new-vocab-list").val();
        let nativelanguage = $("#fromLanguage").text();
        let difficulty = $("input[type=radio][name=answer]:checked").attr("data-value");
        let definition = $("#add-definition").val();
        let note = $("#add-note").val();
    
        $.post(`/vocablist/${newVocabList}`, function (data) {
    
          let newVocab = {
            nativeword: nativeWord,
            nativelanguage: nativelanguage,
            translatedword: newWord,
            difficulty: difficulty,
            definition: definition,
            note: note,
            LanguageId: newLang,
            VocabListId: data.id
          };
    
          $.post('/api/vocab', newVocab, function (data) {
            console.log("Word successfully saved!");
          });
        });
        location.reload();
      });

    $(".delete").on("click", function () {
        $(".modal").removeClass("is-active");
    });

    $(document).on("click", ".cancel", function () {
        $(".modal").removeClass("is-active");
    });
});