'use client'


import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface BlogData {
  Route: {
    OriginAirport: string;
    DestinationAirport: string;
  };
}

async function getData() {
    const res = await fetch('https://seats.aero/partnerapi/availability?take=500', {
      method: 'GET',
      mode: 'cors', // Change to 'cors' to allow cross-origin requests
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

async function Blog() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [originValue, setOriginValue] = useState<string[]>([]);
  const [destinationValue, setDestinationValue] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        setBlogs(data?.data || []); // Set data to state if available, otherwise set it to an empty array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleOriginChange = (value: string[]) => {
    setOriginValue(value);
  };

  const handleDestinationChange = (value: string[]) => {
    setDestinationValue(value);
  };

  return (
    <section className='px-8 container mx-auto justify-center bg-red-50 pb-96'>
      <h2>Blog Posts</h2>
      <div className='flex space-x-8'>
        <div className='w-full'>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select Origin"
            value={originValue}
            onChange={handleOriginChange}
          >
            {blogs.map((blog, idx) => (
              <Option key={idx} value={blog.Route.OriginAirport}>
                {blog.Route.OriginAirport}
              </Option>
            ))}
          </Select>
        </div>
        <div className='w-full'>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select Destination"
            value={destinationValue}
            onChange={handleDestinationChange}
          >
            {blogs.map((blog, idx) => (
              <Option key={idx} value={blog.Route.DestinationAirport}>
                {blog.Route.DestinationAirport}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </section>
  );
}

export default Blog;
