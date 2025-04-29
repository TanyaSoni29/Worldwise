import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      {/* if you want any header or navbar we can write here this remain same in all other pages */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* this star path route met when all defined route path not match then this Page not Found route will be displayed */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// why we use Link or NavLink for moving between different page not anchor tag because when we use anchor tag then whole page is reloaded means hard reloading occur which should not happened in single page application...in single page application dom is updated with help of javascript without any reload of whole page.... 

// <Link to="/pageName" /> before pageName we use slash which is telling the application to start with base url then move to that page...
