$(document).ready(function () {

  $(".single-list").on("click", function (e) {
    e.preventDefault();
    let id = $(this).attr("list-id");
    $("#parent-container").html("");
    $.get("/api/vocablists/" + id, function (data) {
      console.log(data[0])
      $bars.render('listDisplay', 'parent-container', { vocabLists: data[0] });
    })
  });

  $(document).on("click", "#list-delete", function () {
    let id = $(this).attr("data-value");

    $.ajax("/api/vocabperlist/" + id,
      {
        method: "DELETE"
      }).then(function () {
        location.reload();
      })

    $.ajax("/api/vocablist/" + id,
      {
        method: "DELETE"
      }).then(function () {
        location.reload();
      })
  })

  $(document).on("click", "#list-update", function () {
    let id = $(this).attr("data-value");
    let name = $(".update-input").val();

    if (!name) {
      console.log("must input name");
      return;
    }

    let newName = {
      id: id,
      name: name
    };
    $.ajax({
      method: "PUT",
      url: "/api/updatelistname",
      data: newName
    }).then(function (res) {
      location.reload();
    })
  })

  $(".deletebtn").on("click", function () {
    let id = $(this).attr("id");
    $.ajax("/api/vocabs/" + id,
      {
        method: "DELETE",

      }).then(function () {
        location.reload();
      })
  });

  $(".updatebtn").on("click", function () {

    let id = $(this).attr("id");
    let difficulty = $("input[type=radio][name=answer]:checked").attr("data-value");

    idandnewdiff = {
      id: id,
      difficulty: difficulty
    };
    $.ajax({
      method: "PUT",
      url: "/api/updatevocabdiff",
      data: idandnewdiff
    }).then(function (res) {
      console.log(res);
      location.reload();
    });
  });

  $(document).on("click", ".list-delete-btn", function () {
    $(".delete-modal").addClass("is-active");
  });

  // $(".cancel").on("click", function () {
  //   $(".delete-modal").removeClass("is-active");
  // });
});