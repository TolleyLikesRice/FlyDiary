import useSWR from "swr";

import { default as Flight } from "@/models/public/Flights";
import fetcher from "@/utils/fetcher";

export function FlightCard({ flight }: { flight: Flight }) {
    return (
        <div className="w-full bg-slate-600">
            
        </div>
    )
}

export function FlightCardStack({ number }: { number: number }) {
    const { data, error } = useSWR('/api/flights', fetcher);

    if (error) return <div className="text-center text-gray-100">Failed to load</div>;
    if (!data) return <div className="text-center text-gray-100">Loading...</div>;

    return (
        <div>
            {data.map((flight: Flight) => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    )
}