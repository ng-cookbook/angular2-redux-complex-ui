"use strict";

var express = require("express");
var app = express();
var portNum = process.env.PORT || 9988;

app.use("/", express.static("src"));

app.listen(portNum, function() {
    console.log("Web application listening on port " + portNum);
});
