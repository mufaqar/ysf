import React from 'react';

const FinalFlightsresponse = ({ searchResult }: any) => {
    // Extract OriginAirport and DestinationAirport
    const originAirport = searchResult.length > 0 ? searchResult[0].Route.OriginAirport : '';
    const destinationAirport = searchResult.length > 0 ? searchResult[0].Route.DestinationAirport : '';
    const source = searchResult.length > 0 ? searchResult[0].Route.Source : '';
    const distance = searchResult.length > 0 ? searchResult[0].Route.Distance : '';
    // Group flights by month and date and aggregate remaining seats
    const groupedMonths: { [key: string]: { [key: string]: number } } = {};
    searchResult.forEach((item: any) => {
        const date = new Date(item.Date);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate().toString();

        if (!groupedMonths[month]) {
            groupedMonths[month] = {};
        }
        groupedMonths[month][day] = (groupedMonths[month][day] || 0) + item.YRemainingSeats;
    });

    return (
        <>
            <div className="mt-8 text-center">
                <h2 className="text-lg font-semibold mb-2">Search Results</h2>
                <div className='max-w-[700px]'>
                    <div className='flex space-x-4'>
                        <div className="text-md font-semibold py-4 "> {distance} | {source}</div>
                    </div>
                    <div className='flex space-x-4'>
                        <div className="text-md font-semibold py-4 "> {originAirport} - {destinationAirport}</div>
                    </div>
                    {Object.keys(groupedMonths).map((month: string, index: number) => (
                        <div key={index} className='flex  space-x-4'>
                            <h3 className="text-md font-semibold py-4">{month}</h3>
                            <div className='py-4 leading-[30px] '>
                                {Object.keys(groupedMonths[month]).map((day: string, dayIndex: number) => (
                                    <span key={dayIndex} className='px-[4px]'>
                                        {day} ({groupedMonths[month][day]})
                                        {dayIndex < Object.keys(groupedMonths[month]).length - 1 && '|'}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FinalFlightsresponse;
