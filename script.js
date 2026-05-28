const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

function observeElements(selector) {
    document.querySelectorAll(selector).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

observeElements('.skill-tag, .contact-item');

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('메시지가 전송되었습니다! (데모)');
        contactForm.reset();
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

const GITHUB_USERNAME = 'junwoo1206112';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

const emojis = ['🎮', '📱', '🤖', '🎨', '🚀', '🌐', '🔧', '⚙️', '📊', '💼'];
const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
];

async function fetchRepos() {
    const res = await fetch(GITHUB_API);
    if (!res.ok) throw new Error('GitHub API 요청 실패');
    const repos = await res.json();
    const exclude = ['WebBoard', 'test01', 'Raising-a-Snowman'];
    return repos.filter(r => !r.fork && !exclude.includes(r.name));
}

function createProjectCard(repo, index) {
    const languages = repo.language ? [repo.language] : [];
    const topics = repo.topics || [];
    const allTags = [...languages, ...topics].slice(0, 4);
    const emoji = emojis[index % emojis.length];
    const grad = gradients[index % gradients.length];

    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <a href="${repo.html_url}" target="_blank" style="text-decoration: none; color: inherit;">
            <div class="project-image" style="background: ${grad}; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">${emoji}</div>
            <h3>${repo.name}</h3>
            <p>${repo.description || '프로젝트 설명이 없습니다.'}</p>
            <div class="tags">
                ${allTags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </a>
    `;
    return card;
}

const featuredGrid = document.getElementById('featured-grid');
if (featuredGrid) {
    (async () => {
        try {
            const repos = await fetchRepos();
            featuredGrid.innerHTML = '';
            repos.slice(0, 3).forEach((repo, i) => {
                const card = createProjectCard(repo, i);
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                featuredGrid.appendChild(card);
                observer.observe(card);
            });
        } catch {
            featuredGrid.innerHTML = '<p class="no-projects">프로젝트를 불러올 수 없습니다.</p>';
        }
    })();
}

const portfolioGrid = document.getElementById('portfolio-grid');
if (portfolioGrid) {
    (async () => {
        try {
            const repos = await fetchRepos();
            portfolioGrid.innerHTML = '';
            if (repos.length === 0) {
                portfolioGrid.innerHTML = '<p class="no-projects">공개된 프로젝트가 없습니다.</p>';
                return;
            }
            repos.forEach((repo, i) => {
                const languages = repo.language ? [repo.language] : [];
                const topics = repo.topics || [];
                const allTags = [...languages, ...topics].slice(0, 4);
                const emoji = emojis[i % emojis.length];

                const item = document.createElement('div');
                item.className = 'portfolio-item';
                item.innerHTML = `
                    <a href="${repo.html_url}" target="_blank" style="text-decoration: none; color: inherit;">
                        <div class="item-image">${emoji}</div>
                        <h3>${repo.name}</h3>
                        <p>${repo.description || '프로젝트 설명이 없습니다.'}</p>
                        <div class="tags">
                            ${allTags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </a>
                `;
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                portfolioGrid.appendChild(item);
                observer.observe(item);
            });
        } catch {
            portfolioGrid.innerHTML = '<p class="no-projects">프로젝트를 불러올 수 없습니다.</p>';
        }
    })();
}
