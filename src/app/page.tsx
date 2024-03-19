import Filters from '../app/filters/page';
import React from 'react';

async function getData() {
    try {
        const res = await fetch('https://seats.aero/partnerapi/availability?take=5000', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'Partner-Authorization': 'pro_2cIuzukk0tShnaR0KmKewgXyUZv',
            },
        });
        
        if (!res.ok) {
            throw new Error('Failed to fetch data. Status: ' + res.status);
        }
        
        const AiroResponse = await res.json();

        const originsSet = new Set<string>(AiroResponse.data.map((item: any) => item.Route.OriginAirport));
        const destinationsSet = new Set<string>(AiroResponse.data.map((item: any) => item.Route.DestinationAirport));

        const origins: string[] = [];
        const destinations: string[] = [];

        originsSet.forEach((origin: string) => origins.push(origin));
        destinationsSet.forEach((destination: string) => destinations.push(destination));

        return {
            origins,
            destinations,
            AiroResponse,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // re-throw the error to propagate it up
    }
}

const BlogPage = async () => {
    const { origins, destinations } = await getData();

    return (
        <>
            {/* {JSON.stringify(AiroResponce.data[0])} */}

            <Filters origins={origins} destinations={destinations} />
        </>
    );
};

export default BlogPage;
