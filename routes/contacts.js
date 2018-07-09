const express = require('express')
const uuidv1 = require('uuid/v1');
const contactRouter = express.Router()

const Contacts = require('../models/contacts')

const searchHandler = async (req, res) => {
  try {
    const data = await Contacts.search(req.query)
    data.length ? res.status(200).json(data) : res.sendStatus(404)
  } catch(e) {
    console.error(e);
    res.sendStatus(400)
  }
}

const updateHandler = async (req, res) => {
  const { name, email } = req.body
  if(!name || !email) {
    return res.sendStatus(400)
  }
  try {
    const result = await Contacts.updateContact({name, email})
    res.status(200).json(result)
  } catch (e) {
    console.error(e);
    res.sendStatus(400)
  }
}

const addHandler = async (req, res) => {
  const { name, email } = req.body
  if(!name || !email) {
    return res.sendStatus(400)
  }
  const contactId = uuidv1()
  const newContact = new Contacts({contactId, name, email})
  try {
    const result = await newContact.save()
    res.status(201).json(result)
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}

const removeHandler = async (req, res) => {
  const { contactId } = req.body
  if (!contactId) {
    console.error("ContactId is empty on removehandler")
    res.sendStatus(400)
  }
  try {
    await Contacts.deleteOne({ contactId })
    res.sendStatus(200)
  } catch (e) {
    console.error(e);
    res.sendStatus(400)
  }
}

contactRouter.get('/', searchHandler).post('/', addHandler)
             .patch('/', updateHandler).delete('/', removeHandler)

module.exports = contactRouter
