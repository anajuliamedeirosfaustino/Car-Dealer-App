import { useRouter } from 'next/router';
import React, { useState, Suspense, useEffect } from 'react';

const VehicleFilterContent = () => {
  const [makes, setMakes] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

    const fetchMakes = async () => {
        try {
            const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
            const data = await response.json();
            console.log(data);
            setMakes(data.Results);
            setLoading(false);
        }catch (error) {
            console.error("Error fetching makes:", error);
        }
    };

    const generateYears = () => {
        const currentYear = new Date().getFullYear();
        const yearList = [];
        for (let year = 2015; year <= currentYear; year++) {
            yearList.push(year);
        };
        setYears(yearList);
    };
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleMakeChange = (e) => {
        setSelectedMake(e.target.value);
    };

    const handleNext = () => {
        if (selectedMake && selectedYear) {
            router.push(`/result/${selectedMake}/${selectedYear}`);
        };
    };

    useEffect(() => {
        fetchMakes();

        generateYears();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2x1 font-bold mb-4">
                Car Dealer App
            </h1>

            {loading ? (
                <p>Loading makes...</p> 
            ) : (
                <>
                <div className="mb-4">
                    <label className="block">
                        Vehicle Make
                    </label>
                    <select className="p-2 border border-white bg-gray-800 text-white" value={selectedMake} onChange={handleMakeChange}>
                        <option value="">Select Make</option>
                        {makes.map((make) => (
                            <option key={make.MakeID} value={make.MakeName}>{make.MakeName}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block">
                        Model Year
                    </label>
                    <select className="p-2 border border-white bg-gray-800 text-white" value={selectedYear} onChange={handleYearChange}>
                        <option value="">Select Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                        </select>
                </div>
                
                <button className="bg-blue-500 text-white p-2 rounded" onClick={handleNext} disabled={!selectedMake || !selectedYear}>
                        Next
                </button>
                </>
            )}
        </div>
    );
};

const VehicleFilter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VehicleFilterContent />
        </Suspense>
    );
};



export default VehicleFilter;