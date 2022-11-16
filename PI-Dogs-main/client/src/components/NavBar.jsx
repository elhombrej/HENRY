import React from "react";
import {Link} from "react-router-dom";

const NavBar = (props) => {
    return(
        <>
        <h3>NavBar</h3>
        <ul>
            <li> <Link to="/home">HOME</Link></li>
            <li> <Link to="/aboutme">ABOUT ME</Link></li>
        </ul>
        <hr/>
        </>
    )
};

export default NavBar;