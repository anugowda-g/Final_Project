const Customer = require('../models/Customers');
const Policy = require('../models/Policy');

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('policies');
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCustomerStats = async (req, res) => {
    try {
        const stats = await Customer.aggregate([
            {
                $facet: {
                    'totalCustomers': [{ $count: 'count' }],
                    'nonContactable': [
                        { $match: { contactStatus: 'Non-contactable' } },
                        { $count: 'count' }
                    ]
                }
            }
        ]);
        
        const policyStats = await Policy.aggregate([
            {
                $facet: {
                    'dueRenewals': [
                        { $match: { status: 'Due for Renewal' } },
                        { $count: 'count' }
                    ],
                    'unclaimed': [
                        { $match: { status: 'Unclaimed' } },
                        { $count: 'count' }
                    ]
                }
            }
        ]);

        res.json({
            totalCustomers: stats[0].totalCustomers[0]?.count || 0,
            nonContactable: stats[0].nonContactable[0]?.count || 0,
            dueRenewals: policyStats[0].dueRenewals[0]?.count || 0,
            unclaimed: policyStats[0].unclaimed[0]?.count || 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
