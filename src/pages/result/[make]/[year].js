import { useEffect, useState } from "react";

import {useRouter} from "next/router";

import React from 'react'

const ResultPage = () => {
    const {query} = useRouter();
    const {make, year} = query;
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!make || !year) return;
        const fetchVehicleModels = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json')
                const data = await response.json();

                if (data.Results) {
                    setVehicles(data.Results);
                } else {
                    setError("No models found for this make and year.")
                }
            } catch (err) {
                setError("Error fetching data.");
            } finally {
                setLoading(false);
            }
        };
        fetchVehicleModels();
    }, [make, year]);
if (loading) return <p>Loading models...</p>
if (error) return <p>{error}</p>


  return (
    <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Available Models for {make} ({year})</h2>
        <ul className="space-y-2">
            {vehicles.map((vehicle, index) => (
                <li key={index} className="border p-4 rounded shadow bg-gray-800 text-white">
                    console.log(vehicle.MakeName)
                    {vehicle.MakeName}
                </li>
            ))}
          
        </ul>
          console.log(vehicle.MakeName);
    </div>
    
  );
}

export default ResultPage
