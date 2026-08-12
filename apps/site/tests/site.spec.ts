import { expect, test } from '@playwright/test';
import { projectSocialImage } from '../../../packages/content/src/seo';

const waitForHydration = (page: import('@playwright/test').Page, selector: string) =>
  page.waitForFunction((target) => {
    const element = document.querySelector(target);
    return (
      element &&
      Reflect.ownKeys(element).some(
        (key) =>
          typeof key === 'symbol' && typeof (element as unknown as Record<symbol, unknown>)[key] === 'object'
      )
    );
  }, selector);

const localizedRoutes = [
  '',
  '/services',
  '/projects',
  '/projects/butter-personal-website',
  '/projects/nrg-commerce',
  '/projects/evosnake',
  '/about',
  '/contact',
  '/privacy'
];

test.describe('localized static routes', () => {
  for (const locale of ['en', 'zh-tw'] as const) {
    for (const route of localizedRoutes) {
      test(`${locale}${route || '/'} renders`, async ({ page }) => {
        const response = await page.goto(`/${locale}${route}`);
        expect(response?.status()).toBe(200);
        await expect(page.locator('main')).toBeVisible();
        await expect(page.locator('html')).toHaveAttribute('lang', locale === 'zh-tw' ? 'zh-TW' : 'en');
      });
    }
  }
});

test('SEO metadata and discovery endpoints stay consistent', async ({ page, request }) => {
  await page.goto('/en/projects/nrg-commerce');

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://www.mengche.dev/en/projects/nrg-commerce'
  );
  await expect(page.locator('link[rel="alternate"][hreflang="zh-Hant-TW"]')).toHaveAttribute(
    'href',
    'https://www.mengche.dev/zh-tw/projects/nrg-commerce'
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'max-image-preview:large');
  const expectedSocialImage = projectSocialImage('nrg-commerce', 'en');
  expect(expectedSocialImage).toBeDefined();
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    expectedSocialImage!.url
  );
  await expect(page.locator('meta[property="og:image:secure_url"]')).toHaveAttribute(
    'content',
    expectedSocialImage!.url
  );
  await expect(page.locator('meta[property="og:image:type"]')).toHaveAttribute('content', 'image/webp');
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630');
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');

  const projectSchemaText = await page.locator('script[type="application/ld+json"]').textContent();
  expect(projectSchemaText).not.toBeNull();
  const projectSchema = JSON.parse(projectSchemaText!) as Record<string, unknown>;
  const projectGraph = projectSchema['@graph'] as Record<string, unknown>[];
  const article = projectGraph.find((node) => node['@type'] === 'Article');
  expect(article).toMatchObject({
    headline: 'NRG Commerce',
    datePublished: '2026-08-01',
    author: { '@id': 'https://www.mengche.dev/#person' },
    about: { '@type': 'WebApplication' }
  });
  expect(article?.image).toMatchObject([
    { url: 'https://cdn.mengche.dev/projects/nrg-1.webp', width: 1280, height: 720 }
  ]);

  await page.goto('/en/about');
  const aboutSchemaText = await page.locator('script[type="application/ld+json"]').textContent();
  expect(aboutSchemaText).not.toBeNull();
  const aboutSchema = JSON.parse(aboutSchemaText!) as Record<string, unknown>;
  const aboutGraph = aboutSchema['@graph'] as Record<string, unknown>[];
  expect(aboutGraph.some((node) => node['@type'] === 'ProfilePage')).toBe(true);
  expect(aboutGraph.some((node) => node['@type'] === 'BreadcrumbList')).toBe(true);

  const sitemapResponse = await request.get('/sitemap.xml');
  expect(sitemapResponse.status()).toBe(200);
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain('<loc>https://www.mengche.dev/</loc>');
  expect(sitemap).toContain('<loc>https://www.mengche.dev/en/projects/nrg-commerce</loc>');
  expect(sitemap).toContain('<loc>https://www.mengche.dev/zh-tw/projects/nrg-commerce</loc>');
  expect(sitemap).toContain('<lastmod>2026-08-01</lastmod>');
  for (const homeUrl of [
    'https://www.mengche.dev/',
    'https://www.mengche.dev/en',
    'https://www.mengche.dev/zh-tw'
  ]) {
    expect(sitemap).toContain(`<url><loc>${homeUrl}</loc><lastmod>2026-08-01</lastmod>`);
  }

  const robotsResponse = await request.get('/robots.txt');
  expect(robotsResponse.status()).toBe(200);
  const robots = await robotsResponse.text();
  expect(robots).toContain('Content-Signal: ai-train=no, search=yes, ai-input=yes');
  expect(robots).toContain('Sitemap: https://www.mengche.dev/sitemap.xml');

  const rootResponse = await request.get('/');
  expect(rootResponse.status()).toBe(200);
  const rootHtml = await rootResponse.text();
  expect(rootHtml).toContain('application/ld+json');
  expect(rootHtml).toContain('WebSite');
  expect(rootHtml).toContain('MengChe Dev');
});

test('commercial metadata, contextual links, and Markdown policy stay index-safe', async ({
  page,
  request
}) => {
  await page.goto('/en');
  await expect(page).toHaveTitle('Web Development for Taiwan Small Businesses | Jay Hsieh');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Websites built to work');

  await page.goto('/en/services');
  await expect(page.getByRole('link', { name: "Butter's Personal Website" })).toHaveCount(2);
  await expect(page.getByRole('link', { name: 'NRG Commerce' })).toHaveCount(2);

  await page.goto('/en/projects/butter-personal-website');
  await expect(page.getByRole('link', { name: 'Marketing website' })).toHaveAttribute(
    'href',
    '/en/services#marketing-site'
  );
  await expect(page.getByRole('link', { name: 'Portfolio or business site' })).toHaveAttribute(
    'href',
    '/en/services#portfolio-business-site'
  );
  await expect(page.getByRole('link', { name: 'NRG Commerce' })).toBeVisible();

  await page.goto('/en/projects/nrg-commerce');
  await expect(page).toHaveTitle('NRG Commerce Web Application Case Study | Jay Hsieh');
  await expect(page.getByRole('link', { name: 'Portfolio or business site' })).toHaveAttribute(
    'href',
    '/en/services#portfolio-business-site'
  );
  await expect(page.getByRole('link', { name: 'Small full-stack app' })).toHaveAttribute(
    'href',
    '/en/services#full-stack-application'
  );
  await expect(page.getByRole('link', { name: "Butter's Personal Website" })).toBeVisible();
  await expect(page.getByRole('link', { name: 'EvoSnake' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Start a project' }).last()).toBeVisible();

  await page.goto('/en/projects/evosnake');
  await expect(page.getByRole('link', { name: 'NRG Commerce' })).toBeVisible();

  const markdown = await request.get('/en/services.md');
  expect(markdown.status()).toBe(200);
  expect(markdown.headers()['x-robots-tag']).toBe('noindex, follow');
  expect(await markdown.text()).toContain('**Payment:**');

  const negotiated = await request.get('/en/services', { headers: { accept: 'text/markdown' } });
  expect(negotiated.headers()['content-type']).toContain('text/markdown');
  expect(negotiated.headers()['x-robots-tag']).toBe('noindex, follow');

  const html = await request.get('/en/services', { headers: { accept: 'text/html' } });
  expect(html.headers()['x-robots-tag']).toBeUndefined();
  expect(html.headers()['x-frame-options']).toBe('DENY');
  expect(html.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
});

test('simplified pages keep the intended order, cards, and FAQ behavior', async ({ page, request }) => {
  await page.goto('/en');
  await expect(page.locator('main h2')).toHaveText([
    'A practical partner for a defined web need',
    'Built with care',
    'Websites and web applications',
    'How to judge fit before requesting a proposal',
    'Four-stage project process',
    'What happens after you make contact',
    'Full-stack work with clear decisions',
    'Have a defined problem to solve?'
  ]);
  await expect(page.getByRole('heading', { name: 'What the working process produces' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Evidence instead of unsupported promises' })).toHaveCount(
    0
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en/services');
  await expect(page.locator('.comparison-card')).toHaveCount(3);
  await expect(page.locator('.comparison-pagination button')).toHaveCount(3);
  await page.locator('.comparison-pagination button').nth(1).click();
  await expect(page.locator('.comparison-pagination button').nth(1)).toHaveAttribute('aria-current', 'true');
  await expect(page.locator('.faq-item')).toHaveCount(6);
  await expect(page.locator('.faq-item').first()).not.toHaveAttribute('open');
  await page.locator('.faq-item').first().locator('summary').click();
  await expect(page.locator('.faq-item').first()).toHaveAttribute('open', '');

  await page.goto('/en/projects');
  await expect(page.getByRole('heading', { name: 'What these examples do not establish' })).toHaveCount(0);

  await page.goto('/en/about');
  for (const heading of [
    'How I approach web development',
    'What collaboration looks like',
    'Public proof and ongoing learning',
    'When I am likely to be a good fit',
    'Featured projects'
  ]) {
    await expect(page.getByRole('heading', { name: heading })).toHaveCount(0);
  }

  const servicesMarkdown = await request.get('/en/services.md');
  expect(await servicesMarkdown.text()).toContain('Which service should I choose?');
});

test('language switch keeps the equivalent route scroll position and preference', async ({ page }) => {
  await page.goto('/en/services');
  await page.evaluate(() => window.scrollTo(0, 700));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(600);

  await waitForHydration(page, 'select[aria-label="Language"]');
  await page.getByLabel('Language').selectOption('zh-tw');
  await expect(page).toHaveURL(/\/zh-tw\/services$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(600);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('locale'))).toBe('zh-tw');
});

test('manual theme selection persists', async ({ page }) => {
  await page.goto('/en');
  await page.evaluate(() => localStorage.removeItem('theme'));
  await page.reload();
  await waitForHydration(page, 'button[aria-label="Theme: System"]');
  await page.getByRole('button', { name: 'Theme: System' }).click();
  await page.getByRole('button', { name: 'Theme: Light' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: 'Theme: Dark' })).toBeVisible();
});

test('social profiles use labeled icon buttons', async ({ page }) => {
  await page.goto('/en/about');
  const profiles = page.locator('footer');
  for (const label of ['GitHub', 'LinkedIn', 'Facebook', 'Discord']) {
    const link = profiles.getByRole('link', { name: label });
    await expect(link).toBeVisible();
    await expect(link.locator('svg')).toBeVisible();
  }
});

test('contact page exposes the qualified lead fields without an email heading', async ({ page }) => {
  await page.goto('/en/contact');
  await expect(page.getByLabel('Name')).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Service')).toBeVisible();
  await expect(page.getByLabel('Budget range')).toBeVisible();
  await expect(page.getByLabel('Target timeline')).toBeVisible();
  await expect(page.getByLabel('Project summary')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Prefer email?' })).toHaveCount(0);
});

test('contact form blocks invalid fields before sending', async ({ page }) => {
  let requestCount = 0;
  await page.route('**/v1/inquiries', async (route) => {
    requestCount += 1;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'POST, OPTIONS',
        'access-control-allow-headers': 'content-type'
      },
      body: JSON.stringify({ ok: true })
    });
  });

  await page.goto('/en/contact');
  await page.evaluate(() => window.onMengcheTurnstile?.('test-token'));
  await page.getByRole('button', { name: 'Send inquiry' }).click();

  await expect(page.locator('#name:invalid')).toBeVisible();
  await expect(page.locator('#email:invalid')).toBeVisible();
  await expect(page.locator('#summary:invalid')).toBeVisible();
  expect(requestCount).toBe(0);
});

test('contact form displays the localized success state', async ({ page }) => {
  await page.route('**/v1/inquiries', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'POST, OPTIONS',
        'access-control-allow-headers': 'content-type'
      },
      body: JSON.stringify({ ok: true })
    });
  });

  await page.goto('/en/contact');
  await page.getByLabel('Name').fill('Test User');
  await page.getByLabel('Email').fill('test@example.com');
  await page
    .getByLabel('Project summary')
    .fill('A complete project summary with enough detail to pass validation.');
  await page.getByLabel(/I agree to the data use/).check();
  await page.evaluate(() => window.onMengcheTurnstile?.('test-token'));
  await page.getByRole('button', { name: 'Send inquiry' }).click();

  await expect(page.getByRole('status')).toContainText('Your inquiry was sent');
});

test('homepage uses the expected secondary buttons and process cards', async ({ page }) => {
  await page.goto('/en');

  for (const name of ['View services', 'About Jay Hsieh']) {
    const button = page.getByRole('link', { name });
    await expect(button).toHaveClass(/button/);
    await expect(button).toHaveClass(/secondary/);
  }

  await expect(page.locator('.process-step')).toHaveCount(4);
  await expect(page.locator('.process-arrow')).toHaveCount(3);
});

test('mobile navigation opens from a hamburger button', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en');

  const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
  await expect(navigation).toBeHidden();

  const openMenu = page.getByRole('button', { name: 'Open menu' });
  await waitForHydration(page, 'button[aria-label="Open menu"]');
  await openMenu.click();
  await expect(navigation).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');

  await page.keyboard.press('Escape');
  await expect(navigation).toBeHidden();
  await expect(openMenu).toBeFocused();
  await openMenu.click();

  await navigation.getByRole('link', { name: 'Services' }).click();
  await expect(page).toHaveURL(/\/en\/services$/);
});

test('about capability heading keeps its tablet width without wrapping on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto('/en/about');

  const headingColumn = page.locator('.capabilities-layout > .flow');
  const heading = headingColumn.getByRole('heading', { name: 'Full-stack developer' });
  const tabletWidth = await headingColumn.evaluate((element) => element.clientWidth);

  await page.setViewportSize({ width: 1280, height: 900 });
  const desktopWidth = await headingColumn.evaluate((element) => element.clientWidth);
  const whiteSpace = await heading.evaluate((element) => getComputedStyle(element).whiteSpace);
  const listWidth = await page.locator('.capability-list').evaluate((element) => element.clientWidth);

  expect(desktopWidth).toBe(tabletWidth);
  expect(whiteSpace).toBe('nowrap');
  expect(listWidth).toBeGreaterThan(desktopWidth);
});

test('services page uses clear service cards terms and an explained CTA', async ({ page }) => {
  await page.goto('/en/services');

  await expect(page.getByText('For individuals and small businesses')).toBeVisible();
  await expect(page.locator('.service-card')).toHaveCount(3);
  await expect(page.locator('.service-meta')).toHaveCount(3);
  await expect(page.locator('.service-detail')).toHaveCount(12);
  await expect(page.locator('.term-card')).toHaveCount(4);
  await expect(page.getByRole('heading', { name: 'Not sure which service fits?' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Start a project' })).toBeVisible();
});

test('projects page uses its own technical-work introduction and approved public projects', async ({
  page
}) => {
  await page.goto('/en/projects');

  await expect(page.getByText('Selected technical work')).toBeVisible();
  await expect(
    page.getByText(
      'Selected sites and applications showing how I plan, build, test, and deploy different web projects.'
    )
  ).toBeVisible();
  await expect(page.locator('.editorial-row')).toHaveCount(3);
  for (const project of ["Butter's Personal Website", 'NRG Commerce', 'EvoSnake']) {
    await expect(page.getByRole('heading', { name: project })).toBeVisible();
  }
  for (const project of ['Ping Board', 'CommNode', "SuiSui's Personal Website"]) {
    await expect(page.getByText(project, { exact: true })).toHaveCount(0);
  }
});

test('project detail back link returns to the previous page and falls back to projects', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('link', { name: "Butter's Personal Website", exact: true }).first().click();
  await expect(page).toHaveURL(/\/en\/projects\/butter-personal-website$/);
  await page.getByRole('link', { name: /Back/ }).click();
  await expect(page).toHaveURL(/\/en\/?$/);

  await page.goto('/en/projects/butter-personal-website');
  await page.getByRole('link', { name: /Back/ }).click();
  await expect(page).toHaveURL(/\/en\/projects$/);
});

test('content lists use the intended markers and project content uses the full shell width', async ({
  page
}) => {
  await page.goto('/en/services');
  const serviceList = page.locator('.plain-list').first();
  await expect(serviceList).toBeVisible();
  expect(await serviceList.evaluate((element) => getComputedStyle(element).listStyleType)).toBe('disc');

  await page.goto('/en/projects/butter-personal-website');
  await expect(page.locator('#main-content aside')).toHaveCount(0);

  const projectContent = page.locator('.project-content');
  await expect(projectContent).toBeVisible();
  const contentWidths = await projectContent.evaluate((element) => ({
    content: element.clientWidth,
    parent: element.parentElement?.clientWidth,
    maxWidth: getComputedStyle(element).maxWidth
  }));
  expect(contentWidths.content).toBe(contentWidths.parent);
  expect(contentWidths.maxWidth).toBe('none');

  const technologyList = page.locator('.tech-list').first();
  await expect(technologyList).toBeVisible();
  expect(await technologyList.evaluate((element) => getComputedStyle(element).display)).toBe('flex');
  expect(await technologyList.evaluate((element) => getComputedStyle(element).listStyleType)).toBe('none');
  const technologySeparator = await technologyList
    .locator('li')
    .first()
    .evaluate((element) => getComputedStyle(element, '::before').content);
  expect(technologySeparator).toBe('"—"');

  const projectList = page.locator('.project-content ul').first();
  await expect(projectList).toBeVisible();
  expect(await projectList.evaluate((element) => getComputedStyle(element).listStyleType)).toBe('disc');
});

test('about page presents profile details and opens credentials in a lightbox', async ({ page }) => {
  await page.goto('/en/about');

  await expect(page.getByText('Full-stack developer', { exact: true }).first()).toBeVisible();
  await expect(
    page.getByText(
      'I build full-stack web projects with maintainable structure, clear flows, good performance, and reliable deployment.'
    )
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Backend systems, APIs, and data' })).toBeVisible();
  await expect(page.locator('.about-facts .fact')).toHaveCount(2);
  await expect(page.getByRole('heading', { name: 'Certificates and language credentials' })).toBeVisible();
  await expect(page.locator('.credential-card')).toHaveCount(2);

  const toeicCard = page.locator('.credential-card').filter({ hasText: 'TOEIC Gold (885)' });
  const markdownCredentialLink = toeicCard.locator('.credential-markdown-link');
  await expect(markdownCredentialLink).toBeHidden();
  await expect(markdownCredentialLink).toHaveAttribute(
    'href',
    'https://cdn.mengche.dev/certificates/toeic-2023.webp'
  );
  const dialog = page.getByRole('dialog', { name: 'TOEIC Gold (885)' });
  await expect(dialog).toBeHidden();
  await toeicCard.getByRole('button', { name: 'View credential' }).click();
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('img', { name: 'TOEIC Gold (885) credential' })).toHaveAttribute(
    'src',
    'https://cdn.mengche.dev/certificates/toeic-2023.webp'
  );

  const dialogBounds = await dialog.boundingBox();
  expect(dialogBounds).not.toBeNull();
  if (dialogBounds) {
    expect(dialogBounds.width).toBeLessThanOrEqual(896);
    expect(dialogBounds.height).toBeLessThanOrEqual(688);
    expect(Math.abs(dialogBounds.x + dialogBounds.width / 2 - 640)).toBeLessThan(2);
    expect(Math.abs(dialogBounds.y + dialogBounds.height / 2 - 360)).toBeLessThan(2);
  }

  await dialog.getByRole('button', { name: 'Close credential' }).click();
  await expect(dialog).toBeHidden();
});

test('localized pages avoid horizontal overflow at common viewport widths', async ({ page }) => {
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const locale of ['en', 'zh-tw'] as const) {
      for (const route of ['', '/services', '/projects', '/about', '/contact', '/privacy']) {
        await page.goto(`/${locale}${route}`);
        const layout = await page.evaluate(() => {
          const viewportWidth = window.innerWidth;
          const offenders = Array.from(document.querySelectorAll<HTMLElement>('body *'))
            .map((element) => ({ element, rect: element.getBoundingClientRect() }))
            .filter(({ rect }) => rect.right > viewportWidth + 1 || rect.left < -1)
            .slice(0, 5)
            .map(({ element, rect }) => ({
              selector: `${element.tagName.toLowerCase()}.${element.className}`,
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              text: element.textContent?.trim().slice(0, 80)
            }));
          const scrollContainers = Array.from(document.querySelectorAll<HTMLElement>('body, body *'))
            .filter((element) => element.scrollWidth > element.clientWidth + 1)
            .slice(0, 8)
            .map((element) => ({
              selector: `${element.tagName.toLowerCase()}.${element.className}`,
              clientWidth: element.clientWidth,
              scrollWidth: element.scrollWidth,
              overflowX: getComputedStyle(element).overflowX,
              text: element.textContent?.trim().slice(0, 80)
            }));
          return {
            overflow: document.documentElement.scrollWidth - viewportWidth,
            offenders,
            scrollContainers,
            metrics: {
              innerWidth: window.innerWidth,
              clientWidth: document.documentElement.clientWidth,
              scrollWidth: document.documentElement.scrollWidth,
              bodyScrollWidth: document.body.scrollWidth,
              visualWidth: window.visualViewport?.width
            }
          };
        });
        expect(
          layout.overflow,
          `${locale}${route || '/'} at ${width}px: ${JSON.stringify(layout)}`
        ).toBeLessThanOrEqual(1);
      }
    }
  }
});
