import { useJsApiLoader } from "@react-google-maps/api";
import "./App.css";
import Map, { MODES } from "./components/Map/Map";
import { useCallback, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY || "";

const defaultCenter = {
  lat: 50.450001,
  lng: 30.523333,
};

export interface Coordinate {
  lat: number;
  lng: number;
}

function App() {
  const [mode, setMode] = useState(MODES.MOVE);
  const [markers, setMarkers] = useState<Coordinate[]>([]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  const toggleMode = useCallback(() => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKER);
        document.querySelector(".toggle-btn")?.classList.add("active");
        break;
      case MODES.SET_MARKER:
        setMode(MODES.MOVE);
        document.querySelector(".toggle-btn")?.classList.remove("active");
        break;
      default:
        setMode(MODES.MOVE);
    }
  }, [mode]);

  const onMarkerAdd = useCallback(
    (coordinates: Coordinate) => {
      setMarkers([...markers, coordinates]);
    },
    [markers]
  );

  const clear = useCallback(() => {
    setMarkers([]);
  }, []);
  const removeLastMarker = useCallback(() => {
    setMarkers((prevMarkers) => prevMarkers.slice(0, -1));
  }, []);

  return (
    <div>
      <div className="ctrl">
        <p>Control bar</p>
        <ul className="ctrl-btns">
          <li>
            <button onClick={toggleMode} className="toggle-btn">
              Set markers Mode
            </button>
          </li>
          <li>
            <button onClick={removeLastMarker}>Remove last marker</button>
          </li>
          <li>
            <button onClick={clear}>Clear markers</button>
          </li>
        </ul>
      </div>
      {isLoaded ? (
        <Map
          center={defaultCenter}
          mode={mode}
          markers={markers}
          onMarkerAdd={onMarkerAdd}
        />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default App;
