import React from "react";
import { Link } from "react-router-dom";
// import React, { useState, useEffect, useContext } from "react";

export default function Admin() {
  return (
    <>
      <Link to="/addPost">
        <button>პოსტის დამატება</button>
      </Link>
    </>
  );
}
