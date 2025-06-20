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

    if (email) fetchData();
  }, [type, email]);

  const fetchData = async () => {
    try {
      let res: any | null = null;

      if (type === "liked") {
        setLoading(true);
        if (!email) { toast.error("Login to add product", { autoClose: 1000 }); }
        if (email) {
          res = await getLikedProducts(email);


        }
      } else {
        if (!email) { toast.error("Login to add product", { autoClose: 1000 }); }
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

  const handleBuyClick = async (product: any) => {
    try {

      const email = sessionStorage.getItem("userEmail");
      if (!email) { toast.error("Login to like product", { autoClose: 1000 }); }
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
      if (!email) { toast.error("Login to add product", { autoClose: 1000 }); }
      if (email) {
        setLoading(true);
        const payload = {
          email,
          productId,
          quantity: 1,
        }
        const response = await addCartProducts(payload);
        if (response) toast.success(response.data.message, { autoClose: 1000 });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message, { autoClose: 1000 });
    } finally {
      setLoading(false);
      fetchData();
      // window.location.reload();
    }
  };

  const likeProduct = async (productId: number) => {
    try {
      if (!email) {
        toast.error("Login to like product", { autoClose: 1000 });
        return;
      }

      setLoading(true);

      const payload = {
        email,
        productId,
      };

      const response = await addLikedProducts(payload);

      if (response) {
        toast.success(response.data.message, { autoClose: 1000 });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong", {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
      fetchData(); // or fetchProducts()
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
                      style={{ cursor: "pointer", textDecoration: "underline", maxWidth: "70%", color: "#270206" }}
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
                      style={{ outline: 'none', border: 'none', borderRadius: '5px', background: 'none' }}
                      className="primary"
                      title="Buy Now"
                      onClick={() => handleBuyClick(item)}
                    >
                      <i className="bi bi-bag " style={{ fontSize: "30px" }}></i>
                    </button>

                    <button style={{ outline: 'none', border: 'none', borderRadius: '5px', background: 'none' }} className="primary" title="Add to Cart" onClick={() => addToCart(item.id)}>
                      {item?.is_product_in_cart ? <i className="bi bi-cart-plus cart-style" style={{ fontSize: "30px" }}></i>
                        : <i className="bi bi-cart" style={{ fontSize: "30px" }}></i>}

                    </button>
                    <button style={{ outline: 'none', border: 'none', borderRadius: '5px', background: 'none' }} className="primary" title="Like Product" onClick={() => likeProduct(item.id)}>
                      {!(item?.is_product_liked) ? <i className="bi bi-suit-heart heart-style" style={{ fontSize: '30px' }}></i>
                        : <i className="bi bi-heart-fill heart-style" style={{ fontSize: '30px' }}></i>}

                    </button>
                  </div>
                </div>



              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="modal fade" id="productDetailModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "600px", width: "95%" }}>
          <div className="modal-content position-relative">
   <h5
                  className="text-clip-gradient product-heading mb-2"
                >
                  About the Product
                </h5>
            {/* Product Info */}
            <div className="d-flex flex-column flex-sm-row p-3" style={{ maxHeight: "90vh", overflowY: "auto" }}>

              {/* Left: Description */}
              <div className="w-100 w-sm-70 pe-sm-3 mb-3 mb-sm-0">
             
                <p style={{ fontSize: "clamp(0.85rem, 2.5vw, 1rem)" }}>{selectedProduct?.about}</p>

                <img
                  src={selectedProduct?.image || '/FE/images/default.jpg'}
                  className="card-img-top mt-2"
                  style={{
                    height: '180px',
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

              {/* Right: Brief Info */}
              <div className="w-100 w-sm-30 border-top border-sm-start pt-3 pt-sm-0 ps-sm-3">
                <p style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)" }}>
                  <strong>Name:</strong> {selectedProduct?.title}
                </p>
                <p style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)" }}>
                  <strong>Price:</strong> ₹{selectedProduct?.price}
                </p>
                <p style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)" }}>
                  <strong>Cloth:</strong> {selectedProduct?.cloth || "N/A"}
                </p>
                <p style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)" }}>
                  <strong>Category:</strong> {selectedProduct?.category || "Traditional"}
                </p>
                <p style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)" }}>
                  <strong>Saree Type:</strong> {selectedProduct?.saree_type}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-top p-3 d-flex justify-content-center">
              <button
                className="btn btn-light d-flex align-items-center gap-2 buy-now-btn"
                onClick={() => handleBuyClick(selectedProduct)}
                style={{
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  padding: "0.4rem 1rem"
                }}
              >
                <i className="bi bi-bag-fill" style={{ fontSize: "1.4rem" }}></i> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

    </>

  );
};
