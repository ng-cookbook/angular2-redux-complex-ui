"use strict";

var _ = require("lodash");
var express = require("express");
var app = express();
var portNum = process.env.PORT || 9988;

var vendorFiles = {
    "es6-shim": "node_modules/es6-shim",
    "systemjs": "node_modules/systemjs/dist",
    "angular2": "node_modules/angular2",
    "rxjs": "node_modules/rxjs",
    "foundation": "node_modules/foundation-sites/dist",
    "jquery": "node_modules/foundation-sites/node_modules/jquery/dist",
    "what-input": "node_modules/foundation-sites/node_modules/what-input"
};

_.forEach(vendorFiles, function(path, name) {
    app.use("/vendor/" + name, express.static(path));
});

app.use("/", express.static("src"));

app.listen(portNum, function() {
    console.log("Web application listening on port " + portNum);
});
