const Policy = require('../models/Policy');

exports.getPolicies = async (req, res) => {
    try {
        const policies = await Policy.find().populate('customerId');
        res.json(policies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addPolicy = async (req, res) => {
    try {
        const policy = new Policy(req.body);
        await policy.save();
        res.status(201).json(policy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPolicyStats = async (req, res) => {
    try {
        const stats = await Policy.aggregate([
            {
                $facet: {
                    'statusCounts': [
                        {
                            $group: {
                                _id: '$status',
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    'totalPremium': [
                        {
                            $group: {
                                _id: null,
                                total: { $sum: '$premium' }
                            }
                        }
                    ]
                }
            }
        ]);

        const formattedStats = {
            totalPolicies: await Policy.countDocuments(),
            statusCounts: stats[0].statusCounts.reduce((acc, curr) => {
                acc[curr._id] = curr.count;
                return acc;
            }, {}),
            totalPremium: stats[0].totalPremium[0]?.total || 0
        };

        res.json(formattedStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDueForRenewal = async (req, res) => {
    try {
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        
        const policies = await Policy.find({
            renewalDate: {
                $gte: new Date(),
                $lte: thirtyDaysFromNow
            }
        }).populate('customerId');
        
        res.json(policies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};