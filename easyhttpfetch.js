/**
 * Simple wrapper for Fetch to make asynchronous HTTP
 * requests. Uses the same API as EasyHTTPAjax but
 * using updated JS practices, e.g. ES6+ classes
 * Only works with JSON for now, but will fix
 * 
 * @file Fetch API wrapper functions for simple HTTP requests
 * @author Jason Barr <jason@jasonsbarr.com>
 * @version 0.1
 * @license MIT
 */

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
     * @param {string} contentType MIME type of data to send
     * @returns {string|Object}
     */
    async post(url, data, contentType) {
        return this.send(url, {
            method: 'POST',
            headers: {
                'Content-Type': contentType
            }
        }, data);
    }

    /**
     * Make HTTP PUT request to update record
     * 
     * @param {string} url 
     * @param {Object} data
     * @param {string} contentType MIME type of data to send 
     * @returns {string|Object}
     */
    async put(url, data, contentType) {
        return this.send(url, {
            method: 'PUT',
            headers: {
                'Content-Type': contentType
            }
        }, data);
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

        return response.ok;
    }

    /**
     * Backend handler to send HTTP requests for helper methods
     * 
     * @param {string} url
     * @param {Object} params Fetch parameters
     * @param {string} params.method HTTP method
     * @param {Object} params.headers Headers to send with HTTP request
     * @param {Object} data Data to send on POST/PUT requests
     */
    async send(url, params, data) {
        let response = await fetch(url, {
            method: params.method,
            headers: params.headers,
            body: JSON.stringify(data)
        });

        let responseData = await response.json();
        return responseData;
    }
}