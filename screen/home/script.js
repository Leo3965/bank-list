'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const section4 = document.querySelector('#section--4');
const btnBank = document.querySelector('#bank-link');

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1));
const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

btnBank.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = 'screen/bank/bank.html';
});

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(b => b.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML = 'We use cookied for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>'
header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
    message.remove();
});

//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '100vw';
message.style.height = (Number.parseFloat(getComputedStyle(message).height, 10) + 40) + 'px';

// Page Navigation
btnScrollTo.addEventListener('click', () => {
    // Scrolling

    //const s1coords = section1.getBoundingClientRect();
    //window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
    //window.scrollTo({
    //  left: s1coords.left + window.pageXOffset,
    //  top: s1coords.top + window.pageYOffset,
    //  behavior: 'smooth'
    //});

    section1.scrollIntoView({
        behavior: 'smooth'
    });
});

//document.querySelectorAll('.nav__link').forEach((el) => {
//  el.addEventListener('click', function(e) {
//    e.preventDefault();
//    const href = this.getAttribute('href');
//    document
//    .querySelector(href)
//    .scrollIntoView({behavior: 'smooth'});
//  });
//});

// 1. Add event listener to commoon parent element
// 2. Determine what element originated the event
document
    .querySelector('.nav__links')
    .addEventListener('click', function (e) {
        // Matching strategy
        if (e.target.classList.contains('nav__link')) {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            document
                .querySelector(href)
                .scrollIntoView({
                    behavior: 'smooth'
                });
        }
    });

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
    // this method is amazing!! CLOSEST
    const clicked = e.target.closest('.operations__tab');
    // Guard clause
    if (!clicked) return;

    // Active tab
    tabs
        .forEach((t) => t.classList.remove('operations__tab--active'));

    clicked
        .classList
        .add('operations__tab--active');

    tabsContent
        .forEach((c) => c.classList.remove('operations__content--active'));

    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

const nav = document.querySelector('.nav');

const fade = function (event) {
    if (event.target.classList.contains('nav__link')) {
        const link = event.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
}

// Passing "Argument" into handler
nav.addEventListener('mouseover', fade.bind(0.5));
nav.addEventListener('mouseout', fade.bind(1));

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//     if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//     else nav.classList.remove('sticky');
// });


// Sticky navigation: Intersection Observer API
const stickyNav = function (entries) {
    const [entry] = entries; // equals to entries[0]
    if (entry.isIntersecting) {
        nav.classList.remove('sticky');
    } else {
        nav.classList.add('sticky');
    }
}
const navHeight = nav.getBoundingClientRect().height;
const obsOptions = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);

// Reveal sections
const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}
const allSections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(revealSection, {root: null, threshold: 0.15});

allSections.forEach(section => {
    sectionObserver.observe(section);
    // section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]'); // all images with property data source
const loadImg = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', e => {
        e.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
}
const imageObserver = new IntersectionObserver(loadImg, {root: null, threshold: 0, rootMargin: '200px'});
imgTargets.forEach(img => {
    imageObserver.observe(img);
});

// Slider
const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    let currentSlide = 0;
    const maxSlide = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.5) translateX(-1000px)';
// slider.style.overflow = 'visible';

    const dotContainer = document.querySelector('.dots');

    const nextSlide = function () {
        if (currentSlide === (maxSlide - 1)) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        goToSlide(currentSlide);
    }

    const previousSlide = function () {
        if (currentSlide === 0) {
            currentSlide = (maxSlide - 1);
        } else {
            currentSlide--;
        }
        goToSlide(currentSlide);
    }

    const createDots = function () {
        slides.forEach((_, i) => {
            const html = `<button class="dots__dot" data-slice="${i}"></button>`;
            dotContainer.insertAdjacentHTML('beforeend', html);
        });
    }

    const activateDot = function (slide) {
        document.querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));

        document.querySelector(`.dots__dot[data-slice='${slide}']`)
            .classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach((s, i) => {
            s.style.transform = `translateX(${(i - slide) * 100}%)`
        });
        activateDot(slide);
    }

    createDots();
    goToSlide(0);

    dotContainer.addEventListener('click', e => {
        if (e.target.classList.contains('dots__dot')) {
            const {slice} = e.target.dataset;
            goToSlide(slice);
        }
    });

// Next slide
    btnRight.addEventListener('click', nextSlide);

// Previous Slide
    btnLeft.addEventListener('click', previousSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') previousSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

slider();

// Activated just after the HTML and JS are downloaded
document.addEventListener('DOMContentLoaded', e => console.log("HTML parsed and DOM tree built!", e));
console.log(document.readyState, "Ready!");

// Load event is activated after external files like img and css has been completed loaded
window.addEventListener('load', e => console.log("All files has been downloaded!", e));
// This event is created just before the user leaves the page
window.addEventListener('beforeunload', e => {
    e.preventDefault();
    console.log("Bye bye!", e);
    //e.returnValue = ''; // This prevents the user from leaving
});