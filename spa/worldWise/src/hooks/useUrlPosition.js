import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [param] = useSearchParams();
  const lat = param.get("lat");
  const lng = param.get("lng");

  return [lat, lng];
}
