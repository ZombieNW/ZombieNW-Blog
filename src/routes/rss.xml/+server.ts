import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const allPosts = await db.query.posts.findMany({
		orderBy: [desc(posts.createdAt)]
	});

	const siteUrl = url.origin;
	const siteTitle = 'ZombieNW Blog';
	const siteDescription =
		"This is where I talk about stuff on the internet, or make really bad jokes, or, if you're lucky, both at once...";

	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <description>${escapeXml(siteDescription)}</description>
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
      <pubDate>${new Date(post.createdAt ?? Date.now()).toUTCString()}</pubDate>
    </item>`
		)
		.join('')}
  </channel>
</rss>`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};

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
