import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  // console.log(cities);
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message={"Country list is empty"} />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
//  {
//    cities.map((city) => {
//      <li> City </li>;
//    });
//  }
export default CityList;
