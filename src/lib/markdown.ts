import { marked } from 'marked';
import { createHighlighter } from 'shiki';

// init highligher
const highlighter = await createHighlighter({
	themes: ['github-dark', 'github-light'],
	langs: ['typescript', 'javascript', 'svelte', 'bash', 'css', 'html']
});

// make highlighter extension
marked.use({
	renderer: {
		code({ text, lang }) {
			return highlighter.codeToHtml(text, {
				lang: lang || 'text',
				theme: 'github-dark'
			});
		}
	}
});

export async function parseMarkdown(content: string) {
	return await marked.parse(content, { async: true });
}
