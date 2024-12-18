import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        contactStatus: 'Contactable'
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await api.getCustomers();
            setCustomers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching customers:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.addCustomer(newCustomer);
            fetchCustomers();
            setNewCustomer({
                name: '',
                email: '',
                phone: '',
                contactStatus: 'Contactable'
            });
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">Customers</h1>
            
            {/* Add Customer Form */}
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border rounded p-2"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border rounded p-2"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        className="border rounded p-2"
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    />
                    <select
                        className="border rounded p-2"
                        value={newCustomer.contactStatus}
                        onChange={(e) => setNewCustomer({...newCustomer, contactStatus: e.target.value})}
                    >
                        <option value="Contactable">Contactable</option>
                        <option value="Non-contactable">Non-contactable</option>
                    </select>
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add Customer
                </button>
            </form>

            {/* Customer List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {customers.map((customer) => (
                            <tr key={customer._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {customer.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {customer.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {customer.phone}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-sm ${
                                        customer.contactStatus === 'Contactable' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {customer.contactStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomerList;