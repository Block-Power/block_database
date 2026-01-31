'use client'
import { SubmissionInputs } from "@/lib/definitions";
import SubmissionForm from "./SubmissionForm";
import dynamic from 'next/dynamic'
import { createContext, ReactNode, useContext, useState } from "react";

const MapLoader = dynamic(() => import('./SubmissionMap'), {
        loading: () => <p>Loading...</p>,
        ssr: false
      })

// Define the type for polygon coordinates
export type PolygonCoords = [number, number][]; // Array of [latitude, longitude] pairs

interface PolygonContextType {
  polygonCoords: PolygonCoords;
  setPolygonCoords: (coords: PolygonCoords) => void;
}

// Create a Context with a default null value, which will be provided by the Provider
const PolygonContext = createContext<PolygonContextType | null>(null);

// Custom hook to use the PolygonContext
export const usePolygon = () => {
  const context = useContext(PolygonContext);
  if (context === null) {
    throw new Error('usePolygon must be used within a PolygonProvider');
  }
  return context;
};


export default function SubmissionPage({submission}: {submission: SubmissionInputs}) {
    const [polygonCoords, setPolygonCoords] = useState<PolygonCoords>([]);

    
        return (
        <main className="submission_map_main">
                <h1>Submission</h1>
            <section className="submission_map_container">
                <section className="submission_list">
                        <PolygonContext.Provider value={{ polygonCoords, setPolygonCoords }}>
                        <SubmissionForm submission={submission} />
                        </PolygonContext.Provider>
                    
                </section> 
                <section className="submission_map" >
                        <PolygonContext.Provider value={{ polygonCoords, setPolygonCoords }}>
                        <MapLoader />
                        </PolygonContext.Provider>
                </section>
            </section>
        </main>
        )
}