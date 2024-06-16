const express = require('express')
const geminiRouter = express.Router()
const geminiController = require('../controllers/llm-controller.js')

geminiRouter.route('/gemini').post(geminiController.geminiResponse)

module.exports = geminiRouter
