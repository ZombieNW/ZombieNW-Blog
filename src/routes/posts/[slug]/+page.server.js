export async function load({ params }) {
	const { slug } = params;

	return { postId: slug };
}
