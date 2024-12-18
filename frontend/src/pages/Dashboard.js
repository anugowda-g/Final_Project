import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Stats from '../components/Stats';
import { Users, FileText, AlertCircle, Clock } from 'lucide-react';

function Dashboard() {
    const [stats, setStats] = useState({
        totalCustomers: 0,
        nonContactable: 0,
        dueRenewals: 0,
        unclaimed: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.getCustomerStats();
            setStats(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching stats:', error);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Stats 
                    title="Total Customers" 
                    value={stats.totalCustomers}
                    icon={<Users size={24} />}
                />
                <Stats 
                    title="Non-contactable" 
                    value={stats.nonContactable}
                    icon={<AlertCircle size={24} />}
                />
                <Stats 
                    title="Due Renewals" 
                    value={stats.dueRenewals}
                    icon={<Clock size={24} />}
                />
                <Stats 
                    title="Unclaimed Policies" 
                    value={stats.unclaimed}
                    icon={<FileText size={24} />}
                />
            </div>
        </div>
    );
}

export default Dashboard;