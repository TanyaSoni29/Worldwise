import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const BASE_URL = "http://localhost:3000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        alert("Failed to fetch cities!");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      try {
        if (Number(id) === currentCity.id) return;
        setLoading(true);
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();
        setCurrentCity(data);
      } catch (error) {
        alert("Failed to fetch cities!");
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCities((cities) => [...cities, data]);
      console.log(data);
    } catch (error) {
      alert("Failed to create cities!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert("Failed to delete cities!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    return new Error("CityContext is used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
