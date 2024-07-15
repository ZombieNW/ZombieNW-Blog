import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const db = Database(process.env.DATABASE_FILE || 'db.sqlite');

db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
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

export function createPost(title, content) {
	const info = db.prepare(`INSERT INTO posts (title, content) VALUES (?, ?)`).run(title, content);
	return info.lastInsertRowid;
}

export function updatePost(id, title, content) {
	const info = db
		.prepare(`UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
		.run(title, content, id);

	return info.changes > 0;
}

export function deletePost(id) {
	const info = db.prepare(`DELETE FROM posts WHERE id = ?`).run(id);
	return info.changes > 0;
}
