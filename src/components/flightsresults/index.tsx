import React from 'react';

const FinalFlightsresponse = ({ searchResult }: any) => {
    // Extract OriginAirport and DestinationAirport
    const originAirport = searchResult.length > 0 ? searchResult[0].Route.OriginAirport : '';
    const destinationAirport = searchResult.length > 0 ? searchResult[0].Route.DestinationAirport : '';
    const source = searchResult.length > 0 ? searchResult[0].Route.Source : '';
    const distance = searchResult.length > 0 ? searchResult[0].Route.Distance : '';
    const yairlines = searchResult.length > 0 ? searchResult[0].YAirlines : '';
    const jAirlines = searchResult.length > 0 ? searchResult[0].JAirlines : '';
    const wAirlines = searchResult.length > 0 ? searchResult[0].WAirlines : '';
    const fAirlines = searchResult.length > 0 ? searchResult[0].FAirlines : '';
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


    const jmonth: { [key: string]: { [key: string]: number } } = {};
    searchResult.forEach((item: any) => {
        const date = new Date(item.Date);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate().toString();

        if (!jmonth[month]) {
            jmonth[month] = {};
        }
        jmonth[month][day] = (jmonth[month][day] || 0) + item.JRemainingSeats;
    });

    const wmonth: { [key: string]: { [key: string]: number } } = {};
    searchResult.forEach((item: any) => {
        const date = new Date(item.Date);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate().toString();

        if (!wmonth[month]) {
            wmonth[month] = {};
        }
        wmonth[month][day] = (wmonth[month][day] || 0) + item.WRemainingSeats;
    });

    const fmonth: { [key: string]: { [key: string]: number } } = {};
    searchResult.forEach((item: any) => {
        const date = new Date(item.Date);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate().toString();

        if (!fmonth[month]) {
            fmonth[month] = {};
        }
        fmonth[month][day] = (fmonth[month][day] || 0) + item.FRemainingSeats;
    });
    return (
        <>
            <div className="mt-8 text-center">
                <h2 className="text-lg font-semibold mb-2">Search Results</h2>
                <div className='flex space-x-4'>
                    <div className='max-w-[300px] bg-[#e2e8f0] p-4 rounded-md'>

                        <div className=''>
                            <div className='flex space-x-2'><span className='font-bold text-red-500'>Economy</span>
                                <p className='font-bold text-teal-500'>   {yairlines}</p>

                            </div>
                            <div className="flex space-x-2 pt-4 font-bold"> {distance} | {source}</div>
                        </div>
                        <div className='flex space-x-4'>
                            <div className="text-md font-semibold py-4 "> {originAirport} - {destinationAirport}</div>
                        </div>

                        {Object.keys(groupedMonths).map((month: string, index: number) => (
                            <div key={index} className=''>

                                <h3 className="text-md font-semibold py-4 text-left">{month}</h3>
                                <div className='py-4 leading-[30px] '>
                                    {Object.keys(groupedMonths[month]).map((day: string, dayIndex: number) =>{
                                        return(
                                            <>
                                             {groupedMonths[month][day]>0 && (
                                            <span key={dayIndex} className='px-[4px]'>
                                            {day} ({groupedMonths[month][day]})
                                            {dayIndex < Object.keys(groupedMonths[month]).length - 1 && '|'}
                                        </span>
                                        )}
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='max-w-[300px] bg-[#f1f5f9] p-4 rounded-md'>

                        <div className=''>
                            <div className='flex space-x-2'><span className='font-bold text-red-500'>Bussiness</span>
                                <p className='font-bold text-teal-500'>   {jAirlines}</p>

                            </div>
                            <div className="flex space-x-2 pt-4 font-bold "> {distance} | {source}</div>
                        </div>
                        <div className='flex space-x-4'>
                            <div className="text-md font-semibold py-4 "> {originAirport} - {destinationAirport}</div>
                        </div>

                        {Object.keys(jmonth).map((month: string, index: number) => (
                            <div key={index} className=''>

                                <h3 className="text-md font-semibold py-4 text-left">{month}</h3>
                                <div className='py-4 leading-[30px] '>
                                    {Object.keys(jmonth[month]).map((day: string, dayIndex: number) =>{
                                        return(
                                            <>
                                             {jmonth[month][day]>0 && (
                                            <span key={dayIndex} className='px-[4px]'>
                                            {day} ({jmonth[month][day]})
                                            {dayIndex < Object.keys(jmonth[month]).length - 1 && '|'}
                                        </span>
                                        )}
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='max-w-[300px] bg-[#bbf7d0] p-4 rounded-md'>

                        <div className=''>
                            <div className='flex space-x-2'><span className='font-bold text-red-500'>Economy Premium</span>
                                <p className='font-bold text-teal-500'>   {wAirlines}</p>

                            </div>
                            <div className="flex space-x-2 pt-4 font-bold"> {distance} | {source}</div>
                        </div>
                        <div className='flex space-x-4'>
                            <div className="text-md font-semibold py-4 "> {originAirport} - {destinationAirport}</div>
                        </div>

                        {Object.keys(wmonth).map((month: string, index: number) => (
                            <div key={index} className=''>

                                <h3 className="text-md font-semibold py-4 text-left">{month}</h3>
                                <div className='py-4 leading-[30px] '>
                                    {Object.keys(wmonth[month]).map((day: string, dayIndex: number) =>{
                                        return(
                                            <>
                                             {wmonth[month][day]>0 && (
                                            <span key={dayIndex} className='px-[4px]'>
                                            {day} ({wmonth[month][day]})
                                            {dayIndex < Object.keys(wmonth[month]).length - 1 && '|'}
                                        </span>
                                        )}
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='max-w-[300px] bg-[#dcfce7] p-4 rounded-md'>

                        <div className=''>
                            <div className='flex space-x-2'><span className='font-bold text-red-500'>First</span>
                                <p className='font-bold text-teal-500'>   {fAirlines}</p>

                            </div>
                            <div className="flex space-x-2 pt-4 font-bold"> {distance} | {source}</div>
                        </div>
                        <div className='flex space-x-4'>
                            <div className="text-md font-semibold py-4 "> {originAirport} - {destinationAirport}</div>
                        </div>

                        {Object.keys(fmonth).map((month: string, index: number) => (
                            <div key={index} className=''>

                                <h3 className="text-md font-semibold py-4 text-left">{month}</h3>
                                <div className='py-4 leading-[30px] '>
                                    {Object.keys(fmonth[month]).map((day: string, dayIndex: number) =>{
                                        return(
                                            <>
                                             {fmonth[month][day]>0 && (
                                            <span key={dayIndex} className='px-[4px]'>
                                            {day} ({fmonth[month][day]})
                                            {dayIndex < Object.keys(fmonth[month]).length - 1 && '|'}
                                        </span>
                                        )}
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FinalFlightsresponse;
