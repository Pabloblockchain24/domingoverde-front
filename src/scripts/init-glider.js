import Glider from "glider-js";

document.addEventListener("DOMContentLoaded", () => {
  new Glider(document.querySelector(".glider"), {
    slidesToShow: 3,    // 3 productos en desktop
    slidesToScroll: 1,
    draggable: true,
    arrows: {
      prev: ".glider-prev",
      next: ".glider-next",
    },
    // responsive: [
    //   {
    //     breakpoint: 1024, // tablets grandes
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 768, // tablets pequeñas / móviles grandes
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  });
});
