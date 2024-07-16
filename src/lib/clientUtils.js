export function generateSlug(title) {
	return title
		.toLowerCase()
		.replace(/\s+/g, '_')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '_')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}
