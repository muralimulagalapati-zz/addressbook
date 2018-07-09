const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
  contactId: {
    type: String,
    required:true,
    unique: true
  }, email: {
    type: String,
    required: true,
    unique: true
  }, name: {
    type: String,
    required: true
  }, phone: Number
})

ContactSchema.statics.search = function (args = {}) {
  return this.find(args)
}

ContactSchema.statics.updateContact = function(args) {
  const { email } = args
  return this.update({ email }, args)
}

module.exports = mongoose.model('Contacts', ContactSchema)
