const _ = require('lodash')
const FS  = require('fs')
const Q  = require('q')
const glob = require('glob')
const sass = require('node-sass')

let globSearch = Q.denodeify(glob)
let sassRender = Q.nbind(sass.render, sass)
let writeFile = Q.denodeify(FS.writeFile)
let sassDefaults = {
  includePaths: [
  ],
  indentedSyntax: true
}

globSearch('src/**/*.scss')
  .then((files) => {
    var result = Q()
    files.forEach((srcFile) => {
      result = result
        .then(() => {
          let dstFile = srcFile.replace(/\.scss$/i, '.css')
          return buildSassFile(srcFile, dstFile)
        })
    })
    return result
  })
  .then(() => {
    console.log('Compiled CSS files.')
  })
  .catch((err) => {
    console.log('SASS Error:')
    console.log(err)
  })

function buildSassFile (srcFile, dstFile) {
  let sassOptions = _.defaults({ file: srcFile }, sassDefaults)
  return sassRender(sassOptions)
    .then((result) => {
      return writeFile(dstFile, result.css)
    })
}
