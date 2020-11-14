import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker
} from "react-simple-maps";
import Loading from "../../Loading";

const teritories = ["Serbia", "Kosovo"];
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m-simplified.json";

// https://www.react-simple-maps.io/docs/marker/
// Note that if you are trying out react-simple-maps with coordinates found via Google search, 
// you need to make sure they are in the right order ([lon, lat]). 
// Google by default returns coordinates as [lat, lon], while d3-geo specifies them as [lon, lat].

const markers = [
  { markerOffset: 25, name: "Београд", coordinates: [20.4489, 44.7866] },
  { markerOffset: 25, name: "Нови Сад", coordinates: [19.8335, 45.2671] },
  { markerOffset: 25, name: "Ниш", coordinates: [21.8958, 43.3209] },
  { markerOffset: 25, name: "Ужице", coordinates: [19.8425, 43.8556] },
  { markerOffset: 25, name: "Приштина", coordinates: [21.1655, 42.6629] },
]
const MapChart = ({ loading }) => {
  if (loading) return <div className="flex justify-center"> <Loading /> </div>;
  return (
    <div className="flex justify-center">
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-21.0, -44.0, 0],
          scale: 10000
        }}
        style={{
          height: '600px',
          width: '600px',
        }}
      >
        {/* <Graticule stroke="#EAEAEC" /> */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((c) => teritories.includes(c.properties.NAME))
              .map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#4F5659"
                    stroke="#4F5659"
                    strokeWidth={"3px"}
                  />
                );
              })
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{ fontFamily: "system-ui", fill: "#e1e1e1" }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default MapChart;
