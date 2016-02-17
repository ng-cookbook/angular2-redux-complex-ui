
import express from 'express'
import path from 'path'

const dataPath = path.join(__dirname, '../data')

let router = express.Router()

router.get('/images', (req, res) => {
  res.sendFile(path.join(dataPath, 'images.json'))
})

export default router
