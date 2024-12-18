import React, { useState, useEffect } from 'react';
import { api } from '../services/api';



function OutreachCampaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCampaign, setNewCampaign] = useState({
        title: '',
        description: '',
        targetGroup: 'non-contactable',
        status: 'Draft',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const response = await api.getCampaigns();
            setCampaigns(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.createCampaign(newCampaign);
            fetchCampaigns();
            setNewCampaign({
                title: '',
                description: '',
                targetGroup: 'non-contactable',
                status: 'Draft',
                startDate: '',
                endDate: ''
            });
        } catch (error) {
            console.error('Error creating campaign:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Completed':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTargetGroupIcon = (group) => {
        switch (group) {
            case 'non-contactable':
                return '👥';
            case 'renewal-due':
                return '📅';
            case 'unclaimed':
                return '💰';
            default:
                return '📌';
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">Outreach Campaigns</h1>

            {/* Add Campaign Form */}
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Create New Campaign</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Campaign Title"
                        className="border rounded p-2"
                        value={newCampaign.title}
                        onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})}
                        required
                    />
                    <select
                        className="border rounded p-2"
                        value={newCampaign.targetGroup}
                        onChange={(e) => setNewCampaign({...newCampaign, targetGroup: e.target.value})}
                        required
                    >
                        <option value="non-contactable">Non-contactable Customers</option>
                        <option value="renewal-due">Due for Renewal</option>
                        <option value="unclaimed">Unclaimed Policies</option>
                    </select>
                    <textarea
                        placeholder="Campaign Description"
                        className="border rounded p-2 md:col-span-2"
                        value={newCampaign.description}
                        onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                        rows="3"
                    />
                    <input
                        type="date"
                        className="border rounded p-2"
                        value={newCampaign.startDate}
                        onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                        required
                    />
                    <input
                        type="date"
                        className="border rounded p-2"
                        value={newCampaign.endDate}
                        onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                        required
                    />
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Create Campaign
                </button>
            </form>

            {/* Campaigns List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <div key={campaign._id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(campaign.status)}`}>
                                {campaign.status}
                            </span>
                            <span className="text-2xl" title={`Target: ${campaign.targetGroup}`}>
                                {getTargetGroupIcon(campaign.targetGroup)}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{campaign.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
                        <div className="border-t pt-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Start Date</p>
                                    <p>{new Date(campaign.startDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">End Date</p>
                                    <p>{new Date(campaign.endDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                            {campaign.metrics && (
                                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                                    <div className="bg-gray-50 p-2 rounded">
                                        <p className="text-gray-500">Targeted</p>
                                        <p className="font-semibold">{campaign.metrics.totalTargeted}</p>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded">
                                        <p className="text-gray-500">Reached</p>
                                        <p className="font-semibold">{campaign.metrics.reached}</p>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded">
                                        <p className="text-gray-500">Responded</p>
                                        <p className="font-semibold">{campaign.metrics.responded}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OutreachCampaigns;