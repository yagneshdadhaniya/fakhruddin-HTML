gsap.registerPlugin(ScrollTrigger);

// Timeline for animation
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".banner",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true // banner pinned while animating
    }
});

// Logo shrink & move up to header
tl.to(".logo-large", {
    scale: 0.45,
    y: -320,
    opacity: 0,
    ease: "power2.out"
}, 0.5);

// Overlay fade out
tl.to(".overlay", {
    backgroundColor: "rgba(0,0,0,0)",
    ease: "none"
}, 0.75);

// Header slide in
tl.to("#header", {
    y: 0, // slide down
    ease: "power2.out"
}, 0.3);

// Play icon fade in + display toggle
tl.fromTo(".play-ico",
    { 
        opacity: 0, 
        display: "none" 
    },
    { 
        opacity: 1, 
        display: "block", 
        duration: 0.3, 
        ease: "power2.out",
        onStart: () => document.querySelector(".play-ico").style.display = "block",
        onReverseComplete: () => document.querySelector(".play-ico").style.display = "none"
    },
    0.5
);

gsap.to(".scroll-down img", {
    y: 10, // move down 10px
    duration: 0.8,
    repeat: -1, // infinite
    yoyo: true,
    ease: "power1.inOut"
});

document.addEventListener('click', function (event) {
    // Check if the clicked element or one of its parents has [data-lightbox]
    var target = event.target.closest('[data-lightbox]');
    if (target) {
        event.preventDefault();
        lity(target.getAttribute('href') || target.dataset.lightbox);
    }
});