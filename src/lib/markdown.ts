import { marked } from 'marked';
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
	themes: ['github-dark-default'],
	langs: ['typescript', 'javascript', 'svelte', 'bash', 'css', 'html', 'c', 'c++']
});

// register code highlighter as an extension of marked
marked.use({
	renderer: {
		code({ text, lang }) {
			return highlighter.codeToHtml(text, {
				lang: lang || 'text',
				theme: 'github-dark-default'
			});
		}
	}
});

export async function parseMarkdown(content: string) {
	return await marked.parse(content, { async: true });
}
