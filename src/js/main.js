import '../styles/main.scss';
import { Cart } from './Cart.js';
import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', () => {

  const cart = new Cart('.js-cart-count');

  new Swiper('.mySwiper', {
    modules: [Pagination, Navigation, Autoplay],
    loop: true,
    autoplay: { 
      delay: 5000, 
      disableOnInteraction: false 
    },
    pagination: { 
      el: '.hero .swiper-pagination', 
      clickable: true 
    },
    navigation: { 
      nextEl: '.hero .swiper-button-next', 
      prevEl: '.hero .swiper-button-prev' 
    },
  });

  new Swiper('.productsSwiper', {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 20,
    preventClicks: false,
    preventClicksPropagation: false,
    navigation: { 
      nextEl: '.products__btn-next', 
      prevEl: '.products__btn-prev' 
    },
    breakpoints: {
      769: { 
        slidesPerView: 4, 
        spaceBetween: 30, 
        allowTouchMove: false 
      },
    },
  });

  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  const body = document.body;

  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  body.appendChild(overlay);

  const toggleMenu = () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
  };

  if (burger) {
    burger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
  }

  if (nav) {
    nav.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('active')) toggleMenu();
      });
    });
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.js-add-to-cart');
    if (!btn) return;

    const card = btn.closest('.product-card');
    if (!card) return;

    const { id, name, price } = card.dataset;
    cart.addItem(id, name, Number(price));

    document.querySelectorAll(`.product-card[data-id="${id}"] .js-add-to-cart`).forEach((b) => {
      b.innerHTML = '✓ В КОРЗИНЕ';
      b.classList.add('product-card__btn--added');

      clearTimeout(b._resetTimer);
      b._resetTimer = setTimeout(() => {
        b.innerHTML = 'В КОРЗИНУ';
        b.classList.remove('product-card__btn--added');
      }, 5000);
    });
  });
});