'use client'
import React, { useState } from 'react';
import moment from 'moment';
import { Select, DatePicker } from 'antd';
import Link from "next/link";
import { TbArrowsLeftRight } from "react-icons/tb";
import ShowingFilghtsResults from "../showingFilghtsResults";

const { Option } = Select;

const Filters: React.FC<any> = ({ origins, destination }) => {
    const [DestinationAirport, setDestinationAirport] = useState('');
    const [OriginAirport, setOriginAirport] = useState('');
    const [selectedDate, setSelectedDate] = useState(moment());
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [Bussiness, setBussiness] = useState(false);
    const [Economy, setEconomy] = useState(false);
    const [Premium, setPremium] = useState(false);

    const handleSearch = async () => {
        try {
            const res = await fetch('../../api/filter', {
                method: 'POST',
                body: JSON.stringify({
                    OriginAirport,
                    DestinationAirport,
                    Date: selectedDate.format("YYYY-MM-DD"),
                    Bussiness,
                    Economy,
                    Premium
                })
            });

            const searchResult = await res.json();
            setSearchResult(searchResult);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleDateChange = (date: moment.Moment | null) => {
        if (date) {
            setSelectedDate(date);
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
                    {destination && (
                        <Select
                            mode="multiple"
                            onChange={(value) => { setDestinationAirport(value) }}
                            className='  w-full -10 bg-white rounded-md  text-black' >
                            {destination?.map((item: any, index: number) => {
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
                    <label className="text-sm font-normal block ">Departure Date</label>
                    <div className="">
                        <DatePicker value={selectedDate} onChange={handleDateChange} className="py-[8px] w-full" />
                    </div>
                </div>
                <div className="items-center mt-4">
                    <div className="flex items-center">
                    <div className=" flex space-x-[2px]">
                        <label className="text-center text-[10px] font-bold ">
                        Bussiness
                                <input
                                    name="Bussiness"
                                    checked={Bussiness}
                                    onChange={() => { setBussiness(true); setEconomy(false); setPremium(false); }}
                                    className="w-8 h-6"
                                    type="radio"
                                />
                              
                            </label>
                            <label className="text-[10px] text-center  font-bold">
                               
                                Economy
                                <input
                                    name="Economy"
                                    checked={Economy}
                                    onChange={() => { setBussiness(false); setEconomy(true); setPremium(false); }}
                                    className="w-8 h-6"
                                    type="radio"
                                />
                             
                            </label>
                            <label className="text-[10px] text-center font-bold">
                            Premium
                                <input
                                    name="Premium"
                                    checked={Premium}
                                    onChange={() => { setBussiness(false); setEconomy(false); setPremium(true); }}
                                    className="w-8 h-6"
                                    type="radio"
                                />
                              
                            </label>
                        </div>
                        <button onClick={handleSearch} className="bg-blue-400 text-white py-2 px-3 rounded-md hover:bg-blue-800">Search</button>
                        
                    </div>
                </div>
            </div>
            <ShowingFilghtsResults searchResult={searchResult} />
        </section>
    );
}

export default Filters;
