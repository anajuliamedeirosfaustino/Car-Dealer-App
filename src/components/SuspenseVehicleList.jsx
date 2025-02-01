import { Suspense } from "react";

import React from 'react'

const VehicleList = ({vehicles}) => {
    if (!vehicles.length) return <p>No vehicles found.</p>
  return (
    <ul className="space-y-4">
        {vehicles.map((vehicle, index) => (
        <li key={index} className="border p-4 rounded shadow">{vehicle.Model_Name}</li>
    ))}
    </ul>
  );
};

const SuspenseVehicleList = ({vehicles}) => {
    return (
        <Suspense fallback={<p>Loading vehicle models...</p>}>
            <VehicleList vehicles={vehicles}/>
        </Suspense>
    );
};

export default SuspenseVehicleList;