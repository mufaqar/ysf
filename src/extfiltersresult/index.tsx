import React from 'react';

const ShowingFilghtsResults = ({ searchResult, Bussiness, Economy, Premium }: any) => {
     const filteredResults = searchResult.filter((item: any) => {
          if (Bussiness && item.JMileageCost !== "0") return true;
          if (Economy && item.YMileageCost !== "0") return true;
          if (Premium && item.WDirectMileageCost && item.WDirectMileageCost !== "0") return true;
          return false;
     });
     
     return (
          <>
               {/* Show Search Results */}

               <div className="mt-8 text-center">
                    <h2 className="text-lg font-semibold mb-2">Search Results</h2>
                    <table className="border-collapse border border-gray-400 m-auto">
                         <thead>
                              <tr>
                                   <th className="border border-gray-400 px-4 py-2">Depart</th>
                                   <th className="border border-gray-400 px-4 py-2">Arrive</th>
                                   <th className="border border-gray-400 px-4 py-2">Source</th>
                                   <th className="border border-gray-400 px-4 py-2">Bussiness</th>
                                   <th className="border border-gray-400 px-4 py-2">Economy</th>
                                   <th className="border border-gray-400 px-4 py-2">Premium</th>
                                   <th className="border border-gray-400 px-4 py-2">First</th>
                                   <th className="border border-gray-400 px-4 py-2">Date</th>
                              </tr>
                         </thead>
                         <tbody>
                              {filteredResults.map((item: any, index: number) => (
                                   <tr key={index}>
                                        <td className="border border-gray-400 px-4 py-2">{item.Route.OriginAirport}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.Route.DestinationAirport}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.Route.Source}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.JMileageCost !== "0" ? item.JMileageCost  : 'Not Available'}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.YMileageCost !== "0" ? item.YMileageCost : 'Not Available'}</td>
                                        <td className="border border-gray-400 px-4 py-2">{ item.WDirectMileageCost &&  item.WDirectMileageCost !== "0" ? item.WDirectMileageCost :'Not Available'}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.FMileageCost !== "0" ? item.FMileageCost : 'Not Available'}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.Date}</td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>

          </>
     )
}

export default ShowingFilghtsResults;
