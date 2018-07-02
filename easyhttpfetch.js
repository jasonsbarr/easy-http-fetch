/**
 * Simple wrapper for Fetch to make asynchronous HTTP
 * requests. Uses the same API as EasyHTTPAjax but
 * using updated JS practices, e.g. ES6+ classes
 * 
 * @file Fetch API wrapper functions
 * @author Jason Barr <jason@jasonsbarr.com>
 * @version 0.1
 * @license MIT
 */

class EasyHTTP {
    /**
     * Make HTTP GET request
     * 
     * @param {string} url 
     */
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
        });
    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
        });
    }
}