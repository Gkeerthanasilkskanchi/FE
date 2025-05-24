import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCartProducts, getLikedProducts } from "../API/API";

interface Product {
  id: number;
  productId: number;
  name: string;
  image: string;
  quantity?: number;
}

export const ProductList = () => {
  const { type } = useParams(); // 'liked' or 'cart'
  const [items, setItems] = useState<Product[]>([]);
  const email = sessionStorage.getItem("userEmail");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (type === "liked") {
          res = await getLikedProducts(email);
        } else {
          res = await getCartProducts(email);
        }
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (email) fetchData();
  }, [type, email]);
 
  return (
    <div className="container mt-4">
      <h4>{type === "liked" ? "Liked Products" : "Your Cart"}</h4>
      <div className="row">
        {items.length === 0 && <p>No items found.</p>}
        {items.map((item) => (
          <div key={item.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img src={item.image} className="card-img-top" alt={item.name} />
              <div className="card-body text-center">
                <h6 className="card-title">{item.name}</h6>
                {type === "cart" && <p>Qty: {item.quantity}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
