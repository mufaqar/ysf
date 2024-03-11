'use client'
import { useState, useEffect } from "react";
import { Select, DatePicker } from 'antd';
import { TbArrowsLeftRight } from "react-icons/tb";
import Link from "next/link";
import { data } from '@/components/data'
const { Option } = Select;
const Posts: React.FC = () => {
    const [DestinationAirport, setDestinationAirport] = useState('');
    const [OriginAirport, setOriginAirport] = useState('');
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [showFlights, setShowFlights] = useState(false);
    const handleSearch = () => {
        const result = data.filter(item => OriginAirport.includes(item.OriginAirport) && DestinationAirport.includes(item.DestinationAirport));
        setSearchResult(result);
        setShowFlights(true);
    }
    return (
        <section className="px-4 container mx-auto py-16">
            <div className="md:grid md:grid-cols-4 gap-4 justify-center items-center border rounded-md py-8 px-16">
                {/* Origin Airport Select */}
                <label className="text-sm font-normal ">
                    <span className="flex items-center ">Origin Airports
                        <Link className="pl-2 text-[#0d6efd]  text-2xl " href={'/'}><TbArrowsLeftRight /></Link></span>
                    {data && (
                        <Select
                            mode="multiple"
                            onChange={(value) => { setOriginAirport(value) }}
                            className=' w-full -10 bg-white rounded-md  text-black' >
                            {data?.map((item: any, index: number) => {
                                return (
                                    <Select.Option key={index} value={item.OriginAirport}>
                                        {item.OriginAirport}
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
                    {data && (
                        <Select
                            mode="multiple"
                            onChange={(value) => { setDestinationAirport(value) }}
                            className='  w-full -10 bg-white rounded-md  text-black' >
                            {data?.map((item: any, index: number) => {
                                return (
                                    <Select.Option key={index} value={item.DestinationAirport}>
                                        {item.DestinationAirport}
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
                        <DatePicker className="py-[8px] w-full" />
                    </div>
                </div>
                <div>
                    <div>
                        <button onClick={handleSearch} className="bg-blue-400 text-white py-2 px-3 rounded-md hover:bg-blue-800">Search</button>
                    </div>
                </div>
            </div>
            {/* Show Search Results */}
            {showFlights && (
                <div className="mt-8 text-center">
                    <h2 className="text-lg font-semibold mb-2">Search Results</h2>
                    <table className="border-collapse border border-gray-400 m-auto">
                        <thead>
                            <tr>
                                <th className="border border-gray-400 px-4 py-2">Depart</th>
                                <th className="border border-gray-400 px-4 py-2">Arrive</th>
                                <th className="border border-gray-400 px-4 py-2">Distance</th>
                                <th className="border border-gray-400 px-4 py-2">Source</th>
                                <th className="border border-gray-400 px-4 py-2">Bussiness</th>
                                <th className="border border-gray-400 px-4 py-2">Economy</th>
                                <th className="border border-gray-400 px-4 py-2">Premium</th>
                                <th className="border border-gray-400 px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResult.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-400 px-4 py-2">{item.Departs}</td>
                                    <td className="border border-gray-400 px-4 py-2">{item.Arrive}</td>
                                    <td className="border border-gray-400 px-4 py-2">{item.Source}</td>
                                    <td className="border border-gray-400 px-4 py-2">{item.Distance}</td>
                                    <td className="border border-gray-400 px-4 py-2">${item.Bussiness}</td>
                                    <td className="border border-gray-400 px-4 py-2">${item.Economy}</td>
                                    <td className="border border-gray-400 px-4 py-2">{item.Premium}</td>
                                    <td className="border border-gray-400 px-4 py-2">{item.Date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default Posts;
