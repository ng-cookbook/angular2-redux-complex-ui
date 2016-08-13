"use strict";
var path = require('path');
var string_utils_1 = require('../utils/string-utils');
var express = require('express');
var imageData = require('../data/images.json');
var dataPath = path.join(__dirname, '../data');
exports.imageApiRoutes = express.Router();
exports.imageApiRoutes.get('/images', function (req, res) {
    res.json(imageData);
});
exports.imageApiRoutes.get('/images/:id', findImage, function (req, res) {
    res.json(req.imageInfo);
});
exports.imageApiRoutes.get('/images/:id/image', findImage, function (req, res) {
    var imageFile = path.join(dataPath, 'images', 'full', req.imageInfo.fileName);
    res.sendFile(imageFile);
});
exports.imageApiRoutes.get('/images/:id/thumb', findImage, function (req, res) {
    var imageFile = path.join(dataPath, 'images', 'thumbs', req.imageInfo.fileName);
    res.sendFile(imageFile);
});
function findImage(req, res, next) {
    var id = req.params.id;
    var imageInfo = imageData.find(function (img) { return string_utils_1.isMatchingText(img.id, id); });
    if (!imageInfo) {
        return res.sendStatus(404);
    }
    req.imageInfo = imageInfo;
    next();
}
//# sourceMappingURL=images-api.js.map