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

    const myHeaders = new Headers();
myHeaders.append("Partner-Authorization", "pro_2cIuzukk0tShnaR0KmKewgXyUZv");
myHeaders.append("Cookie", "__cf_bm=tG7divduN3NlhKglAj4N5ODhHD3d3hZNd2dIomMoR.4-1709806775-1.0.1.1-piAr_ihLhmuC1FpaYwwd5MKVnznVmbYSzHvwVr9IAe0xQhiPp5jD83FA51z4lnEiHCLS.PGF84HyRYnworsHMg; _abck=SK2VQsaOXPM_98ODFOuyh5dQVNXPJa-u2niRSwdiSe0C_lCoYg-6bRGdd1XbhcWLNsBBbHVWA3gPmDbDaBq5ElZDYzx81e-BNQhkB-hp-_ub08VOflhMNA2UJ4uJQV8TVlu249OUExO7GVX_CutZY2JJYEjZCXDAvujj0PheBmnx4hr-feuIUM1rK30DAg0yl1WQfagl_aM90R23gY3aeyfUmRsWMFshGM318dJq16vgCxlP6r8WMMt8PVVOT3IMUKtosdmGn9sWXtOeHqkn_ZTzZ05UZ3y_HGhUOau5QvjvZbm47_zo9URj8zZCJOaYO-EB62D1Bwu-8W9UiZXEbpEDJgz2M0WcG0uULqlVAbo");

const raw = "";

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://seats.aero/partnerapi/search?origin_airport=LHR&destination_airport=EWR&take=500", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));




    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const options = {
    //                 method: 'GET',
    //                 headers: {
    //                     accept: 'application/json',
    //                     'Partner-Authorization': 'pro_2cIuzukk0tShnaR0KmKewgXyUZv'
    //                 }
    //             };
    //             const url = 'https://seats.aero/partnerapi/search?origin_airport=LHR&destination_airport=NYC&take=500';

    //             const response = await fetch(url, options);

    //           if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }

    //             const responseData: any = await response.json();
    //             setData(responseData.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             // setError('Failed to fetch data. Please try again later.');
    //         }
    //     };

    //     fetchData();
    // }, []);

    // if (error) {
    //     return <div>{error}</div>;
    // }

    // console.log(data);

    return (
        <section className="px-4 container mx-auto py-16">
            <div className="md:grid md:grid-cols-4 gap-4 justify-center items-center border rounded-md py-8 px-16">
                <label className="text-sm font-normal ">
                    <span className="flex items-center ">Origin Airports
                        <Link className="pl-2 text-[#0d6efd]  text-2xl " href={'/'}><TbArrowsLeftRight /></Link></span>
                    <Select
                        mode="multiple"
                        variant={false}
                        showSearch
                        className=' w-full py-1 bg-white rounded-md border-[1px] border-slate-400 text-black' onChange={(value) => { setsource(value) }}>
                        {/* {data?.map((item: any, index: number) => (
                            <div >
                                <Option key={index} value={item.source}>
                                    {item.source}
                                </Option>
                            </div>
                        ))} */}
                    </Select>
                </label>
                <label className="text-sm font-normal">
                    <span className="flex items-center ">Origin Airports
                        <Link className="pl-2 text-[#0d6efd]  text-2xl " href={'/'}><TbArrowsLeftRight /></Link></span>
                    <Select
                        mode="multiple"
                        variant={false}
                        showSearch
                        className='  w-full py-1 bg-white rounded-md border-[1px] border-slate-400 text-black' onChange={(value) => { setsource(value) }}>
                        {/* {data.map((item: any, index: number) => (
                            <div >
                                <Option key={index} value={item.source}>
                                    {item.source}
                                </Option>
                            </div>
                        ))} */}
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
