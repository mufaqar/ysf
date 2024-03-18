export async function POST(req: Request) {
  const { OriginAirport, DestinationAirport, Source } =
    (await req.json()) as {
      OriginAirport: string,
      DestinationAirport: string,
      Date: string,
      Bussiness: boolean,
      Economy: boolean,
      Premium: boolean,
      Source: any
    };
  const currentDate = new Date();
  const nextYearDate = new Date(currentDate);
  nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
  const startDate = currentDate.toISOString().split('T')[0];
  const endDate = nextYearDate.toISOString().split('T')[0];

  let resp = await fetch(`https://seats.aero/partnerapi/search?origin_airport=${OriginAirport}&destination_airport=${DestinationAirport}&start_date=${startDate}&end_date=${endDate}&take=5000`, {
    headers: {
      'Partner-Authorization': 'pro_2cIuzukk0tShnaR0KmKewgXyUZv',
      "Content-Type": "application/json",
    },
  });
  let { data } = await resp.json();
  if (Source.length > 0) {
    const modifiedWithSource = data.filter((item: any) => item.Route.Source === Source[0])
    return Response.json(modifiedWithSource);
  } else {
    return Response.json(data);
  }
}
