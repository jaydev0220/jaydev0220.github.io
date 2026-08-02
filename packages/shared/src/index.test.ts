import { describe, expect, it } from 'vitest';
import { validateInquiry } from './index';

const validInquiry = {
  name: 'Jay',
  email: 'jay@example.com',
  organization: '',
  service: 'marketing-site',
  budget: '25000-49999',
  timeline: '1-2-months',
  summary: 'A sufficiently detailed project summary for validation.',
  locale: 'en',
  privacyConsent: true,
  turnstileToken: 'test-token'
};

describe('validateInquiry', () => {
  it('normalizes a valid inquiry', () => {
    const result = validateInquiry(validInquiry);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.email).toBe('jay@example.com');
  });

  it('rejects invalid fields', () => {
    const result = validateInquiry({ ...validInquiry, email: 'invalid', summary: 'short' });
    expect(result).toEqual({ ok: false, fields: ['email', 'summary'] });
  });
});
