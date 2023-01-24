import React from "react";

const Species = ({ name, skinColor, language }) => {
  return (
    <li>
      {name}
      <ul>
        <li>skinColor: {skinColor}</li>
        <li>language: {language}</li>
      </ul>
    </li>
  );
};

export default Species;
