import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
    const {nav} = styles;
  return (
    <nav className={nav}>
      <ul>
        <li>
          <Link to="/">HomePage</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;


// when we use NavLink instead of Link then we can track which link is active right now as react router add that active class

// Styling options of React Applications--- why so any options are there in React because React does not care about css it only care about displaying correct data to the screen
// 1. Inline Css to jsx (using style prop, local scope only that jsx component)
// 2. css or saas file (global scope applied to all -- in big project it cause issues)
// 3. css module (css for particular component with same file name but have extension of css file)
// 4. css in javascript where we write css in javascript file
// 5. utility first css framework like tailwind we can use we have predefined utility classes to use flex box , layout responsive etc.
// 6. fully fledged ui library like mui, hyper ui etc where we does not need to write the css
