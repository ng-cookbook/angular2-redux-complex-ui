(function (global) {

    System.config({
        paths: {
            'npm:': 'node_modules/'
        },
        map: {
            'app': 'app',
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            'rxjs': 'vendor/rxjs',
            'lodash': 'vendor/lodash/lodash.js',
            'redux': 'vendor/redux/redux.js',
            'redux-thunk': 'vendor/redux-thunk/index.js'
        },
        packages: {
            app: {
                main: './app-bootstrap.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });

    System
        .import('app/app-bootstrap')
        .then(null, console.error.bind(console))

})(this)
