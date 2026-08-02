<script lang="ts">
  import BrandGithubIcon from '@iconify-svelte/tabler/brand-github';
  import BrandFacebookFilledIcon from '@iconify-svelte/tabler/brand-facebook-filled';
  import BrandLinkedinFilledIcon from '@iconify-svelte/tabler/brand-linkedin-filled';
  import BrandDiscordFilledIcon from '@iconify-svelte/tabler/brand-discord-filled';
  import { socialLinks } from '@mengche/content';
  import { m } from '$lib/paraglide/messages.js';

  const socialIcons = {
    github: BrandGithubIcon,
    linkedin: BrandLinkedinFilledIcon,
    facebook: BrandFacebookFilledIcon,
    discord: BrandDiscordFilledIcon
  } as const;
</script>

<ul class="social-list" aria-label={m.public_profiles()}>
  {#each socialLinks as social (social.id)}
    <li>
      <a
        class="icon-button"
        href={social.url}
        target="_blank"
        rel="me noreferrer"
        aria-label={social.label}
        title={social.label}
      >
        <svelte:component this={socialIcons[social.id]} aria-hidden="true" />
      </a>
    </li>
  {/each}
</ul>
