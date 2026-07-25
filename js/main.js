

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