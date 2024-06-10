import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../../db/db.js";
import ItemDetail from "./ItemDetail";
import { doc, getDoc } from "firebase/firestore";
import Loading from "../Loading/Loading.jsx";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { idProduct } = useParams();

  const getProduct = () => {
    setLoading(true);

  const productRef = doc(db, "products", idProduct);
  getDoc(productRef)
    .then((productDb) => {
      const data = { id: productDb.id, ...productDb.data() };
      setProduct(data);
    })
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    getProduct();
  }, [idProduct]);

  return loading ? <Loading /> : <ItemDetail product={product} />;
};
export default ItemDetailContainer;
