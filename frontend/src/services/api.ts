const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
    async post(endpoint: string, data: any) {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeader()
            },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async get(endpoint: string) {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: this.getAuthHeader()
        });
        return response.json();
    },

    getAuthHeader(): Record<string, string> {
        const token = localStorage.getItem('accessToken');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
};
