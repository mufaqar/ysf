'use client'
import React, { useEffect, useState } from 'react';

async function getData() {
  const res = await fetch('https://seats.aero/partnerapi/search?origin_airport=LHR&destination_airport=EWR&take=500', {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Partner-Authorization': 'pro_2cIuzukk0tShnaR0KmKewgXyUZv',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const blogs = await res.json();

  return {
    blogs,
  };
}

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { blogs } = await getData();
        setBlogs(blogs);
      } catch (error) {
        console.error('Error fetching data:');
      }
    }

    fetchData();
  }, []); // Empty dependency array means this effect will run once after the initial render

  return (
    <section className='bg-secondary/5 py-16'>
      <h2>Blog Posts</h2>
      <ul>
        {blogs.map((blog:any, idx:number) => (
          <li key={idx}>
            <p>{blog.YDirect}</p>
           
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Blog;
