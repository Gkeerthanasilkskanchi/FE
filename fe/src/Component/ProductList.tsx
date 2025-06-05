import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addCartProducts, addLikedProducts, addOrderService, getCartProducts, getLikedProducts } from "../API/API";
import { toast } from "react-toastify";
import { Loader } from "./Loader";

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
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res: any | null = null;
        if (type === "liked") {
          setLoading(true);
          if (!email) { toast.error("Login to add product"); }
          if (email) {
            res = await getLikedProducts(email);

          }
        } else {
          if (!email) { toast.error("Login to add product"); }
          if (email) {
            setLoading(true);
            res = await getCartProducts(email);
          }
        }
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    if (email) fetchData();
  }, [type, email]);
  const handleBuyClick = async (product: any) => {
    try {

      const email = sessionStorage.getItem("userEmail");
      if (!email) { toast.error("Login to like product"); }
      if (email) {
        setLoading(true);
        const payload = {
          email,
          id: product.id,
          quantity: product.quantity || 1,
          price: product.price,
        };
        await addOrderService(payload);
        setLoading(false);
        const message = encodeURIComponent(
          `Hello, I'm interested in buying:\n\n` +
          `🧵 *${product.title}*\n💰 Price: ₹${product.price}\n📦 Quantity: ${product.quantity || 1}\n\n` +
          `Please provide further details.`
        );
        const whatsappNumber = "917904999697";
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
      }
    } catch (error) {
      console.error("Buy operation failed:", error);
    } finally {
      setLoading(false);
    }

  };
  const handleImageClick = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const addToCart = async (productId: any) => {
    try {
      if (!email) { toast.error("Login to add product"); }
      if (email) {
        setLoading(true);
        const payload = {
          email,
          productId,
          quantity: 1,
        }
        const response = await addCartProducts(payload);
        if (response) toast.success(response.data.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const likeProduct = async (productId: any) => {
    try {
      if (!email) { toast.error("Login to like product"); }
      if (email) {
        setLoading(true);
        const payload = {
          email,
          productId,
        }
        const response = await addLikedProducts(payload);
        
        if (response) toast.success(response.data.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message);
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };


  return (
    <>
      <Loader loading={loading}></Loader>
      <div className="container mt-4">
        <h4>{type === "liked" ? "Liked Products" : "Your Cart"}</h4>
        <div className="row">
          {items.length === 0 && <p>No items found.</p>}
          {items.map((item: any) => (
            <div key={item.id} className="col-md-3 mb-4">
              <div className="card h-100">
                <img src={item.image} className="card-img-top" alt={item.title} onClick={() => handleImageClick(item)}
                  data-bs-toggle="modal"
                  data-bs-target="#productDetailModal" />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      className="fw-bold text-truncate"
                      style={{ cursor: "pointer", textDecoration: "underline", maxWidth: "70%" }}
                      onClick={() => handleImageClick(item)}
                      data-bs-toggle="modal"
                      data-bs-target="#productDetailModal"
                      title={item.title}
                    >
                      {item?.title}
                    </span>

                    <span className="fw-bold">
                      ₹{item?.price}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center gap-2 mt-auto ps-4 pe-4">
                    <button
                      style={{ outline: 'none', border: 'none', borderRadius: '5px',background:'none' }}
                      className="primary"
                      title="Buy Now"
                      onClick={() => handleBuyClick(item)}
                    >
                      <i className="bi bi-bag " style={{ fontSize: "30px" }}></i>
                    </button>

                    <button style={{ outline: 'none', border: 'none', borderRadius: '5px',background:'none' }} className="primary" title="Add to Cart" onClick={() => addToCart(item.id)}>
                      {item?.is_product_in_cart ? <i className="bi bi-cart-fill" style={{ fontSize: "30px" }}></i>
                        : <i className="bi bi-cart-plus" style={{ fontSize: "30px" }}></i>}

                    </button>
                    <button style={{ outline: 'none', border: 'none', borderRadius: '5px',background:'none' }} className="primary" title="Like Product" onClick={() => likeProduct(item.id)}>
                      {!(item?.is_product_liked) ? <i className="bi bi-suit-heart text-danger" style={{ fontSize: '30px' }}></i>
                        : <i className="bi bi-heart-fill text-danger" style={{ fontSize: '30px' }}></i>}

                    </button>
                  </div>
                </div>



              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="modal fade" id="productDetailModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "600px" }}>
          <div className="modal-content position-relative">
            {/* Product Info */}
            <div className="d-flex p-3" style={{ maxHeight: "300px" }}>
              {/* Left: Description */}
              <div className="w-70 pe-3" style={{ width: "70%" }}>
                <h5 className="text-clip-gradient">About the Product</h5>
                <p style={{ fontSize: "14px" }}>
                  {selectedProduct?.about}
                </p>
                <img
                  src={selectedProduct?.image || '/images/default.jpg'}
                  className="card-img-top"
                  style={{
                    height: '200px',
                    width: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    backgroundColor: '#f8f8f8',
                    cursor: 'pointer'
                  }}
                  alt={selectedProduct?.title}
                  data-bs-toggle="modal"
                  data-bs-target="#imageModal"
                />

              </div>

              {/* Right: Brief info */}
              <div className="w-30 border-start ps-3" style={{ width: "30%" }}>
                <p><strong>Name:</strong> {selectedProduct?.title}</p>
                <p><strong>Price:</strong> ₹{selectedProduct?.price}</p>
                <p><strong>Cloth:</strong> {selectedProduct?.cloth || "N/A"}</p>
                <p><strong>Category:</strong> {selectedProduct?.category || "Traditional"}</p>
                {/* <p><strong>Bought By:</strong> {selectedProduct?.bought_by || "N/A"} customers</p> */}
                <p><strong>Saree Type:</strong> {selectedProduct?.saree_type}</p>

              </div>
            </div>


            <div className="border-top p-3 d-flex justify-content-center">
              <button
                style={{ outline: 'none', border: 'none', borderRadius: '5px',background:'none' }}
                className="primary"
                title="Buy Now"
                onClick={() => handleBuyClick(selectedProduct)}
              >
                <i className="bi bi-bag-fill me-3" style={{ fontSize: "30px" }}></i>
                Buy Now
              </button>

            </div>

          </div>
        </div>
      </div>
    </>

  );
};
