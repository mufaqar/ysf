'use client'
import { useState, useEffect } from "react";
import { Select, DatePicker } from 'antd';
import { TbArrowsLeftRight } from "react-icons/tb";
import Link from "next/link";
const { Option } = Select;
const Posts: React.FC = () => {

    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [source, setsource] = useState()
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
                setData(responseData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // setError('Failed to fetch data. Please try again later.');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    console.log(data);

    return (
        <section className="px-4 container mx-auto py-16">
            <div className="md:grid md:grid-cols-4 gap-4 justify-center items-center border rounded-md py-8 px-16">
                <label className="text-sm font-normal ">
                    <span className="flex items-center ">Origin Airports
                        <Link className="pl-2 text-[#0d6efd]  text-2xl " href={'/'}><TbArrowsLeftRight /></Link></span>
                    <Select
                        mode="multiple"
                  
                        showSearch
                        className=' w-full -10 bg-white rounded-md  text-black' onChange={(value) => { setsource(value) }}>
                        {data.map((item: any, index: number) => (
                            <div >
                                <Option key={index} value={item.source}>
                                    {item.source}
                                </Option>
                            </div>
                        ))}
                    </Select>
                </label>
                <label className="text-sm font-normal">
                    <span className="flex items-center ">Origin Airports
                        <Link className="pl-2 text-[#0d6efd]  text-2xl " href={'/'}><TbArrowsLeftRight /></Link></span>
                    <Select
                        mode="multiple"
                      
                        showSearch
                        className='  w-full -10 bg-white rounded-md  text-black' onChange={(value) => { setsource(value) }}>
                        {data.map((item: any, index: number) => (
                            <div >
                                <Option key={index} value={item.source}>
                                    {item.source}
                                </Option>
                            </div>
                        ))}
                    </Select>
                </label>
                <div className="block">
                    <label className="text-sm font-normal block ">Departure Date</label>
                    <div className="">
                        <DatePicker className="py-[8px] w-full" />
                    </div>
                </div>
                <div >
                    <div>
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        <span className="pl-2 text-sm font-normal">Add +/-
                            <select id="days" className="w-14 ml-2 mr-1 py-[2px] border-[1px] border-black text-sm">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            days

                        </span>
                    </div>
                    <div>
                        <input id="remember" type="checkbox" value="" className="w-4  h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        <span className="pl-2 text-sm font-normal">Show individual flights</span>
                        <div>
                            <button className="bg-blue-400 text-white py-2 px-3 rounded-md">Search</button>
                        </div>
                    </div> </div>
            </div>
        </section>
    );
}
export default Posts;
