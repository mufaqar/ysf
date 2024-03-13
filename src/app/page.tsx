
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
    const origins = AiroResponce.data.map((item: any) => item.Route.OriginAirport)
    const destination = AiroResponce.data.map((item: any) => item.Route.DestinationAirport)
    return {
      origins, destination
    };
}

const BlogPage = async () => {
    const { origins, destination } = await getData()

    return (
        <>
          <Filters origins={origins} destination={destination}/>
        </>
    )
}

export default BlogPage;
