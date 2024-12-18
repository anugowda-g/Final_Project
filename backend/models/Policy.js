const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    policyNumber: { type: String, required: true, unique: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    type: { type: String, required: true },
    status: {
        type: String,
        enum: ['Active', 'Due for Renewal', 'Matured', 'Unclaimed'],
        required: true
    },
    renewalDate: Date,
    premium: Number,
    maturityAmount: Number
}, { timestamps: true });

module.exports = mongoose.model('Policy', PolicySchema);