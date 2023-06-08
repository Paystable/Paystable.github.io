gsap.registerPlugin(ScrollTrigger);


const locoScroll = new LocomotiveScroll({
            el: document.querySelector(".o-scroll"),
            smooth: true
        });
        // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
        locoScroll.on("scroll", ScrollTrigger.update);

        // tell ScrollTrigger to use these proxy methods for the ".o-scroll" element since Locomotive Scroll is hijacking things
        ScrollTrigger.scrollerProxy(".o-scroll", {
            scrollTop(value) {
                return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
            pinType: document.querySelector(".o-scroll").style.transform ? "transform" : "fixed"
        });


    let tlh = gsap.timeline({
      scrollTrigger: {
        trigger: ".spacer",
        scroller: ".o-scroll",
        start: "bottom bottom",
        scrub: true,
        pin: true,
        end: "+=300%",
        pinSpacing: false
      },
    });
 
    // let tlFadeIn = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".hero",
    //     scroller: ".o-scroll",
    //     start: "top bottom",
    //     scrub: true,     
    //     end: "+=100%",
    //     marker:true,
    //   },
    // });
    // tlFadeIn.to(
    //   ".hero",
    //    { autoAlpha: 1 });


    // let tlm = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".hero",
    //     scroller: ".o-scroll",
    //     start: "bottom bottom",
    //     scrub: true,     
    //     end: "+=100%",
    //   },
    // });
    // tlm.to(
    //   ".hero",
    //    { autoAlpha: 0 });


        gsap.set('.p_img_one, .p_img_two', {
            autoAlpha: 0,
            y: 100,
        })
gsap.utils.toArray("#paybox").forEach((section) => {
        var tls = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                scroller: ".o-scroll",
                // scrub: true,
                start: "top top",
                end: "+=200%",
                pin: true
            }
        });
  
const textTitle = section.querySelectorAll(".p_img_one");
      const textText = section.querySelectorAll(".p_img_two");

        tls
        .to('body', { duration: 3 }).to(textTitle, { duration: 1, autoAlpha: 1, y: 0 }, 0)
        .to(textText, { duration: 1, autoAlpha: 1, y: 0, }, 1)
        // .to(textTitle, { duration: 1, autoAlpha: 0, y: -100 }, 3)
        // .to(textText, { duration: 1, autoAlpha: 0, y: -100 }, 3)
});


        ScrollTrigger.create({
          trigger: "#fullpaybox",
          scroller: ".o-scroll",
          start: "top top",
          end: "+=100%",
          pin: true
        })

        const testing = gsap.to('#fullpaybox', { autoAlpha: 1 })

        ScrollTrigger.create({
          trigger: "#fullpaybox",
          scroller: ".o-scroll",
          start: "top top",
          end: "+=100%",
          animation: testing,
        //   scrub: true,
        })



        // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

        // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
        ScrollTrigger.refresh();

        // Sorting ScrollTriggers that have been created out of order of appearance on the page
        ScrollTrigger.sort();