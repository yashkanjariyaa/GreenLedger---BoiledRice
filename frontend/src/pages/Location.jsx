import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import LeafMap from '../components/LeafMap';

import { useDispatch } from "react-redux";
import {setIndex} from '../slices/generalSlice'

const Location = () => {
  
  const [mapCenter, setMapCenter] = useState(null);
  const [userLocationAvailable, setUserLocationAvailable] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIndex(4))
  }, [])

  useEffect(() => {
    // Check if geolocation is available on mount
    if (navigator.geolocation) {
      setUserLocationAvailable(true);
    }
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          console.log(mapCenter)
        },
        (error) => {
          console.error('Error getting location:', error);
          // Handle errors here
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle unsupported browser here
    }
  };

  return (
    <div className="">
      <Sidebar />
      <div className="ml-[60px]">
        <div className="ml-[-60px] flex items-center rounded-lg p-4 justify-center">
          {userLocationAvailable && (
            <button
              onClick={handleGetLocation}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Get Location
            </button>
          )}
        </div>
        <LeafMap center={mapCenter} />
      </div>
    </div>
  );
};

export default Location;
