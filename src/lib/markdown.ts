import { marked } from 'marked';

export async function parseMarkdown(content: string) {
	return await marked.parse(content);
}
