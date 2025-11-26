// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    // Mock Data
    const mockJobs = [
        {
            id: 1,
            title: 'Senior Full Stack Developer',
            company: 'Tech Corp',
            location: 'San Francisco, CA',
            type: 'Full-time',
            experience: '5+ years',
            salary: '$120k - $160k',
            status: 'active',
            requiredSkills: ['React', 'Node.js', 'AWS', 'MongoDB', 'TypeScript'],
            description: 'We are looking for an experienced full stack developer...',
            candidates: 12
        },
        {
            id: 2,
            title: 'Machine Learning Engineer',
            company: 'AI Innovations',
            location: 'Boston, MA',
            type: 'Full-time',
            experience: '3+ years',
            salary: '$130k - $180k',
            status: 'active',
            requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'SQL'],
            description: 'Join our ML team to build cutting-edge AI solutions...',
            candidates: 8
        },
        {
            id: 3,
            title: 'DevOps Engineer',
            company: 'Cloud Systems',
            location: 'Seattle, WA',
            type: 'Full-time',
            experience: '4+ years',
            salary: '$110k - $150k',
            status: 'active',
            requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
            description: 'Help us build and maintain robust infrastructure...',
            candidates: 6
        },
        {
            id: 4,
            title: 'Frontend Developer',
            company: 'Design Studio',
            location: 'New York, NY',
            type: 'Full-time',
            experience: '3+ years',
            salary: '$100k - $140k',
            status: 'active',
            requiredSkills: ['React', 'Vue', 'CSS', 'JavaScript', 'Figma'],
            description: 'Create beautiful and responsive user interfaces...',
            candidates: 15
        }
    ];

    let mockCandidates = [
        {
            id: 1,
            name: 'Alice Johnson',
            email: 'alice.j@email.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            score: 95,
            skills: ['React', 'Node.js', 'AWS', 'MongoDB', 'TypeScript'],
            experience: 5,
            education: 'MS Computer Science - Stanford',
            certVerified: true,
            avatar: 'AJ',
            appliedDate: '2024-11-10',
            matchedJobs: [1, 4]
        },
        {
            id: 2,
            name: 'Bob Smith',
            email: 'bob.smith@email.com',
            phone: '+1 (555) 234-5678',
            location: 'Boston, MA',
            score: 92,
            skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Docker'],
            experience: 4,
            education: 'MS AI & ML - MIT',
            certVerified: true,
            avatar: 'BS',
            appliedDate: '2024-11-12',
            matchedJobs: [2]
        },
        {
            id: 3,
            name: 'Carol Williams',
            email: 'carol.w@email.com',
            phone: '+1 (555) 345-6789',
            location: 'Seattle, WA',
            score: 88,
            skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
            experience: 4,
            education: 'BS Computer Science - Berkeley',
            certVerified: false,
            avatar: 'CW',
            appliedDate: '2024-11-13',
            matchedJobs: [3]
        },
        {
            id: 4,
            name: 'David Chen',
            email: 'david.chen@email.com',
            phone: '+1 (555) 456-7890',
            location: 'New York, NY',
            score: 91,
            skills: ['React', 'Vue', 'CSS', 'JavaScript', 'Figma', 'TypeScript'],
            experience: 6,
            education: 'BS Design & CS - NYU',
            certVerified: true,
            avatar: 'DC',
            appliedDate: '2024-11-09',
            matchedJobs: [4]
        }
    ];

    // Initialize application
    initApp();

    function initApp() {
        // Hide loading screen
        setTimeout(() => {
            const loader = document.getElementById('loading-screen');
            if (loader) loader.classList.add('hidden');
        }, 1500);

        // Check login status
        const isLoggedIn = localStorage.getItem('recruitai_loggedIn') === 'true';
        
        if (!isLoggedIn) {
            // Show login page
            showPage('login');
            const nav = document.getElementById('navbar');
            if (nav) nav.classList.add('hidden');
        } else {
            // Show dashboard
            showPage('dashboard');
            const nav = document.getElementById('navbar');
            if (nav) nav.classList.remove('hidden');
            initNavigation();
            initDashboard();
            initJobsPage();
            initCandidatesPage();
            initUploadPage();
            initVerifyPage();
        }
    }

    // Navigation
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                
                if (page) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    showPage(page);
                }

                // Close mobile menu
                if (navMenu && navMenu.classList.contains('active') && hamburger) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Hamburger menu
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // User profile logout
        const userProfile = document.getElementById('userProfile');
        if (userProfile) {
            userProfile.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Do you want to logout?')) {
                    logout();
                }
            });
        }
    }

    // Show page
    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        const selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.classList.add('active');
        }

        // Update page title
        const pageTitles = {
            'login': 'Login - RecruitAI',
            'dashboard': 'Dashboard - RecruitAI',
            'jobs': 'Jobs - RecruitAI',
            'candidates': 'Candidates - RecruitAI',
            'upload': 'Upload - RecruitAI',
            'verify': 'Verify - RecruitAI'
        };
        document.title = pageTitles[pageId] || 'RecruitAI';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Dashboard
    function initDashboard() {
        // Call the real dashboard initialization from dashboard.js
        window.initDashboard();
    }

    // Jobs Page
    function initJobsPage() {
        renderJobs();

        const addJobBtn = document.getElementById('addJobBtn');
        if (addJobBtn) {
            addJobBtn.addEventListener('click', function() {
                showAddJobModal();
            });
        }
    }

    function showAddJobModal() {
        const modal = document.getElementById('jobModal');
        const modalTitle = document.getElementById('modalJobTitle');
        const modalBody = document.getElementById('modalJobBody');

        if (!modal || !modalTitle || !modalBody) return;

        modalTitle.textContent = 'Add New Job';
        
        modalBody.innerHTML = `
            <div class="add-job-form">
                <div class="form-group">
                    <label for="jobTitle">Job Title</label>
                    <input type="text" id="jobTitle" class="form-control" placeholder="e.g. Senior Full Stack Developer">
                </div>
                <div class="form-group">
                    <label for="jobCompany">Company</label>
                    <input type="text" id="jobCompany" class="form-control" placeholder="e.g. Tech Corp">
                </div>
                <div class="form-group">
                    <label for="jobLocation">Location</label>
                    <input type="text" id="jobLocation" class="form-control" placeholder="e.g. San Francisco, CA">
                </div>
                <div class="form-group">
                    <label for="jobType">Employment Type</label>
                    <select id="jobType" class="form-control">
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="jobExperience">Experience Required</label>
                    <input type="text" id="jobExperience" class="form-control" placeholder="e.g. 5+ years">
                </div>
                <div class="form-group">
                    <label for="jobSalary">Salary Range</label>
                    <input type="text" id="jobSalary" class="form-control" placeholder="e.g. $120k - $160k">
                </div>
                <div class="form-group">
                    <label for="jobSkills">Required Skills (comma separated)</label>
                    <input type="text" id="jobSkills" class="form-control" placeholder="e.g. React, Node.js, AWS">
                </div>
                <div class="form-group">
                    <label for="jobDescription">Job Description</label>
                    <textarea id="jobDescription" class="form-control" rows="4" placeholder="Enter job description..."></textarea>
                </div>
                <div class="form-actions">
                    <button class="btn btn-outline" id="cancelJobBtn">Cancel</button>
                    <button class="btn btn-primary" id="saveJobBtn">Save Job</button>
                </div>
            </div>
        `;

        modal.classList.add('active');

        // Add event listeners for the form buttons
        const cancelBtn = document.getElementById('cancelJobBtn');
        const saveBtn = document.getElementById('saveJobBtn');
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                modal.classList.remove('active');
            });
        }
        
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                saveNewJob();
            });
        }

        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.classList.remove('active');
            };
        }

        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        };
    }

    function saveNewJob() {
        // Get form values
        const title = document.getElementById('jobTitle').value;
        const company = document.getElementById('jobCompany').value;
        const location = document.getElementById('jobLocation').value;
        const type = document.getElementById('jobType').value;
        const experience = document.getElementById('jobExperience').value;
        const salary = document.getElementById('jobSalary').value;
        const skills = document.getElementById('jobSkills').value;
        const description = document.getElementById('jobDescription').value;

        // Simple validation
        if (!title || !company) {
            showNotification('Please fill in required fields (Job Title and Company)', 'error');
            return;
        }

        // Create new job object
        const newJob = {
            id: mockJobs.length + 1,
            title: title,
            company: company,
            location: location,
            type: type,
            experience: experience,
            salary: salary,
            status: 'active',
            requiredSkills: skills.split(',').map(skill => skill.trim()).filter(skill => skill),
            description: description,
            candidates: 0
        };

        // Add to mock jobs array
        mockJobs.push(newJob);

        // Close modal
        const modal = document.getElementById('jobModal');
        if (modal) {
            modal.classList.remove('active');
        }

        // Re-render jobs
        renderJobs();

        // Show success notification
        showNotification('Job added successfully!', 'success');
    }

    function renderJobs() {
        const jobsGrid = document.getElementById('jobsGrid');
        if (!jobsGrid) return;

        jobsGrid.innerHTML = '';

        mockJobs.forEach(job => {
            const matchedCandidates = mockCandidates.filter(c => 
                c.matchedJobs.includes(job.id)
            );

            const jobCard = document.createElement('div');
            jobCard.className = 'job-card';
            jobCard.innerHTML = `
                <div class="job-header">
                    <div>
                        <h3 class="job-title">${job.title}</h3>
                        <div class="job-company">
                            <i class="fas fa-building"></i>
                            ${job.company}
                        </div>
                    </div>
                    <span class="job-status ${job.status}">${job.status === 'active' ? 'Active' : 'Closed'}</span>
                </div>
                <div class="job-details">
                    <div class="job-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        ${job.location}
                    </div>
                    <div class="job-detail">
                        <i class="fas fa-clock"></i>
                        ${job.type}
                    </div>
                    <div class="job-detail">
                        <i class="fas fa-briefcase"></i>
                        ${job.experience}
                    </div>
                    <div class="job-detail">
                        <i class="fas fa-dollar-sign"></i>
                        ${job.salary}
                    </div>
                </div>
                <div class="job-skills">
                    ${job.requiredSkills.slice(0, 5).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <div class="job-footer">
                    <div class="matched-candidates">
                        <div class="candidate-avatars">
                            ${matchedCandidates.slice(0, 3).map(c => `<div class="mini-avatar">${c.avatar}</div>`).join('')}
                        </div>
                        <span class="matched-count">${matchedCandidates.length} matched</span>
                    </div>
                    <button class="btn btn-sm btn-primary view-matches" data-job-id="${job.id}">
                        View Matches
                    </button>
                </div>
            `;

            // attach handler to the button inside this jobCard
            const viewBtn = jobCard.querySelector('.view-matches');
            if (viewBtn) {
                viewBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    showJobMatches(job);
                });
            }

            jobsGrid.appendChild(jobCard);
        });
    }

    function showJobMatches(job) {
        const matchedCandidates = mockCandidates.filter(c => 
            c.matchedJobs.includes(job.id)
        );

        const modal = document.getElementById('jobModal');
        const modalTitle = document.getElementById('modalJobTitle');
        const modalBody = document.getElementById('modalJobBody');

        if (!modal || !modalTitle || !modalBody) return;

        modalTitle.textContent = job.title + ' - Matched Candidates';
        
        modalBody.innerHTML = `
            <div class="job-match-info">
                <p style="margin-bottom: 20px; color: var(--gray-600);">
                    Found ${matchedCandidates.length} candidates matching the required skills for this position.
                </p>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    ${matchedCandidates.map(candidate => `
                        <div class="candidate-match-card" style="
                            display: flex;
                            align-items: center;
                            gap: 16px;
                            padding: 16px;
                            background: var(--gray-50);
                            border-radius: 12px;
                            border: 1px solid var(--gray-200);
                        ">
                            <div class="candidate-avatar-large">${candidate.avatar}</div>
                            <div style="flex: 1;">
                                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 4px;">${candidate.name}</h4>
                                <p style="font-size: 13px; color: var(--gray-600); margin-bottom: 8px;">${candidate.education}</p>
                                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                                    ${candidate.skills.filter(s => job.requiredSkills.includes(s)).map(skill => `<span class="skill-tag" style="background: rgba(16, 185, 129, 0.1); color: var(--success);">${skill}</span>`).join('')}
                                </div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 24px; font-weight: 700; color: var(--primary);">${candidate.score}%</div>
                                <div style="font-size: 12px; color: var(--gray-500);">Match</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        modal.classList.add('active');

        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.classList.remove('active');
            };
        }

        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        };
    }

    // Candidates Page
    function initCandidatesPage() {
        renderCandidates();

        // Search functionality
        const searchInput = document.getElementById('candidateSearch');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const filtered = mockCandidates.filter(c => 
                    c.name.toLowerCase().includes(searchTerm) ||
                    c.education.toLowerCase().includes(searchTerm) ||
                    c.skills.some(s => s.toLowerCase().includes(searchTerm))
                );
                renderCandidates(filtered);
            });
        }

        // Skill filter
        const skillFilter = document.getElementById('skillFilter');
        if (skillFilter) {
            // Populate skill filter
            const allSkills = [...new Set(mockCandidates.flatMap(c => c.skills))].sort();
            allSkills.forEach(skill => {
                const option = document.createElement('option');
                option.value = skill;
                option.textContent = skill;
                skillFilter.appendChild(option);
            });

            skillFilter.addEventListener('change', function(e) {
                const skill = e.target.value;
                if (skill) {
                    const filtered = mockCandidates.filter(c => c.skills.includes(skill));
                    renderCandidates(filtered);
                } else {
                    renderCandidates();
                }
            });
        }
    }

    function renderCandidates(candidates = mockCandidates) {
        const candidatesGrid = document.getElementById('candidatesGrid');
        if (!candidatesGrid) return;

        candidatesGrid.innerHTML = '';

        if (candidates.length === 0) {
            candidatesGrid.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><p>No candidates found</p></div>';
            return;
        }

        candidates.forEach(candidate => {
            const matchedJobs = mockJobs.filter(j => candidate.matchedJobs.includes(j.id));

            const card = document.createElement('div');
            card.className = 'candidate-card';
            card.innerHTML = `
                <div class="candidate-header">
                    <div class="candidate-avatar-large">${candidate.avatar}</div>
                    <div class="candidate-title">
                        <h3>${candidate.name}</h3>
                        <p>${candidate.education.split(' - ')[0]}</p>
                        <span class="match-badge">
                            <i class="fas fa-star"></i>
                            ${candidate.score}% Match
                        </span>
                    </div>
                </div>
                <div class="candidate-details">
                    <div class="detail-row">
                        <span class="detail-label">Experience</span>
                        <span class="detail-value">${candidate.experience} years</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Location</span>
                        <span class="detail-value">${candidate.location}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Verification</span>
                        <span class="detail-value">
                            ${candidate.certVerified ? 
                                '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>' : 
                                '<span style="color: var(--warning);">Pending</span>'
                            }
                        </span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Matched Jobs</span>
                        <span class="detail-value">${matchedJobs.length} positions</span>
                    </div>
                </div>
                <div class="candidate-skills">
                    ${candidate.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <div class="candidate-actions">
                    <button class="btn btn-sm btn-primary contact-candidate" data-candidate-id="${candidate.id}">
                        <i class="fas fa-envelope"></i>
                        Contact
                    </button>
                    <button class="btn btn-sm btn-outline view-profile" data-candidate-id="${candidate.id}">
                        <i class="fas fa-eye"></i>
                        View Profile
                    </button>
                </div>
            `;
            
            candidatesGrid.appendChild(card);
        });
        
        // Add event listeners for contact buttons
        document.querySelectorAll('.contact-candidate').forEach(button => {
            button.addEventListener('click', function() {
                const candidateId = parseInt(this.getAttribute('data-candidate-id'));
                contactCandidate(candidateId);
            });
        });
        
        // Add event listeners for view profile buttons
        document.querySelectorAll('.view-profile').forEach(button => {
            button.addEventListener('click', function() {
                const candidateId = parseInt(this.getAttribute('data-candidate-id'));
                viewCandidateProfile(candidateId);
            });
        });
    }
    
    function contactCandidate(candidateId) {
        const candidate = mockCandidates.find(c => c.id === candidateId);
        if (!candidate) return;
        
        // Show contact modal
        showContactModal(candidate);
    }
    
    function viewCandidateProfile(candidateId) {
        const candidate = mockCandidates.find(c => c.id === candidateId);
        if (!candidate) return;
        
        // Show profile modal
        showCandidateProfileModal(candidate);
    }
    
    function showContactModal(candidate) {
        const modal = document.getElementById('jobModal');
        const modalTitle = document.getElementById('modalJobTitle');
        const modalBody = document.getElementById('modalJobBody');

        if (!modal || !modalTitle || !modalBody) return;

        modalTitle.textContent = `Contact ${candidate.name}`;
        
        modalBody.innerHTML = `
            <div class="contact-form">
                <div class="candidate-preview">
                    <div class="candidate-avatar-large">${candidate.avatar}</div>
                    <div>
                        <h4>${candidate.name}</h4>
                        <p>${candidate.email}</p>
                    </div>
                </div>
                <div class="form-group">
                    <label for="contactSubject">Subject</label>
                    <input type="text" id="contactSubject" class="form-control" value="Regarding your job application">
                </div>
                <div class="form-group">
                    <label for="contactMessage">Message</label>
                    <textarea id="contactMessage" class="form-control" rows="6" placeholder="Enter your message...">Hi ${candidate.name},

I'm reaching out regarding your application. We were impressed with your profile and would like to discuss potential opportunities with you.

Best regards,
Recruitment Team</textarea>
                </div>
                <div class="form-actions">
                    <button class="btn btn-outline" id="cancelContactBtn">Cancel</button>
                    <button class="btn btn-primary" id="sendContactBtn">Send Message</button>
                </div>
            </div>
        `;

        modal.classList.add('active');

        // Add event listeners for the form buttons
        const cancelBtn = document.getElementById('cancelContactBtn');
        const sendBtn = document.getElementById('sendContactBtn');
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                modal.classList.remove('active');
            });
        }
        
        if (sendBtn) {
            sendBtn.addEventListener('click', function() {
                sendCandidateMessage(candidate);
            });
        }

        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.classList.remove('active');
            };
        }

        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        };
    }
    
    function sendCandidateMessage(candidate) {
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        // In a real app, this would send an actual email
        // For now, we'll just show a success notification
        showNotification(`Message sent to ${candidate.name} successfully!`, 'success');
        
        // Close modal
        const modal = document.getElementById('jobModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
    
    function showCandidateProfileModal(candidate) {
        const modal = document.getElementById('jobModal');
        const modalTitle = document.getElementById('modalJobTitle');
        const modalBody = document.getElementById('modalJobBody');

        if (!modal || !modalTitle || !modalBody) return;

        modalTitle.textContent = `${candidate.name} - Profile`;
        
        // Get matched jobs
        const matchedJobs = mockJobs.filter(j => candidate.matchedJobs.includes(j.id));
        
        modalBody.innerHTML = `
            <div class="candidate-profile">
                <div class="profile-header">
                    <div class="candidate-avatar-large">${candidate.avatar}</div>
                    <div class="profile-info">
                        <h3>${candidate.name}</h3>
                        <p class="profile-email">${candidate.email}</p>
                        <p class="profile-location"><i class="fas fa-map-marker-alt"></i> ${candidate.location}</p>
                        <span class="match-badge">
                            <i class="fas fa-star"></i>
                            ${candidate.score}% Match
                        </span>
                    </div>
                </div>
                
                <div class="profile-section">
                    <h4><i class="fas fa-briefcase"></i> Experience</h4>
                    <p>${candidate.experience} years</p>
                </div>
                
                <div class="profile-section">
                    <h4><i class="fas fa-graduation-cap"></i> Education</h4>
                    <p>${candidate.education}</p>
                </div>
                
                <div class="profile-section">
                    <h4><i class="fas fa-tasks"></i> Skills</h4>
                    <div class="skills-list">
                        ${candidate.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                
                <div class="profile-section">
                    <h4><i class="fas fa-briefcase"></i> Matched Jobs</h4>
                    ${matchedJobs.length > 0 ? 
                        `<div class="matched-jobs-list">
                            ${matchedJobs.map(job => `
                                <div class="matched-job-item">
                                    <h5>${job.title}</h5>
                                    <p>${job.company} • ${job.location}</p>
                                </div>
                            `).join('')}
                        </div>` : 
                        '<p>No matched jobs yet</p>'}
                </div>
                
                <div class="profile-section">
                    <h4><i class="fas fa-shield-alt"></i> Verification Status</h4>
                    <p>
                        ${candidate.certVerified ? 
                            '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>' : 
                            '<span style="color: var(--warning);">Pending Verification</span>'}
                    </p>
                </div>
            </div>
        `;

        modal.classList.add('active');

        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.classList.remove('active');
            };
        }

        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        };
    }

    // Upload Page
    function initUploadPage() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const uploadedFiles = document.getElementById('uploadedFiles');
        const parseResumes = document.getElementById('parseResumes');

        let selectedFiles = [];

        uploadArea?.addEventListener('click', () => fileInput.click());

        fileInput?.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });

        uploadArea?.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary)';
        });

        uploadArea?.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'var(--gray-300)';
        });

        uploadArea?.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--gray-300)';
            handleFiles(e.dataTransfer.files);
        });

        function handleFiles(files) {
            for (let file of files) {
                if (file.size > 10 * 1024 * 1024) {
                    showNotification('File too large. Max 10MB', 'error');
                    continue;
                }

                // Check for duplicate files
                const isDuplicate = selectedFiles.some(f => 
                    f.name === file.name && f.size === file.size
                );
                
                if (isDuplicate) {
                    showNotification(`File "${file.name}" is already selected`, 'warning');
                    continue;
                }

                selectedFiles.push(file);
                displayFile(file);
            }

            if (parseResumes) parseResumes.disabled = selectedFiles.length === 0;
        }

        function displayFile(file) {
            const item = document.createElement('div');
            item.className = 'file-item';
            item.innerHTML = `
                <div class="file-info">
                    <i class="fas fa-file-alt file-icon"></i>
                    <div class="file-details">
                        <h4>${file.name}</h4>
                        <p>${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
                <div class="file-remove" data-file-name="${file.name}">
                    <i class="fas fa-times"></i>
                </div>
            `;

            item.querySelector('.file-remove').addEventListener('click', () => {
                selectedFiles = selectedFiles.filter(f => f.name !== file.name);
                item.remove();
                if (parseResumes) parseResumes.disabled = selectedFiles.length === 0;
            });

            uploadedFiles.appendChild(item);
        }

        parseResumes?.addEventListener('click', () => {
            if (selectedFiles.length === 0) return;

            showNotification('Parsing resumes with AI...', 'info');
            parseResumes.disabled = true;
            parseResumes.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            // Simulate API call to backend
            setTimeout(() => {
                const parsingResults = document.getElementById('parsingResults');
                if (parsingResults) parsingResults.innerHTML = '';

                selectedFiles.forEach((file, index) => {
                    // Generate random candidate data
                    const names = ['John Doe', 'Jane Smith', 'Michael Brown', 'Emily Davis', 'Robert Wilson'];
                    const emails = ['john.d@email.com', 'jane.s@email.com', 'michael.b@email.com', 'emily.d@email.com', 'robert.w@email.com'];
                    const skillSets = [
                        ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
                        ['Python', 'Django', 'PostgreSQL', 'Docker', 'Redis'],
                        ['Java', 'Spring Boot', 'MySQL', 'Kubernetes', 'Jenkins'],
                        ['C#', '.NET', 'SQL Server', 'Azure', 'Git'],
                        ['PHP', 'Laravel', 'Vue.js', 'MySQL', 'Linux']
                    ];

                    const name = names[index % names.length];
                    const avatar = name.split(' ').map(n => n[0]).join('');
                    const phonePart1 = Math.floor(Math.random() * 900 + 100);
                    const phonePart2 = Math.floor(Math.random() * 9000 + 1000);
                    const newCandidate = {
                        id: mockCandidates.length + index + 1,
                        name: name,
                        email: emails[index % emails.length],
                        phone: `+1 (555) ${phonePart1}-${phonePart2}`,
                        location: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA'][Math.floor(Math.random() * 4)],
                        score: Math.floor(Math.random() * 20 + 75),
                        skills: skillSets[index % skillSets.length],
                        experience: Math.floor(Math.random() * 8) + 2,
                        education: 'BS Computer Science - University',
                        certVerified: false,
                        avatar: avatar,
                        appliedDate: new Date().toISOString().split('T')[0],
                        matchedJobs: []
                    };

                    // Match with jobs based on skills
                    mockJobs.forEach(job => {
                        const matchingSkills = newCandidate.skills.filter(s => 
                            job.requiredSkills.includes(s)
                        );
                        if (matchingSkills.length >= 2) {
                            newCandidate.matchedJobs.push(job.id);
                        }
                    });

                    mockCandidates.push(newCandidate);

                    if (parsingResults) {
                        const parsed = document.createElement('div');
                        parsed.className = 'parsed-resume';
                        parsed.innerHTML = `
                            <div class="parsed-header">
                                <div class="parsed-avatar">${avatar}</div>
                                <div class="parsed-info">
                                    <h4>${name}</h4>
                                    <p>${newCandidate.email}</p>
                                </div>
                            </div>
                            <div class="parsed-details">
                                <div class="detail-group">
                                    <h5>Extracted Skills</h5>
                                    <div class="skills-list">
                                        ${newCandidate.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                    </div>
                                </div>
                                <div class="detail-group">
                                    <h5>Experience</h5>
                                    <p>${newCandidate.experience} years</p>
                                </div>
                                <div class="detail-group">
                                    <h5>Matched Jobs</h5>
                                    <p style="color: var(--success); font-weight: 600;">
                                        ${newCandidate.matchedJobs.length} job${newCandidate.matchedJobs.length !== 1 ? 's' : ''} matched
                                    </p>
                                    ${newCandidate.matchedJobs.length > 0 ? 
                                        `<div style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px;">
                                            ${newCandidate.matchedJobs.map(jobId => {
                                                const job = mockJobs.find(j => j.id === jobId);
                                                return `<div style="font-size: 13px; color: var(--gray-700);">
                                                    <i class="fas fa-check-circle" style="color: var(--success); margin-right: 6px;"></i>
                                                    ${job ? job.title : ''}
                                                </div>`;
                                            }).join('')}
                                        </div>` : ''
                                    }
                                </div>
                            </div>
                        `;
                        parsingResults.appendChild(parsed);
                    }
                });

                showNotification(`Successfully parsed ${selectedFiles.length} resume(s) and matched with ${mockJobs.length} jobs!`, 'success');

                // Update dashboard stats
                initDashboard();

                selectedFiles = [];
                if (uploadedFiles) uploadedFiles.innerHTML = '';
                if (fileInput) fileInput.value = '';
                if (parseResumes) {
                    parseResumes.disabled = true;
                    parseResumes.innerHTML = '<i class="fas fa-robot"></i> Parse with AI';
                }
            }, 2500);
        });
    }

    // Verify Page
    function initVerifyPage() {
        const verifyArea = document.getElementById('verifyArea');
        const certificateInput = document.getElementById('certificateInput');
        const selectedFile = document.getElementById('selectedFile');
        const verifyCertificate = document.getElementById('verifyCertificate');

        let currentFile = null;
        let isProcessing = false;

        verifyArea?.addEventListener('click', () => {
            if (!isProcessing) {
                certificateInput.click();
            }
        });

        certificateInput?.addEventListener('change', (e) => {
            if (e.target.files.length) {
                handleCertificateFile(e.target.files[0]);
            }
        });

        verifyArea?.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!isProcessing) {
                verifyArea.style.borderColor = 'var(--primary)';
            }
        });

        verifyArea?.addEventListener('dragleave', () => {
            if (!isProcessing) {
                verifyArea.style.borderColor = 'var(--gray-300)';
            }
        });

        verifyArea?.addEventListener('drop', (e) => {
            e.preventDefault();
            if (!isProcessing && e.dataTransfer.files.length) {
                verifyArea.style.borderColor = 'var(--gray-300)';
                handleCertificateFile(e.dataTransfer.files[0]);
            }
        });

        function handleCertificateFile(file) {
            // Prevent processing if already processing
            if (isProcessing) {
                showNotification('Please wait for the current operation to complete', 'warning');
                return;
            }

            const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                showNotification('Invalid file type. Please upload PDF, JPG, or PNG', 'error');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                showNotification('File too large. Max 10MB', 'error');
                return;
            }

            // Check if same file is selected again
            if (currentFile && currentFile.name === file.name && currentFile.size === file.size) {
                showNotification('This file is already selected for verification', 'info');
                return;
            }

            currentFile = file;

            if (selectedFile) {
                selectedFile.innerHTML = `
                    <div class="file-item">
                        <div class="file-info">
                            <i class="fas fa-certificate file-icon"></i>
                            <div class="file-details">
                                <h4>${file.name}</h4>
                                <p>${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <div class="file-remove" id="removeCertificate">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                `;

                const removeBtn = document.getElementById('removeCertificate');
                if (removeBtn) {
                    removeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        currentFile = null;
                        selectedFile.innerHTML = '';
                        if (certificateInput) certificateInput.value = '';
                        if (verifyCertificate) verifyCertificate.disabled = true;
                    });
                }
            }

            if (verifyCertificate) verifyCertificate.disabled = false;
        }

        verifyCertificate?.addEventListener('click', () => {
            if (!currentFile) return;
            
            // Prevent multiple clicks
            if (isProcessing) return;
            
            isProcessing = true;
            if (verifyCertificate) {
                verifyCertificate.disabled = true;
                verifyCertificate.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
            }

            showNotification('Verifying certificate on blockchain...', 'info');

            // Simulate API call to backend for certificate verification
            setTimeout(() => {
                const verificationResult = document.getElementById('verificationResult');
                // Higher success rate for demo
                const isVerified = Math.random() > 0.2;

                if (verificationResult) {
                    if (isVerified) {
                        const txHash = '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                        verificationResult.innerHTML = `
                            <div class="verification-success">
                                <div class="verification-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                                <h4>Certificate Verified Successfully</h4>
                                <p>This certificate has been verified on the blockchain</p>
                            </div>
                            <div class="verification-details">
                                <div class="detail-row">
                                    <span class="detail-label">Transaction Hash</span>
                                    <span class="detail-value" style="font-family: monospace; font-size: 12px;">${txHash}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Network</span>
                                    <span class="detail-value">Polygon Mainnet</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Timestamp</span>
                                    <span class="detail-value">${new Date().toLocaleString()}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Gas Used</span>
                                    <span class="detail-value">0.0012 MATIC</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Status</span>
                                    <span class="detail-value" style="color: var(--success); font-weight: 600;">
                                        <i class="fas fa-check-circle"></i> Confirmed
                                    </span>
                                </div>
                            </div>
                        `;
                        showNotification('Certificate verified successfully!', 'success');
                    } else {
                        verificationResult.innerHTML = `
                            <div class="verification-failed">
                                <div class="verification-icon">
                                    <i class="fas fa-times-circle"></i>
                                </div>
                                <h4>Verification Failed</h4>
                                <p>This certificate could not be verified on the blockchain</p>
                            </div>
                            <div class="verification-details">
                                <div class="detail-row">
                                    <span class="detail-label">Error</span>
                                    <span class="detail-value">Certificate hash not found in blockchain records</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Suggestion</span>
                                    <span class="detail-value">Please ensure the certificate is valid and registered</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Timestamp</span>
                                    <span class="detail-value">${new Date().toLocaleString()}</span>
                                </div>
                            </div>
                        `;
                        showNotification('Certificate verification failed', 'error');
                    }
                }

                // Reset state
                isProcessing = false;
                currentFile = null;
                if (selectedFile) selectedFile.innerHTML = '';
                if (certificateInput) certificateInput.value = '';
                if (verifyCertificate) {
                    verifyCertificate.disabled = true;
                    verifyCertificate.innerHTML = '<i class="fas fa-shield-alt"></i> Verify on Blockchain';
                }
            }, 3000);
        });
    }

    // Logout
    function logout() {
        localStorage.removeItem('recruitai_loggedIn');
        localStorage.removeItem('recruitai_userName');
        showNotification('Logged out successfully', 'info');
        
        const nav = document.getElementById('navbar');
        if (nav) nav.classList.add('hidden');
        showPage('login');
        
        // Reload page to reset state
        setTimeout(() => {
            location.reload();
        }, 500);
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notifications = document.getElementById('notifications');
        if (!notifications) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const icons = {
            'info': 'fas fa-info-circle',
            'success': 'fas fa-check-circle',
            'error': 'fas fa-exclamation-circle',
            'warning': 'fas fa-exclamation-triangle'
        };

        notification.innerHTML = `
            <div class="notification-icon">
                <i class="${icons[type] || icons.info}"></i>
            </div>
            <div class="notification-content">
                <h4>${type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                <p>${message}</p>
            </div>
            <div class="notification-close">
                <i class="fas fa-times"></i>
            </div>
        `;

        notifications.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);

        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            });
        }
    }

    // Make functions globally available
    window.showNotification = showNotification;
    window.showPage = showPage;
    window.logout = logout;
});
