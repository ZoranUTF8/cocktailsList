import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import { AiFillYoutube } from "react-icons/ai";

const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    //! render whenever the id changes

    setLoading(true);

    async function getCocktailInfo() {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();

        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            ingredients,
            instructions,
          };

          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktailInfo();
  }, [id]);

  //! main return
  if (loading) {
    return <Loading />;
  } else if (!cocktail) {
    return <h2 className="section-title">No cocktail to display</h2>;
  } else {
    const { name, image, info, category, glass, ingredients, instructions } =
      cocktail;
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          Go back
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name} />
          <div className="drink-info">
            <p>
              <span className="drink-data">name:</span>
              {name}
            </p>
            <p>
              <span className="drink-data">category:</span>
              {category}
            </p>
            <p>
              <span className="drink-data">info:</span>
              {info}
            </p>
            <p>
              <span className="drink-data">glass:</span>
              {glass}
            </p>
            <p>
              <span className="drink-data">instructions:</span>
              {instructions}
            </p>
            <p>
              <span className="drink-data">ingredients:</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}>+ {item} </span> : null; //!if item available display, if not return null
              })}
            </p>
            <p>
              <span className="drink-data">How do I make it :</span>
              <button>
                <a
                  href={`https://www.youtube.com/results?search_query=how+to+make+cocktail+${name}`}
                >
                  <AiFillYoutube size={35} className="youTubeLink" />
                </a>
              </button>
            </p>
          </div>
        </div>
      </section>
    );
  }
};
export default SingleCocktail;
