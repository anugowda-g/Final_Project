const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    targetGroup: {
        type: String,
        enum: ['non-contactable', 'renewal-due', 'unclaimed'],
        required: true
    },
    status: {
        type: String,
        enum: ['Draft', 'Active', 'Completed'],
        default: 'Draft'
    },
    results: {
        reached: { type: Number, default: 0 },
        responded: { type: Number, default: 0 },
        converted: { type: Number, default: 0 }
    }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', CampaignSchema);