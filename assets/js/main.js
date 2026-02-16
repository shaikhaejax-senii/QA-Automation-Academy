/**
 * QA Automation Academy - Main Script
 * Handles: Theme toggle, Component loading, Mobile menu
 */

// --- Constants ---
const THEME_KEY = 'qa-academy-theme';
const COMPONENTS = {
    header: '/components/header.html',
    footer: '/components/footer.html'
};

// --- Theme Management ---
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    const isDark = document.documentElement.classList.contains('dark');
    // Simple SVG icons for Sun/Moon
    themeToggleBtn.innerHTML = isDark
        ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>'
        : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';
    themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
}

// --- Component Loading ---
async function loadComponent(id, url) {
    const element = document.getElementById(id);
    if (!element) return;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        const html = await response.text();
        element.innerHTML = html;

        // Re-initialize scripts that might depend on these components
        if (id === 'header-container') {
            updateThemeIcon();
            const btn = document.getElementById('theme-toggle');
            if (btn) btn.addEventListener('click', toggleTheme);

            // Mobile Menu Logic
            const menuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            if (menuBtn && mobileMenu) {
                menuBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // Highlight active link
            const currentPath = window.location.pathname;
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('text-blue-600', 'dark:text-blue-400', 'font-semibold');
                }
            });
        }
    } catch (error) {
        console.error(`Error loading component ${id}:`, error);
    }
}

// --- Scroll Progress & Back to Top ---
function initScrollFeatures() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.className = 'fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-100 ease-out';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);

    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.className = 'fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 z-40 hover:bg-blue-700 focus:outline-none';
    backToTopBtn.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>';
    backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';

        if (scrollTop > 300) {
            backToTopBtn.classList.remove('opacity-0');
            backToTopBtn.classList.add('opacity-100');
        } else {
            backToTopBtn.classList.remove('opacity-100');
            backToTopBtn.classList.add('opacity-0');
        }

        // TOC Highlighting
        highlightTOC();
    });
}

function highlightTOC() {
    const headings = document.querySelectorAll('main h2, main h3');
    const tocLinks = document.querySelectorAll('aside nav a');

    if (headings.length === 0 || tocLinks.length === 0) return;

    let currentSection = '';

    headings.forEach(heading => {
        const sectionTop = heading.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            currentSection = heading.getAttribute('id');
        }
    });

    tocLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-bold', 'border-l-2', 'border-blue-600');
        link.classList.add('text-gray-600', 'dark:text-gray-400');

        if (link.getAttribute('href').includes(currentSection) && currentSection !== '') {
            link.classList.add('text-blue-600', 'dark:text-blue-400', 'font-bold', 'border-l-2', 'border-blue-600');
            link.classList.remove('text-gray-600', 'dark:text-gray-400');
        }
    });
}

// --- Sidebar Logic (Mobile Slide-out) ---
function initSidebar() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const closeBtn = document.getElementById('sidebar-close');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (!toggleBtn || !sidebar) return;

    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        if (overlay) overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
        if (overlay) {
            overlay.classList.add('hidden');
        }
        document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', openSidebar);

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Close on simple link click (if on mobile)
    const links = sidebar.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) { // lg breakpoint
                closeSidebar();
            }
        });
    });
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadComponent('header-container', '/components/header.html');
    loadComponent('footer-container', '/components/footer.html');
    initScrollFeatures();
    initSidebar();
});

// --- Utility: Copy Code ---
window.copyCode = function (btn) {
    const code = btn.nextElementSibling.innerText;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => {
            btn.innerText = originalText;
        }, 2000);
    });
};
