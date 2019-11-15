$(document).ready(function () {

  $(".single-list").on("click", function (e) {
    e.preventDefault();
    let id = $(this).attr("list-id");
    $("#parent-container").html("");
    $.get("/api/vocablists/" + id, function (data) {
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
      let id = $(".list-title").attr("list-id");
      $("#parent-container").html("");
      $.get("/api/vocablists/" + id, function (data) {
        $bars.render('listDisplay', 'parent-container', { vocabLists: data[0] });
      })
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
});