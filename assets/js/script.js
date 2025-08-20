document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);


    if (document.querySelector(".banner")) {
        let banner = document.querySelector(".banner");

        // Function to get center in vh
        function getBannerCenterVH() {
            let bannerCenterPX = banner.offsetHeight / 2;
            return (bannerCenterPX / window.innerHeight) * 100; // convert px to vh
        }

        let bannerCenterVH = getBannerCenterVH();

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".banner",
                start: "top top",
                end: "+=500%",
                scrub: 3,
                pin: true,
            }
        });

        // Logo animation (center to top-left)
        tl.fromTo(".navbar-brand", 
            { 
                position: "fixed",
                top: bannerCenterVH + "vh", // dynamic center in vh
                left: "50%",
                xPercent: -50,
                yPercent: -50,
                scale: 1
            }, 
            { 
                position: "absolute",
                top: -30, 
                left: "50%",
                xPercent: -50,
                yPercent: 0,
                scale: 0.275,
                ease: "power2.out"
            }, 
            0.5
        );

        // Overlay fade out
        tl.to(".overlay", {
            backgroundColor: "rgba(0,0,0,0)",
            ease: "none"
        }, 0.75);

        // Header slide in
        tl.to("#header", {
            y: 0, 
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

        // Scroll down bounce
        gsap.to(".scroll-down img", {
            y: 10, 
            duration: 0.8,
            repeat: -1, 
            yoyo: true,
            ease: "power1.inOut"
        });

        // Video play button
        const playBtn = document.getElementById('playButton');
        const video = document.getElementById('bannerVideo');

        playBtn.addEventListener('click', function () {
            video.pause();   
            video.currentTime = 0;
            video.muted = false;
            video.play();
        });

        // Recalculate center on resize
        window.addEventListener("resize", () => {
            let newCenterVH = getBannerCenterVH();
            gsap.set(".navbar-brand", { top: newCenterVH + "vh" });
        });
    }

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

    if (document.querySelector(".innovation-text")) {

        function getFitScale(elem) {
            let el = document.querySelector(elem);
            if (!el) return 1;

            let rect = (el instanceof SVGGraphicsElement && el.getBBox) 
                ? el.getBBox() 
                : el.getBoundingClientRect();

            if (rect.width === 0 || rect.height === 0) return 1;

            let scaleX = window.innerWidth / rect.width;
            let scaleY = window.innerHeight / rect.height;

            return Math.max(scaleX, scaleY) * 15; // extra 20% buffer
        }

        let finalScale = getFitScale("#top-text");

        let innovation = gsap.timeline({
            scrollTrigger: {
                trigger: ".innovation-text",
                start: "top top",
                end: "+=120%",
                scrub: 3,
                pin: true,
                onRefresh: () => {
                    finalScale = getFitScale("#top-text"); 
                }
            }
        });

        innovation.fromTo("#top-text",
            { scale: 1, transformOrigin: "50% 50%" },
            { 
                scale: () => finalScale, 
                transformOrigin: "50% 50%",
                ease: "power2.inOut"
            }
        );

        ScrollTrigger.create({
            trigger: ".innovation-text",
            start: "top top",
            end: "+=120%",
            scrub: 1,
            onUpdate: (self) => {
                let progress = self.progress; 
                let currentScale = 1 + (finalScale - 1) * progress;

                if (currentScale >= finalScale / 2) {
                    gsap.to("#bgColor", { opacity: 0, duration: 1, overwrite: "auto" });
                    gsap.to("#bgVideo1 video", { opacity: 1, duration: 1, overwrite: "auto" });
                } else {
                    gsap.to("#bgColor", { opacity: 1, duration: 0.1, overwrite: "auto" });
                    gsap.to("#bgVideo1 video", { opacity: 0, duration: 1, overwrite: "auto" });
                }
            }
        });
        window.addEventListener("resize", () => {
            finalScale = getFitScale("#top-text");
            ScrollTrigger.refresh();
        });
    }

    if (document.querySelector(".parallax-img")) {
        // parallax image annimation
        gsap.to(".parallax-img img", {
            y: "-20%",
            ease: "none",
            scrollTrigger: {
                trigger: ".parallax-img", 
                start: "top bottom",
                end: "bottom top",
                scrub: 1, 
            }
        });
    }

    if (document.querySelector(".anim-expand")) {

        gsap.fromTo(".anim-expand .img img",
            {
                scale: 0.7,
                clipPath: "inset(100% 0 0 0)"
            },
            {
                scale: 1,
                clipPath: "inset(0% 0 0 0)",
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".anim-expand",
                    start: "top 50%",
                    toggleActions: "play none none none"
                }
            }
        );
    }

    if (document.querySelector(".luxuries-wrapper")) {
        new Swiper(".luxuries-slider", {
            loop: true,
            slidesPerView: 1.5,
            spaceBetween: 30,
            centeredSlides: true,
            speed: 1500,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".luxuries-button-next",
                prevEl: ".luxuries-button-prev",
            },
        });
    }

    if (document.querySelector(".island-wrapper")) {
        document.fonts.ready.then(() => {
            Splitting();
    
            gsap.from(".fill-text .word", {
                opacity: 0.4,
                duration: 0.8,
                ease: "sine.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".island-wrapper",
                    start: "top 25%",     
                    toggleActions: "restart none none none", 
                }
            });
        });
    }
    
});

