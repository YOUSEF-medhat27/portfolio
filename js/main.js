

// Portfolio Filter
const filterButtons = document.querySelectorAll('.portfolio-filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

const activeClasses = ['active', 'bg-linear-to-r', 'from-primary', 'to-secondary', 'text-white', 'hover:shadow-lg', 'hover:shadow-primary/50'];
const inactiveClasses = ['bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'hover:bg-slate-100', 'dark:hover:bg-slate-700', 'border', 'border-slate-300', 'dark:border-slate-700'];

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filterValue = button.getAttribute('data-filter');

    // ظبط شكل كل الأزرار (غير مختارة)
    filterButtons.forEach(btn => {
      btn.classList.remove(...activeClasses);
      btn.classList.add(...inactiveClasses);
      btn.setAttribute('aria-pressed', 'false');
    });

    // ظبط شكل الزرار المدوس عليه (مختار)
    button.classList.remove(...inactiveClasses);
    button.classList.add(...activeClasses);
    button.setAttribute('aria-pressed', 'true');

    // اظهار/اخفاء المشاريع حسب الفلتر
    portfolioItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (filterValue === 'all' || filterValue === itemCategory) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    mobileMenuBtn.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  });

  // اقفل القائمة لما تدوس على أي لينك جواها
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    });
  });
}

// Scrollspy - تفعيل اللينك المناسب في الناف بار حسب مكان السكرول
const sections = document.querySelectorAll('main section[id], #hero-section');
const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

const scrollSpyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  {
    // يعتبر السكشن "نشط" لما يوصل لمنتصف الشاشة تقريبًا
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  }
);

sections.forEach(section => scrollSpyObserver.observe(section));


// Dark Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle-button');
const htmlElement = document.documentElement;

// عند تحميل الصفحة: شوف هل فيه اختيار محفوظ قبل كده
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  htmlElement.classList.remove('dark');
  themeToggleBtn?.setAttribute('aria-pressed', 'false');
} else {
  // لو مفيش حاجة محفوظة، الوضع الافتراضي هو Dark (زي ما هو متظبط في الـ HTML)
  htmlElement.classList.add('dark');
  themeToggleBtn?.setAttribute('aria-pressed', 'true');
}

// عند الضغط على الزرار
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isDark = htmlElement.classList.toggle('dark');
    themeToggleBtn.setAttribute('aria-pressed', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}


// Testimonials Carousel
const carousel = document.getElementById('testimonials-carousel');
const nextBtn = document.getElementById('next-testimonial');
const prevBtn = document.getElementById('prev-testimonial');
const indicators = document.querySelectorAll('.carousel-indicator');
const totalCards = document.querySelectorAll('.testimonial-card').length;

let currentIndex = 0;

// يحدد كام كارت ظاهر في المرة حسب حجم الشاشة
function getVisibleCards() {
  if (window.innerWidth >= 1024) return 3;      // lg
  if (window.innerWidth >= 640) return 2;       // sm
  return 1;                                     // موبايل
}

function updateCarousel() {
  const visibleCards = getVisibleCards();
  const maxIndex = Math.max(0, totalCards - visibleCards);

  // منع الاندكس يعدي الحدود
  if (currentIndex > maxIndex) currentIndex = maxIndex;
  if (currentIndex < 0) currentIndex = 0;

  const cardWidthPercent = 100 / visibleCards;
  carousel.style.transform = `translateX(${currentIndex * cardWidthPercent}%)`;

  // تحديث شكل المؤشرات (النقط)
  indicators.forEach((dot, i) => {
    if (i === currentIndex) {
      dot.classList.add('bg-accent');
      dot.classList.remove('bg-slate-400', 'dark:bg-slate-600');
      dot.setAttribute('aria-selected', 'true');
    } else {
      dot.classList.remove('bg-accent');
      dot.classList.add('bg-slate-400', 'dark:bg-slate-600');
      dot.setAttribute('aria-selected', 'false');
    }
  });
}

nextBtn?.addEventListener('click', () => {
  const visibleCards = getVisibleCards();
  const maxIndex = Math.max(0, totalCards - visibleCards);
  currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
  updateCarousel();
});

prevBtn?.addEventListener('click', () => {
  const visibleCards = getVisibleCards();
  const maxIndex = Math.max(0, totalCards - visibleCards);
  currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
  updateCarousel();
});

indicators.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateCarousel();
  });
});

// إعادة الحساب لما حجم الشاشة يتغير
window.addEventListener('resize', updateCarousel);

// تشغيل أولي
updateCarousel(); 


// ************************************

var gear = document.querySelector("#settings-toggle");
var slider = document.querySelector(".slider");

gear.addEventListener("click", function () {
    slider.classList.toggle("show");
    gear.classList.toggle("move");
});


var colone = document.querySelector(".colourone")
var coltwo = document.querySelector(".colourtwo")
var colthree = document.querySelector(".colourthree")
var colfour = document.querySelector(".colourfour")
var colfive = document.querySelector(".colourfive")
var colsix = document.querySelector(".coloursix")
var hambozo = document.querySelector(".fa-code");

colone.addEventListener("click", function () {
    hambozo.style.backgroundImage ="linear-gradient(135deg, rgb(99, 102, 241), rgb(139, 92, 246))";
    

});

