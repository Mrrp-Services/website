// =========================================================================
// SERVICES CONFIGURATION
// Edit this array to add, remove, or modify services on the landing page.
// Each service object supports the following fields:
//   - name:        (String) The name/title of the service
//   - description: (String) A short description of the service
//   - url:         (String) The landing or home URL for the service instance
//   - status:      (String) Current availability. Use one of these exact values:
//                  "available"   -> Online and operating normally (Green Badge)
//                  "maintenance" -> Undergoing maintenance/temporary offline (Orange Badge)
//                  "coming-soon"  -> Planned or preparing to launch (Blue Badge)
// =========================================================================
const SERVICES_DATA = [
  {
    name: "Instance One (Placeholder)",
    description: "This is a placeholder description for the first FOSS service. Customize this object with the real details of your self-hosted instance.",
    url: "https://example.com/service-one",
    status: "available"
  },
  {
    name: "Instance Two (Placeholder)",
    description: "This is a placeholder description for the second FOSS service. Update this card to guide community members to another self-hosted application.",
    url: "https://example.com/service-two",
    status: "coming-soon"
  }
];

// =========================================================================
// RENDERING & INTERACTION LOGIC
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  setupSmoothScroll();
});

/**
 * Dynamically builds and injects service cards into the DOM.
 */
function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container) return;

  // Clear any existing content (like fallback text)
  container.innerHTML = '';

  // Generate cards
  SERVICES_DATA.forEach((service) => {
    const card = document.createElement('a');
    card.href = service.url;
    card.className = 'service-card';
    
    // Configure accessibility attributes
    card.setAttribute('aria-label', `Visit ${service.name} - Status: ${getStatusLabel(service.status)}`);
    
    // Open external links in a new tab for convenience, internal anchors in same tab
    if (service.url && service.url.startsWith('http')) {
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }

    // Build the status badge HTML
    const badgeHTML = buildStatusBadge(service.status);

    card.innerHTML = `
      <div class="card-header">
        ${badgeHTML}
      </div>
      <div class="card-body">
        <h3 class="service-title">${service.name}</h3>
        <p class="service-description">${service.description}</p>
      </div>
      <div class="card-footer">
        <span class="btn-card" aria-hidden="true">
          <span>Visit Service</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </span>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Returns a user-friendly text string representing the status.
 * @param {string} status 
 * @returns {string}
 */
function getStatusLabel(status) {
  switch (status) {
    case 'available': return 'Online';
    case 'maintenance': return 'Maintenance';
    case 'coming-soon': return 'Coming Soon';
    default: return 'Unknown';
  }
}

/**
 * Generates the status badge HTML structure based on the service status state.
 * @param {string} status 
 * @returns {string}
 */
function buildStatusBadge(status) {
  let badgeClass = 'status-unknown';
  let label = 'Unknown';
  let dotIcon = '⚪'; // Fallback text icon

  if (status === 'available') {
    badgeClass = 'status-available';
    label = 'Online';
    dotIcon = '🟢';
  } else if (status === 'maintenance') {
    badgeClass = 'status-maintenance';
    label = 'Maintenance';
    dotIcon = '🟡';
  } else if (status === 'coming-soon') {
    badgeClass = 'status-soon';
    label = 'Coming Soon';
    dotIcon = '🔵';
  }

  return `
    <span class="status-badge ${badgeClass}" title="Status: ${label}">
      <span class="status-dot" aria-hidden="true"></span>
      <span>${label}</span>
    </span>
  `;
}

/**
 * Handles extra accessibility behaviors for the scroll actions.
 */
function setupSmoothScroll() {
  const browseBtn = document.getElementById('btn-browse');
  if (!browseBtn) return;

  browseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = browseBtn.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Smooth scroll to the target
      targetElement.scrollIntoView({ behavior: 'smooth' });
      
      // Move keyboard focus to the section for accessibility
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
    }
  });
}
