gsap.registerPlugin(ScrollTrigger);
$(".span-wrapper").each(function (index) {
  let relatedEl = $(".span-element").eq(index);
  relatedEl.appendTo($(this));
});
$(document).ready(function () {
  $('[data-toggle="datepicker"]').datepicker({
    format: "mm-dd-yyyy",
  });
  // Available date placeholders:
  // Year: yyyy
  // Month: mm
  // Day: dd
  if (window.innerWidth < 768) {
    $('[data-toggle="datepicker"]').attr("readonly", "readonly");
  }
});
function setupVideoInteractions(enable) {
  document.querySelectorAll(".backgroundvideo").forEach((container) => {
    const video = container.querySelector("video");
    if (!video) return;
    // Function to reset and pause video
    const resetAndPauseVideo = () => {
      video.pause();
      video.currentTime = 0;
    };
    // Initialize video
    if (video.readyState >= 2) {
      // Video is ready
      resetAndPauseVideo();
    } else {
      // Video is not ready, set up event listener
      video.addEventListener("loadeddata", resetAndPauseVideo, { once: true });
    }
    // Set up interaction controls
    if (enable) {
      video.removeAttribute("autoplay");
      video.addEventListener("mouseover", () => video.play());
      video.addEventListener("mouseout", resetAndPauseVideo);
    } else {
      video.setAttribute("autoplay", true);
      video.muted = true;
      video.play();
    }
  });
}
window.onload = () => {
  setupVideoInteractions(window.innerWidth >= 991);
};

function myFade() {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({
    markers: false,
  });
  // Animation stagger scroll
  $(".fadeupholder").each(function () {
    let trigger = $(this)[0];
    // Timeline for fade-up elements
    let fadeUpTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top 80%",
      },
      delay: 0.3,
    });
    // Timeline for SVG element
    let svgTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top 80%",
      },
      delay: 0.3,
    });
    // Fade-up animation for fade-up elements
    let fadeUpElements = $(this).find(".fade-up");
    fadeUpElements.each(function () {
      gsap.set($(this)[0], {
        y: 50,
        opacity: 0,
      });
      fadeUpTimeline.to(
        $(this),
        {
          y: 0,
          opacity: 1,
          duration: 1.8,
          ease: "expo.out",
        },
        "<0.09"
      );
    });
    // Scale and rotation animation for SVG element
    let svgElement = $(this).find(".fade-up-svg");
    svgElement.each(function () {
      gsap.set($(this)[0], {
        scale: 0.2, // Initial scale
        rotation: 720, // Initial rotation
      });
      svgTimeline.to(
        $(this),
        {
          scale: 1, // Final scale
          rotation: 0, // Final rotation
          duration: 1.8,
          ease: "expo.out",
        },
        "<0.09"
      );
    });
  });
}
myFade();
