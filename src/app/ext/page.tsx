
import React, { useEffect, useState } from 'react';
async function getData() {
    const res = await fetch('https://seats.aero/partnerapi/availability?take=500', {
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
async function Blog() {
    const { blogs } = await getData();
    // console.log(blogs, 'abc');
    return (
        <section className='container mx-auto px-4'>
            <div className='md:flex md:space-x-8 items-center py-12'>
                <select className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500">
                    {blogs?.data.splice(1, 15).map((item: any, idx: number) => (
                        <option key={idx} value={item.Route.OriginAirport}>
                            {item.Route.OriginAirport}
                        </option>
                    ))}
                </select>
                <select className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500">
                    {blogs?.data.splice(1, 15).map((item: any, idx: number) => (
                        <option key={idx} value={item.Route.OriginAirport}>
                            {item.Route.DestinationAirport}
                        </option>
                    ))}
                </select>
                <button>Search</button>
            </div>
            {/* <div>{JSON.stringify(blogs)}</div>  */}
        </section>
    );
}

export default Blog;
