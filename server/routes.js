"use strict";
var path = require('path');
var images_api_1 = require('./api/images-api');
var express = require('express');
exports.app = express();
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
};
for (var _i = 0, _a = Object.entries(vendorFiles); _i < _a.length; _i++) {
    var _b = _a[_i], name_1 = _b[0], path_1 = _b[1];
    exports.app.use('/vendor/' + name_1, express.static(path_1));
}
exports.app.use('/api', images_api_1.imageApiRoutes);
var clientRoutes = /^\/($|images(\/|$))/i;
var indexHtml = path.join(__dirname, '..', 'src', 'index.html');
exports.app.get(clientRoutes, function (req, res) {
    res.sendFile(indexHtml);
});
exports.app.use('/', express.static('src'));
//# sourceMappingURL=routes.js.map