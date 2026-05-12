import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { db } from "../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const Toast = Swal.mixin({
    toast: true,
    position: isArabic ? "top-start" : "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "carts", user.uid), (docSnap) => {
        if (docSnap.exists()) {
          setCartList(docSnap.data().items);
        } else {
          setCartList([]);
        }
      });

      return () => unsub();
    } else {
      setCartList([]);
    }
  }, [user]);

  const addCart = async (product) => {
    if (!user) {
      Swal.fire({
        title: t("login_required"),
        text: t("join_us_shopping"),
        icon: "warning",
        confirmButtonColor: "#000",
        confirmButtonText: t("login_now")
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        }
      });

      return;
    }

    const isExist = cartList.find((item) => item.id === product.id);

    let updatedItems = [];

    if (isExist) {
      updatedItems = cartList.filter((item) => item.id !== product.id);

      Toast.fire({
        icon: "info",
        title: t("item_removed_cart")
      });
    } else {
      updatedItems = [...cartList, product];

      Toast.fire({
        icon: "success",
        title: t("item_added_cart")
      });
    }

    await setDoc(doc(db, "carts", user.uid), {
      items: updatedItems
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCart,
        countCart: cartList.length
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;