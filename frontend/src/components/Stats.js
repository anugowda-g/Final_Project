import React from 'react';

function Stats({ title, value, icon }) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                    {icon}
                </div>
                <div className="ml-4">
                    <p className="text-gray-500 text-sm">{title}</p>
                    <p className="text-2xl font-semibold">{value}</p>
                </div>
            </div>
        </div>
    );
}

export default Stats;