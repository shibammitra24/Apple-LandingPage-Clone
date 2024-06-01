const slideContainer = document.querySelector('.container');
const slide = document.querySelector('.slides');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const interval = 5000;

let slides = document.querySelectorAll('.slide');
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

const getSlides = () => document.querySelectorAll('.slide');

const updateSlideClasses = () => {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.remove('inactive');
    } else {
      slide.classList.add('inactive');
    }
  });
};

const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

slide.addEventListener('transitionend', () => {
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    slide.style.transition = 'none';
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastClone.id) {
    slide.style.transition = 'none';
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
  updateSlideClasses();
});

const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  slide.style.transition = 'transform 0.8s ease-in-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  updateSlideClasses();
};

const moveToPreviousSlide = () => {
  if (index <= 0) return;
  index--;
  slide.style.transition = 'transform 0.8s ease-in-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  updateSlideClasses();
};

slideContainer.addEventListener('mouseenter', () => {
  clearInterval(slideId);
});

slideContainer.addEventListener('mouseleave', startSlide);
nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPreviousSlide);

// Initial class update
updateSlideClasses();
startSlide();
