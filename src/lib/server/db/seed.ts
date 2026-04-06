import { db } from './index';
import { posts } from './schema';

async function seed() {
	console.log('Seeding...');

	// Optional: Clear existing posts
	// await db.delete(posts);

	await db.insert(posts).values([
		{
			title: 'My First Post',
			slug: 'my-first-post',
			description: 'This is my first post.',
			content: 'This is the content of my first post.'
		},
		{
			title: 'My Second Post',
			slug: 'my-second-post',
			description: 'This is my second post.',
			content: 'This is the content of my second post.'
		}
	]);

	console.log('Seeding done!');
}

seed().catch((err) => {
	console.error('Seed failed:', err);
	process.exit(1);
});
