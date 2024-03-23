import { useState, useEffect } from "react";
export const FinalFlightsresponse: React.FC<any> = ({ searchResult, selectedSource }) => {
    
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div
                    className="text-center inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-red-800"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>

        );
    }
    const originAirport = searchResult[0]?.Route.OriginAirport || '';
    const destinationAirport = searchResult[0]?.Route.DestinationAirport || '';
    let source = searchResult[0]?.Source || '';

    if (selectedSource) {
        source = selectedSource;
    }
    const distance = searchResult[0]?.Route.Distance || '';
    const yairlines = searchResult[0]?.YAirlines || '';
    const jAirlines = searchResult[0]?.JAirlines || '';
    const wAirlines = searchResult[0]?.WAirlines || '';
    const fAirlines = searchResult[0]?.FAirlines || '';

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

    const bmonth: { [key: string]: { [key: string]: number } } = {};
    searchResult.forEach((item: any) => {
        const date = new Date(item.Date);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate().toString();

        if (!bmonth[month]) {
            bmonth[month] = {};
        }
        bmonth[month][day] = (bmonth[month][day] || 0) + item.JRemainingSeats;
    });

    const pmonth: { [key: string]: { [key: string]: number } } = {};
    searchResult.forEach((item: any) => {
        const date = new Date(item.Date);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate().toString();

        if (!pmonth[month]) {
            pmonth[month] = {};
        }
        pmonth[month][day] = (pmonth[month][day] || 0) + item.WRemainingSeats;
    });

    if (!searchResult || searchResult.length === 0 || !searchResult[0].Route) {
        return null;
    }

    return (
        <section>
            <h1 className="text-center py-6 font-bold">Search Results</h1>
            <div className="md:grid md:grid-cols-4">
                <div className='md:w-[300px] p-4 rounded-md bg-teal-200'>
                    <div >
                        <div className='flex space-x-2'>
                            <span className='font-bold text-red-500'>Economy</span>
                            <p className='font-bold text-teal-500'>{yairlines}</p>
                        </div>
                        <div className="flex space-x-2 pt-4 font-bold">{distance} | {source}</div>
                    </div>
                    <div className='flex space-x-4'>
                        <div className="text-md font-semibold py-4 ">{originAirport} - {destinationAirport}</div>
                    </div>

                    {Object.keys(groupedMonths).map((month: string, index: number) => (
                        <div key={index} className=''>
                            <h3 className="text-md font-semibold py-4 text-left">{month}</h3>
                            <div className='py-4 leading-[30px] '>
                                {Object.keys(groupedMonths[month]).map((day: string, dayIndex: number) => (
                                    groupedMonths[month][day] > 0 &&
                                    <span key={dayIndex} className='px-[4px]'>
                                        {day} ({groupedMonths[month][day]})
                                        {dayIndex < Object.keys(groupedMonths[month]).length - 1 && '|'}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='md:w-[300px] p-4 rounded-md bg-teal-100'>
                    <div className=''>
                        <div className='flex space-x-2'>
                            <span className='font-bold text-red-500'>Bussiness</span>
                            <p className='font-bold text-teal-500'>{jAirlines}</p>
                        </div>
                        <div className="flex space-x-2 pt-4 font-bold">{distance} | {source}</div>
                    </div>
                    <div className='flex space-x-4'>
                        <div className="text-md font-semibold py-4 ">{originAirport} - {destinationAirport}</div>
                    </div>

                    {Object.keys(bmonth).map((month: string, index: number) => (
                       
                        <div key={index} className=''>
                            <h3 className="text-md font-semibold py-4 text-left">{month}</h3>
                            <div className='py-4 leading-[30px] '>
                                {Object.keys(bmonth[month]).map((day: string, dayIndex: number) => (
                                     bmonth[month][day] > 0 &&
                                    <span key={dayIndex} className='px-[4px]'>
                                        {day} ({bmonth[month][day]})
                                        {dayIndex < Object.keys(bmonth[month]).length - 1 && '|'}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='md:w-[300px] p-4 rounded-md bg-blue-200'>
                    <div className=''>
                        <div className='flex space-x-2'>
                            <span className='font-bold text-red-500'>Premium</span>
                            <p className='font-bold text-teal-500'>{wAirlines}</p>
                        </div>
                        <div className="flex space-x-2 pt-4 font-bold">{distance} | {source}</div>
                    </div>
                    <div className='flex space-x-4'>
                        <div className="text-md font-semibold py-4 ">{originAirport} - {destinationAirport}</div>
                    </div>

                    {Object.keys(pmonth).map((month: string, index: number) => (
                         
                        <div key={index} className=''>
                            <h3 className="text-md font-semibold py-4 text-left">{month}</h3>
                            <div className='py-4 leading-[30px] '>
                                {Object.keys(pmonth[month]).map((day: string, dayIndex: number) => (
                                    pmonth[month][day] > 0 &&
                                    <span key={dayIndex} className='px-[4px]'>
                                        {day} ({pmonth[month][day]})
                                        {dayIndex < Object.keys(pmonth[month]).length - 1 && '|'}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='md:w-[300px] p-4 rounded-md bg-blue-100'>
                    <div className=''>
                        <div className='flex space-x-2'>
                            <span className='font-bold text-red-500'>First</span>
                            <p className='font-bold text-teal-500'>{fAirlines}</p>
                        </div>
                        <div className="flex space-x-2 pt-4 font-bold">{distance} | {source}</div>
                    </div>
                    <div className='flex space-x-4'>
                        <div className="text-md font-semibold py-4 ">{originAirport} - {destinationAirport}</div>
                    </div>

                    {Object.keys(fmonth).map((month: string, index: number) => (
                         
                        <div key={index} className=''>
                            <h3 className="text-md font-semibold py-4 text-left">{month}</h3>
                            <div className='py-4 leading-[30px] '>
                                {Object.keys(fmonth[month]).map((day: string, dayIndex: number) => (
                                    fmonth[month][day] > 0 &&
                                    <span key={dayIndex} className='px-[4px]'>
                                        {day} ({fmonth[month][day]})
                                        {dayIndex < Object.keys(fmonth[month]).length - 1 && '|'}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};