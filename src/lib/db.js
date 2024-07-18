import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import { generateSlug } from '$lib/clientUtils';

dotenv.config();

const db = Database(process.env.DATABASE_FILE || 'db.sqlite');

db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
		slug TEXT NOT NULL UNIQUE,
		description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

export function getAllPosts() {
	return db.prepare(`SELECT * FROM posts ORDER BY created_at DESC`).all();
}

export function getPostById(id) {
	return db.prepare(`SELECT * FROM posts WHERE id = ?`).get(id);
}

export function getPostBySlug(slug) {
	return db.prepare(`SELECT * FROM posts WHERE slug = ?`).get(slug);
}

export function getPaginatedPosts(page, postsPerPage) {
	const offset = (page - 1) * postsPerPage;
	const posts = db
		.prepare(
			`
        SELECT * FROM posts
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
        `
		)
		.all(postsPerPage, offset);

	const totalPostCount = db.prepare(`SELECT COUNT(*) as count FROM posts`).get().count;

	return {
		posts,
		totalPages: Math.ceil(totalPostCount / postsPerPage),
		currentPage: page
	};
}

export function createPost(title, content, description) {
	const slug = generateSlug(title);
	const info = db.prepare(`INSERT INTO posts (title, content, slug, description) VALUES (?, ?, ?, ?)`).run(title, content, slug, description);
	return info.lastInsertRowid;
}

export function updatePost(id, title, content, description) {
	console.log(description);
	const info = db.prepare(`UPDATE posts SET title = ?, content = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(title, content, description, id);

	return info.changes > 0;
}

export function deletePost(id) {
	const info = db.prepare(`DELETE FROM posts WHERE id = ?`).run(id);
	return info.changes > 0;
}
