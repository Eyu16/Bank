'use strict';
const menu = document.querySelector('.menu');
const section2 = document.querySelector('#section-2');
const section1 = document.querySelector('#section-1');
const cords = section2.getBoundingClientRect();
const menuHight = menu.getBoundingClientRect().height;
const btnModalOpen = document.querySelectorAll('.modal-open');
const overLay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const heroBtn = document.querySelector('.hero-link');
const tabContainer = document.querySelector('.tab-container');
const btnOps = document.querySelectorAll('.btn-ops');
const opsContent = document.querySelectorAll('.operation-content');
const nav = document.querySelector('.nav');
const logo = document.querySelector('.logo');
const allSections = document.querySelectorAll('.section');
//  implementing sticky navigation

// window.addEventListener('scroll', function () {
//   if (this.window.scrollY > cords.top) menu.classList.add('sticky');
//   else menu.classList.remove('sticky');
// });

//  using intersection obeserver API

const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) menu.classList.add('sticky');
  else menu.classList.remove('sticky');
};
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${menuHight}px`,
};
const obeserver = new IntersectionObserver(stickyNav, options);
obeserver.observe(section1);
// opening and closing modal

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overLay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overLay.classList.add('hidden');
};
btnModalOpen.forEach(btn => btn.addEventListener('click', openModal));
const btnCloseModal = document.querySelector('.close-modal');
btnCloseModal.addEventListener('click', closeModal);
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    if (!modal.classList.contains('hidden')) closeModal();
  }
});
overLay.addEventListener('click', closeModal);
// navigatin through the scetions
//  The best way of doing it
nav.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.classList.contains('link')) {
    const id = event.target.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }
});
//  The second way of doing it

// document.querySelectorAll('.link').forEach(function (link) {
//   link.addEventListener('click', function (event) {
//     event.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// scroll in to view
heroBtn.addEventListener('click', function (event) {
  event.preventDefault();
  section2.scrollIntoView({ behavior: 'smooth' });
});

// tab component implementing

tabContainer.addEventListener('click', function (event) {
  event.preventDefault();
  const clicked = event.target.closest('button');
  if (!clicked) return;
  btnOps.forEach(btn => btn.classList.remove('btn-active'));
  opsContent.forEach(content =>
    content.classList.remove('operation-content-active')
  );
  clicked.classList.add('btn-active');
  document
    .querySelector(`.operation-content-${clicked.dataset.num}`)
    .classList.add('operation-content-active');
});
// menu fade out implementin
const fadeMenu = function (event) {
  if (event.target.classList.contains('link')) {
    document.querySelectorAll('.link').forEach(link => {
      if (link !== event.target) link.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', fadeMenu.bind(0.5));
nav.addEventListener('mouseout', fadeMenu.bind(1));
// implementing slider
const slider = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('slide');
  obeserver.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(slider, {
  root: null,
  threshold: 0.15,
  rootMargin: '100px',
});
allSections.forEach(section => {
  section.classList.add('slide');
  sectionObserver.observe(section);
});
const imgs = document.querySelectorAll('.imgs');
const imgOpt = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // console.log(entry);
  entry.target.src = entry.target.dataset.src;
  observer.unobserve(entry.target);
  // console.log(entry);
};
const imgObserver = new IntersectionObserver(imgOpt, {
  root: null,
  threshold: 0,
  rootMargin: '-120px',
});
imgs.forEach(img => imgObserver.observe(img));
// impelenting lazy slide
const mainSlide = function () {
  const slides = document.querySelectorAll('.test-slide');
  const btnRight = document.querySelector('.btn-right');
  const btnLeft = document.querySelector('.btn-left');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSide = slides.length - 1;
  // functions
  //  dot creation
  const creatDot = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        ` <div class="dot" data-slide="${i}"></div>`
      );
    });
  };

  //  dot activation
  const acivateDot = function (curSlide = 0) {
    document
      .querySelectorAll('.dot')
      .forEach(dot => dot.classList.remove('dot-active'));
    document
      .querySelector(`.dot[data-slide="${curSlide}"]`)
      .classList.add('dot-active');
  };

  // intiali position of sldes
  const scrollBegin = function (curSlide = 0) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - curSlide) * 100}%)`)
    );
    acivateDot(curSlide);
  };

  //  scroll to left
  const scrollToRight = function () {
    if (curSlide === maxSide) curSlide = 0;
    else curSlide++;
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - curSlide) * 100}%)`)
    );
    acivateDot(curSlide);
  };

  // scrol to right
  const scrollToLeft = function () {
    if (curSlide === 0) curSlide = maxSide;
    else curSlide--;
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - curSlide) * 100}%)`)
    );
    acivateDot(curSlide);
  };

  // Evenet listners
  btnRight.addEventListener('click', scrollToRight);
  btnLeft.addEventListener('click', scrollToLeft);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') scrollToRight();
    else if (event.key === 'ArrowLeft') scrollToLeft();
  });
  const init = function () {
    creatDot();
    acivateDot();
    scrollBegin();
  };
  init();
  dotContainer.addEventListener('click', function (event) {
    if (!event.target.classList.contains('dot')) return;
    const { slide } = event.target.dataset;
    curSlide = +slide;
    scrollBegin(curSlide);
  });
};
mainSlide();
// slides.forEach((s, i) => (s.style.transform = `transition(${i * 100}%)`));
// slides.forEach((s, i) => {
//   s.style.transform = `translateX(${i * 100}%)`;
// });

// console.log(btnRight);

// acivateDot(curSlide);
