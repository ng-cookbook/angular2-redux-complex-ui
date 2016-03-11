
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'

var dstPath = path.join(__dirname, '../dist/es6/src/app/.babelrc')

var origPath = path.join(__dirname, '../dist/temp/dist/es6')
var renamedPath = path.join(__dirname, '../dist/es5')
var removedPath = path.join(__dirname, '../dist/temp')

fs.unlink(dstPath, (err) => {
  if (err) {
    console.error(err)
  }
  fs.rename(origPath, renamedPath, (err) => {
    if (err) {
      console.error(err)
    }
    rimraf(removedPath, (err) => {
      if (err) {
        console.error(err)
      }
    })
  })
})
