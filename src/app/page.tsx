'use client'

import React, { useState, useEffect } from 'react';

interface Blog {
  ID: string;
  RouteID: string;
  Route: {
    ID: string;
    OriginAirport: string;
    OriginRegion: string;
    DestinationAirport: string;
    DestinationRegion: string;
    NumDaysOut: number;
    Distance: number;
    Source: string;
  };
  Date: string;
  ParsedDate: string;
  YAvailable: boolean;
  WAvailable: boolean;
  JAvailable: boolean;
  FAvailable: boolean;
  YMileageCost: string;
  WMileageCost: string;
  JMileageCost: string;
  FMileageCost: string;
  YDirectMileageCost: number;
  WDirectMileageCost: number;
  JDirectMileageCost: number;
  FDirectMileageCost: number;
  YRemainingSeats: number;
  WRemainingSeats: number;
  JRemainingSeats: number;
  FRemainingSeats: number;
  YDirectRemainingSeats: number;
  WDirectRemainingSeats: number;
  JDirectRemainingSeats: number;
  FDirectRemainingSeats: number;
  YAirlines: string;
  WAirlines: string;
  JAirlines: string;
  FAirlines: string;
  YDirectAirlines: string;
  WDirectAirlines: string;
  JDirectAirlines: string;
  FDirectAirlines: string;
  YDirect: boolean;
  WDirect: boolean;
  JDirect: boolean;
  FDirect: boolean;
  Source: string;
  CreatedAt: string;
  UpdatedAt: string;
  AvailabilityTrips: any; // Update type if possible
}

async function getData(): Promise<{ data: Blog[] }> {
  const res = await fetch('https://seats.aero/partnerapi/availability?take=500', {
    method: 'GET',
    mode: 'no-cors', // Change to 'cors' to allow cross-origin requests
    headers: {
      'Partner-Authorization': 'pro_2cIuzukk0tShnaR0KmKewgXyUZv',
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [originAirport, setOriginAirport] = useState<string>('');
  const [destinationAirport, setDestinationAirport] = useState<string>('');
  const [selectedData, setSelectedData] = useState<Blog | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        setBlogs(data?.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (originAirport && destinationAirport) {
      const selected = blogs.find(blog =>
        blog.Route.OriginAirport === originAirport &&
        blog.Route.DestinationAirport === destinationAirport
      );
      setSelectedData(selected || null);
    } else {
      setSelectedData(null);
    }
  }, [originAirport, destinationAirport, blogs]);

  const handleOriginChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOriginAirport(event.target.value);
  };

  const handleDestinationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDestinationAirport(event.target.value);
  };

  return (
    <section className='px-8 container mx-auto justify-center bg-red-50 pb-96'>
      <h2>Blog Posts</h2>
      <div className='flex space-x-8'>
        <div className='w-full'>
          <select
            className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
            onChange={handleOriginChange}
          >
            <option value="">Select Origin</option>
            {blogs.map((blog, idx) => (
              <option key={idx} >
                {blog.Route.OriginAirport}
              </option>
            ))}
          </select>
        </div>
        <div className='w-full'>
          <select
            className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
            onChange={handleDestinationChange}
          >
            <option value="">Select Destination</option>
            {blogs.map((blog, idx) => (
              <option key={idx}>
                {blog.Route.DestinationAirport}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedData && (
        <div>
          <p>Source: {selectedData.Source}</p>
          <p>Destination Region: {selectedData.Route.DestinationRegion}</p>
        </div>
      )}
    </section>
  );
}

export default Blog;
