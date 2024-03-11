// pages/blog.tsx

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

const BlogPage: React.FC = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [originAirport, setOriginAirport] = useState<string>('');
    const [destinationAirport, setDestinationAirport] = useState<string>('');
    const [searchResult, setSearchResult] = useState<{ distance: number; source: string } | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const { blogs } = await getData();
                setBlogs(blogs.data.splice(1, 15));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleSearch = () => {
        const selectedBlog = blogs.find((item: any) => item.Route.OriginAirport === originAirport && item.Route.DestinationAirport === destinationAirport);
        if (selectedBlog) {
            setSearchResult({ distance: selectedBlog.Route.Distance, source: selectedBlog.Route.Source });
        } else {
            setSearchResult(null);
        }
    };

    return (
        <section className='container mx-auto px-4'>
            <div className='md:flex md:space-x-8 items-center py-12'>
                <select
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                    value={originAirport}
                    onChange={(e) => setOriginAirport(e.target.value)}
                >
                    <option value="">Select Origin</option>
                    {blogs.map((item: any, idx: number) => (
                        <option key={idx} value={item.Route.OriginAirport}>
                            {item.Route.OriginAirport}
                        </option>
                    ))}
                </select>
                <select
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                    value={destinationAirport}
                    onChange={(e) => setDestinationAirport(e.target.value)}
                >
                    <option value="">Select Destination</option>
                    {blogs.map((item: any, idx: number) => (
                        <option key={idx} value={item.Route.DestinationAirport}>
                            {item.Route.DestinationAirport}
                        </option>
                    ))}
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>
            {searchResult && (
                <div>
                    <p>Distance: {searchResult.distance}</p>
                    <p>Source: {searchResult.source}</p>
                </div>
            )}
        </section>
    );
}

export default BlogPage;
