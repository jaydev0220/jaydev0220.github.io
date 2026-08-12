<script lang="ts">
  import BrandGithubIcon from '$lib/icons/BrandGithub.svelte';
  import BrandFacebookFilledIcon from '$lib/icons/BrandFacebookFilled.svelte';
  import BrandLinkedinFilledIcon from '$lib/icons/BrandLinkedinFilled.svelte';
  import BrandDiscordFilledIcon from '$lib/icons/BrandDiscordFilled.svelte';
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
    {@const SocialIcon = socialIcons[social.id]}
    <li>
      <a
        class="icon-button"
        href={social.url}
        target="_blank"
        rel="me noreferrer"
        aria-label={social.label}
        title={social.label}
      >
        <SocialIcon aria-hidden="true" />
      </a>
    </li>
  {/each}
</ul>
