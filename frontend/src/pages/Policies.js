import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

function Policies() {
    const [policies, setPolicies] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPolicy, setNewPolicy] = useState({
        policyNumber: '',
        customerId: '',
        type: '',
        status: 'Active',
        premium: '',
        renewalDate: '',
        maturityDate: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [policiesRes, customersRes] = await Promise.all([
                api.getPolicies(),
                api.getCustomers()
            ]);
            setPolicies(policiesRes.data);
            setCustomers(customersRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.addPolicy(newPolicy);
            fetchData();
            setNewPolicy({
                policyNumber: '',
                customerId: '',
                type: '',
                status: 'Active',
                premium: '',
                renewalDate: '',
                maturityDate: ''
            });
        } catch (error) {
            console.error('Error creating policy:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">Policies</h1>

            {/* Add Policy Form */}
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Add New Policy</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Policy Number"
                        className="border rounded p-2"
                        value={newPolicy.policyNumber}
                        onChange={(e) => setNewPolicy({...newPolicy, policyNumber: e.target.value})}
                    />
                    <select
                        className="border rounded p-2"
                        value={newPolicy.customerId}
                        onChange={(e) => setNewPolicy({...newPolicy, customerId: e.target.value})}
                    >
                        <option value="">Select Customer</option>
                        {customers.map(customer => (
                            <option key={customer._id} value={customer._id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Policy Type"
                        className="border rounded p-2"
                        value={newPolicy.type}
                        onChange={(e) => setNewPolicy({...newPolicy, type: e.target.value})}
                    />
                    <select
                        className="border rounded p-2"
                        value={newPolicy.status}
                        onChange={(e) => setNewPolicy({...newPolicy, status: e.target.value})}
                    >
                        <option value="Active">Active</option>
                        <option value="Due for Renewal">Due for Renewal</option>
                        <option value="Matured">Matured</option>
                        <option value="Unclaimed">Unclaimed</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Premium Amount"
                        className="border rounded p-2"
                        value={newPolicy.premium}
                        onChange={(e) => setNewPolicy({...newPolicy, premium: e.target.value})}
                    />
                    <input
                        type="date"
                        placeholder="Renewal Date"
                        className="border rounded p-2"
                        value={newPolicy.renewalDate}
                        onChange={(e) => setNewPolicy({...newPolicy, renewalDate: e.target.value})}
                    />
                    <input
                        type="date"
                        placeholder="Maturity Date"
                        className="border rounded p-2"
                        value={newPolicy.maturityDate}
                        onChange={(e) => setNewPolicy({...newPolicy, maturityDate: e.target.value})}
                    />
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add Policy
                </button>
            </form>

            {/* Policies List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Policy Number
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Premium
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Renewal Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {policies.map((policy) => (
                            <tr key={policy._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {policy.policyNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {policy.customerId?.name || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {policy.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-sm ${
                                        policy.status === 'Active' 
                                            ? 'bg-green-100 text-green-800'
                                            : policy.status === 'Due for Renewal'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {policy.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    ₹{policy.premium}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(policy.renewalDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Policies;
