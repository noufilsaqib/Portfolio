// Smooth scroll (messes up the menu links)
// const body = document.body,
//     scrollWrap = document.getElementsByClassName("wrapper")[0],
//     height = scrollWrap.getBoundingClientRect().height / 2,
//     speed = 0.05;
// var offset = 0;

// body.style.height = Math.floor(height) + "px";

// function smoothScroll() {
//     offset += (window.scrollY - offset) * speed;

//     var scroll = "translateY(-" + offset + "px) translateZ(0)";
//     scrollWrap.style.transform = scroll;

//     callScroll = requestAnimationFrame(smoothScroll);
// }

window.addEventListener('load', function () {
    // smoothScroll();

    // Preloader
    var counter = 0;
    var i = setInterval(function () {
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector('.preloader .counter h1').innerHTML = String(counter).padStart(2, '0');

        counter++;

        if (counter == 101) {
            clearInterval(i);

            setInterval(function () {
                gsap.to(".preloader", 1, {
                    y: "-105vh",
                    ease: Expo.easeInOut,
                });
            }, 750);

            setInterval(function () {
                document.querySelector('.preloader').classList.remove('active');
                document.querySelector('body').style.overflow = 'scroll';
            }, 1500);
        }
    }, 40);

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".navbar", 1.6, {
        opacity: 0,
        y: 60,
        ease: Expo.easeInOut,
        delay: 5.5,
    });

    gsap.from(".socials", 1.6, {
        opacity: 0,
        x: -60,
        ease: Expo.easeInOut,
        delay: 5.5,
    });

    gsap.from(".scrollbar", 1.6, {
        opacity: 0,
        x: 60,
        ease: Expo.easeInOut,
        delay: 5.5,
    });

    gsap.from(".project", 1.6, {
        opacity: 0,
        y: 100,
        ease: Expo.easeInOut,
        scrollTrigger: {
            trigger: '.projects',
            start: () => innerHeight / 2,
        },
        stagger: 0.2,
    });

    window.addEventListener('scroll', function () {
        // Scroll progress bar
        var scrollTop = scrollY;
        var height = document.documentElement.scrollHeight - window.innerHeight;
        var progress = 100 * scrollTop / height;
        document.querySelector('.scroll-thumb').style.height = progress + '%';

        // Adds rotating on scroll effect on back to top button
        document.querySelector('.back-to-top p').style.transform = 'rotate(' + (scrollTop * 0.25) + 'deg)';
    });

    // Typewrite effect
    var typed = new Typed(".auto-type", {
        strings: ["Frontend", "Backend", "UI/UX", "Software"],
        typeSpeed: 150,
        backSpeed: 150,
        loop: true
    })

    // Rotates the back to top text
    const text = document.querySelector(".back-to-top p");
    const rotate = new CircleType(text).radius(72);

    // Nav menu closing animation
    document.querySelectorAll('.menu-link').forEach(function (link) {
        link.addEventListener('click', function () {
            document.querySelector('.nav-icon-animated').classList.toggle('open');
            tl.reversed(!tl.reversed());
            document.body.style.overflow = 'auto';
            setTimeout(function () {
                document.querySelector('.nav-menu').style.zIndex = '0';
            }, 2250);
        });
    });

    document.querySelector('.menu-link_projects').addEventListener('click', function () {
        window.scroll({
            top: document.querySelector('#projects').offsetTop,
            behavior: 'smooth'
        });
    });

    document.querySelector('.menu-link_about').addEventListener('click', function () {
        window.scroll({
            top: document.querySelector('#about').offsetTop,
            behavior: 'smooth'
        });
    });

    document.querySelector('.menu-link_contact').addEventListener('click', function () {
        window.scroll({
            top: document.querySelector('#contact').offsetTop,
            behavior: 'smooth'
        });
    });

    document.querySelector('.back-to-top').addEventListener('click', function () {
        window.scroll({
            top: document.querySelector('#landing').offsetTop,
            behavior: 'smooth'
        });
    });

    // Projects hover animation
    const cursor = document.querySelector('.cursor');

    const animateCursor = (e, interacting) => {
        const x = e.clientX - cursor.offsetWidth / 2,
              y = e.clientY - cursor.offsetHeight / 2;

        const keyframes = {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${interacting ? 15 : 1})`,
        }

        cursor.animate(keyframes, {
            duration: 800,
            fill: 'forwards',
        })
    }

    window.onmousemove = (e) => {
        const interactable = e.target.closest('.project'),
              interacting = interactable !== null;

        animateCursor(e, interacting);

        if (interacting) {
            cursor.style.backgroundImage = "url('../assets/view-project.svg')";
        }
    }

    // Splits text in element with class="target"
    const aboutText = new SplitType('.target', { types: 'lines' });

    document.querySelectorAll('.target > .line').forEach(function (line) {
        var span = document.createElement('span');
        span.classList.add('line-text');
        span.innerHTML = line.innerHTML;
        line.innerHTML = '';
        line.appendChild(span);
    });

    gsap.from(".line-text", 1.8, {
        y: 200,
        ease: "power4.out",
        skewY: 10,
        scrollTrigger: {
            trigger: '.about',
            start: '50% bottom',
        },
        stagger: {
            amount: 0.4,
        },
    });
});