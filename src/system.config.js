(function (global) {
  var map = {
    '@angular': 'vendor/angular',
    'rxjs': 'vendor/rxjs',
    'lodash': 'vendor/lodash/lodash.js',
    'redux': 'vendor/redux/redux.js',
    'redux-thunk': 'vendor/redux-thunk/index.js'
  }

  var packages = {
    'app': {
      main: 'app-bootstrap.js',
      defaultExtension: 'js'
    },
    'rxjs': {
      defaultExtension: 'js'
    }
  }

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated'
  ]

  function packIndex (pkgName) {
    packages[ '@angular/' + pkgName ] = { main: 'index.js', defaultExtension: 'js' }
  }

  function packUmd (pkgName) {
    packages[ '@angular/' + pkgName ] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' }
  }

  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd
  ngPackageNames.forEach(setPackageConfig)
  var config = {
    map: map,
    packages: packages
  }
  System.config(config)
  System
    .import('app/app-bootstrap')
    .then(null, console.error.bind(console))
}(this))
