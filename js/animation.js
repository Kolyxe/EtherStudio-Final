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
const cursor = document.querySelector(".cursor");
const hoverItem = document.querySelector("#hover-item");
let isMouseMoving = false; // Flag to track mouse movement
let mouseX = 0;
let mouseY = 0;
// Constants for proximity and scaling
const maxDistance = 75; // Maximum distance at which scaling starts
const maxScale = 12.5; // Maximum scale when cursor is over hover-item
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!isMouseMoving) {
    isMouseMoving = true;
    requestAnimationFrame(updateCursor);
  }
});
//Function for cursor animation on header
function updateCursor() {
  if (window.innerWidth > 991) {
    const hoverItemRect = hoverItem.getBoundingClientRect();
    const dist = distanceToPoint(mouseX, mouseY, hoverItemRect);
    const scale = calculateScale(dist, maxDistance, maxScale);
    // Use mouseX and mouseY directly for setting the cursor's position
    cursor.style.opacity = scale > 1 ? 1 : 0;
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(${scale})`;
    if (scale > 1) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }
  } else {
    // Reset custom cursor styles for smaller screens
    document.body.style.cursor = "auto";
    cursor.style.opacity = 0;
    cursor.style.transform = "none";
  }
  isMouseMoving = false;
}
function distanceToPoint(x, y, rect) {
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);
  return Math.sqrt(dx * dx + dy * dy);
}
function calculateScale(distance, maxDistance, maxScale) {
  if (distance > maxDistance) return 1;
  return 1 + ((maxScale - 1) * (maxDistance - distance)) / maxDistance;
}
function closeModal() {
  const modal = document.querySelector(".multi-form22_component");
  modal.style.display = "none";
  requestAnimationFrame(updateCursor);
}
// Attach event listener for closing the modal
document
  .querySelector(".multi-form22_close-button")
  .addEventListener("click", closeModal);

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
