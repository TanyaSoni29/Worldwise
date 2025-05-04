import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchPramas] = useSearchParams();

  const lat = searchPramas.get("lat");
  const lng = searchPramas.get("lng");
  return [lat, lng];
}
