export async function POST(req: Request) {
  const { OriginAirport, DestinationAirport, Date, Bussiness, Economy, Premium } =
    (await req.json()) as {
      OriginAirport: string,
      DestinationAirport: string,
      Date: string,
      Bussiness: boolean,
      Economy: boolean,
      Premium: boolean
    };

  // Fetch data from API based on provided filters
  let resp = await fetch(`https://seats.aero/partnerapi/search?origin_airport=${OriginAirport}&destination_airport=${DestinationAirport}&start_date=${Date}&end_date=2024-03-15&take=500`, {
    headers: {
      'Partner-Authorization': 'pro_2cIuzukk0tShnaR0KmKewgXyUZv',
      "Content-Type": "application/json",
    },
  });

  let { data } = await resp.json();


  if (Bussiness) {
    data = data.filter((item: any) => item.JMileageCost !== "0");
  }
  if (Economy) {
    data = data.filter((item: any) => item.YMileageCost !== "0");
  }
  if (Premium) {
    data = data.filter((item: any) => item.WDirectMileageCost && item.WDirectMileageCost !== "0");
  }

  return Response.json(data);
}
