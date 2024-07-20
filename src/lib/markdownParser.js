import MarkdownIt from 'markdown-it';
import stylesConfig from './markdownStyles.json';
import hljs from 'highlight.js';

export function createMarkdownParser() {
	const md = new MarkdownIt({
		html: true,
		linkify: true,
		typographer: true
	});

	const applyRule = (tokens, idx, options, env, self, classes) => {
		tokens[idx].attrJoin('class', `${classes}`);
		return self.renderToken(tokens, idx, options);
	};

	md.renderer.rules.paragraph_open = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.paragraph);

	md.renderer.rules.heading_open = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.heading[tokens[idx].tag]);

	md.renderer.rules.bullet_list_open = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.list.ul);

	md.renderer.rules.ordered_list_open = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.list.ol);

	md.renderer.rules.list_item_open = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.list.li);

	md.renderer.rules.blockquote_open = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.blockquote);

	md.renderer.rules.link_open = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.link);

	md.renderer.rules.image = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.image);

	md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
		// Build Element
		let result = `<code class="${stylesConfig.code.inline}">`;
		result += tokens[idx].content;
		result += '</code>';

		return result;
	};

	md.renderer.rules.fence = (tokens, idx, options, env, self) => {
		const token = tokens[idx];
		const lang = token.info.trim().split(/\s+/g)[0];
		const content = token.content;
		let highlightedContent = content;
		if (lang) {
			highlightedContent = hljs.highlight(content, { language: lang }).value;
		}

		// Build Element
		let result = `<pre class="${stylesConfig.code.pre}">`;
		result += `<code${lang ? ` class="language-${lang} ${stylesConfig.code.block}"` : ''}>`;
		result += highlightedContent;
		result += '</code></pre>';

		return result;
	};

	md.renderer.rules.hr = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.hr);

	md.renderer.rules.table_open = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.table.table);

	md.renderer.rules.thead_open = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.table.thead);

	md.renderer.rules.th_open = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.table.th);

	md.renderer.rules.tbody_open = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.table.tbody);

	md.renderer.rules.td_open = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.table.td);

	md.renderer.rules.tr_open = (tokens, idx, options, env, self) => applyRule(tokens, idx, options, env, self, stylesConfig.table.tr);

	return md;
}

export function parseMarkdown(markdown) {
	const parser = createMarkdownParser();
	return parser.render(markdown);
}
