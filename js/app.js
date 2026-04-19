// ---------- Status bar clock ----------
function updateStatusClock() {
  const now = new Date();
  document.getElementById('statusTime').textContent =
    now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}
updateStatusClock();
setInterval(updateStatusClock, 30000);

// ---------- User database ----------
const USERS = {
  '9767676738': { name: 'Coach Rajesh', roles: ['coach'] },
  '7666680066': { name: 'Dev Wadhwani', roles: ['learner'] },
  '7972122827': { name: 'Arjun Mehta', roles: ['coach', 'learner'] }
};

const PASSWORD = '0000';

// ---------- Screen helpers ----------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ---------- Login ----------
document.getElementById('btnLogin').addEventListener('click', () => {
  const phone = document.getElementById('inputPhone').value.trim();
  const pass  = document.getElementById('inputPassword').value;
  const err   = document.getElementById('loginError');

  err.classList.remove('show');

  if (!USERS[phone] || pass !== PASSWORD) {
    err.textContent = 'Invalid mobile number or password';
    err.classList.add('show');
    return;
  }

  const user = USERS[phone];

  if (user.roles.length > 1) {
    // Show role selection
    showScreen('screenRole');
  } else if (user.roles[0] === 'coach') {
    showScreen('screenCoach');
  } else {
    showScreen('screenLearner');
  }
});

// ---------- Role Selection ----------
document.getElementById('roleCoach').addEventListener('click', () => showScreen('screenCoach'));
document.getElementById('roleLearner').addEventListener('click', () => showScreen('screenLearner'));

// ---------- Register (placeholder) ----------
document.getElementById('btnRegister').addEventListener('click', () => {
  alert('Registration flow coming soon! For now, use one of the demo accounts.');
});

// ---------- Logout ----------
function logout() {
  document.getElementById('inputPhone').value = '';
  document.getElementById('inputPassword').value = '';
  document.getElementById('loginError').classList.remove('show');
  showScreen('screenLogin');
}

document.getElementById('logoutCoach').addEventListener('click', logout);
document.getElementById('logoutLearner').addEventListener('click', logout);
