'use client'
import React, { useState } from 'react';
import moment from 'moment';
import { Select, DatePicker } from 'antd';
import Link from "next/link";
import { TbArrowsLeftRight } from "react-icons/tb";
import FinalFlightsresponse from '@/components/flightsresults';
const { Option } = Select;
const Filters: React.FC<any> = ({ origins, destinations, sources }) => {
    const Sources = ['united', 'aeroplane', 'lifemiles', 'eurobonus']
    const [DestinationAirport, setDestinationAirport] = useState('');
    const [OriginAirport, setOriginAirport] = useState('');
    const [selectedDate, setSelectedDate] = useState(moment());
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [Source, setSources] = useState('');
    const handleSearch = async () => {
        try {
            const res = await fetch('../../api/filter', {
                method: 'POST',
                body: JSON.stringify({
                    OriginAirport,
                    DestinationAirport,
                    Source
                })
            });

            const searchResult = await res.json();
            setSearchResult(searchResult);
        } catch (error) {
            console.log("Error:", error);
        }
    };


    return (
        <section className="px-4 container mx-auto py-16">
            <div className="md:grid md:grid-cols-4 gap-4 justify-center items-center border rounded-md py-8 px-16">
                {/* Origin Airport Select */}
                <label className="text-sm font-normal ">
                    <span className="flex items-center ">Origin Airports
                        <Link className="pl-2 text-[#0d6efd]  text-2xl " href={'/'}><TbArrowsLeftRight /></Link></span>
                    {origins && (
                        <Select
                            mode="multiple"
                            onChange={(value) => { setOriginAirport(value) }}
                            className=' w-full -10 bg-white rounded-md  text-black' >
                            {origins?.map((item: any, index: number) => {
                                return (
                                    <Select.Option key={index} value={item}>
                                        {item}
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    )}
                </label>
                {/* Destination Airport Select */}
                <label className="text-sm font-normal">
                    <span className="flex items-center ">Destination Airports
                        <Link className="pl-2 text-[#0d6efd]  text-2xl " href={'/'}><TbArrowsLeftRight /></Link></span>
                    {destinations && (
                        <Select
                            mode="multiple"
                            onChange={(value) => { setDestinationAirport(value) }}
                            className='  w-full -10 bg-white rounded-md  text-black' >
                            {destinations?.map((item: any, index: number) => {
                                return (
                                    <Select.Option key={index} value={item}>
                                        {item}
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    )}
                </label>
                {/* Departure Date */}
                <div className="block">

                    <label className="text-sm font-normal">
                        <span className="flex items-center ">FrequentFlyer Program
                            <Link className="pl-2 text-[#0d6efd]  text-2xl " href={'/'}><TbArrowsLeftRight /></Link></span>
                        {Sources && (
                            <Select
                                mode="multiple"
                                onChange={(value) => { setSources(value) }}
                                className='  w-full -10 bg-white rounded-md  text-black' >
                                {Sources?.map((item: any, index: number) => {
                                    return (
                                        <Select.Option key={index} value={item}>
                                            {item}
                                        </Select.Option>
                                    )
                                })}
                            </Select>
                        )}
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
