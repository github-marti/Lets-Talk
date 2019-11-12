$(document).ready(function () {

  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  $(".option-title").on("click", function (event) {
    event.preventDefault();
    window.location.href = "/vocablists"
  });

//   $(document).on("click", ".accordion", function(e) {
//   	e.preventDefault();
  
//     var $this = $(this);
  
//     if ($this.next().hasClass('show')) {
//         $this.next().removeClass('show');
//         $this.next().slideUp(350);
//     } else {
//         $this.parent().parent().find('li .inner').removeClass('show');
//         $this.parent().parent().find('li .inner').slideUp(350);
//         $this.next().toggleClass('show');
//         $this.next().slideToggle(350);
//     }
// });

  $(document).on("click", ".accordion", function (e) {
    e.stopPropagation();
    $(this).toggleClass("active");
    console.log($(this).text());
    if ($(this).next().css("display") === "block") {
      console.log("should close block", $(this).text());
      // $(this).next().toggle();
      $(this).next().slideToggle(350);
    } else {
      console.log("should close open", $(this).text());
      // $(this).next().toggle();
      $(this).next().slideToggle(350);
    };
  });

  // var acc = document.getElementsByClassName("accordion");

  // for (let i = 0; i < acc.length; i++) {
  //   acc[i].addEventListener("click", function () {
  //     console.log("click");
  //     this.classList.toggle("active");
  //     var panel = this.nextElementSibling;
  //     if (panel.style.display === "block") {
  //       panel.style.display = "none";
  //     } else {
  //       panel.style.display = "block";
  //     }
  //   });
  // };

});