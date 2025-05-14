import { useState } from "react";

export default function BillsFilter({ onFilterChange }) {
    const [filters, setFilters] = useState({
        status: [],
        chamber: [],
        dateRange: null
    });

    const handleStatusChange = (e) => {
        const { value, checked } = e.target;
        setFilters(prev => {
            const newStatus = checked
                ? [...prev.status, value]
                : prev.status.filter(status => status !== value);

            const newFilters = { ...prev, status: newStatus };
            onFilterChange(newFilters);
            return newFilters;
        });
    };

    const handleChamberChange = (e) => {
        const { value, checked } = e.target;
        setFilters(prev => {
            const newChamber = checked
                ? [...prev.chamber, value]
                : prev.chamber.filter(chamber => chamber !== value);
            
            const newFilters = { ...prev, chamber: newChamber };
            onFilterChange(newFilters);
            return newFilters;
        });
    };

    return (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Filter Bills</h2>
          
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Status</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="status-introduced"
                  value="introduced"
                  onChange={handleStatusChange}
                  className="mr-2"
                />
                <label htmlFor="status-introduced">Introduced</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="status-passed"
                  value="passed"
                  onChange={handleStatusChange}
                  className="mr-2"
                />
                <label htmlFor="status-passed">Passed</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="status-enacted"
                  value="enacted"
                  onChange={handleStatusChange}
                  className="mr-2"
                />
                <label htmlFor="status-enacted">Enacted</label>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Chamber</h3>
            <div className="space-y-2">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="chamber-house"
                        value="house"
                        onChange={handleChamberChange}
                        className="mr-2"
                    />
                    <label htmlFor="chamber-house">House</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="chamber-senate"
                        value="senate"
                        onChange={handleChamberChange}
                        className="mr-2"
                    />
                    <label htmlFor="chamber-senate">Senate</label>
                </div>
            </div>
          </div>

          <button
            className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded"
            onClick={() => {
                setFilters({ status: [], chamber: [], dateRange: null });
                onFilterChange({ status: [], chamber: [], dateRange: null });
            }}
        >
            Reset Filters
        </button>
    </div>
    );
}