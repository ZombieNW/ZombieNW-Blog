import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const GET = async ({ url }) => {
	const allPosts = await db.query.posts.findMany({
		orderBy: [desc(posts.createdAt)]
	});

	const siteUrl = url.origin;
	const siteTitle = 'ZombieNW Blog';
	const siteDescription = "I haven't thought of a description yet.";

	// generate xml
	const xml = `
    <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>${siteTitle}</title>
        <description>${siteDescription}</description>
        <link>${siteUrl}</link>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
		${allPosts
			.map(
				(post) => `
                    <item>
                    <title>${escapeXml(post.title)}</title>
                    <description>${escapeXml(post.description || '')}</description>
                    <link>${siteUrl}/blog/${post.slug}</link>
                    <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
                    <pubDate>${new Date(post.createdAt!).toUTCString()}</pubDate>
                    </item>
                `
			)
			.join('')}
      </channel>
    </rss>
  `.trim();

	// return response with propper headers
	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};

// xml cleaner helper
function escapeXml(unsafe: string): string {
	return unsafe.replace(/[<>&"']/g, (c) => {
		switch (c) {
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '&':
				return '&amp;';
			case '"':
				return '&quot;';
			case "'":
				return '&apos;';
			default:
				return c;
		}
	});
}
