'use client'
import { useState, useEffect } from "react";

const Posts: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                  
                    method: 'GET',
                  
                    headers: {
                        accept: 'application/json',
                        'Partner-Authorization': 'pro_2cIuzukk0tShnaR0KmKewgXyUZv'
                    }
                };

                const response = await fetch('Access-Control-Allow-Origin:https://seats.aero/partnerapi/search?origin_airport=LHR&destination_airport=NYC&take=500', options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData: any = await response.json();
                setData(responseData.data); // Assuming data is nested under 'data' key
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again later.');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    console.log(data);

    return (
        <main>
            {data.map((item: any, index: number) => (
                 <div key={index}>
                 <p>ID: {item.ID}</p>
                 <p>Date: {item.Date}</p>
              
             </div>
            ))}
        </main>
    );
}
export default Posts;
