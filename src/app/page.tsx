
import React, { useEffect, useState } from 'react';

async function getData() {
  const res = await fetch('https://seats.aero/partnerapi/search?origin_airport=LHR&destination_airport=EWR&take=500', {
    method: 'GET',
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

async function  Blog() {

  const { blogs } = await getData();


  return (
    <section className='bg-secondary/5 py-16'>
      <h2>Blog Posts</h2>
      {JSON.stringify(blogs)};
      {/* <ul>
        {blogs?.data.map((item:any, idx:number) => (
          <li key={idx}>
            <p> {item.source}</p>
           
          </li>
        ))}
      </ul> */}
    </section>
  );
}

export default Blog;
