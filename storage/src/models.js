module.exports = function(mongoose){

  var Schema = mongoose.Schema
  var Customer = new Schema({
    name: { type: String, required: true },
    comment: { type: String }
  })
  var CustomerModel = mongoose.model('Customer', Customer)

  var Invoice = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    amount: { type: Number, required: true }
  })
  var InvoiceModel = mongoose.model('Invoice', Invoice)

  return {
    customer:CustomerModel,
    invoice:InvoiceModel
  }
}