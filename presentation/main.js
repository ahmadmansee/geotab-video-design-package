const slides = Array.from(document.querySelectorAll('.slide'));
const navigation = document.querySelector('.deck-nav');
const position = document.getElementById('nav-position');
const previous = document.getElementById('previous-slide');
const next = document.getElementById('next-slide');

const formatCount = (index) => String(index + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');

slides.forEach((slide, index) => {
  const count = slide.querySelector('.slide-count');
  if (count) count.textContent = formatCount(index);
});

navigation.hidden = slides.length < 2;

if (slides.length > 1) {
  function currentIndex() {
    const midpoint = window.scrollY + window.innerHeight / 2;
    const visibleIndex = slides.findIndex(slide => midpoint >= slide.offsetTop && midpoint < slide.offsetTop + slide.offsetHeight);
    return visibleIndex < 0 ? slides.length - 1 : visibleIndex;
  }

  function updateNavigation() {
    const index = currentIndex();
    position.textContent = formatCount(index);
    previous.disabled = index === 0;
    next.disabled = index === slides.length - 1;
  }

  function goToSlide(index) {
    slides[Math.max(0, Math.min(slides.length - 1, index))].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  previous.addEventListener('click', () => goToSlide(currentIndex() - 1));
  next.addEventListener('click', () => goToSlide(currentIndex() + 1));
  document.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(event.key)) return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    event.preventDefault();
    goToSlide(currentIndex() + (event.key === 'ArrowDown' || event.key === 'PageDown' ? 1 : -1));
  });
  window.addEventListener('scroll', updateNavigation, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();
}

const workflowStages = [
  {
    title: 'Frame the task',
    text: 'I read the brief, then used GPT to draft and revise the PRD, design brief, and working notes before sketching.',
    artifacts: ['Brief', 'GPT', 'PRD', 'Design brief']
  },
  {
    title: 'Test the first ideas',
    text: 'I tried AI-generated homepage directions. Their hierarchy and UI did not feel right for this task, so I moved into Figma.',
    artifacts: ['GPT', 'Home variants', 'Critique']
  },
  {
    title: 'Design the direction',
    text: 'I designed the homepage in high fidelity in Figma and used it to set the direction for the rest of the app.',
    artifacts: ['Figma', 'Home design']
  },
  {
    title: 'Build and refine',
    text: 'I translated the Figma home into HTML, then explored Events and Fleet in low fidelity before refining the screens.',
    artifacts: ['HTML', 'Events wireframe', 'Fleet wireframe']
  }
];
const workflowTrack = document.querySelector('.workflow-track');
if (workflowTrack) {
  const steps = Array.from(workflowTrack.querySelectorAll('.workflow-step'));
  steps.forEach((step, index) => step.addEventListener('click', () => {
    const stage = workflowStages[index];
    steps.forEach((item, itemIndex) => {
      const active = itemIndex === index;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    workflowTrack.style.setProperty('--progress', `${12.5 + 25 * index}%`);
    document.getElementById('workflow-detail-number').textContent = `${String(index + 1).padStart(2, '0')} / 04`;
    document.getElementById('workflow-detail-title').textContent = stage.title;
    document.getElementById('workflow-detail-text').textContent = stage.text;
    document.getElementById('workflow-detail-artifacts').replaceChildren(...stage.artifacts.map(label => {
      const chip = document.createElement('span');
      chip.textContent = label;
      return chip;
    }));
  }));
}

