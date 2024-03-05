import Image from "next/image";

export default function Home() {

  {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Partner-Authorization': 'pro_2cIuzukk0tShnaR0KmKewgXyUZv'
      }
    };

    fetch('https://seats.aero/partnerapi/search?origin_airport=LHR&destination_airport=EWR&take=500', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  return (
    <main>


    </main>
  );
}
