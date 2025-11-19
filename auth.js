/**
 * Authentication Module
 * Handles user login, registration, and authentication state
 */

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Check if user is already logged in
  checkAuthStatus();
});

/**
 * Handle login form submission
 */
async function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  // Disable button and show loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
  
  try {
    const response = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    if (response.token && response.user) {
      // Store token and user data
      setAuthToken(response.token);
      setUserData(response.user);
      localStorage.setItem('recruitai_loggedIn', 'true');
      
      // Show success notification
      showNotification('Login successful! Redirecting...', 'success');
      
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = '#dashboard';
        location.reload();
      }, 1000);
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    showNotification(error.message || 'Login failed. Please check your credentials.', 'error');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

/**
 * Handle logout
 */
function logout() {
  removeAuthToken();
  removeUserData();
  localStorage.removeItem('recruitai_loggedIn');
  
  showNotification('Logged out successfully', 'info');
  
  // Redirect to login
  setTimeout(() => {
    window.location.href = '#login';
    location.reload();
  }, 500);
}

/**
 * Check authentication status
 */
function checkAuthStatus() {
  const token = getAuthToken();
  const isLoggedIn = localStorage.getItem('recruitai_loggedIn') === 'true';
  
  if (!token || !isLoggedIn) {
    // Not logged in - show login page
    showPage('login');
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.add('hidden');
  } else {
    // Logged in - show dashboard
    showPage('dashboard');
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.remove('hidden');
    
    // Update user profile in navbar
    const user = getUserData();
    if (user) {
      updateUserProfile(user);
    }
  }
}

/**
 * Update user profile in navbar
 */
function updateUserProfile(user) {
  const userProfile = document.getElementById('userProfile');
  if (userProfile) {
    const avatar = userProfile.querySelector('.user-avatar');
    const nameSpan = userProfile.querySelector('span');
    
    if (avatar) {
      // Generate initials from name
      const initials = user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
      avatar.textContent = initials;
    }
    
    if (nameSpan) {
      nameSpan.textContent = user.name;
    }
  }
}

/**
 * Show registration form
 */
function showRegisterForm() {
  const loginCard = document.querySelector('.login-card');
  if (!loginCard) return;
  
  loginCard.innerHTML = `
    <div class="login-header">
      <h2>Create Account</h2>
      <p>Register to access the recruitment system</p>
    </div>
    <form class="login-form" id="registerForm">
      <div class="form-group">
        <label for="regName">
          <i class="fas fa-user"></i>
          Full Name
        </label>
        <input type="text" id="regName" placeholder="John Doe" required>
      </div>
      <div class="form-group">
        <label for="regEmail">
          <i class="fas fa-envelope"></i>
          Email Address
        </label>
        <input type="email" id="regEmail" placeholder="john@company.com" required>
      </div>
      <div class="form-group">
        <label for="regPassword">
          <i class="fas fa-lock"></i>
          Password
        </label>
        <input type="password" id="regPassword" placeholder="Enter your password" required minlength="6">
      </div>
      <button type="submit" class="btn btn-primary btn-block">
        <i class="fas fa-user-plus"></i>
        Register
      </button>
    </form>
    <div class="login-demo">
      <p>Already have an account?</p>
      <button class="btn btn-outline btn-block" onclick="showLoginForm()" style="margin-top: 12px;">
        <i class="fas fa-sign-in-alt"></i>
        Back to Login
      </button>
    </div>
  `;
  
  // Add form submit handler
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
}

/**
 * Show login form
 */
function showLoginForm() {
  location.reload();
}

/**
 * Handle registration form submission
 */
async function handleRegister(e) {
  e.preventDefault();
  
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  // Disable button and show loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
  
  try {
    const response = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    
    showNotification('Registration successful! Please login.', 'success');
    
    // Show login form after successful registration
    setTimeout(() => {
      showLoginForm();
    }, 2000);
  } catch (error) {
    showNotification(error.message || 'Registration failed. Please try again.', 'error');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

// Make functions globally available
window.logout = logout;
window.showRegisterForm = showRegisterForm;
window.showLoginForm = showLoginForm;
