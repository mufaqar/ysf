
import Filters from '@/components/filters';
import React from 'react';

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
    const AiroResponce = await res.json();
    const originsSet = new Set<string>(AiroResponce.data.map((item: any) => item.Route.OriginAirport));
    const destinationsSet = new Set<string>(AiroResponce.data.map((item: any) => item.Route.DestinationAirport));

    const origins: string[] = [];
    const destinations: string[] = [];

    originsSet.forEach((origin: string) => origins.push(origin));
    destinationsSet.forEach((destination: string) => destinations.push(destination));

    return {
      origins,
      destinations
    };
}

const BlogPage = async () => {
    const { origins, destinations } = await getData()

    return (
        <>
          <Filters origins={origins} destination={destinations}/>
        </>
    )
}

export default BlogPage;
