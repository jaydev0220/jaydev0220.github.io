<script lang="ts">
	import { iconMap } from '$lib/iconMap';
	import { iconCredits } from '$lib/data';
</script>

<svelte:head>
	<title>Icon Credits | 謝孟哲</title>
	<meta
		name="description"
		content="技能區塊使用之 Icon 來源與授權資訊，包含作者/來源專案與授權條款。"
	/>
</svelte:head>

<div class="min-h-screen bg-bg-primary px-6 py-24 text-text-primary">
	<div class="mx-auto w-full max-w-max-width px-6">
		<div class="mb-10 flex items-end justify-between gap-4 border-b border-border pb-5">
			<div>
				<h1 class="font-family-display text-[clamp(2rem,5vw,2.5rem)]">Icon Credits</h1>
				<p class="mt-3 text-sm text-text-secondary">此頁列出所有 Icon 的來源與授權資訊。</p>
			</div>
			<a
				href="/"
				class="text-sm text-text-secondary underline-offset-4 hover:text-accent-primary hover:underline"
			>
				返回首頁
			</a>
		</div>

		<div class="overflow-x-auto border border-border bg-bg-secondary">
			<table class="w-full min-w-[920px] border-collapse text-left text-sm">
				<thead>
					<tr class="border-b border-border bg-bg-tertiary text-text-secondary">
						<th class="px-4 py-3">Icon</th>
						<th class="px-4 py-3">Skill</th>
						<th class="px-4 py-3">Source</th>
						<th class="px-4 py-3">License</th>
						<th class="px-4 py-3">Notes</th>
					</tr>
				</thead>
				<tbody>
					{#each iconCredits as credit (credit.icon)}
						<tr class="border-b border-border align-top last:border-b-0">
							<td class="px-4 py-3">
								<img src={iconMap[credit.icon]} alt={`${credit.name} icon`} class="h-6 w-auto" />
							</td>
							<td class="px-4 py-3">{credit.name}</td>
							<td class="px-4 py-3">
								{#if credit.sourceUrl}
									<a
										href={credit.sourceUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="text-text-secondary underline-offset-4 hover:text-accent-primary hover:underline"
									>
										{credit.sourceName}
									</a>
								{:else}
									<span>{credit.sourceName}</span>
								{/if}
							</td>
							<td class="px-4 py-3">
								{#if credit.licenseUrl}
									<a
										href={credit.licenseUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="text-text-secondary underline-offset-4 hover:text-accent-primary hover:underline"
									>
										{credit.license}
									</a>
								{:else if credit.license}
									<span>{credit.license}</span>
								{/if}
								{#if credit.modified}
									<span
										class="ml-2 inline-block border border-warning px-2 py-0.5 text-xs text-warning"
										>Modified</span
									>
								{/if}
							</td>
							<td class="px-4 py-3 text-text-muted">{credit.note ?? '-'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<p class="mt-4 text-xs text-text-muted">
			商標與品牌名稱歸各自權利人所有；使用品牌標誌時仍需遵循其品牌使用規範。
		</p>
	</div>
</div>
