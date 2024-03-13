'use client'
import { useState, useEffect } from "react";
import moment from 'moment';
import { Select, DatePicker } from 'antd';
import { TbArrowsLeftRight } from "react-icons/tb";
import Link from "next/link";
import ShowingFilghtsResults from "../showingFilghtsResults";
const { Option } = Select;

const Filters: React.FC<any> = ({ origins, destination }) => {
    const [DestinationAirport, setDestinationAirport] = useState('');
    const [OriginAirport, setOriginAirport] = useState('');
    const [searchResult, setSearchResult] = useState<any[]>([]);
    console.log("🚀 ~ searchResult:", searchResult)
    let data: any = []
    const handleSearch = async () => {
        try {
            const res = await fetch('../../api/filter', {
                method: 'POST',
                body: JSON.stringify({
                    OriginAirport,
                    DestinationAirport,
                   
                })
            })
            const searchResult = await res.json()
            setSearchResult(searchResult)
        } catch (error) {
            console.log("🚀 ~ handleSearch ~ error:", error)

        }
    }

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
                        <DatePicker defaultValue={moment()} className="py-[8px] w-full" />
                    </div>
                </div>
                <div>
                    <div>
                        <button onClick={handleSearch} className="bg-blue-400 text-white py-2 px-3 rounded-md hover:bg-blue-800">Search</button>
                    </div>
                </div>
            </div>
            <ShowingFilghtsResults searchResult={searchResult} />
        </section>
    );
}

export default Filters;
