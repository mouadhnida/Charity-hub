const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  }},
  { timestamps: true }, // CreatedAt UpdateAt
);

module.exports = mongoose.model("Donation", DonationSchema)

