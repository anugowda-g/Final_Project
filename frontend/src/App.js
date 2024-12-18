import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CustomerList from './pages/CustomerList';
import Policies from './pages/Policies';
import OutreachCampaigns from './pages/OutreachCampaigns';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/customers" element={<CustomerList />} />
                        <Route path="/policies" element={<Policies />} />
                        <Route path="/campaigns" element={<OutreachCampaigns />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;