import { FaPlane } from "react-icons/fa"
import useSWR from "swr";

import { default as Flight } from "@/models/public/Flights";
import flightCardCSS from "@/styles/flightCard.module.css";
import fetcher from "@/utils/fetcher";

function getBlockTime(departure : String, arrival: String) {
    const [arriveHour, arriveMinute] = departure.split(':');
    const [departHour, departMinute] = arrival.split(':');
  
    const arriveDateTime = new Date();
    arriveDateTime.setHours(Number(arriveHour), Number(arriveMinute), 0);
  
    const departDateTime = new Date();
    departDateTime.setHours(Number(departHour), Number(departMinute), 0);
  
    const diffInMilliseconds = Math.abs(departDateTime.getTime() - arriveDateTime.getTime());
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    const formattedDifference = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    return formattedDifference;
  };

export function FlightCard({ flight }: { flight: Flight }) {
    return (
        <div className="w-full bg-slate-900 rounded-md my-4 p-4">
            <div className={flightCardCSS.container}>
                <div className={flightCardCSS.box}><span className="text-gray-400 text-sm">{flight.date.toString().substring(0, 10)}</span></div>
                <div className={flightCardCSS.box}><span className="text-gray-400 text-sm">{flight.ac_reg} • {flight.ac_type}</span></div>
            </div>
            <div className={flightCardCSS.container}>
                <div className={flightCardCSS.box}><span className="text-gray-100 text-xl">{flight.origin}</span></div>
                <div className={flightCardCSS.box}><span className="text-green-400 text-xl">{getBlockTime(flight.departure, flight.arrival)}</span></div>
                <div className={flightCardCSS.box}><span className="text-gray-100 text-xl">{flight.destination}</span></div>
            </div>
            <div className="items-center flex justify-between">
                <div className="text-gray-400 text-sm">{flight.departure.toString().substring(0, 5)}</div>
                <div className="text-gray-400 text-sm">{flight.arrival.toString().substring(0, 5)}</div>
            </div>
        </div>
    )
}

export function FlightCardStack({ number }: { number: number }) {
    const { data, error } = useSWR('/api/flights', fetcher);

    if (error) return <div className="text-center text-gray-100">Failed to load</div>;
    if (!data) return <div className="text-center text-gray-100">Loading...</div>;

    return (
        <div>
            {data.sort(
                function (a: Flight, b: Flight) {
                    return new Date(b.date).getTime() - new Date(a.date).getTime()
                }
            ).slice(0, number).map((flight: Flight) => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    )
}