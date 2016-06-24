import express from 'express'
import path from 'path'
import imagesRouter from './api/images-api'

let app = express()

var vendorFiles = {
  'systemjs': 'node_modules/systemjs/dist',
  'corejs': 'node_modules/core-js/client',
  'zonejs': 'node_modules/zone.js/dist',
  'reflect-metadata': 'node_modules/reflect-metadata',
  'angular': 'node_modules/@angular',
  'rxjs': 'node_modules/rxjs',
  'jquery': 'node_modules/jquery/dist',
  'redux': 'node_modules/redux/dist',
  'redux-thunk': 'node_modules/redux-thunk/lib',
  'lodash': 'node_modules/lodash',
  'font-awesome': 'node_modules/font-awesome',
  'semantic-ui': 'node_modules/semantic-ui-css'
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
