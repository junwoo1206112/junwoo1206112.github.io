// 모바일 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 현재 페이지 하이라이트
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// 스크롤 애니메이션
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

// 프로젝트 카드 애니메이션
document.querySelectorAll('.project-card, .portfolio-item, .skill-tag, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 스킬 태그 스타일 적용
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillTags = skillsSection.querySelectorAll('div');
    skillTags.forEach(tag => {
        tag.classList.add('skill-tags');
        const tags = tag.querySelectorAll('div');
        tags.forEach(t => t.classList.add('skill-tag'));
    });
}

// 폼 제출 처리 (데모)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('메시지가 전송되었습니다! (데모)');
        contactForm.reset();
    });
}

// 부드러운 스크롤
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

// 헤더 스크롤 효과
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

console.log('포트폴리오 웹사이트가 로드되었습니다!');

// GitHub 프로젝트 로드
const GITHUB_USERNAME = 'kimjunwoo1206112-oss';
const portfolioGrid = document.getElementById('portfolio-grid');

if (portfolioGrid) {
    async function loadGitHubProjects() {
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
            
            if (!response.ok) {
                throw new Error('GitHub API 요청 실패');
            }
            
            const repos = await response.json();
            
            portfolioGrid.innerHTML = '';
            
            if (repos.length === 0) {
                portfolioGrid.innerHTML = '<p class="no-projects">공개된 프로젝트가 없습니다.</p>';
                return;
            }
            
            const emojis = ['📱', '💼', '📊', '🎨', '🚀', '🤖', '🎮', '🌐', '🔧', '⚙️'];
            
            repos.forEach((repo, index) => {
                if (repo.fork) return;
                
                const emoji = emojis[index % emojis.length];
                const languages = repo.language ? [repo.language] : [];
                const topics = repo.topics || [];
                const allTags = [...languages, ...topics].slice(0, 4);
                
                const card = document.createElement('div');
                card.className = 'portfolio-item';
                card.innerHTML = `
                    <a href="${repo.html_url}" target="_blank" style="text-decoration: none; color: inherit;">
                        <div class="item-image">${emoji}</div>
                        <h3>${repo.name}</h3>
                        <p>${repo.description || '프로젝트 설명이 없습니다.'}</p>
                        <div class="tags">
                            ${allTags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </a>
                `;
                
                portfolioGrid.appendChild(card);
            });
            
            if (portfolioGrid.children.length === 0) {
                portfolioGrid.innerHTML = '<p class="no-projects">공개된 프로젝트가 없습니다.</p>';
            }
            
        } catch (error) {
            console.error('프로젝트 로드 실패:', error);
            portfolioGrid.innerHTML = '<p class="no-projects">프로젝트를 불러올 수 없습니다.</p>';
        }
    }
    
    loadGitHubProjects();
}
