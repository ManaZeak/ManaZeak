class Komunikator {

	constructor(options) {
		this._csrfToken = 3;
		this._csrfToken = options.csrfToken;
		this._headers = [];

		this._init();
	}

	_init() {
		this._headers.push(['Content-Type', 'application/json; charset=UTF-8']); // this._headers[0]
		this._headers.push(['Accept', 'application/json']); // this._headers[1]
		this._headers.push(['X-CSRFToken', this._csrfToken]); // this._headers[2]
	}

	get(url) {
		return new Promise((resolve, reject) => {
			let options = {
				method: 'GET',
				headers: new Headers([ this._headers[0] ])
			};

			fetch(url, options)
				.then(response => {
					if (response.ok) { resolve(response.json()); }

					else {
						switch(response.status) {
							case 404:
								reject('URL_NOT_FOUND');
								break;
							default:
								break;
						}
					}
			});
		});
	}

	post(url, data) {
		return new Promise((resolve, reject) => {
			let options = {
				method: 'POST',
				headers: new Headers(this._headers), // POST needs all previously defined headers
				body: JSON.stringify(data)
			};

			fetch(url, options)
				.then(response => {
					if (response.ok) { resolve(response.json()); }

					else {
						switch(response.status) {
							case 403:
								reject('ACCESS_FORBIDDEN');
								break;
							case 404:
								reject('URL_NOT_FOUND');
							case 500:
								reject('INTERNAL_ERROR');
								break;
							default:
								break;
						}
					}
			});
		});
	}
}

export default Komunikator;
