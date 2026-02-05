
import { MapContainer, TileLayer, FeatureGroup, Circle } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"
import React from "react"
import { EditControl } from "react-leaflet-draw"
import { usePolygon } from "./SubmissionPage"
import { LatLng } from "leaflet"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleDraw(e: any) {
    console.log(e)
}

const DrawComponent = () => {
    const { setPolygonCoords } = usePolygon(); // Get the setter from context

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _onCreated = (e: any) => {

        const { layerType, layer } = e;
        if (layerType === 'polygon') {
            const coordinatesArray = layer.getLatLngs()[0]
            const coordinates = coordinatesArray.map((latlng: LatLng) => [latlng.lat, latlng.lng]);
            setPolygonCoords(coordinates); // Update context state
        }
    };
        return (
        <FeatureGroup>
            <EditControl
            position='topright'
            onEdited={handleDraw}
            onCreated={_onCreated}
            onDeleted={handleDraw}
            draw={{
                rectangle: false
            }}
            />
            <Circle center={[51.51, -0.06]} radius={200} />
        </FeatureGroup>
        )

    }
export default function Map() {
 
    return (
        <MapContainer center={[40.67443, -73.94438]} zoom={17} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DrawComponent />
        </MapContainer>
    )
}
