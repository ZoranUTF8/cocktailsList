import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { AiFillYoutube } from "react-icons/ai";

const randomUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const Random = () => {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  const handleReload = () => {
    setReload(!reload);
  };

  useEffect(() => {
    setLoading(true);

    async function getRandomCocktail() {
      try {
        const response = await fetch(randomUrl);
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
        console.log(`ERROR => error`);
      }
      setLoading(false);
    }
    getRandomCocktail();
  }, [reload]);

  //! main return

  if (loading) {
    return <Loading />;
  } else if (!cocktail) {
    return (
      <section className="section cocktail-section">
        <h2 className="section-title">No cocktail to display</h2>
        <button className="btn btn-primary" onClick={handleReload}>
          Try again
        </button>
        <Link to="/" className="btn btn-primary">
          Go back
        </Link>
      </section>
    );
  } else {
    const { name, image, info, category, glass, ingredients, instructions } =
      cocktail;
    return (
      <section className="section cocktail-section">
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
              <button id="translateBtn">
                <a
                  href={`https://translate.google.com/?sl=en&tl=sr&text=${instructions}&op=translate`}
                  target="_blank"
                  id="translateLink"
                >
                  Translate this
                </a>
              </button>
            </p>

            <p>
              <span className="drink-data">ingredients :</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> + {item}</span> : null;
              })}
            </p>

            <p>
              <span className="drink-data">How do I make it :</span>
              <button id="youTube" >
                <a
                  href={`https://www.youtube.com/results?search_query=how+to+make+cocktail+${name}`}
                >
                  <AiFillYoutube size={35} className="youTubeLink" />
                </a>
              </button>
             
            </p>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleReload}>
          Another one
        </button>
      </section>
    );
  }
};

export default Random;
