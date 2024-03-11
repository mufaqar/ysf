'use client'
import React, { useState, useEffect } from 'react';
interface data {
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
}
function Ext() {
    const [getdata, setgetdata] = useState<any>(''); 

    useEffect(() => {
        Getproduct();
    }, []);

    async function Getproduct() {
        try {
            const res = await fetch('https://seats.aero/partnerapi/availability?take=500', {
                method: 'GET',
                mode:'no-cors',
                headers: { 'Content-Type': 'application/json' },
                
    cache: 'no-store'
            });
            const Response = await res.json();
            setgetdata(Response);
        } catch (error) {
            console.error('Error fetching Response:', error);
        }
    }

    return (
        <div>

            {getdata && getdata?.map((item: any, idx: number) => {
                return (
                    <div key={idx}>
                        {item?.Route.DestinationAirport}
                    </div>
                )
            })}
        </div>
    );
}

export default Ext;
