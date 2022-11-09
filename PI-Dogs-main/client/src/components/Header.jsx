import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <>
      <header>
        <button>
          <Link to={"/"}><span >HOME</span></Link>
        </button>
        <button>
          <Link to={"/createDog"}><span >CREATE DOG</span></Link>
        </button>
      </header>
    </>
  );
};

export default Header;
