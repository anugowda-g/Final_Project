const Campaign = require('../models/Campaign');
const Policy = require('../models/Policy');
const Customer = require('../models/Customers');

exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().sort({ createdAt: -1 });
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCampaign = async (req, res) => {
    try {
        const campaign = new Campaign(req.body);
        
        // Calculate initial metrics based on target group
        const metrics = await calculateCampaignMetrics(req.body.targetGroup);
        campaign.metrics = metrics;
        
        const savedCampaign = await campaign.save();
        res.status(201).json(savedCampaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.json(campaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndDelete(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const calculateCampaignMetrics = async (targetGroup) => {
    let totalTargeted = 0;
    
    switch (targetGroup) {
        case 'non-contactable':
            totalTargeted = await Customer.countDocuments({ contactStatus: 'Non-contactable' });
            break;
        case 'renewal-due':
            totalTargeted = await Policy.countDocuments({ status: 'Due for Renewal' });
            break;
        case 'unclaimed':
            totalTargeted = await Policy.countDocuments({ status: 'Unclaimed' });
            break;
    }
    
    return {
        totalTargeted,
        reached: 0,
        responded: 0
    };
};