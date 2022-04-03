import express from 'express'
import Buyer from '../models/buyer.js'

const router = new express.Router()

router.post('/buyer/register',async (req, res) => {
  try {
    const buyer = new Buyer(req.body)
    await buyer.save()

    res.status(201).send(buyer)
  } catch (e) {
    
  }
})

export default router