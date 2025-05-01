import React from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Map() {
  const navigate = useNavigate()
  const [searchPramas, setSearchParams] = useSearchParams();
  const lat = searchPramas.get("lat");
  const lng = searchPramas.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <p>
        Position: {lat}, {lng}
      </p>
      <button onClick={() => setSearchParams({ lat: 23, lng: 40 })}>
        Change
      </button>
    </div>
  );
}
