import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

//! main return
const AppProvider = ({ children }) => {
  //! STATE
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  //! Fetch data from api  and run every time the search term changes
  const fetchDrinks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;

      if (drinks) {
        const newCocktails = drinks.map((cocktail) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strCategory,
            strGlass,
          } = cocktail;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            category: strCategory,
            glass: strGlass,
          };
        });
        console.log(newCocktails);
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);
  //! whenever search term changes call fetchDrinks()
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm]);

  //! return
  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};
//! global hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
