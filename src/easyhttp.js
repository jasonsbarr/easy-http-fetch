/**
 * Simple wrapper for Fetch to make asynchronous HTTP
 * requests. Uses the same API as EasyHTTPAjax but
 * using updated JS practices, e.g. ES6+ classes
 * Only works with JSON for now, but will fix
 * 
 * @file Fetch API wrapper functions for simple HTTP requests
 * @author Jason Barr <jason@jasonsbarr.com>
 * @version 0.5
 * @license MIT
 */

class HTTPError extends Error {
    constructor(errorMessage) {
        super(errorMessage);
        this.name = 'HTTPError'
    }
}

class InvalidInputError extends Error {
    constructor(errorMessage) {
        super(errorMessage);
        this.name = 'InvalidInputError'
    }
}

function isData(data) {
    if (data != undefined) {
        return true;
    }

    return false;
}

function prepareData(data, contentType) {
    if (contentType === 'application/json') {
        return JSON.stringify(data);
    }

    return data;
}

class EasyHTTP {
    /**
     * Make HTTP GET request to retrieve record(s)
     * 
     * @param {string} url
     * @returns {string|Object}
     */
    async get(url) {
        return this.send(url, {
            method: 'GET'
        });
    }

    /**
     * Make HTTP POST request to create record
     * 
     * @param {string} url 
     * @param {Object} data
     * @param {string} [contentType] MIME type of data to send
     * @returns {string|Object}
     */
    async post(url, data, contentType) {
        if (isData(data)) {
            return this.send(url, {
                method: 'POST',
                headers: {
                    'Content-Type': contentType || 'application/json'
                }
            }, data);
        }

        return new InvalidInputError('No data provided.')
    }

    /**
     * Make HTTP PUT request to update record
     * 
     * @param {string} url 
     * @param {Object} data
     * @param {string} [contentType] MIME type of data to send 
     * @returns {string|Object}
     */
    async put(url, data, contentType) {
        if (isData(data)) {
            return this.send(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': contentType || 'application/json'
                }
            }, data);
        }

        return new InvalidInputError('No data provided');
    }

    /**
     * Make HTTP DELETE request to delete record
     * 
     * @param {string} url 
     * @returns {boolean}
     */
    async delete(url) {
        let response = await fetch(url, {
            method: 'DELETE'
        });

        if (response.ok) {
            return `${response.statusText}: Resource deleted.`
        }

        return new HTTPError('Something went wrong. Please make sure all your parameters are correct.')
    }

    async getRawJson(url) {
        const response = await this.send(url, {
            method: 'GET'
        });

        if (response.ok) {
            return JSON.stringify(response);
        } else {
            return response;
        }
    }

    /**
     * Backend handler to send HTTP requests for helper methods
     * 
     * @param {string} url
     * @param {Object} params Fetch parameters
     * @param {string} params.method HTTP method
     * @param {Object} params.headers Headers to send with HTTP request
     * @param {string} [params.headers['Content-Type']=application/json] Sets Content-Type header
     * @param {Object} data Data to send on POST/PUT requests
     */
    async send(url, params, data) {
        let response = await fetch(url, {
            method: params.method,
            headers: params.headers,
            body: prepareData(data, params.headers['Content-Type'])
        });

        console.log(response);

        if (response.ok) {
            let responseData = await response.json();
            return responseData;
        } else {
            return new HTTPError(`${response.status}: ${response.statusText}`)
        }

    }
}
