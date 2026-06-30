const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
};

const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions)
    : null;

const projects = [
    {
        title: 'Semiconductor Defect Vision Classifier',
        repo: 'Semiconductor-Defect-Vision-Classifier',
        summary: '반도체 결함 이미지를 생성하고 특징을 추출한 뒤 softmax classifier로 결함 유형을 분류하는 Python 프로젝트입니다.',
        detail: '데이터 생성, 학습, 평가, 혼동행렬, CSV 리포트까지 포함해 신입 포트폴리오에서 검증 흐름을 보여주기 좋습니다.',
        tags: ['Python', 'Computer Vision', 'ML', 'CSV Report'],
        category: 'AI Vision',
        accent: 'blue'
    },
    {
        title: 'Industrial AOI Vision Inspector',
        repo: 'Industrial-AOI-Vision-Inspector',
        summary: '제조 라인 AOI 검사를 가정해 ROI, 임계값, 연결요소 분석, PASS/FAIL 판정을 구현한 비전 검사 시뮬레이터입니다.',
        detail: '검사 파라미터와 결과 리포트를 함께 남겨 제조 자동화 회사 지원용으로 설명하기 좋습니다.',
        tags: ['C#', 'AOI', 'Vision', 'Inspection'],
        category: 'Manufacturing',
        accent: 'green'
    },
    {
        title: 'GTS Control Monitor',
        repo: 'GTS-Control-Monitor',
        summary: '제조 장비의 위치 제어, 센서 상태, 알람, 운전 로그를 콘솔 기반으로 재현한 C# 장비 제어 시뮬레이터입니다.',
        detail: 'PID 제어와 CSV 로그를 통해 장비 소프트웨어의 기본 흐름을 보여주는 대표 프로젝트입니다.',
        tags: ['C#', 'PID', 'Equipment', 'Logging'],
        category: 'Equipment Control',
        accent: 'orange'
    },
    {
        title: 'Manufacturing ML Portfolio',
        repo: 'manufacturing-ml-portfolio',
        summary: '제조 데이터를 활용한 머신러닝 분석 흐름을 정리한 프로젝트입니다.',
        detail: '제조·품질 데이터를 다루는 회사에 보조 포트폴리오로 제시하기 좋습니다.',
        tags: ['Python', 'ML', 'Manufacturing', 'Analysis'],
        category: 'Data',
        accent: 'purple'
    },
    {
        title: 'AegisFlow NIDS',
        repo: 'AegisFlow-NIDS',
        summary: '네트워크 침입 탐지 흐름을 실험하고 결과를 정리한 보안·AI 프로젝트입니다.',
        detail: 'AI 활용 범위를 제조 비전 외 보안 영역까지 확장해 보여줄 수 있습니다.',
        tags: ['Python', 'Security', 'NIDS', 'AI'],
        category: 'Security',
        accent: 'red'
    },
    {
        title: 'Roomie AI',
        repo: 'Roomie-AI-',
        summary: '사용자 입력을 기반으로 생활 보조형 AI 기능을 구성한 애플리케이션 프로젝트입니다.',
        detail: 'AI 서비스 기획과 구현 경험을 보여주는 보조 프로젝트로 활용할 수 있습니다.',
        tags: ['AI', 'App', 'UX', 'Prototype'],
        category: 'AI Service',
        accent: 'teal'
    }
];

function githubUrl(repo) {
    return `https://github.com/junwoo1206112/${repo}`;
}

function createProjectCard(project, index, compact = false) {
    const card = document.createElement('article');
    card.className = `project-card fade-in accent-${project.accent}`;
    card.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;

    card.innerHTML = `
        <a href="${githubUrl(project.repo)}" target="_blank" rel="noreferrer">
            <div class="project-topline">
                <span>${project.category}</span>
                <strong>${String(index + 1).padStart(2, '0')}</strong>
            </div>
            <h3>${project.title}</h3>
            <p>${compact ? project.summary : project.detail}</p>
            <div class="tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </a>
    `;

    return card;
}

function renderProjects(targetId, items, compact = false) {
    const target = document.getElementById(targetId);
    if (!target) return;

    target.innerHTML = '';

    items.forEach((project, index) => {
        const card = createProjectCard(project, index, compact);
        target.appendChild(card);

        if (observer) {
            observer.observe(card);
        } else {
            card.classList.add('is-visible');
        }
    });
}

renderProjects('featured-grid', projects.slice(0, 3), true);
renderProjects('portfolio-grid', projects, false);

document.querySelectorAll('.skill-tag, .contact-item, .page-content').forEach(el => {
    el.classList.add('fade-in');
    if (observer) {
        observer.observe(el);
    } else {
        el.classList.add('is-visible');
    }
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
});
