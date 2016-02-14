"use strict";

var express = require("express");
var app = express();
var portNum = process.env.PORT || 9988;

app.use("/vendor/es6-shim", express.static("node_modules/es6-shim"));
app.use("/vendor/systemjs", express.static("node_modules/systemjs/dist"));
app.use("/vendor/angular2", express.static("node_modules/angular2/bundles"));
app.use("/vendor/rxjs", express.static("node_modules/rxjs/bundles"));
app.use("/", express.static("src"));

app.listen(portNum, function() {
    console.log("Web application listening on port " + portNum);
});
