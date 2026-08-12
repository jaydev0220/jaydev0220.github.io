<script lang="ts">
  import XIcon from '$lib/icons/X.svelte';
  import { profile } from '@mengche/content';
  import { m } from '$lib/paraglide/messages.js';

  let { qualification }: { qualification: (typeof profile.qualifications)[number] } = $props();
  let dialog: HTMLDialogElement | undefined;
  const titleId = $derived(`credential-title-${qualification.id}`);

  function attachDialog(element: HTMLDialogElement) {
    dialog = element;
    return () => {
      dialog = undefined;
    };
  }

  function openCredential() {
    dialog?.showModal();
  }

  function closeCredential() {
    dialog?.close();
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === dialog) closeCredential();
  }
</script>

<article class="credential-card">
  <div class="flow" style="--flow-space: var(--space-2)">
    <p class="eyebrow">{qualification.issuer}</p>
    <h3>{qualification.name}</h3>
    <p class="muted">{qualification.year}</p>
  </div>
  <button class="button secondary" type="button" aria-haspopup="dialog" onclick={openCredential}>
    {m.view_credential()}
  </button>
  <a class="text-link" href={qualification.credentialUrl} target="_blank" rel="noreferrer">
    {m.view_credential()}
  </a>
</article>

<dialog
  {@attach attachDialog}
  class="credential-lightbox"
  aria-labelledby={titleId}
  onclick={handleBackdropClick}
>
  <div class="credential-lightbox-panel">
    <header class="credential-lightbox-header">
      <div class="flow" style="--flow-space: var(--space-1)">
        <p class="eyebrow">{qualification.issuer} · {qualification.year}</p>
        <h2 id={titleId}>{qualification.name}</h2>
      </div>
      <button
        class="icon-button"
        type="button"
        aria-label={m.close_credential()}
        title={m.close_credential()}
        onclick={closeCredential}
      >
        <XIcon aria-hidden="true" />
      </button>
    </header>
    <div class="credential-lightbox-media">
      <img
        src={qualification.credentialUrl}
        alt={m.credential_image_alt({ name: qualification.name })}
        width="930"
        height="719"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
</dialog>
