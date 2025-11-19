/**
 * Dashboard Module
 * Handles dashboard data loading and display
 */

let dashboardData = null;

/**
 * Initialize dashboard
 */
async function initDashboard() {
  try {
    await loadDashboardData();
    renderDashboard();
  } catch (error) {
    console.error('Dashboard initialization error:', error);
    showNotification('Failed to load dashboard data', 'error');
  }
}

/**
 * Load dashboard data from API
 */
async function loadDashboardData() {
  try {
    const data = await apiRequest(API_CONFIG.ENDPOINTS.DASHBOARD.DATA);
    dashboardData = data;
    return data;
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    throw error;
  }
}

/**
 * Render dashboard with data
 */
function renderDashboard() {
  if (!dashboardData) return;
  
  const stats = dashboardData.stats || {};
  const topCandidates = dashboardData.topCandidates || [];
  const recentActivity = dashboardData.recentActivity || [];
  
  // Update statistics
  updateStats(stats);
  
  // Render top candidates
  renderTopCandidates(topCandidates);
  
  // Render recent activity
  renderRecentActivity(recentActivity);
}

/**
 * Update statistics cards
 */
function updateStats(stats) {
  // Total candidates
  const totalCandidatesEl = document.getElementById('totalCandidates');
  if (totalCandidatesEl) {
    totalCandidatesEl.textContent = stats.totalCandidates || 0;
  }
  
  // Verified count
  const verifiedCountEl = document.getElementById('verifiedCount');
  if (verifiedCountEl) {
    verifiedCountEl.textContent = stats.verifiedCandidates || 0;
  }
  
  // Verification rate
  const verifiedRateEl = document.getElementById('verifiedRate');
  if (verifiedRateEl) {
    const rate = stats.verificationRate || 0;
    verifiedRateEl.textContent = `${rate}% success rate`;
  }
  
  // Average match score
  const avgMatchScoreEl = document.querySelector('.stat-card:nth-child(4) .stat-info h3');
  if (avgMatchScoreEl) {
    avgMatchScoreEl.textContent = `${stats.avgMatchScore || 0}%`;
  }
  
  // Candidates change (mock for now)
  const candidatesChangeEl = document.getElementById('candidatesChange');
  if (candidatesChangeEl) {
    const recent = stats.recentCandidates || 0;
    candidatesChangeEl.textContent = `+${recent} from last week`;
  }
}

/**
 * Render top candidates list
 */
function renderTopCandidates(candidates) {
  const recentCandidatesEl = document.getElementById('recentCandidates');
  if (!recentCandidatesEl) return;
  
  if (candidates.length === 0) {
    recentCandidatesEl.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-users"></i>
        <p>No candidates yet</p>
      </div>
    `;
    return;
  }
  
  recentCandidatesEl.innerHTML = candidates.map(candidate => {
    const initials = candidate.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
    
    const education = candidate.education 
      ? candidate.education.split(' - ')[0] 
      : 'No education listed';
    
    return `
      <div class="candidate-item" onclick="viewCandidateProfile('${candidate._id || candidate.id}')">
        <div class="candidate-avatar">${initials}</div>
        <div class="candidate-info">
          <div class="candidate-name">${candidate.name}</div>
          <div class="candidate-education">${education}</div>
        </div>
        <div class="candidate-score">
          <div class="score-value">${candidate.matchScore || 0}</div>
          <div class="score-label">Match</div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render recent activity log
 */
function renderRecentActivity(activities) {
  const activityLogEl = document.getElementById('activityLog');
  if (!activityLogEl) return;
  
  if (activities.length === 0) {
    activityLogEl.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-history"></i>
        <p>No recent activity</p>
      </div>
    `;
    return;
  }
  
  activityLogEl.innerHTML = activities.map(activity => {
    const timeAgo = formatTimeAgo(new Date(activity.time));
    const icon = activity.type === 'upload' 
      ? 'fa-check-circle' 
      : 'fa-info-circle';
    const typeClass = activity.type === 'upload' ? 'success' : 'info';
    
    return `
      <div class="activity-item">
        <div class="activity-icon ${typeClass}">
          <i class="fas ${icon}"></i>
        </div>
        <div class="activity-content">
          <h4>${activity.title}</h4>
          <p>${activity.description}</p>
        </div>
        <div class="activity-time">${timeAgo}</div>
      </div>
    `;
  }).join('');
}

/**
 * Format time ago
 */
function formatTimeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
}

/**
 * Refresh dashboard data
 */
async function refreshDashboard() {
  try {
    showNotification('Refreshing dashboard...', 'info');
    await loadDashboardData();
    renderDashboard();
    showNotification('Dashboard refreshed', 'success');
  } catch (error) {
    showNotification('Failed to refresh dashboard', 'error');
  }
}

// Make functions globally available
window.initDashboard = initDashboard;
window.refreshDashboard = refreshDashboard;
window.viewCandidateProfile = async function(candidateId) {
  // Navigate to candidates page and show profile
  showPage('candidates');
  // In a real implementation, you would load and display the candidate profile
  showNotification('Loading candidate profile...', 'info');
};
