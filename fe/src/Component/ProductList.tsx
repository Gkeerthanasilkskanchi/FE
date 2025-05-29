import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addOrderService, getCartProducts, getLikedProducts } from "../API/API";
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
        let res: any | null = null;
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
 const handleBuyClick = async (product: any) => {
        try {
            const email = sessionStorage.getItem("userEmail");
            alert(email)
            const payload = {
                email,
                id: product.id,
                quantity: product.quantity || 1,
                price: product.price,
            };
            await addOrderService(payload);

            const message = encodeURIComponent(
                `Hello, I'm interested in buying:\n\n` +
                `🧵 *${product.title}*\n💰 Price: ₹${product.price}\n📦 Quantity: ${product.quantity || 1}\n\n` +
                `Please provide further details.`
            );
            const whatsappNumber = "919843788261";
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        } catch (error) {
            console.error("Buy operation failed:", error);
        }
    };
  return (
    <div className="container mt-4">
      <h4>{type === "liked" ? "Liked Products" : "Your Cart"}</h4>
      <div className="row">
        {items.length === 0 && <p>No items found.</p>}
        {items.map((item: any) => (
          <div key={item.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img src={item.image} className="card-img-top" alt={item.title} />
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="mb-1">{item.title}</h6>
                  {type === "cart" && <p className="mb-0">Qty: {item.quantity}</p>}
                </div>

                <button style={{ border: '1px solid gray', width: '45px', height: '40px' }} className="primary" onClick={()=>handleBuyClick(item)}>
                  <i className="bi bi-bag-fill" style={{ fontSize: "20px" }}></i>
                </button>
              </div>



            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
