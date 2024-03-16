import React from 'react';

const FinalFlightsresponse = ({ searchResult }: any) => {
    // Group flights by month
    const groupedFlights: { [key: string]: any[] } = {};
    searchResult.forEach((item: any) => {
        const month = item.Date.split('-')[1]; // Extract month from the date
        if (!groupedFlights[month]) {
            groupedFlights[month] = [];
        }
        groupedFlights[month].push(item);
    });

    return (
        <>
            <div className="mt-8 text-center">
                <h2 className="text-lg font-semibold mb-2">Search Results</h2>
                {Object.keys(groupedFlights).map((month: string, index: number) => (
                    <div key={index}>
                        <h3 className="text-md font-semibold my-2">{month}</h3>
                        <div className="flex flex-wrap">
                            {groupedFlights[month].map((flight: any, flightIndex: number) => (
                                <div key={flightIndex} className="border border-gray-200 rounded-md shadow-md my-2 mx-2 px-4 py-2">
                                    <div className="">
                                        <div className='flex space-x-4'>
                                        <div>{flight.Route.OriginAirport}</div>
                                        <div>{flight.Route.DestinationAirport}</div>
                                        </div>
                                        <div className='flex space-x-4'>
                                        <div>{flight.Route.Distance}</div>
                                        <div>{flight.Route.Source}</div>
                                        </div>
                                       
                                        <div>Apr({flight.YRemainingSeats})</div>
                                     
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FinalFlightsresponse;
