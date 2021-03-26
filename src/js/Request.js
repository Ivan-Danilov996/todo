import Dom from './Dom';

export default class Request {
    constructor() {
        this.container = Dom.getContainer();
        this.loading = Dom.createLiading();
    }

    isLoading() {
        this.container.innerHTML = '';
        this.container.append(this.loading);
    }

    showError(e) {
        console.log(e);
    }

    async createRequest(url, method, data) {
        if (document.querySelector('.create-auth-form')) {
            this.container.append(this.loading);
        } else {
            this.isLoading();
        }
        if (method === 'PATCH') {
            try {
                const response = await fetch(url, {
                    method
                });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return await response.json();
            } catch (e) {
                this.showError(e);
            }
        } else if (method === 'POST') {
            try {
                const response = await fetch(url, {
                    method,
                    body: data,
                });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return await response.json();
            } catch (e) {
                this.showError(e);
            }
        } else {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return await response.json();
            } catch (e) {
                this.showError(e);
            }
        }

    }
}
