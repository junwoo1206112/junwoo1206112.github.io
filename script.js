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

const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    : null;

const industrialProjects = [
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
        title: 'Deep Learning Portfolio',
        repo: 'deep-learning-portfolio',
        summary: '제조 공정 센서와 결함 데이터를 LSTM, GRU, Transformer, CNN, Autoencoder, VAE로 실험한 딥러닝 포트폴리오입니다.',
        detail: '예측, 불량 분류, 이상 탐지까지 여러 딥러닝 접근을 한 저장소에서 보여주며 제조 데이터 분석 역량을 보강합니다.',
        tags: ['Python', 'Deep Learning', 'Manufacturing', 'Anomaly'],
        category: 'Deep Learning',
        accent: 'purple'
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

const gameProjects = [
    {
        title: 'Multiplay Fishing Game',
        repo: 'MultiplayFishingGame',
        summary: 'Unity와 Mirror Networking을 활용해 멀티플레이 낚시 게임의 동기화와 플레이 흐름을 구현한 프로젝트입니다.',
        detail: '네트워크 플레이, 플레이어 상호작용, Unity C# 구조를 보여줄 수 있어 게임 회사 지원 시 가장 먼저 제시하기 좋은 게임 프로젝트입니다.',
        tags: ['Unity', 'C#', 'Mirror', 'Multiplayer'],
        category: 'Game Network',
        accent: 'blue'
    },
    {
        title: 'Realm Commander',
        repo: 'RealmCommander',
        summary: '전략/시뮬레이션 장르의 게임 시스템을 구성하며 상태, 명령, 플레이 흐름을 정리한 프로젝트입니다.',
        detail: '게임 규칙과 시스템 설계 경험을 보여주는 보조 포트폴리오로, 단순 미니게임보다 기획과 구조 설명에 유리합니다.',
        tags: ['Game System', 'C#', 'Simulation', 'Design'],
        category: 'Game System',
        accent: 'purple'
    },
    {
        title: 'LLM NPC Dialogue System',
        repo: 'LLM-NPC-Dialogue-System',
        summary: 'NPC 대화 흐름에 LLM 활용 아이디어를 접목한 게임 AI 대화 시스템 프로젝트입니다.',
        detail: '게임과 AI를 연결해 보여줄 수 있어, 게임 회사뿐 아니라 AI 서비스 회사에도 보조 자료로 활용하기 좋습니다.',
        tags: ['Game AI', 'LLM', 'Dialogue', 'Prototype'],
        category: 'Game AI',
        accent: 'teal'
    },
    {
        title: 'POKO AI Worldview Simulator',
        repo: 'POKO-AI-Worldview-Simulator',
        summary: '세계관과 에이전트 흐름을 실험하는 C# 기반 시뮬레이션 게임 프로토타입입니다.',
        detail: '단순 미니게임을 넘어 세계 상태, 규칙, 행동 흐름을 설계하는 경험을 보여주는 게임 시스템 프로젝트입니다.',
        tags: ['C#', 'Simulation', 'Game AI', 'Worldview'],
        category: 'Simulation',
        accent: 'green'
    },
    {
        title: 'Text Adventure Game',
        repo: 'Text-Adventure-Game',
        summary: 'Unity C# 기반 텍스트 어드벤처 게임 엔진 프로젝트입니다.',
        detail: '텍스트 기반 장면 흐름, 명령 입력, 재사용 가능한 게임 구조를 정리한 엔진형 보조 프로젝트입니다.',
        tags: ['Unity', 'C#', 'Game Engine', 'Narrative'],
        category: 'Game Engine',
        accent: 'orange'
    },
    {
        title: 'Worldview Simulation Agent',
        repo: 'Designing-a-Worldview-Simulation-Agent',
        summary: '세계관 기반 시뮬레이션 에이전트 설계를 실험한 Python 프로젝트입니다.',
        detail: '에이전트 설계, 규칙 모델링, 시뮬레이션 구조를 Python으로 탐색한 프로젝트로 게임 AI 설명을 보강합니다.',
        tags: ['Python', 'Agent', 'Simulation', 'Design'],
        category: 'Agent Design',
        accent: 'red'
    },
    {
        title: 'A World View Simulation',
        repo: 'A-World-View-Simulation',
        summary: '세계 상태와 규칙 기반 시뮬레이션을 탐색한 초기 저장소입니다.',
        detail: '이후 게임과 에이전트 프로젝트로 이어지는 세계관 시뮬레이션 개념 실험을 보여주는 보조 프로젝트입니다.',
        tags: ['Simulation', 'World Model', 'Prototype'],
        category: 'Simulation',
        accent: 'purple'
    }
];

const webProjects = [
    {
        title: 'CS Response Draft Tool',
        repo: 'cs-response-draft-tool',
        summary: '고객 문의를 분석해 응대 가이드와 답변 초안을 생성하는 웹 기반 업무 자동화 도구입니다.',
        detail: '반복적인 CS 응대 초안 작성 과정을 구조화하고, 입력 내용에 따라 톤과 답변 방향을 정리하는 실무형 웹 도구입니다.',
        tags: ['Web App', 'Automation', 'CS', 'AI Assist'],
        category: 'Web Automation',
        accent: 'blue'
    },
    {
        title: 'Nara Bidding',
        repo: 'nara-bidding',
        summary: '조달청 나라장터 공공데이터 API를 활용해 입찰공고를 조회하는 풀스택 웹 프로젝트입니다.',
        detail: '공공 API 연동, 검색 조회 흐름, 데이터 표시 화면을 구현한 프로젝트로 외부 데이터를 사용자가 검토하기 쉬운 형태로 정리합니다.',
        tags: ['Web', 'Public API', 'Data', 'Search'],
        category: 'Data Web',
        accent: 'green'
    },
    {
        title: 'June Toss Vibe Coding',
        repo: 'June-Toss-Vibe-Coding',
        summary: '사용자 상황에 맞춰 음식을 추천하는 미니앱 형태의 웹 프로젝트입니다.',
        detail: '간단한 사용자 선택 흐름과 추천 결과 화면을 구성한 프로젝트로 모바일 친화 UI와 서비스 흐름 구현 경험을 보여줍니다.',
        tags: ['Mini App', 'Recommendation', 'UI', 'Web'],
        category: 'Mini App',
        accent: 'teal'
    },
    {
        title: 'Roomie AI',
        repo: 'Roomie-AI-',
        summary: '방 사진과 사용자 조건을 바탕으로 인테리어 스타일과 배치를 제안하는 AI 서비스형 프로젝트입니다.',
        detail: '사용자 입력, 이미지/공간 조건, 추천 결과를 연결하는 서비스 기획과 구현 경험을 보여줍니다.',
        tags: ['AI Service', 'Web', 'UX', 'Recommendation'],
        category: 'AI Web',
        accent: 'purple'
    },
    {
        title: 'Psychological Counseling',
        repo: 'Psychological-Counseling',
        summary: '심리 체크와 상담 흐름을 웹에서 제공하는 사용자 중심 서비스 프로젝트입니다.',
        detail: '자가 진단, 질문 흐름, 결과 안내처럼 사용자 입력을 받아 화면과 결과를 구성하는 웹 서비스 경험을 보여줍니다.',
        tags: ['Web Service', 'Survey', 'UX', 'Health'],
        category: 'Service Web',
        accent: 'orange'
    },
    {
        title: 'Portfolio Website',
        repo: 'junwoo1206112.github.io',
        summary: 'GitHub 프로젝트를 분야별로 선별해 보여주는 공용 포트폴리오 웹사이트입니다.',
        detail: '제조·AI, 웹, 게임 프로젝트를 한 곳에서 확인할 수 있도록 구성한 정적 포트폴리오 사이트입니다.',
        tags: ['Portfolio', 'HTML', 'CSS', 'JavaScript'],
        category: 'Portfolio',
        accent: 'red'
    },
    {
        title: 'WebBoard',
        repo: 'WebBoard',
        summary: '게시판 형태의 웹 애플리케이션 구조를 연습한 JavaScript 프로젝트입니다.',
        detail: '기본 웹 화면 구성, 브라우저 상호작용, 게시판형 콘텐츠 흐름을 보여주는 웹 기초 프로젝트입니다.',
        tags: ['JavaScript', 'Web', 'Board', 'CRUD'],
        category: 'Web Foundation',
        accent: 'green'
    }
];

const casualGameProjects = [
    {
        title: 'Snowman Crowd Runner',
        repo: 'SnowmanCount',
        summary: 'Unity 기반 캐주얼 러너/카운트 게임 프로토타입입니다. 스와이프 이동, 게이트 계산, 팔로워 군중, 장애물, 적 그룹, 보스전, 레벨 데이터 파이프라인을 정리했습니다.',
        detail: 'Count Masters류 하이퍼캐주얼 구조를 연습한 프로젝트로, 데이터 기반 레벨 구성과 군중/장애물/전투 루프를 보여주는 보조 게임 포트폴리오입니다.',
        tags: ['Unity', 'C#', 'Casual Runner', 'Data'],
        category: 'Casual Prototype',
        accent: 'orange'
    },
    {
        title: 'Caterpillar Clicker',
        repo: 'CaterpillarsClickerGame01',
        summary: 'Unity 기반 클릭커 게임 프로토타입입니다. 터치 입력, 점수/아이템 루프, 터치 기능 모듈, 캐릭터 진화와 UI 구성을 정리했습니다.',
        detail: '클릭커 장르의 반복 성장 루프와 데이터/ScriptableObject 기반 기능 확장을 보여주는 보조 캐주얼 게임 포트폴리오입니다.',
        tags: ['Unity', 'C#', 'Clicker', 'ScriptableObject'],
        category: 'Casual Prototype',
        accent: 'green'
    },
    {
        title: 'Raising a Snowman',
        repo: 'Raising-a-Snowman',
        summary: '눈사람을 키우는 흐름을 중심으로 한 Unity C# 캐주얼 게임 프로토타입입니다.',
        detail: '성장형 캐주얼 게임 루프, 오브젝트 상호작용, 간단한 상태 관리를 보여주는 보조 프로젝트입니다.',
        tags: ['Unity', 'C#', 'Casual', 'Progression'],
        category: 'Casual Prototype',
        accent: 'blue'
    },
    {
        title: 'New Fighter Scroll Game',
        repo: 'New-Fighter-Scroll-Game',
        summary: '횡스크롤 액션 게임의 기본 구조를 연습한 C# 프로토타입입니다.',
        detail: '플레이어 이동, 액션 게임 흐름, Unity/C# 기반 게임 구조 연습을 보여주는 보조 프로젝트입니다.',
        tags: ['Unity', 'C#', 'Action', 'Side Scroll'],
        category: 'Action Prototype',
        accent: 'red'
    },
    {
        title: 'Scroll',
        repo: 'Scroll',
        summary: '스크롤 방식의 이동과 화면 흐름을 연습한 C# 게임 프로토타입입니다.',
        detail: '작은 규모의 Unity/C# 저장소지만 캐주얼 및 액션 게임 개발 경험을 보완하는 프로젝트입니다.',
        tags: ['C#', 'Scrolling', 'Prototype'],
        category: 'Game Prototype',
        accent: 'purple'
    },
    {
        title: 'Poco',
        repo: 'poco',
        summary: 'C# 기반 프로그래밍 및 게임 개발 연습을 담은 보조 저장소입니다.',
        detail: '공개 GitHub 프로젝트 전체를 포트폴리오에서 빠짐없이 확인할 수 있도록 포함한 C# 연습 프로젝트입니다.',
        tags: ['C#', 'Practice', 'Prototype'],
        category: 'C# Practice',
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

renderProjects('featured-grid', industrialProjects.slice(0, 3), true);
renderProjects('portfolio-grid', industrialProjects, false);
renderProjects('web-preview-grid', webProjects.slice(0, 3), true);
renderProjects('web-grid', webProjects, false);
renderProjects('game-preview-grid', gameProjects.slice(0, 2), true);
renderProjects('game-grid', gameProjects, false);
renderProjects('casual-game-grid', casualGameProjects, false);

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
