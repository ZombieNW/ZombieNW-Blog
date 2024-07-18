export function generateSlug(title) {
	return title
		.toLowerCase()
		.replace(/\s+/g, '_')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '_')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}

export function formatDate(date) {
	const month = new Date(date).toLocaleString('default', { month: 'short' });
	const day = new Date(date).getDate();
	const year = new Date(date).getFullYear();
	return `${month.slice(0, 3)} ${day}, ${year}`;
}
