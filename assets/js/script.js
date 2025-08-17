document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    // Timeline for animation
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".banner",
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
        }
    });

    tl.fromTo(".navbar-brand", { 
        top: '20dvw', 
        scale: 1,
    }, { 
        top: -30, 
        scale: 0.275,
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
    }, 0.5);

    // Play icon fade in + display toggle
    tl.fromTo(".play-ico",
        { 
            opacity: 0, 
            display: "none" 
        },
        { 
            opacity: 1, 
            display: "block", 
            duration: 0.8, 
            ease: "power2.out",
            onStart: () => document.querySelector(".play-ico").style.display = "block",
            onReverseComplete: () => document.querySelector(".play-ico").style.display = "none"
        },
        0.8
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


    document.querySelector('[data-id="scroll"]').addEventListener('click', function () {
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: "#" + this.getAttribute('data-id'),
                offsetY: 0
            },
            ease: "power1.inOut"
        });
    });


    const playBtn = document.getElementById('playButton');
    const video = document.getElementById('bannerVideo');

    playBtn.addEventListener('click', function () {
        video.pause();   
        video.currentTime = 0;
        video.muted = false;
        video.play();
    });


    let innovation = gsap.timeline({
        scrollTrigger: {
            trigger: ".innovation-text",
            start: "top top",
            end: "+=120%",
            scrub: 1,
            pin: true
        }
    });
    
    innovation.fromTo("#top-text", 
        { scale: 1, transformOrigin: "50% 50%", opacity: 1 }, 
        { 
            scale: 200.9, 
            opacity: 1, 
            transformOrigin: "50.734% 50%",
            ease: "power2.inOut",
        }
    );
    
    innovation.to("#bgVideo1 video", { 
        opacity: 1, 
        ease: "power1.out" 
    }, "<0.1");

    innovation.to("#bgColor", { 
        opacity: 0, 
        ease: "power2.out" 
    }, "<0");

    // parallax image annimation
    gsap.to(".parallax-img img", {
        y: "-10%",
        ease: "none",
        scrollTrigger: {
            trigger: ".zigzag-content-with-img", 
            start: "top bottom",
            end: "bottom top",
            scrub: 1, 
        }
    });
    
});

