import { query } from '$lib/server/db';
import { nanoid } from 'nanoid';

const sessionExpiresInSeconds = 60 * 60 * 24 * 90; // 90 day

export async function createSession(): Promise<SessionWithToken> {
	const now = new Date();

	const id = nanoid();
	const secret = nanoid();
	const secretHash = await hashSecret(secret);

	const token = id + '.' + secret;

	const session: SessionWithToken = {
		id,
		secretHash,
		createdAt: now,
		token
	};

	await query('INSERT INTO session (id, secret_hash, created_at) VALUES ($1, $2, $3)', [
		session.id,
		session.secretHash,
		Math.floor(session.createdAt.getTime() / 1000)
	]);

	return session;
}

export async function validateSessionToken(token: string): Promise<Session | null> {
	const tokenParts = token.split('.');
	if (tokenParts.length != 2) {
		return null;
	}
	const sessionId = tokenParts[0];
	const sessionSecret = tokenParts[1];

	const session = await getSession(sessionId);

	if (!session) {
		return null;
	}

	const tokenSecretHash = await hashSecret(sessionSecret);

	const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
	if (!validSecret) {
		return null;
	}

	return session;
}

async function getSession(sessionId: string): Promise<Session | null> {
	const now = new Date();

	const result = await query(
		'SELECT id, secret_hash, created_at FROM session WHERE id = $1',
		[sessionId]
	);
	if (result.rows.length !== 1) {
		return null;
	}
	const row = result.rows[0];
	const session: Session = {
		id: row[0],
		secretHash: row[1],
		createdAt: new Date(row[2] * 1000)
	};

	// Check expiration
	if (now.getTime() - session.createdAt.getTime() >= sessionExpiresInSeconds * 1000) {
		await deleteSession(sessionId);
		return null;
	}

	return session;
}

async function deleteSession(sessionId: string): Promise<void> {
	await query('DELETE FROM session WHERE id = $1', [sessionId]);
}


async function hashSecret(secret: string): Promise<Uint8Array> {
	const secretBytes = new TextEncoder().encode(secret);
	const secretHashBuffer = await crypto.subtle.digest('SHA-256', secretBytes);
	return new Uint8Array(secretHashBuffer);
}


interface SessionWithToken extends Session {
	token: string;
}

interface Session {
	id: string;
	secretHash: Uint8Array;
	createdAt: Date;
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
	if (a.byteLength !== b.byteLength) {
		return false;
	}
	let c = 0;
	for (let i = 0; i < a.byteLength; i++) {
		c |= a[i] ^ b[i];
	}
	return c === 0;
}
