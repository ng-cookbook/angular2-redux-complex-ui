
import * as path from 'path'
import {isMatchingText} from '../utils/string-utils'
const express = require('express')
const imageData = require('../data/images.json')

const dataPath = path.join(__dirname, '../data')

export const imageApiRoutes = express.Router()

imageApiRoutes.get('/images', (req, res) => {
  res.json(imageData)
})

imageApiRoutes.get('/images/:id', findImage, (req, res) => {
  res.json(req.imageInfo)
})

imageApiRoutes.get('/images/:id/image', findImage, (req, res) => {
  let imageFile = path.join(dataPath, 'images', 'full', req.imageInfo.fileName)
  res.sendFile(imageFile)
})

imageApiRoutes.get('/images/:id/thumb', findImage, (req, res) => {
  let imageFile = path.join(dataPath, 'images', 'thumbs', req.imageInfo.fileName)
  res.sendFile(imageFile)
})

function findImage (req, res, next) {
  let id = req.params.id
  let imageInfo = imageData.find((img) => isMatchingText(img.id, id))
  if (!imageInfo) {
    return res.sendStatus(404)
  }
  req.imageInfo = imageInfo
  next()
}

