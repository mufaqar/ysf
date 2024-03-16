import Filters from './look/page';
import React from 'react';

async function getData() {
    const res = await fetch('https://seats.aero/partnerapi/availability?take=500', {
        method: 'GET',
        headers: {
            accept: 'application/json',

            'Partner-Authorization': 'pro_2cIuzukk0tShnaR0KmKewgXyUZv',
        },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const AiroResponce = await res.json();
    const originsSet = new Set<string>(AiroResponce.data.map((item: any) => item.Route.OriginAirport));
    const destinationsSet = new Set<string>(AiroResponce.data.map((item: any) => item.Route.DestinationAirport));
    const sourcesSet = new Set<string>(AiroResponce.data.map((item: any) => item.Route.Source));

    const sources: string[] = [];
    const origins: string[] = [];
    const destinations: string[] = [];
    
    sourcesSet.forEach((source: string) => sources.push(source));
    originsSet.forEach((origin: string) => origins.push(origin));
    destinationsSet.forEach((destination: string) => destinations.push(destination));

    return {
        origins,
        destinations,
        sources
    };
}

const BlogPage = async () => {
    const { origins, destinations, sources } = await getData();

    return (
        <>
            <Filters origins={origins} destinations={destinations} sources={sources} />
        </>
    );
};

export default BlogPage;
