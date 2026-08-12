import { describe, expect, it } from 'vitest';
import { htmlToMarkdownDocument, markdownPathForHtml } from './generate-markdown.mjs';

const sampleHtml = `<!doctype html>
<html lang="en">
  <head>
    <title>About — Example</title>
    <meta name="description" content="Developer profile &amp; qualifications">
    <link rel="canonical" href="https://example.com/en/about">
  </head>
  <body>
    <nav>Global navigation</nav>
    <main id="main-content">
      <header>
        <h1>About</h1>
        <p>Full-stack <strong>developer</strong>.</p>
      </header>
      <section>
        <h2>Work</h2>
        <ul><li>Frontend</li><li>Backend</li></ul>
        <a href="/en/projects">Projects</a>
        <a href="https://example.org" aria-label="Profile"><svg><path></path></svg></a>
        <a href="https://example.org/credential" hidden>View credential</a>
        <img src="/portrait.webp" alt="Profile portrait">
      </section>
      <section>
        <table><thead><tr><th>Skill</th><th>Usage</th></tr></thead><tbody><tr><td>TypeScript</td><td>Daily</td></tr></tbody></table>
      </section>
      <section>
        <dl>
          <div><dt>Payment</dt><dd>Deposit before work starts.</dd></div>
          <div><dt>Revisions</dt><dd>Two review rounds.</dd></div>
        </dl>
      </section>
      <form><label>Name</label><input name="name"><button>Submit</button></form>
      <dialog><h2>Duplicated modal content</h2></dialog>
    </main>
    <footer>Global footer</footer>
    <script>console.log('presentation only')</script>
  </body>
</html>`;

describe('build-time HTML to Markdown generation', () => {
  it('keeps metadata and semantic main content while removing page chrome and controls', () => {
    const markdown = htmlToMarkdownDocument(sampleHtml);

    expect(markdown).toContain('title: "About — Example"');
    expect(markdown).toContain('description: "Developer profile & qualifications"');
    expect(markdown).toContain('canonical: "https://example.com/en/about"');
    expect(markdown).toContain('lang: "en"');
    expect(markdown).toContain('# About');
    expect(markdown).toContain('Full-stack **developer**.');
    expect(markdown).toContain('- Frontend\n- Backend');
    expect(markdown).toContain('[Projects](https://example.com/en/projects)');
    expect(markdown).toContain('[Profile](https://example.org/)');
    expect(markdown).toContain('[View credential](https://example.org/credential)');
    expect(markdown).toContain('![Profile portrait](https://example.com/portrait.webp)');
    expect(markdown).toContain('| Skill | Usage |');
    expect(markdown).toContain('| TypeScript | Daily |');
    expect(markdown).toContain('- **Payment:** Deposit before work starts.');
    expect(markdown).toContain('- **Revisions:** Two review rounds.');
    expect(markdown).toContain('Name');
    expect(markdown).not.toContain('Submit');
    expect(markdown).not.toContain('Duplicated modal content');
    expect(markdown).not.toContain('Global navigation');
    expect(markdown).not.toContain('Global footer');
    expect(markdown).not.toContain('presentation only');
  });

  it('maps generated files beside their prerendered HTML source', () => {
    expect(markdownPathForHtml('/build/en/about.html')).toBe('/build/en/about.md');
  });
});
