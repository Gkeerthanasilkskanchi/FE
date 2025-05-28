import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCartProducts, getLikedProducts } from "../API/API";
import { toast } from "react-toastify";

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
        let res :any|null= null;
        if (type === "liked") {
          if (!email) { toast.error("Login to add product"); }
          if (email) {
            res = await getLikedProducts(email);
          }
        } else {
          if (!email) { toast.error("Login to add product"); }
          if (email) {
            res = await getCartProducts(email);
          }
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
        {items.map((item:any) => (
          <div key={item.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img src={item.image} className="card-img-top" alt={item.title} />
              <div className="card-body text-center">
                <h6 className="card-title">{item.title}</h6>
                {type === "cart" && <p>Qty: {item.quantity}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
