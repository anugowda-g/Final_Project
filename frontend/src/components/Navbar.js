import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold">
                        Future Generali Outreach
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/" className="hover:text-blue-200">Dashboard</Link>
                        <Link to="/customers" className="hover:text-blue-200">Customers</Link>
                        <Link to="/policies" className="hover:text-blue-200">Policies</Link>
                        <Link to="/campaigns" className="hover:text-blue-200">Campaigns</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;