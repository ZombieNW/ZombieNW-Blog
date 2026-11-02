import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { desc, lte } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const now = new Date();

	const allPosts = await db.query.posts.findMany({
		where: lte(posts.createdAt, now),
		orderBy: [desc(posts.createdAt)]
	});

	const siteUrl = url.origin;
	const siteTitle = 'ZombieNW Blog';
	const siteDescription =
		"This is where I talk about stuff on the internet, or make really bad jokes, or, if you're lucky, both at once...";
	const siteAuthor = 'ZombieNW';

	const lastBuildDate =
		allPosts.length > 0 && allPosts[0].createdAt
			? new Date(allPosts[0].createdAt).toUTCString()
			: now.toUTCString();

	const itemsXml = allPosts
		.map((post) => {
			const postUrl = `${siteUrl}/blog/${post.slug}`;
			const pubDate = new Date(post.createdAt ?? now).toUTCString();
			const postContent = post.content || post.description || '';

			return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(siteAuthor)}</dc:creator>
      <description>${escapeXml(post.description || '')}</description>
      <content:encoded>${wrapCdata(postContent)}</content:encoded>
    </item>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <description>${escapeXml(siteDescription)}</description>
    <link>${siteUrl}</link>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=3600',
			'X-Content-Type-Options': 'nosniff'
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

function wrapCdata(content: string): string {
	return `<![CDATA[${content.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}
