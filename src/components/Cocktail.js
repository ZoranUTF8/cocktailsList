import React from "react";
import { Link } from "react-router-dom";

const Cocktail = ({ image, name, id, info, category, glass }) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={`cocktail image ${name}`} />
      </div>
      <div className="cocktail-footer">
        <h3>Name: {name}</h3>
        <h4>Category: {category}</h4>
        <h4>Glass type: {glass}</h4>
        <p>Remark: {info}</p>
        <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details  ">
          Directions
        </Link>
      </div>
    </article>
  );
};

export default Cocktail;
