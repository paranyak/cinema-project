Movie Poster Example

```js 
const Provider = require('react-redux').Provider;
const createStore = require('redux').createStore;
const applyMiddleware = require('redux').applyMiddleware;
const moviesApp = require('../reducers').default;
const thunkMiddleware = require('redux-thunk').default;


<Provider store={createStore(moviesApp, applyMiddleware(thunkMiddleware))}>
  <MoviePoster />
</Provider>
```