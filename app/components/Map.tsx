
import { MapContainer, Polygon, Marker, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"
import * as L from "leaflet"
import SearchField from "./SearchField"
import React from "react"
import { Block } from '@/lib/definitions'
import Link from "next/link"

function blockPopUp(block: Block) {
    const emailLink = "mailto:" + block.email
    const updateDate = new Date(block.updated_at).toDateString().substring(4)

    return (

        <section className="blockPopup">
            <h2>{block.name}</h2>
            <h3>Home Base</h3>
            <span>{block.boundaries}</span>
            <div className="blockPopup_contact">
                <h3>Reach Out</h3> 
                {block.email ? (<span>Email: <Link target="_blank" href={emailLink}>{block.email}</Link></span>) : null}
                {block.phone ? (<span>Phone: {block.phone}</span>) : null}
                {block.website ? (<span>Website: <Link target="_new" href={block.website}>{block.website}</Link></span>) : null}
                
                
            </div> 
            <span>Last updated: {updateDate}</span>          
            <span>Something look off? <Link target="_blank" href="mailto:blockmappercontact@gmail.com">Contact us.</Link></span>         
        </section>
    )
}


export default function Map({ blockData } : { blockData : Array<Block> }) {
    
    return (
        <MapContainer center={[40.67443, -73.94438]} zoom={17} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            { blockData ? blockData.map((block: Block, index: number) => {
                const blockPoly = L.polygon(block.coords)
                const blockCenter = blockPoly.getBounds().getCenter()
                return (
                <React.Fragment key={index}>
                <Marker key={"marker" + block.id} position={blockCenter}>
                    <Popup key={"popup" + block.id} maxWidth={800}>{blockPopUp(block)}</Popup>
                </Marker>
                <Polygon key={"poly" + block.id} positions={block.coords} />
                </React.Fragment>
                )
            }) : null}
           <SearchField />
        </MapContainer>
    )
}
