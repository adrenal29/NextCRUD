'use client'
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredSchools, setFilteredSchools] = useState([]);

  useEffect(() => {
    // Fetch schools data from the server
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getSchools',{ cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setSchools(data);
          setFilteredSchools(data); // Initialize filtered schools with all schools
        } else {
          throw new Error('Failed to fetch schools data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter schools based on selected city
    if (selectedCity) {
      const filtered = schools.filter(school => school.city === selectedCity);
      setFilteredSchools(filtered);
    } else {
      setFilteredSchools(schools); // If no city selected, show all schools
    }
  }, [selectedCity, schools]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="container mx-auto py-8 px-10">
      <Head>
        <title>Schools List</title>
        <meta name="description" content="List of schools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold mb-4">Schools</h1>

      {/* City filter dropdown */}
      <div className="mb-4">
        <label htmlFor="cityFilter" className="block text-sm font-medium text-gray-700">
          Filter by City:
        </label>
        <select
          id="cityFilter"
          value={selectedCity}
          onChange={handleCityChange}
          className="mt-1 p-2 border rounded-md"
        >
          <option value="">All Cities</option>
          {/* Add options for each unique city in the schools array */}
          {schools.map(school => (
            <option key={school.id} value={school.city}>{school.city}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSchools.map((school) => (
          <div key={school.id} className="bg-white rounded-md shadow-md p-4">
            <img src={`/uploads/${school.image}`} alt={school.name} className="w-full h-40 object-cover mb-4 rounded-md" />
            <h2 className="text-xl font-semibold mb-2">{school.name}</h2>
            <p className="text-gray-600 mb-2">{school.address}, {school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolsPage;
