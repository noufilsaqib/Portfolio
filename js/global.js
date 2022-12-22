window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

window.addEventListener('load', function () {
    // GSAP animations
    tl = new TimelineMax({ paused: true });

    tl.to(".menu-left", 1, {
        bottom: 0,
        ease: Expo.easeInOut,
    });

    tl.to(".menu-right", 1, {
        top: 0,
        ease: Expo.easeInOut,
    }, "-=1");

    tl.staggerFrom(".menu-links li, .menu-works .tagline, .menu-works li", 0.8, {
        y: 100,
        opacity: 0,
        ease: Expo.easeOut,
    }, "0.1", "-=0.4");

    tl.staggerFrom(".menu-socials li", 0.8, {
        y: 100,
        opacity: 0,
        ease: Expo.easeOut,
    }, "0.1", "-=1");

    tl.reverse();

    // Nav menu animation
    var timeoutID;

    document.querySelectorAll('.nav-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelector('.nav-icon-animated').classList.toggle('open');
            tl.reversed(!tl.reversed());
        
            if (document.querySelector('.open')) {
                document.body.style.overflow = 'hidden';
                document.querySelector('.nav-menu').style.zIndex = '10';
                clearTimeout(timeoutID);
            } else {
                document.body.style.overflow = 'auto';
                timeoutID = setTimeout(function () {
                    document.querySelector('.nav-menu').style.zIndex = '-1';
                }, 2500);
            }
        });
    });

    // Splits text in element with class="text-anim"
    const btnAnimText = new SplitType('.text-anim', { types: 'chars' });

    document.querySelectorAll('.text-anim').forEach(function (textAnim) {
        var div = document.createElement('div');
        div.classList.add('text-inner');
        div.innerHTML = textAnim.innerHTML;
        textAnim.innerHTML = '';
        textAnim.appendChild(div);
    });
    
    document.querySelectorAll('.char').forEach(function (char) {
        char.setAttribute('data-hover', char.textContent);
    });

    document.querySelectorAll('.text-anim').forEach(function (textAnim) {
        var elem = textAnim.querySelectorAll('.char');
        textAnim.addEventListener('mouseenter', function () {
            gsap.to(elem, {
                yPercent: -105,
                ease: 'back.out(1.7)',
                stagger: {
                    amount: 0.2
                },
                duration: 0.5
            });
        });
        textAnim.addEventListener('mouseleave', function () {
            gsap.to(elem, {
                yPercent: 0,
                ease: 'back.out(1.7)',
                stagger: {
                    amount: 0.2
                },
                duration: 0.5
            });
        });
    });
});