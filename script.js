// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle?.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  if (body.classList.contains('light-mode')) {
    darkModeToggle.textContent = '🌑'; // moon to sun icon
  } else {
    darkModeToggle.textContent = '🌙';
  }
});

// Collapsible Sections
document.querySelectorAll('.collapsible').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    const content = button.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

// Quotes rotation on homepage
const quotes = [
  '"Discipline is the bridge between goals and accomplishment." – Jim Rohn',
  '"Strength does not come from physical capacity. It comes from an indomitable will." – Mahatma Gandhi',
  '"Victory belongs to the most persevering." – Napoleon Bonaparte',
  '"The harder the battle, the sweeter the victory." – Les Brown',
  '"Conquer yourself rather than the world." – René Descartes',
  '"Success is not final, failure is not fatal: it is the courage to continue that counts." – Winston Churchill',
  '"The only impossible journey is the one you never begin." – Tony Robbins'
];

const quoteContainer = document.getElementById('quoteContainer');
if (quoteContainer) {
  let currentQuote = 0;
  setInterval(() => {
    currentQuote = (currentQuote + 1) % quotes.length;
    quoteContainer.querySelector('.quote-text').textContent = quotes[currentQuote];
  }, 8000);
}

// Timetable Page: Task List & Progress
const timetableTasks = [
  "Morning Routine",
  "Breakfast (Meal 1)",
  "University Study Block 1",
  "Snack (Meal 2) & Break",
  "University Study Block 2",
  "Lunch (Meal 3) & Break",
  "TEFL Study Block",
  "Snack (Meal 4) & Break",
  "Forex Active Trading (1 hour)",
  "University Study Block 3",
  "Free Time / Call of Duty Mobile",
  "Dinner (Meal 5)",
  "Review & Plan for Tomorrow",
  "Evening Routine",
  "Stay hydrated - drink plenty of water"
];

function loadTasks() {
  const taskList = document.getElementById('taskList');
  if (!taskList) return;

  taskList.innerHTML = '';
  timetableTasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox" data-index="${i}"> ${task}</label>`;
    taskList.appendChild(li);
  });

  // Load saved state
  const saved = JSON.parse(localStorage.getItem('timetableTasks')) || {};
  taskList.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
    const idx = checkbox.dataset.index;
    checkbox.checked = saved[idx] || false;
    checkbox.addEventListener('change', () => {
      saved[idx] = checkbox.checked;
      localStorage.setItem('timetableTasks', JSON.stringify(saved));
      updateProgress();
    });
  });

  updateProgress();
}

function updateProgress() {
  const saved = JSON.parse(localStorage.getItem('timetableTasks')) || {};
  const total = timetableTasks.length;
  const completed = Object.values(saved).filter(Boolean).length;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const progressPercent = document.getElementById('progressPercent');
  const tasksCompleted = document.getElementById('tasksCompleted');
  const circle = document.querySelector('.circle');

  if (progressPercent) progressPercent.textContent = `${percent}%`;
  if (tasksCompleted) tasksCompleted.textContent = `${completed}/${total} tasks completed`;
  if (circle) {
    const dashArray = `${percent}, 100`;
    circle.setAttribute('stroke-dasharray', dashArray);
  }
}

// Forex Page: Trading Checklist
function loadForexTasks() {
  const forexTaskLists = ['preTradeList', 'duringTradeList', 'postTradeList'];
  
  forexTaskLists.forEach(listId => {
    const taskList = document.getElementById(listId);
    if (!taskList) return;
    
    // Load saved state for forex tasks
    const saved = JSON.parse(localStorage.getItem('forexTasks')) || {};
    taskList.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
      const category = checkbox.dataset.category;
      const taskText = checkbox.parentElement.textContent.trim();
      const key = `${category}-${taskText}`;
      checkbox.checked = saved[key] || false;
      checkbox.addEventListener('change', () => {
        saved[key] = checkbox.checked;
        localStorage.setItem('forexTasks', JSON.stringify(saved));
        updateForexProgress();
      });
    });
  });

  updateForexProgress();
}

function updateForexProgress() {
  const saved = JSON.parse(localStorage.getItem('forexTasks')) || {};
  const allForexTasks = document.querySelectorAll('.forex-task');
  const total = allForexTasks.length;
  const completed = Array.from(allForexTasks).filter(task => {
    const category = task.dataset.category;
    const taskText = task.parentElement.textContent.trim();
    const key = `${category}-${taskText}`;
    return saved[key];
  }).length;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const progressPercent = document.getElementById('forexProgressPercent');
  const tasksCompleted = document.getElementById('forexTasksCompleted');
  const circle = document.querySelector('.forex-hero .circle');

  if (progressPercent) progressPercent.textContent = `${percent}%`;
  if (tasksCompleted) tasksCompleted.textContent = `${completed}/${total} tasks completed`;
  if (circle) {
    const dashArray = `${percent}, 100`;
    circle.setAttribute('stroke-dasharray', dashArray);
  }
}

// Performance Page: Track progress bars for groups
function loadPerformanceTasks() {
  const perfTasks = document.querySelectorAll('.perf-task');
  if (!perfTasks.length) return;

  // Load saved state
  const saved = JSON.parse(localStorage.getItem('performanceTasks')) || {};
  perfTasks.forEach(cb => {
    const key = cb.dataset.group + '-' + cb.parentElement.textContent.trim();
    cb.checked = saved[key] || false;
    cb.addEventListener('change', () => {
      saved[key] = cb.checked;
      localStorage.setItem('performanceTasks', JSON.stringify(saved));
      updatePerformanceProgress();
    });
  });

  updatePerformanceProgress();
}

function updatePerformanceProgress() {
  const saved = JSON.parse(localStorage.getItem('performanceTasks')) || {};
  const groups = ['trading', 'tefl', 'unisa', 'weight'];
  const container = document.getElementById('performanceProgressBars');
  if (!container) return;

  container.innerHTML = '';

  groups.forEach(group => {
    const groupTasks = Array.from(document.querySelectorAll(`.perf-task[data-group="${group}"]`));
    const total = groupTasks.length;
    const completed = groupTasks.filter(cb => saved[cb.dataset.group + '-' + cb.parentElement.textContent.trim()]).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    const barWrapper = document.createElement('div');
    barWrapper.className = 'progress-bar-container';

    const label = document.createElement('div');
    label.className = 'progress-label';
    label.textContent = `${group.charAt(0).toUpperCase() + group.slice(1)} Progress: ${percent}%`;

    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.style.width = percent + '%';

    barWrapper.appendChild(label);
    barWrapper.appendChild(bar);
    container.appendChild(barWrapper);
  });
}

// Add smooth scrolling for anchor links
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

// Add loading animation for interactive elements
function addLoadingAnimation() {
  const cards = document.querySelectorAll('.feature-card, .forex-card, .principle-card, .tip-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  loadForexTasks();
  loadPerformanceTasks();
  addLoadingAnimation();
  
  // Add click effects to buttons
  document.querySelectorAll('button, .feature-link').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

