/**
 * Portfolio Application Controller
 * WAI-ARIA WCAG 2.1 AA Compliant Interactivity, Side Sheet Drawer,
 * Filter Chips, Form Unsaved Guard, and Toast Notifications.
 * Encapsulated in IIFE to protect scope and avoid identifier collisions.
 */

(function (global) {
  const dataStore = (typeof window !== 'undefined' && window.portfolioData) ? window.portfolioData : {};
  const profileData = dataStore.profileData || {};
  const performanceStats = dataStore.performanceStats || profileData.stats || [];
  const coreTechnologies = dataStore.coreTechnologies || [];
  const categories = dataStore.categories || [];
  const projectsData = dataStore.projectsData || [];
  const experienceData = dataStore.experienceData || [];
  const technicalSkills = dataStore.technicalSkills || [];

  class PortfolioApp {
    constructor() {
      this.currentCategory = 'all';
      this.selectedProject = null;
      this.formDirty = false;
      this.lastFocusedElement = null;

      this.init();
    }

    init() {
      this.initTheme();
      this.renderProfile();
      this.renderPerformanceStats();
      this.renderCoreTechnologies();
      this.attachProjectListeners();
      this.setupEventListeners();
      this.setupContactForm();
    }

    /* ==========================================================================
       Render Dynamic Sections from data.js
       ========================================================================== */
    renderProfile() {
      const headlineEl = document.getElementById('hero-title');
      if (headlineEl && profileData && profileData.headline) {
        headlineEl.textContent = profileData.headline;
      }
      const leadEl = document.getElementById('hero-lead');
      if (leadEl && profileData && (profileData.heroLead || profileData.bio)) {
        leadEl.textContent = profileData.heroLead || profileData.bio;
      }
      // Direct Email & Zalo links
      const directEmailLink = document.getElementById('direct-email-link');
      const directEmailText = document.getElementById('direct-email-text');
      if (directEmailLink && profileData && profileData.email) {
        directEmailLink.href = `mailto:${profileData.email}`;
        if (directEmailText) directEmailText.textContent = profileData.email;
      }
      const directZaloLink = document.getElementById('direct-zalo-link');
      const directZaloText = document.getElementById('direct-zalo-text');
      const footerZaloLink = document.getElementById('footer-zalo-link');
      if (profileData && profileData.zalo) {
        const zaloHref = profileData.zaloLink || `https://zalo.me/${profileData.zalo}`;
        if (directZaloLink) directZaloLink.href = zaloHref;
        if (directZaloText) directZaloText.textContent = 'Chat Zalo';
        if (footerZaloLink) {
          footerZaloLink.href = zaloHref;
          footerZaloLink.textContent = 'Zalo';
        }
      }
    }
    renderPerformanceStats() {
      const statsContainer = document.getElementById('hero-stats-grid');
      if (!statsContainer || !performanceStats || performanceStats.length === 0) return;
      statsContainer.innerHTML = performanceStats.map(stat => `
        <div class="feature-card" style="padding: 16px; text-align: center;">
          <span class="tabular-nums" style="font-size: 24px; font-weight: 600; color: var(--color-ink); letter-spacing: -0.5px;">${stat.value}</span>
          <span class="body-sm" style="display: block; margin-top: 4px;">${stat.label}</span>
        </div>
      `).join('');
    }

    renderCoreTechnologies() {
      const techContainer = document.getElementById('core-tech-grid');
      if (!techContainer || !coreTechnologies || coreTechnologies.length === 0) return;
      techContainer.innerHTML = coreTechnologies.map(tech => `
        <span class="tech-item"><span style="color: var(--color-ink); font-weight: 600;">${tech.name}</span> / ${tech.detail}</span>
      `).join('');
    }

    /* ==========================================================================
       Theme Management (Light / Dark)
       ========================================================================== */
    initTheme() {
      const savedTheme = localStorage.getItem('theme-preference');
      const prefersDark = (typeof window.matchMedia === 'function') && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (prefersDark ? 'dark' : 'light');

      this.applyTheme(theme);

      const themeToggleBtn = document.getElementById('theme-toggle-btn');
      if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
          const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          this.applyTheme(newTheme);
          localStorage.setItem('theme-preference', newTheme);
          this.showToast(`Chuyển sang giao diện ${newTheme === 'dark' ? 'Tối' : 'Sáng'}`);
        });
      }
    }

    applyTheme(theme) {
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      const themeToggleBtn = document.getElementById('theme-toggle-btn');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', `Chuyển sang chế độ ${theme === 'dark' ? 'Sáng' : 'Tối'}`);
      }
    }

    /* ==========================================================================
       Projects Grid Filtering & Event Listeners
       ========================================================================== */
    attachProjectListeners() {
      const grid = document.getElementById('projects-grid');
      if (grid) {
        grid.querySelectorAll('.view-details-trigger').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            this.openProjectDrawer(id, e.currentTarget);
          });
        });
      }

      const filterContainer = document.getElementById('project-filter-tabs');
      if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
          const button = e.target.closest('button[role="tab"]');
          if (!button) return;

          const category = button.dataset.category;
          this.currentCategory = category;

          // Update ARIA tabs
          filterContainer.querySelectorAll('button[role="tab"]').forEach(btn => {
            const isSelected = btn.dataset.category === category;
            btn.classList.toggle('active', isSelected);
            btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
          });

          this.renderProjects();
        });
      }
    }

    /* ==========================================================================
       Projects Dynamic Rendering & Live Announcement
       ========================================================================== */
    renderProjects() {
      const grid = document.getElementById('projects-grid');
      const liveAnnouncer = document.getElementById('a11y-live-announcer');
      if (!grid) return;

      const list = projectsData || [];
      const filtered = this.currentCategory === 'all'
        ? list
        : list.filter(p => p.category === this.currentCategory);

      // Announce to screen readers
      if (liveAnnouncer) {
        liveAnnouncer.textContent = `Đang hiển thị ${filtered.length} dự án trong danh mục ${this.currentCategory}.`;
      }

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="feature-card" style="grid-column: 1 / -1; text-align: center; padding: 48px;">
            <h3 class="heading-md" style="margin-bottom: 8px;">Không tìm thấy dự án</h3>
            <p class="body-md" style="margin-bottom: 16px;">Không có dự án nào phù hợp với bộ lọc đã chọn.</p>
            <button type="button" class="btn btn-secondary" id="reset-filter-btn">Xem tất cả dự án</button>
          </div>
        `;
        document.getElementById('reset-filter-btn')?.addEventListener('click', () => {
          this.currentCategory = 'all';
          const filterContainer = document.getElementById('project-filter-tabs');
          filterContainer?.querySelectorAll('button[role="tab"]').forEach(btn => {
            const isAll = btn.dataset.category === 'all';
            btn.classList.toggle('active', isAll);
            btn.setAttribute('aria-selected', isAll ? 'true' : 'false');
          });
          this.renderProjects();
        });
        return;
      }

      grid.innerHTML = filtered.map(project => `
        <article class="feature-card project-card" aria-labelledby="project-title-${project.id}">
          <div class="project-card-header">
            <span class="project-badge ${project.badgeType}">${project.badge}</span>
            <button 
              type="button" 
              class="btn btn-ghost-sm view-details-trigger" 
              data-id="${project.id}"
              aria-haspopup="dialog"
              aria-label="Xem chi tiết kỹ thuật dự án ${project.title}">
              Inspect Spec
            </button>
          </div>

          <h3 id="project-title-${project.id}" class="heading-md" style="margin-bottom: 8px;">${project.title}</h3>
          <p class="body-md" style="margin-bottom: var(--space-md);">${project.shortDescription}</p>

          <div class="project-metrics" role="region" aria-label="Chỉ số hiệu năng xác thực">
            ${project.metrics.map(m => `
              <div class="metric-item">
                <span class="metric-value tabular-nums">${m.value}</span>
                <span class="metric-label">${m.label}</span>
              </div>
            `).join('')}
          </div>

          <div class="tech-tag-list" aria-label="Công nghệ sử dụng">
            ${project.techStack.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
          </div>
        </article>
      `).join('');

      // Attach inspect listeners
      grid.querySelectorAll('.view-details-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          this.openProjectDrawer(id, e.currentTarget);
        });
      });
    }

    /* ==========================================================================
       Side Sheet / Slide-over Drawer (WCAG 2.1 AA Compliant Modal Dialog)
       ========================================================================== */
    openProjectDrawer(projectId, triggerElement) {
      const list = projectsData || [];
      const project = list.find(p => p.id === projectId);
      if (!project) return;

      this.selectedProject = project;
      this.lastFocusedElement = triggerElement;

      const drawer = document.getElementById('project-side-sheet');
      const backdrop = document.getElementById('drawer-backdrop');
      const drawerTitle = document.getElementById('drawer-title');
      const drawerContent = document.getElementById('drawer-content');
      const closeBtn = document.getElementById('drawer-close-btn');

      if (!drawer || !backdrop) return;

      drawerTitle.textContent = project.title;

      drawerContent.innerHTML = `
        <div>
          <span class="project-badge ${project.badgeType}" style="margin-bottom: 12px; display: inline-block;">${project.badge}</span>
          <h4 class="heading-md" style="margin-bottom: 8px;">Tổng quan giải pháp</h4>
          <p class="body-md">${project.fullDescription}</p>
        </div>

        <div class="feature-card" style="padding: 16px;">
          <h4 class="mono-eyebrow" style="margin-bottom: 8px; color: var(--color-ink);">Kiến trúc hệ thống</h4>
          <p class="body-md" style="color: var(--color-body);">${project.architecture}</p>
        </div>

        <div>
          <h4 class="heading-md" style="margin-bottom: 12px;">Chỉ số hiệu năng kiểm thử</h4>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            ${project.metrics.map(m => `
              <div class="feature-card" style="padding: 12px; text-align: center;">
                <span class="tabular-nums" style="font-size: 18px; font-weight: 600; color: var(--color-ink);">${m.value}</span>
                <span class="body-sm" style="display: block; margin-top: 2px;">${m.label}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <h4 class="heading-md" style="margin-bottom: 8px;">Ngăn xếp công nghệ (Tech Stack)</h4>
          <div class="tech-tag-list">
            ${project.techStack.map(tag => `<span class="tech-tag" style="font-size: 12px; padding: 4px 10px;">${tag}</span>`).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-top: var(--space-md); padding-top: var(--space-lg); border-top: 1px solid var(--color-hairline);">
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1;">
            Truy cập hệ thống
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex: 1;">
            Mã nguồn
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </a>
        </div>
      `;

      backdrop.classList.add('active');
      drawer.classList.add('active');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Focus close button
      setTimeout(() => closeBtn.focus(), 50);
    }

    closeProjectDrawer() {
      const drawer = document.getElementById('project-side-sheet');
      const backdrop = document.getElementById('drawer-backdrop');

      if (!drawer || !backdrop) return;

      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      // Restore focus to trigger
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
    }

    copyEmail() {
      const email = profileData?.email || 'contact@duytinh.dev';
      navigator.clipboard.writeText(email).then(() => {
        this.showToast(`Đã sao chép email: ${email}`);
      }).catch(() => {
        this.showToast(`Email: ${email}`);
      });
    }

    /* ==========================================================================
       Contact Form with Unsaved Changes Guard & Inline Validation
       ========================================================================== */
    setupContactForm() {
      const form = document.getElementById('contact-form');
      if (!form) return;

      // Track dirty state
      form.addEventListener('input', () => {
        this.formDirty = true;
      });

      // Guard before unload
      window.addEventListener('beforeunload', (e) => {
        if (this.formDirty) {
          e.preventDefault();
          e.returnValue = 'Bạn có thay đổi chưa lưu trong biểu mẫu tin nhắn.';
          return e.returnValue;
        }
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');
        const submitBtn = document.getElementById('contact-submit-btn');

        let isValid = true;

        // Validate name
        if (!nameInput.value.trim()) {
          this.setFieldError(nameInput, 'error-name', 'Vui lòng nhập họ và tên của bạn.');
          isValid = false;
        } else {
          this.clearFieldError(nameInput, 'error-name');
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          this.setFieldError(emailInput, 'error-email', 'Vui lòng cung cấp địa chỉ email hợp lệ.');
          isValid = false;
        } else {
          this.clearFieldError(emailInput, 'error-email');
        }

        // Validate message
        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
          this.setFieldError(messageInput, 'error-message', 'Nội dung tin nhắn cần tối thiểu 10 ký tự.');
          isValid = false;
        } else {
          this.clearFieldError(messageInput, 'error-message');
        }

        if (!isValid) return;

        // Lock button to prevent double-submit
        submitBtn.setAttribute('disabled', 'true');
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <svg class="tech-icon" style="animation: spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
          <span>Đang gửi thông điệp...</span>
        `;

        // Simulate submission
        setTimeout(() => {
          this.formDirty = false;
          form.reset();
          submitBtn.removeAttribute('disabled');
          submitBtn.innerHTML = originalBtnHtml;
          this.showToast('Cảm ơn bạn! Thông điệp đã được gửi thành công.');
        }, 1200);
      });
    }

    setFieldError(input, errorId, message) {
      input.setAttribute('aria-invalid', 'true');
      const errorEl = document.getElementById(errorId);
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
      }
    }

    clearFieldError(input, errorId) {
      input.setAttribute('aria-invalid', 'false');
      const errorEl = document.getElementById(errorId);
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
    }

    /* ==========================================================================
       Toast Notifications (Accessible via aria-live="polite")
       ========================================================================== */
    showToast(message) {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.innerHTML = `
        <span class="body-sm" style="color: var(--color-ink); font-weight: 500;">${message}</span>
        <button type="button" class="btn-icon-circular" style="width: 24px; height: 24px; border: none; background: transparent;" aria-label="Đóng thông báo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      `;

      container.appendChild(toast);

      const closeBtn = toast.querySelector('button');
      let timer = setTimeout(() => {
        toast.remove();
      }, 4500);

      // Pause on hover
      toast.addEventListener('mouseenter', () => clearTimeout(timer));
      toast.addEventListener('mouseleave', () => {
        timer = setTimeout(() => toast.remove(), 2500);
      });

      closeBtn.addEventListener('click', () => {
        clearTimeout(timer);
        toast.remove();
      });
    }

    /* ==========================================================================
       General Listeners
       ========================================================================== */
    setupEventListeners() {
      // Drawer backdrop click
      document.getElementById('drawer-backdrop')?.addEventListener('click', () => {
        this.closeProjectDrawer();
      });

      document.getElementById('drawer-close-btn')?.addEventListener('click', () => {
        this.closeProjectDrawer();
      });

      // Copy Email buttons
      document.querySelectorAll('.copy-email-btn').forEach(btn => {
        btn.addEventListener('click', () => this.copyEmail());
      });

      // Escape key closes project drawer
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeProjectDrawer();
        }
      });
    }
  }

  // Spin animation for button loading state
  const style = document.createElement('style');
  style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  `;
  document.head.appendChild(style);

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PortfolioApp());
  } else {
    new PortfolioApp();
  }
})(typeof window !== 'undefined' ? window : globalThis);
