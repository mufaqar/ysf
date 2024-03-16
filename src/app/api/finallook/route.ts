export async function POST(req: Request) {
  const { OriginAirport, DestinationAirport } =
    (await req.json()) as {
      OriginAirport: string,
      DestinationAirport: string,
      Date: string,
      Bussiness: boolean,
      Economy: boolean,
      Premium: boolean
    };

  // Fetch data from API based on provided filters
  let resp = await fetch(`https://seats.aero/partnerapi/search?origin_airport=${OriginAirport}&destination_airport=${DestinationAirport}&start_date=2024-03-16&end_date=2024-03-16&take=500`, {
    headers: {
      'Partner-Authorization': 'pro_2cIuzukk0tShnaR0KmKewgXyUZv',
      "Content-Type": "application/json",
    },
  });

  let { data } = await resp.json();

  return Response.json(data);
}
