const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    socialMediaProfiles: {
        facebook: String,
        twitter: String,
        linkedin: String
    },
    contactStatus: {
        type: String,
        enum: ['Contactable', 'Non-contactable'],
        default: 'Contactable'
    },
    lastContactAttempt: Date,
    policies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Policy' }]
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);