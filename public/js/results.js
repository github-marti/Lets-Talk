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
        let newVocab = {
            nativeword: nativeWord,
            nativelanguage: nativelanguage,
            translatedword: newWord,
            difficulty: difficulty,
            LanguageId: newLang,
            VocabListId: vocabListId
        };

        $.post(`/vocab/${newWord}`, newVocab, function (data) {
            console.log("Word successfully saved");
        });

        location.reload();
    })

    $("#new-list-save").on("click", function () {
        let userId = $(".member-username").attr("user-id");
        let newWord = $("#translated-word").text();
        let nativeWord = $("#word").val();
        let newLang = $("#toLanguage").attr("lang-id");
        let newVocabList = $("#new-vocab-list").val();
        let nativelanguage = $("#fromLanguage").text();
        let difficulty = $("input[type=radio][name=answer]:checked").attr("data-value");
        let userData = {
            UserId: userId
        };

        $.post(`/vocablist/${newVocabList}`, userData, function (data) {
            console.log(data.id);

            let newVocab = {
                nativeword: nativeWord,
                nativelanguage: nativelanguage,
                translatedword: newWord,
                difficulty: difficulty,
                LanguageId: newLang,
                VocabListId: data.id
            };

            $.post(`/vocab/${newWord}`, newVocab, function (data) {
                console.log(data);
                console.log("Word successfully saved!");
            });
        })
        location.reload();
    });

    $(".delete").on("click", function () {
        $(".modal").removeClass("is-active");
    });

    $("#cancel").on("click", function () {
        $(".modal").removeClass("is-active");
    });
});