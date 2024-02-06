import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
console.log("test new js page");

gsap.to("#rotateMe", {
  scrollTrigger: {
    trigger: "#rotateMe",
    start: "top center",
    end: "bottom center",
    scrub: true,
    toggleActions: "play none none none",
  },
  rotation: 360,
  transformOrigin: "center center",
  duration: 1,
  ease: "none",
});
