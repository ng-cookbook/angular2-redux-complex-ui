import express from 'express'
import path from 'path'
import imagesRouter from './api/images-api'

let app = express()

var vendorFiles = {
  'es6-shim': 'node_modules/es6-shim',
  'systemjs': 'node_modules/systemjs/dist',
  'angular2': 'node_modules/angular2',
  'rxjs': 'node_modules/rxjs',
  'jquery': 'node_modules/jquery/dist',
  'redux': 'node_modules/redux/dist',
  'redux-thunk': 'node_modules/redux-thunk/lib',
  'lodash': 'node_modules/lodash',
  'font-awesome': 'node_modules/font-awesome'
}
for (let [name, path] of Object.entries(vendorFiles)) {
  app.use('/vendor/' + name, express.static(path))
}

app.use('/api', imagesRouter)
app.use('/app', express.static('dist/es5/src/app'))

let clientRoutes = /^\/($|images(\/|$))/i
let indexHtml = path.join(__dirname, '..', 'src', 'index.html')
app.get(clientRoutes, (req, res) => {
  res.sendFile(indexHtml)
})
app.use('/', express.static('src'))

export default app
