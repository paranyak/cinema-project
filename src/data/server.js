const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const db = router.db;

server.use(middlewares)

server.use((req, res, next) => {
  if (req.query) {
    req.queryCopy = Object.assign({}, req.query);
  }
  // Continue to JSON Server router
  next()
})


// server.get('/moviesIds', (req, res) => {
//   let movies = db.get('movies').filter(req.query).value();
//
//   let paramKeys = Object.keys(req.query);
//
//
//   res.json(movies);
// })
//

router.render = (req, res) => {
  if(req.queryCopy && req.queryCopy.properties) {
    let propertiesList = req.queryCopy.properties.split(',');

    if (propertiesList.length === 1) {
      let property = propertiesList[0];
      res.locals.data = res.locals.data.map((el) => el[property])
    } else if (propertiesList.length > 1) {
      res.locals.data = res.locals.data.map((el) => {
        let result = {};

        propertiesList.forEach(key => {
          result[key] = el[key];
        })

        return result;
      })
    }

    res.json(res.locals.data);
  } else {
    res.json(res.locals.data)
  }
}

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
