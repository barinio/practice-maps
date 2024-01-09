import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useCallback } from "react";
import s from "./Map.module.css";

import { Coordinate } from "../../App";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1,
};

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  mode: number;
  markers: Coordinate[];
  onMarkerAdd: (coordinates: Coordinate) => void;
}

const defaultOptions = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
};

const Map = ({ center, mode, markers, onMarkerAdd }: MapProps) => {
  const mapRef = React.useRef(undefined);

  const onLoad = React.useCallback(function callback(map: any) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    mapRef.current = undefined;
  }, []);

  const onClick = useCallback(
    (loc: any) => {
      if (mode === MODES.SET_MARKER) {
        const lat = loc.latLng.lat();
        const lng = loc.latLng.lng();

        onMarkerAdd({ lat, lng });
      }
    },
    [mode, onMarkerAdd]
  );

  return (
    <div className={s.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
        onClick={onClick}
      >
        {markers.map((pos: any, i: number) => {
          return (
            <Marker position={pos} key={pos.lat} label={{ text: `${i + 1}` }} />
          );
        })}
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  );
};
export default Map;
