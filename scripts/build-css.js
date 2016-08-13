var _ = require('lodash');
var FS = require('fs');
var Q = require('q');
var glob = require('glob');
var sass = require('node-sass');
var globSearch = Q.denodeify(glob);
var sassRender = Q.nbind(sass.render, sass);
var writeFile = Q.denodeify(FS.writeFile);
var sassDefaults = {
    includePaths: [],
    indentedSyntax: true
};
globSearch('src/**/*.scss')
    .then(function (files) {
    var result = Q();
    files.forEach(function (srcFile) {
        result = result
            .then(function () {
            var dstFile = srcFile.replace(/\.scss$/i, '.css');
            return buildSassFile(srcFile, dstFile);
        });
    });
    return result;
})
    .then(function () {
    console.log('Compiled CSS files.');
})
    .catch(function (err) {
    console.log('SASS Error:');
    console.log(err);
});
function buildSassFile(srcFile, dstFile) {
    var sassOptions = _.defaults({ file: srcFile }, sassDefaults);
    return sassRender(sassOptions)
        .then(function (result) {
        return writeFile(dstFile, result.css);
    });
}
//# sourceMappingURL=build-css.js.map