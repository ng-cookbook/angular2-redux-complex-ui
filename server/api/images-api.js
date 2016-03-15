
import express from 'express'
import path from 'path'
import {isMatchingText} from '../utils/string-utils'
import imageData from '../data/images.json'

const dataPath = path.join(__dirname, '../data')

let router = express.Router()

router.get('/images', (req, res) => {
  res.json(imageData)
})

router.get('/images/:id', findImage, (req, res) => {
  res.json(req.imageInfo)
})

router.get('/images/:id/image', findImage, (req, res) => {
  let imageFile = path.join(dataPath, 'images', 'full', req.imageInfo.fileName)
  res.sendFile(imageFile)
})

router.get('/images/:id/thumb', findImage, (req, res) => {
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

export default router
