// Set the timeout period (in minutes)
import router from './router/index'

const TIMEOUT_PERIOD = 1;

// Set a timer to expire the session after the timeout period
let sessionTimer = setTimeout(() => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  localStorage.removeItem('businessConditions');
  localStorage.removeItem('accessRights');
  // Redirect the user to the login page
//   window.location.href = '/login';
  router.push('/login');
}, TIMEOUT_PERIOD * 2700 * 1000);

// Reset the timer whenever the user interacts with the app
document.addEventListener('mousemove', resetSessionTimer);
document.addEventListener('keydown', resetSessionTimer);

// Reset the session timer function
export default function resetSessionTimer() {
  clearTimeout(sessionTimer);
  sessionTimer = setTimeout(() => {
    // Remove the authentication token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('businessConditions');
    localStorage.removeItem('accessRights');
    // Redirect the user to the login page
    router.push('/login');
  }, TIMEOUT_PERIOD * 2700 * 1000);
}