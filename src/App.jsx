import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";

// import Homepage from "./pages/HomePage";
// import PageNotFound from "./pages/PageNotFound";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
import { lazy, Suspense } from "react";

const Homepage = lazy(() => import("./pages/Homepage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

// const BASE_URL = "http://localhost:3000";

function App() {
  // const [cities, setCities] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   async function fetchCities() {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`${BASE_URL}/cities`);
  //       const data = await response.json();
  //       setCities(data);
  //     } catch (error) {
  //       alert("Failed to fetch cities!");
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchCities();
  // }, []);

  // the above Code is before the use of Context Api

  return (
    <>
      <AuthProvider>
        <CitiesProvider>
          {/* if you want any header or navbar we can write here this remain same in all other pages */}
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path="login" element={<Login />} />
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                {/* Nested Routing */}
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* if we want to render any route by default then we do indexing means we use index key word */}
                  <Route index element={<Navigate replace to="cities" />} />
                  {/* <Route
                path="cities"
                element={<CityList cities={cities} loading={loading} />}
              /> when contextApi is not used */}
                  <Route path="cities" element={<CityList />} />
                  {/* example of storing state in params */}
                  <Route path="cities/:id" element={<City />} />
                  {/* <Route
                path="countries"
                element={<CountryList cities={cities} loading={loading} />}
              /> when contextApi is not Used */}
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                {/* this star path route met when all defined route path not match then this Page not Found route will be displayed */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;

// why we use Link or NavLink for moving between different page not anchor tag because when we use anchor tag then whole page is reloaded means hard reloading occur which should not happened in single page application...in single page application dom is updated with help of javascript without any reload of whole page....

// <Link to="/pageName" /> before pageName we use slash which is telling the application to start with base url then move to that page...

// now we learn about storing state in the url ----
// the url is excellent place to store ui state an alternative to useState in some situations. example - opening and closing of panel, currently selected item, list sorting order, applied list filters

// Advantages--
// 1. Easy way to store state in a global place, accessible to all component in the app.
// 2. Good way to pass data from one page to next page where data have some temporary place in the app.
// 3. Make it easy to bookmark and share the page with exact ui state it had at the time means suppose if you apply filter color and size and then you share the url with anyone then same filter is visible to that person also..
// how we do that with React router ?  --- www.example.com/app/cities/lisbon?lat=38.90&lng=-40.17 so app/cities we can state part as it is telling which component is rendering so it is not useful so best way is to describe in params and query strings... lisbon is params and lat= and lng= is query strings

// programmatic navigation with use of useNavigation Custom Hook-- like we do when we call login and if it is successful the navigate("/") this is used inside handlers and event click means he/she not moving by clicking on any link...
// Benefit of Navigate element from react Router when we using index then our url is not set so for redirecting to that url we use Navigate as shown above if we does not use replace key word then we can't move back with that arrow before url.... this is used when we can't use useNavigate hook so this is Declarative way of doing that

// Advantage of Lazy Load --- it is code spiting method and this will reduce the bundle size...
