'use client'
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Select } from 'antd';
import Link from "next/link";
import { TbArrowsLeftRight } from "react-icons/tb";
import FinalFlightsresponse from '@/components/flightsresults'
const { Option } = Select;

interface Flight {
    Route: {
        Source: string;
    };
}
const Filters: React.FC<any> = ({ origins, destinations }) => {
    const [destinationAirport, setDestinationAirport] = useState('');
    const [originAirport, setOriginAirport] = useState('');
    const [selectedDate, setSelectedDate] = useState(moment());
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [selectedSources, setSelectedSources] = useState<string[]>([]);
    const [sources, setSources] = useState<string[]>([]); // State to hold sources
    const handleSearch = async () => {
        try {
            const res = await fetch('../../api/filter', {
                method: 'POST',
                body: JSON.stringify({
                    OriginAirport: originAirport,
                    DestinationAirport: destinationAirport,
                    Source: selectedSources
                })
            });
            const searchResult = await res.json();
            
            // Filter the search result based on selected sources
           
    
            setSearchResult(searchResult);
        } catch (error) {
            console.log("Error:", error);
        }
    };
    
    
    const handleSources = async (value: any) => {
        // Set state based on the type of value received
        if (value.type === 'origin') {
            setOriginAirport(value.value);
        } else if (value.type === 'destination') {
            setDestinationAirport(value.value);
        } else if (value.type === 'source') {
            setSelectedSources(value.value);
        }
    
        try {
            const res = await fetch('../../api/filter', {
                method: 'POST',
                body: JSON.stringify({
                    OriginAirport: value.type === 'origin' ? value.value : originAirport,
                    DestinationAirport: value.type === 'destination' ? value.value : destinationAirport,
                    Source: value.type === 'source' ? value.value : selectedSources
                })
            });
    
            const searchResult = await res.json();
            setSearchResult(searchResult);
        } catch (error) {
            console.log("Error:", error);
        }
    };
    
    // Render code...
    
    
    
    return (
        <section className="px-4 container mx-auto py-16">
            <div className="md:grid md:grid-cols-4 gap-4 justify-center items-center border rounded-md py-8 px-16">
                <label className="text-sm font-normal ">
                    <span className="flex items-center ">Origin Airports
                        <Link className="pl-2 text-[#0d6efd]  text-2xl " href={'/'}><TbArrowsLeftRight /></Link></span>
                    {origins && (
                        <Select
                            mode="multiple"
                            onChange={(value) => handleSources({
                                value,
                                type: 'origin',
                                destinationAirport
                            })}
                            className=' w-full -10 bg-white rounded-md  text-black' >
                            {origins?.map((item: any, index: number) => {
                                return (
                                    <Option key={index} value={item}>
                                        {item}
                                    </Option>
                                )
                            })}
                        </Select>
                    )}
                </label>
                <label className="text-sm font-normal">
                    <span className="flex items-center ">Destination Airports
                        <Link className="pl-2 text-[#0d6efd]  text-2xl " href={'/'}><TbArrowsLeftRight /></Link></span>
                    {destinations && (
                        <Select
                            mode="multiple"
                            onChange={(value) => handleSources({
                                value,
                                type: 'destination',
                                originAirport
                            })}
                            className='  w-full -10 bg-white rounded-md  text-black' >
                            {destinations?.map((item: any, index: number) => {
                                return (
                                    <Option key={index} value={item}>
                                        {item}
                                    </Option>
                                )
                            })}
                        </Select>
                    )}
                </label>
                <div className="block">
                    <label className="text-sm font-normal">
                        <span className="flex items-center ">FrequentFlyer Program
                            <Link className="pl-2 text-[#0d6efd]  text-2xl " href={'/'}><TbArrowsLeftRight /></Link></span>
                        <Select
                            mode="multiple"
                            value={selectedSources}
                            onChange={(value) => {
                                handleSources({
                                    value,
                                    type: 'source'
                                });
                                setSelectedSources(value)
                            }}
                            className='  w-full -10 bg-white rounded-md  text-black' >
                            {sources?.map((item: any, index: number) => {
                                return (
                                    <Option key={index} value={item}>
                                        {item}
                                    </Option>
                                )
                            })}
                        </Select>
                    </label>
                </div>
                <div className="items-center mt-4">
                    <button onClick={handleSearch} className="bg-blue-400 text-white py-2 px-3 rounded-md hover:bg-blue-800">Search</button>
                </div>
            </div>
            <FinalFlightsresponse searchResult={searchResult} />
        </section>
    );
}

export default Filters;
