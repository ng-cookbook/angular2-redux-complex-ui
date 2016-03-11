
import fs from 'fs'
import path from 'path'

var srcPath = path.join(__dirname, '../src/app/.babelrc')
var dstPath = path.join(__dirname, '../dist/es6/src/app/.babelrc')

fs
  .createReadStream(srcPath)
  .pipe(fs.createWriteStream(dstPath))
