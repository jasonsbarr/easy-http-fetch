/**
 * Simple wrapper for Fetch to make asynchronous HTTP
 * requests. Uses the same API as EasyHTTPAjax but
 * using updated JS practices, e.g. ES6+ classes
 * Only works with JSON for now, but will fix
 * 
 * @file Fetch API wrapper functions
 * @author Jason Barr <jason@jasonsbarr.com>
 * @version 0.1
 * @license MIT
 */

class EasyHTTP {
    /**
     * Make HTTP GET request to retrieve record(s)
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

    /**
     * Make HTTP POST request to create record
     * 
     * @param {string} url 
     * @param {Object} data 
     */
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

    /**
     * Make HTTP PUT request to update record
     * 
     * @param {string} url 
     * @param {Object} data 
     */
    put(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
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

    /**
     * Make HTTP DELETE request to delete record
     * 
     * @param {string} url 
     */
    delete(url) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => resolve(true))
            .catch(error => reject(error))
        });
    }
}