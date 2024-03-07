'use client'
import { useState, useEffect } from "react";
import { Select } from 'antd';
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
            <div className="md:grid md:grid-cols-4 gap-4 justify-center border rounded-md py-8 px-16">
                <label>Origin Airports
                    <Select
                        mode="multiple"
                        variant={false}
                        showSearch
                        className=' w-full py-1 bg-white rounded-md border-[1px] border-slate-400 text-black' onChange={(value) => { setsource(value) }}>
                        {data.map((item: any, index: number) => (
                            <div >
                                <Option key={index} value={item.source}>
                                    {item.source}
                                </Option>
                            </div>
                        ))}
                    </Select>
                </label>
                <label>Origin Airports
                    <Select
                        mode="multiple"
                        variant={false}
                        showSearch
                        className='  w-full py-1 bg-white rounded-md border-[1px] border-slate-400 text-black' onChange={(value) => { setsource(value) }}>
                        {data.map((item: any, index: number) => (
                            <div >
                                <Option key={index} value={item.source}>
                                    {item.source}
                                </Option>
                            </div>
                        ))}
                    </Select>
                </label>
                <label>Origin Airports
                    <Select
                        mode="multiple"
                        variant={false}
                        showSearch
                        className=' w-full py-1 bg-white rounded-md border-[1px] border-slate-400 text-black' onChange={(value) => { setsource(value) }}>
                        {data.map((item: any, index: number) => (
                            <div >
                                <Option key={index} value={item.source}>
                                    {item.source}
                                </Option>
                            </div>
                        ))}
                    </Select>
                </label>
                <label>Origin Airports
                    <Select
                        mode="multiple"
                        variant={false}
                        showSearch
                        className=' w-full py-1 bg-white rounded-md border-[1px] border-slate-400 text-black' onChange={(value) => { setsource(value) }}>
                        {data.map((item: any, index: number) => (
                            <div >
                                <Option key={index} value={item.source}>
                                    {item.source}
                                </Option>
                            </div>
                        ))}
                    </Select>
                </label>
            </div>
        </section>
    );
}
export default Posts;
