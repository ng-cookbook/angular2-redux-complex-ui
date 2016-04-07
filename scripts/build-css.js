import _ from 'lodash'
import FS from 'fs'
import Q from 'q'
import sass from 'node-sass'

let sassRender = Q.nbind(sass.render, sass)
let writeFile = Q.nbind(FS.writeFile, FS)
let sassDefaults = {
  includePaths: [
  ],
  indentedSyntax: true
}

buildSassFile('demo-app')
  .then(() => {
    console.log('Compiled SASS CSS.')
  })
  .catch((err) => {
    console.log('SASS Error:')
    console.log(err)
  })

function buildSassFile (name) {
  let srcFile = [ 'scss/', name, '.scss' ].join('')
  let dstFile = [ 'src/css/', name, '.css' ].join('')
  let sassOptions = _.defaults({ file: srcFile }, sassDefaults)
  return sassRender(sassOptions)
    .then((result) => {
      return writeFile(dstFile, result.css)
    })
}
