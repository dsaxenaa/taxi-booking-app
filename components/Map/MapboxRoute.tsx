import {
Layer,
Source,
} from "react-map-gl";

import React from "react";

function MapBoxRoute(props:any) {
  return (
    <Source
      type="geojson"
      data={{
        type: "Feature",
        geometry: { type: "LineString", coordinates: props.coordinates },
      }}
    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "square" }}
        paint={{ "line-color": "#0462d4", "line-width": 4 }}
      />
    </Source>
  );
}

export default MapBoxRoute;
