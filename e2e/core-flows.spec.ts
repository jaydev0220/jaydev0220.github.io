import { test, expect } from '@playwright/test';

test.describe('Homepage Core Flows', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test.describe('Major Section Rendering', () => {
		test('should render all major sections of the homepage', async ({ page }) => {
			// Navigation
			const nav = page.getByTestId('navigation');
			await expect(nav).toBeVisible();
			await expect(nav.getByTestId('logo')).toBeVisible();
			await expect(nav.getByTestId('desktop-nav')).toBeVisible();

			// Hero section
			const hero = page.getByTestId('hero-section');
			await expect(hero).toBeVisible();
			await expect(hero.getByTestId('typing-text')).toBeVisible();
			await expect(hero.getByTestId('cta-about')).toBeVisible();
			await expect(hero.getByTestId('cta-portfolio')).toBeVisible();

			// About section
			const about = page.getByTestId('about-section');
			await expect(about).toBeVisible();
			await expect(about.getByTestId('education-card').first()).toBeVisible();

			// Verify social links exist
			const socialGithub = about.getByTestId('social-github');
			const socialLinkedin = about.getByTestId('social-linkedin');
			await expect(socialGithub).toBeVisible();
			await expect(socialLinkedin).toBeVisible();

			// Tech Stack section
			const techStack = page.getByTestId('tech-stack-section');
			await expect(techStack).toBeVisible();
			// Verify at least one tech category is visible
			await expect(techStack.getByTestId('tech-category-frontend')).toBeVisible();

			// Portfolio section
			const portfolio = page.getByTestId('portfolio-section');
			await expect(portfolio).toBeVisible();
			await expect(portfolio.getByTestId('portfolio-filters')).toBeVisible();
			await expect(portfolio.getByTestId('projects-grid')).toBeVisible();

			// Footer
			const footer = page.getByTestId('footer');
			await expect(footer).toBeVisible();
		});

		test('should render navigation links correctly', async ({ page }) => {
			const nav = page.getByTestId('desktop-nav');

			// Check all navigation links are present
			await expect(nav.getByTestId('nav-link-about')).toBeVisible();
			await expect(nav.getByTestId('nav-link-tech stack')).toBeVisible();
			await expect(nav.getByTestId('nav-link-portfolio')).toBeVisible();
			await expect(nav.getByTestId('nav-link-contact')).toBeVisible();
		});
	});

	test.describe('Mobile Menu Flow', () => {
		test('should open mobile menu when hamburger is clicked', async ({ page }) => {
			// Set mobile viewport
			await page.setViewportSize({ width: 375, height: 667 });

			// Initially, mobile menu should be closed
			const overlay = page.getByTestId('mobile-overlay');
			const drawer = page.getByTestId('mobile-drawer');

			await expect(overlay).not.toBeVisible();
			await expect(drawer).not.toBeVisible();

			// Click hamburger button
			const hamburger = page.getByTestId('hamburger-button');
			await hamburger.click();

			// Mobile menu should now be open
			await expect(overlay).toBeVisible();
			await expect(drawer).toBeVisible();

			// Verify mobile nav links are visible
			await expect(drawer.getByTestId('mobile-nav-link-about')).toBeVisible();
			await expect(drawer.getByTestId('mobile-nav-link-tech stack')).toBeVisible();
		});

		test('should close mobile menu when overlay is clicked', async ({ page }) => {
			// Set mobile viewport
			await page.setViewportSize({ width: 375, height: 667 });

			// Open mobile menu
			const hamburger = page.getByTestId('hamburger-button');
			await hamburger.click();

			// Verify menu is open
			const overlay = page.getByTestId('mobile-overlay');
			const drawer = page.getByTestId('mobile-drawer');
			await expect(overlay).toBeVisible();
			await expect(drawer).toBeVisible();

			// Click overlay to close
			await overlay.click();

			// Menu should be closed
			await expect(overlay).not.toBeVisible();
			await expect(drawer).not.toBeVisible();
		});

		test('should close mobile menu when close button is clicked', async ({ page }) => {
			// Set mobile viewport
			await page.setViewportSize({ width: 375, height: 667 });

			// Open mobile menu
			const hamburger = page.getByTestId('hamburger-button');
			await hamburger.click();

			// Verify menu is open
			const overlay = page.getByTestId('mobile-overlay');
			const drawer = page.getByTestId('mobile-drawer');
			await expect(overlay).toBeVisible();
			await expect(drawer).toBeVisible();

			// Click close button
			const closeButton = page.getByTestId('close-menu-button');
			await closeButton.click();

			// Menu should be closed
			await expect(overlay).not.toBeVisible();
			await expect(drawer).not.toBeVisible();
		});
	});

	test.describe('Portfolio Filter Flow', () => {
		test('should show all projects by default', async ({ page }) => {
			const projectsGrid = page.getByTestId('projects-grid');

			// Should show all 9 projects
			const allProjects = projectsGrid.locator('.project-card');
			await expect(allProjects).toHaveCount(9);

			// Verify "All Projects" filter is active
			const allFilter = page.getByTestId('filter-all');
			await expect(allFilter).toHaveClass(/active/);
		});

		test('should filter to web projects when Web Apps filter is clicked', async ({ page }) => {
			const projectsGrid = page.getByTestId('projects-grid');

			// Click "Web Apps" filter
			const webFilter = page.getByTestId('filter-web');
			await webFilter.click();

			// Should show 6 web projects (ecommerce-platform, data-visualization-dashboard,
			// ai-content-generator, social-media-analytics, real-time-chat-platform, inventory-management-system)
			const visibleProjects = projectsGrid.locator('.project-card');
			await expect(visibleProjects).toHaveCount(6);

			// Verify the filter is active
			await expect(webFilter).toHaveClass(/active/);

			// Verify specific web projects are visible
			await expect(projectsGrid.getByTestId('project-ecommerce-platform')).toBeVisible();
			await expect(projectsGrid.getByTestId('project-real-time-chat-platform')).toBeVisible();
		});

		test('should filter to mobile projects when Mobile Apps filter is clicked', async ({
			page
		}) => {
			const projectsGrid = page.getByTestId('projects-grid');

			// Click "Mobile Apps" filter
			const mobileFilter = page.getByTestId('filter-mobile');
			await mobileFilter.click();

			// Should show 2 mobile projects (task-manager-mobile, fitness-tracker-app)
			const visibleProjects = projectsGrid.locator('.project-card');
			await expect(visibleProjects).toHaveCount(2);

			// Verify the filter is active
			await expect(mobileFilter).toHaveClass(/active/);

			// Verify specific mobile projects are visible
			await expect(projectsGrid.getByTestId('project-task-manager-mobile')).toBeVisible();
			await expect(projectsGrid.getByTestId('project-fitness-tracker-app')).toBeVisible();
		});

		test('should filter to data projects when Data & Analytics filter is clicked', async ({
			page
		}) => {
			const projectsGrid = page.getByTestId('projects-grid');

			// Click "Data & Analytics" filter
			const dataFilter = page.getByTestId('filter-data');
			await dataFilter.click();

			// Should show 2 data projects (data-visualization-dashboard, social-media-analytics)
			const visibleProjects = projectsGrid.locator('.project-card');
			await expect(visibleProjects).toHaveCount(2);

			// Verify the filter is active
			await expect(dataFilter).toHaveClass(/active/);

			// Verify specific data projects are visible
			await expect(projectsGrid.getByTestId('project-data-visualization-dashboard')).toBeVisible();
			await expect(projectsGrid.getByTestId('project-social-media-analytics')).toBeVisible();
		});

		test('should filter to automation projects when Automation filter is clicked', async ({
			page
		}) => {
			const projectsGrid = page.getByTestId('projects-grid');

			// Click "Automation" filter
			const automationFilter = page.getByTestId('filter-automation');
			await automationFilter.click();

			// Should show 3 automation projects (ai-content-generator, devops-automation-suite,
			// inventory-management-system)
			const visibleProjects = projectsGrid.locator('.project-card');
			await expect(visibleProjects).toHaveCount(3);

			// Verify the filter is active
			await expect(automationFilter).toHaveClass(/active/);

			// Verify specific automation projects are visible
			await expect(projectsGrid.getByTestId('project-devops-automation-suite')).toBeVisible();
			await expect(projectsGrid.getByTestId('project-inventory-management-system')).toBeVisible();
		});

		test('should return to all projects when All Projects filter is clicked after filtering', async ({
			page
		}) => {
			const projectsGrid = page.getByTestId('projects-grid');

			// First, filter to mobile
			await page.getByTestId('filter-mobile').click();
			await expect(projectsGrid.locator('.project-card')).toHaveCount(2);

			// Then click "All Projects"
			const allFilter = page.getByTestId('filter-all');
			await allFilter.click();

			// Should show all 9 projects again
			await expect(projectsGrid.locator('.project-card')).toHaveCount(9);
			await expect(allFilter).toHaveClass(/active/);
		});
	});

	test.describe('Interactive Elements', () => {
		test('should have working CTA buttons in hero section', async ({ page }) => {
			const ctaAbout = page.getByTestId('cta-about');
			const ctaPortfolio = page.getByTestId('cta-portfolio');

			await expect(ctaAbout).toBeVisible();
			await expect(ctaAbout).toBeEnabled();
			await expect(ctaPortfolio).toBeVisible();
			await expect(ctaPortfolio).toBeEnabled();
		});

		test('should display project links when available', async ({ page }) => {
			const projectsGrid = page.getByTestId('projects-grid');

			// E-commerce platform has both GitHub and live URLs
			const ecommerceProject = projectsGrid.getByTestId('project-ecommerce-platform');
			await expect(ecommerceProject.getByTestId('project-github-ecommerce-platform')).toBeVisible();
			await expect(ecommerceProject.getByTestId('project-live-ecommerce-platform')).toBeVisible();

			// Task manager mobile has only GitHub URL
			const taskManagerProject = projectsGrid.getByTestId('project-task-manager-mobile');
			await expect(
				taskManagerProject.getByTestId('project-github-task-manager-mobile')
			).toBeVisible();
		});
	});
});
