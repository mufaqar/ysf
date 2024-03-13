  pro_2cIuzukk0tShnaR0KmKewgXyUZv	https://seats.aero/partnerapi/search


 	
	 <!-- {
      "ID": "2ZVMXVO04mkl9OhkN8nxirmwkku",
      "RouteID": "2QlCiZASr7yE3YifgrYPIvTFKMg",
      "Route": {
        "ID": "2QlCiZASr7yE3YifgrYPIvTFKMg",
        "OriginAirport": "SIN",
        "OriginRegion": "Asia",
        "DestinationAirport": "KUL",
        "DestinationRegion": "Asia",
        "NumDaysOut": 60,
        "Distance": 185,
        "Source": "alaska"
      },
      "Date": "2024-11-20",
      "ParsedDate": "2024-11-20T00:00:00Z",
      "YAvailable": true,
      "WAvailable": false,
      "JAvailable": true,
      "FAvailable": false,
      "YMileageCost": "25000",
      "WMileageCost": "0",
      "JMileageCost": "65000",
      "FMileageCost": "0",
      "YDirectMileageCost": 25000,
      "WDirectMileageCost": 0,
      "JDirectMileageCost": 65000,
      "FDirectMileageCost": 0,
      "YRemainingSeats": 9,
      "WRemainingSeats": 0,
      "JRemainingSeats": 1,
      "FRemainingSeats": 0,
      "YDirectRemainingSeats": 9,
      "WDirectRemainingSeats": 0,
      "JDirectRemainingSeats": 1,
      "FDirectRemainingSeats": 0,
      "YAirlines": "MH",
      "WAirlines": "",
      "JAirlines": "MH",
      "FAirlines": "",
      "YDirectAirlines": "MH",
      "WDirectAirlines": "",
      "JDirectAirlines": "MH",
      "FDirectAirlines": "",
      "YDirect": true,
      "WDirect": false,
      "JDirect": true,
      "FDirect": false,
      "Source": "alaska",
      "CreatedAt": "2023-12-13T21:27:12.561486Z",
      "UpdatedAt": "2024-02-12T10:20:36.949944Z",
      "AvailabilityTrips": null
    }, -->



    <!-- 'use client'
import React, { useEffect, useState } from 'react';
import { Select, DatePicker } from 'antd';
import { TbArrowsLeftRight } from "react-icons/tb";
import Link from "next/link";
const { Option } = Select;
async function getData() {
  const res = await fetch('https://seats.aero/partnerapi/search?origin_airport=LHR&destination_airport=EWR&take=500', {
    mode: 'no-cors',
  method: 'GET',
    headers: {
      'Partner-Authorization': 'pro_2cIuzukk0tShnaR0KmKewgXyUZv',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return data;
}


function Blog() {
  const [data, setdata] = useState([]);
  const [source, setsource] = useState('')
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getData();
        setdata(data);
        console.log('API data:', data);
      } catch (error) {
        console.error('Error fetching data:');
      }
    }

    fetchData();
  }, []);

  return (
    <section className='bg-secondary/5 py-16'>
      <section className="px-4 container mx-auto py-16">
        <div className="md:grid md:grid-cols-4 gap-4 justify-center items-center border rounded-md py-8 px-16">
          <label className="text-sm font-normal ">
            <span className="flex items-center ">Origin Airports
              <Link className="pl-2 text-[#0d6efd]  text-2xl " href={'/'}><TbArrowsLeftRight /></Link></span>
            <Select
              mode="multiple"

              showSearch
              className=' w-full h-10 bg-white rounded-md  text-black' onChange={(value) => { setsource(value) }}>
              {data?.map((item: any, index: number) => (
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
              className='  w-full h-10 bg-white rounded-md  text-black' onChange={(value) => { setsource(value) }}>
              {data?.map((item: any, index: number) => (
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
          <div>
            <div>
              <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
              <span className="pl-2 text-sm">Add +/-
                <select className=" w-14 py-[2px] border-[1px] mx-2">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                days
              </span>
            </div>

            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
            <span className="pl-2 text-sm">Show individual flights</span>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Blog; -->
