# EasyHTTP Fetch

A simple vanilla JavaScript library to abstract HTTP methods to a common API.

Uses Fetch API to process requests and responses for simple HTTP requests to a CRUD API.

Currently only works with JSON data, but I'm working on that.

If you have to support Internet Explorer and for some reason can't use Babel, (check out the Ajax version)[https://github.com/jasonsbarr/easy-http-ajax].

## Public methods

### Convenience methods to handle specific HTTP verbs
- get()
- post()
- put()
- delete()

### Backend handler for convenience methods
- send()

## How it works
Convenience methods pass a params object to EasyHTTPAjax.ajax(), which handles the XMLHttpRequest object accordingly.

The .send() method is also public if convenience methods aren't sufficient, though functionality is currently limited at this point.

## Example

```js
let http = new EasyHTTP();

// Get posts from external API
let posts = http.get('https://api.example.com/posts')
  .then(posts => /* code to handle posts */)
  .catch(error => /* code to handle error */);
```

See [here](https://github.com/jasonsbarr/easy-http-fetch/blob/ebae8db4e7eabf5f3967cde47e95a3b982149478/src/easyhttpfetch.js#L74-L82) for allowable params to and usage of .send().

Thanks to the [jQuery](https://jquery.com) team for the idea to pass params through a backend method.
