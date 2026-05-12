import { createContext, useState } from "react";
export const FavContext = createContext();

FavContext.displayName = "fav";
export const FavProvider = ({ children }) => {
  const [fav, setFav] = useState([]);

  function addFav(product) {

    const exist = fav.find(item => item.id === product.id);

    if (exist) {

      setFav(fav.filter(item => item.id !== product.id));

    } else {

      setFav([...fav, product]);

    }
  }

  return (
    <FavContext.Provider
      value={{
        fav,
        addFav,
        count: fav.length
      }}
    >
      {children}
    </FavContext.Provider>
  );
};