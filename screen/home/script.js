'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
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
btnScrollTo.addEventListener('click', (e) => {
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