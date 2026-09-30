const baseUrl = process.env.REACT_APP_API_BASE_URL ?? '';

export const ADMIN_TOKEN_KEY = 'admin_token';

export const getAdminToken = (): string | null =>
	sessionStorage.getItem(ADMIN_TOKEN_KEY);

export const setAdminToken = (token: string): void => {
	sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const clearAdminToken = (): void => {
	sessionStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const authHeaders = (): HeadersInit => {
	const token = getAdminToken();
	return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function adminLogin(password: string): Promise<void> {
	const response = await fetch(`${baseUrl}/admin/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ password }),
	});

	const data = await response.json().catch(() => ({}));

	if (!response.ok) {
		throw new Error(data.error || 'Неверный пароль');
	}

	setAdminToken(data.token);
}

export { baseUrl };
