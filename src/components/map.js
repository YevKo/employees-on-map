import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";
import employeeData from '../data/employees.json';

const Map = () => {
  const [employeeLocations, setEmployeeLocations] = useState([]);

  // Extract the addresses from the employee data
  const addresses = employeeData.map((employee) => employee.address);
  // Convert the addresses to latitude/longitude coordinates using the Geocoding API
  useEffect(() => {
    Promise.all(
      addresses.map((address) =>
        new Promise((resolve) =>
        Geocode.fromAddress({ address }, (response, status) => {
          if (status === 'OK') {
            resolve({
              lat: response[0].geometry.location.lat(),
              lng: response[0].geometry.location.lng(),
            });
          } else {
            console.error(`Geocoding failed for postal code ${response[0]}`);
            resolve(null);
          }
          })
        )
      )
    ).then((locations) => setEmployeeLocations(locations.filter((loc) => loc !== null)));
  }, [addresses]);

  const apiKey = "AIzaSyDrsZSaIyalG4yVfTEeHab8ftqXXCsG7hk";

  // Center the map on Helsinki
  const center = { lat: 60.169857, lng: 24.938379 };

  // Define the map options
  const mapOptions = {
    zoom: 10,
    center,
  };

  return (
    <LoadScript
      googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ height: '500px', width: '100%' }}
        options={mapOptions}>
        {employeeLocations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
