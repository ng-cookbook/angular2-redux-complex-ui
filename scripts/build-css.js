"use strict";

var _ = require('lodash');
var FS = require('fs');
var Q = require('q');
var sass = require('node-sass');

var sassRender = Q.nbind(sass.render, sass);
var writeFile = Q.nbind(FS.writeFile, FS);
var sassDefaults = {
    includePaths: [
        'node_modules/foundation-sites/scss/'
    ],
    indentedSyntax: true
};

buildSassFile('demo-app')
    .then(function() {
        console.log("Compiled SASS CSS.");
    })
    .catch(function(err) {
        console.log("SASS Error:");
        console.log(err);
        done();
    });

function buildSassFile(name) {
    var srcFile = ['scss/', name, '.scss'].join("");
    var dstFile = ['src/css/', name, '.css'].join("");
    return sassRender(_.defaults({
        file: srcFile
    }, sassDefaults))
        .then(function(result) {
            return writeFile(dstFile, result.css);
        });
}
