import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { db } from "../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [fav, setFav] = useState([]);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const Toast = Swal.mixin({
    toast: true,
    position: isArabic ? "top-start" : "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "favorites", user.uid);

      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          setFav(snapshot.data().items || []);
        } else {
          setFav([]);
        }
      });

      return () => unsubscribe();
    } else {
      setFav([]);
    }
  }, [user]);

  const addFav = async (product) => {
    if (!user) {
      Swal.fire({
        title: t("please_login"),
        text: t("login_save_favorite"),
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#a67c52",
        cancelButtonColor: "#d33",
        confirmButtonText: t("go_to_login"),
        borderRadius: 0
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });

      return;
    }

    const isExist = fav.find((item) => item.id === product.id);

    let updatedFavs = [];

    if (isExist) {
      updatedFavs = fav.filter((item) => item.id !== product.id);

      Toast.fire({
        icon: "success",
        title: t("removed_wishlist")
      });
    } else {
      updatedFavs = [...fav, product];

      Toast.fire({
        icon: "success",
        title: t("added_wishlist")
      });
    }

    try {
      await setDoc(doc(db, "favorites", user.uid), {
        items: updatedFavs
      });
    } catch (error) {
      console.error("Firestore Error:", error);
    }
  };

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

export default FavProvider;