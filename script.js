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
  "BA Study Block 1",
  "Snack (Meal 2) & Break",
  "BA Study Block 2",
  "Lunch (Meal 3) & Break",
  "TEFL Study Block",
  "Snack (Meal 4) & Break",
  "BA Study Block 3",
  "Free Time / Call of Duty Mobile",
  "Dinner (Meal 5)",
  "Review & Plan for Tomorrow",
  "Evening Routine",
  "Sleep (8 hours)",
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

// Fitness Page: Checklist and Countdown Timer
const fitnessTasks = [
  "Upper Body & Core Focus Session",
  "Lower Body Focus Session",
  "Full Body or Active Recovery",
  "Endurance Run / Cross-Training",
  "Stretching & Mobility Work"
];

function loadFitnessTasks() {
  const fitnessTaskList = document.getElementById('fitnessTaskList');
  if (!fitnessTaskList) return;

  fitnessTaskList.innerHTML = '';
  fitnessTasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox" data-index="${i}"> ${task}</label>`;
    fitnessTaskList.appendChild(li);
  });

  // Load saved state
  const saved = JSON.parse(localStorage.getItem('fitnessTasks')) || {};
  fitnessTaskList.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
    const idx = checkbox.dataset.index;
    checkbox.checked = saved[idx] || false;
    checkbox.addEventListener('change', () => {
      saved[idx] = checkbox.checked;
      localStorage.setItem('fitnessTasks', JSON.stringify(saved));
    });
  });
}

// Countdown Timer to Comrades Marathon (assumed date: June 1, 2027)
function startCountdown() {
  const countdownEl = document.getElementById('countdownTimer');
  if (!countdownEl) return;

  const targetDate = new Date('2027-06-01T06:00:00'); // Adjust as needed

  function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownEl.textContent = "Race Day is Here! Good Luck!";
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `${days}d ${hrs}h ${mins}m ${secs}s`;
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  loadPerformanceTasks();
  loadFitnessTasks();
  startCountdown();
});
