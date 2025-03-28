
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

export default function MarkerLayer({ listings }) {
  return (
    <>
      {listings.map((item, idx) => {
        // read lat/lon from listing.location.address.coordinate
        const lat = item.location?.address?.coordinate?.lat;
const lon = item.location?.address?.coordinate?.lon;

        console.log(
            `Listing #${idx} lat: ${lat}, lon: ${lon} address:`,
            item.location?.address
          );

        if (!lat || !lon) return null;

        const streetNum = item.location?.address?.street_number;
        const streetName = item.location?.address?.street_name;

        return (
          <Marker key={idx} position={[lat, lon]}>
            <Popup>
              <strong>{streetNum} {streetName}</strong>
              <br />
              {item.location?.address?.city}, {item.location?.address?.state}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
