export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (url.hostname === 'mengche.dev') {
			url.hostname = 'www.mengche.dev';
			return Response.redirect(url.toString(), 308);
		}
		return env.ASSETS.fetch(request);
	}
};
