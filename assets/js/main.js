/**
* Template Name: MyResume
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


(function() {
  "use strict";

  
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with the data-toggle="tooltip" attribute
    var tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
  
    // Iterate over each tooltip element
    tooltips.forEach(function(tooltip) {
      // Initialize the tooltip using Bootstrap's Tooltip class
      new bootstrap.Tooltip(tooltip);
    });
  });

  
  
  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      document.getElementById('text').classList.add('slide-in');
    }, 100);
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  

})()


const items = document.querySelectorAll(".portfolio-item");

items.forEach(item => {
  item.addEventListener("mousemove", (e) => {
    const { x, y } = item.getBoundingClientRect();
    item.style.setProperty("--x", e.clientX - x);
    item.style.setProperty("--y", e.clientY - y);
  });
});


const containers = document.querySelectorAll(".image-container");

containers.forEach(container => {
  container.addEventListener("mousemove", (e) => {
    const { x, y } = container.getBoundingClientRect();
    container.style.setProperty("--x", e.clientX - x);
    container.style.setProperty("--y", e.clientY - y);
  });
});

const container2 = document.querySelectorAll(".portfolio-extra-info");

container2.forEach(container2 => {
  container2.addEventListener("mousemove", (e) => {
    const { x, y } = container2.getBoundingClientRect();
    container2.style.setProperty("--x", e.clientX - x);
    container2.style.setProperty("--y", e.clientY - y);
  });
});



document.addEventListener('DOMContentLoaded', function() {
  const portfolioFilters = document.getElementById('portfolio-flters');
  const backgroundGradient = document.getElementById('background-gradient4');

  portfolioFilters.addEventListener('click', function(event) {
    const filterItems = portfolioFilters.querySelectorAll('li');
    filterItems.forEach(function(item) {
      item.classList.remove('filter-active'); // Remove 'filter-active' class from all items
    });
    event.target.classList.add('filter-active'); // Add 'filter-active' class to the clicked item

    // Check if any of the filters (.filter-card, .filter-app, .filter-web) are active
    const isActiveCardFilter = event.target.dataset.filter === '.filter-card';
    const isActiveAppFilter = event.target.dataset.filter === '.filter-app';
    const isActiveWebFilter = event.target.dataset.filter === '.filter-web';

    // Toggle visibility of background gradient based on active filters
    backgroundGradient.style.display = (isActiveCardFilter || isActiveAppFilter || isActiveWebFilter) ? 'none' : 'block';
  });
});

//moves the gradient in the background
window.addEventListener('scroll', function() {
  let scrollPosition = window.scrollY / document.body.scrollHeight;
  
  let xOffset1 = 110 - scrollPosition * 170;
  let yOffset1 = 32 + scrollPosition * -140;
  
  let xOffset2 = 100 - scrollPosition * 150;
  let yOffset2 = 42 + scrollPosition * -140;

  let xOffset3 = -50 - scrollPosition * -200;
  let yOffset3 = 110 + scrollPosition * -40;
  
  let xOffset4 = -60 - scrollPosition * -220;
  let yOffset4 = 120 + scrollPosition * -40;
  
  document.body.style.backgroundImage = 
    `radial-gradient(circle at ${xOffset1}% ${yOffset1}%, hsla(39.7,57.5%,43.3%,0.3) 0px, transparent 50%),
    radial-gradient(circle at ${xOffset2}% ${yOffset2}%, hsla(251.9,63.2%,53.1%,0.3) 0px, transparent 50%),
    radial-gradient(circle at ${xOffset3}% ${yOffset3}%, hsla(39.7,57.5%,43.3%,0.3) 0px, transparent 50%),
    radial-gradient(circle at ${xOffset4}% ${yOffset4}%, hsla(251.9,63.2%,53.1%,0.3) 0px, transparent 50%)`;
});






