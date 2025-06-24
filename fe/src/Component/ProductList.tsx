import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addCartProducts, addLikedProducts, addOrderService, getCartProducts, getLikedProducts } from "../API/API";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import { useNavigate } from "react-router-dom";
const currentHash = window.location.hash.toLowerCase();
const isLikePage = currentHash.endsWith("/products/liked");
const isCartPage = currentHash.endsWith("/products/cart");


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
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false);


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
          setSelectedProducts(res.data);
          setSelectAll(true);
        }
      }
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

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

  const toggleSelectProduct = (product: any) => {
    const exists = selectedProducts.find(p => p.id === product.id);
    if (exists) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(items);
    }
    setSelectAll(!selectAll);
  };

  const getTotal = () =>
    selectedProducts.reduce((sum, item: any) => sum + (item?.price || 0) * (item.quantity || 1), 0);

  const handleBulkBuy = async () => {
    if (!email) {
      toast.error("Login to buy products", { autoClose: 1000 });
      return;
    }

    for (const product of selectedProducts) {
      const payload = {
        email,
        id: product.id,
        quantity: product.quantity || 1,
        price: product?.price,
      };
      await addOrderService(payload);
    }



    const message = encodeURIComponent(
      selectedProducts.map(p =>
        `🧵 *${p.name || p?.title}*\n💰 Price: ₹${p.price}\n📦 Quantity: ${p.quantity || 1}`
      ).join("\n\n") + "\n\nPlease provide further details."
    );
    const whatsappNumber = "917904999697";
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };


  return (
    <>
      <Loader loading={loading}></Loader>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h4 className="mb-2">{type === "liked" ? "Liked Products" : "Your Cart"}</h4>
          {type !== "liked" && (
            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="selectAll"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
              <label className="form-check-label" htmlFor="selectAll">
                Select All
              </label>
            </div>
          )}
        </div>
        <div className="row">
          {items.length === 0 ? (
            <div className="col-12 d-flex flex-column align-items-center justify-content-center text-center py-5">
              <img
                src={
                  isLikePage
                    ? "https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                    : isCartPage
                      ? "https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                      : "https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                }
                alt="No items"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  opacity: 0.8,
                }}
                className="mb-3"
              />
              <h5 className="fw-bold mb-2">
                {isLikePage
                  ? "No items yet"
                  : isCartPage
                    ? "No items yet"
                    : "No Items Found"}
              </h5>
              <p className="text-muted mb-3">
                {isLikePage
                  ? "Start exploring and find something you love!"
                  : isCartPage
                    ? "Start exploring and find something you love!"
                    : "Start exploring and find something you love!"}
              </p>
              <button
                className={`btn ${isLikePage ? "btn-outline-danger" : "btn-outline-primary"
                  }`}
                onClick={() => navigate("/")}
              >
                <i className="bi bi-arrow-left me-2"></i> Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item: any) => (
              <div key={item.id} className="col-md-3 mb-4">
                <div className="card h-100 position-relative">
                  <div className="position-absolute m-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts.some((p) => p.id === item.id)}
                      onChange={() => toggleSelectProduct(item)}
                    />
                  </div>

                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.title || "Product Image"}
                    onClick={() => handleImageClick(item)}
                    data-bs-toggle="modal"
                    data-bs-target="#productDetailModal"
                  />

                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className="fw-bold text-truncate"
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          maxWidth: "70%",
                          color: "#270206",
                        }}
                        onClick={() => handleImageClick(item)}
                        data-bs-toggle="modal"
                        data-bs-target="#productDetailModal"
                        title={item.title}
                      >
                        {item?.title || "Untitled Product"}
                      </span>

                      <span className="fw-bold">₹{item?.price || "0.00"}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center gap-2 mt-auto ps-4 pe-4">
                      <button
                        style={{
                          outline: "none",
                          border: "none",
                          borderRadius: "5px",
                          background: "none",
                        }}
                        className="primary"
                        title="Buy Now"
                        onClick={() => handleBuyClick(item)}
                      >
                        <i className="bi bi-bag" style={{ fontSize: "30px" }}></i>
                      </button>

                      <button
                        style={{
                          outline: "none",
                          border: "none",
                          borderRadius: "5px",
                          background: "none",
                        }}
                        className="primary"
                        title="Add to Cart"
                        onClick={() => addToCart(item.id)}
                      >
                        {item?.is_product_in_cart ? (
                          <i
                            className="bi bi-cart-plus cart-style"
                            style={{ fontSize: "30px" }}
                          ></i>
                        ) : (
                          <i
                            className="bi bi-cart"
                            style={{ fontSize: "30px" }}
                          ></i>
                        )}
                      </button>

                      <button
                        style={{
                          outline: "none",
                          border: "none",
                          borderRadius: "5px",
                          background: "none",
                        }}
                        className="primary"
                        title="Like Product"
                        onClick={() => likeProduct(item.id)}
                      >
                        {item?.is_product_liked ? (
                          <i
                            className="bi bi-heart-fill heart-style"
                            style={{ fontSize: "30px" }}
                          ></i>
                        ) : (
                          <i
                            className="bi bi-suit-heart heart-style"
                            style={{ fontSize: "30px" }}
                          ></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>



      </div>

      {selectedProduct && (
        <div
          className="modal fade"
          id="productDetailModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "600px", width: "95%" }}
          >
            <div
              className="modal-content position-relative"
              style={{
                borderRadius: "5px",
                boxShadow: "0 6px 12px rgba(0,0,0,0.12)",
              }}
            >
              {/* ❌ Close Icon */}
             <i
  className="bi bi-x close-icon"
  title="Close"
  data-bs-dismiss="modal"
  style={{
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "1.3rem",
    color: "#333",
    cursor: "pointer",
    borderRadius: "10px",
    padding: "4px",
    transition: "border 0.2s ease",
  }}
/>


              {/* 🟣 Heading */}
              <h5
                className="text-center"
                style={{
                  fontWeight: "700",
                  fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
                  margin: "16px 0 30px 0",
                  color: "#6C5CE7",
                  textTransform: "uppercase",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                }}
              >
                About the Product
              </h5>

              {/* Main Info */}
              <div
                className="d-flex flex-row px-3 pb-3"
                style={{
                  flexWrap: "nowrap",
                  maxHeight: "80vh",
                  overflowY: "auto",
                  gap: "12px",
                }}
              >
                {/* Left - Image & About */}
                <div style={{ flex: 1, minWidth: 0 }}>


                  <img
                    src={selectedProduct.image || "/FE/images/default.jpg"}
                    className="img-fluid rounded"
                    alt={selectedProduct.title}
                    style={{
                      height: "150px",
                      width: "100%",
                      objectFit: "contain",
                      backgroundColor: "#f8f8f8",
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#imageModal"
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <p
                    style={{
                      fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)",
                      color: "#000",
                      lineHeight: "1.5",
                      textAlign: "justify",
                      marginBottom: "0.6rem",
                      marginTop: "10px",
                      marginLeft: "43%",
                      overflowWrap: "break-word",

                    }}
                  >
                    {selectedProduct.about}
                  </p>
                </div>

                {/* Right - Details */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    borderTop: "1px solid #ddd",
                    paddingTop: "1rem",
                    paddingLeft: "1rem",
                  }}
                >
                  {[
                    { label: "Name", value: selectedProduct.title },
                    { label: "Price", value: `₹${selectedProduct.price}` },
                    { label: "Cloth", value: selectedProduct.cloth || "N/A" },
                    { label: "Category", value: selectedProduct.category || "Traditional" },
                    { label: "Saree Type", value: selectedProduct.saree_type },
                  ].map((item, i) => (
                    <p
                      key={i}
                      style={{
                        fontSize: "clamp(0.75rem, 1.4vw, 0.85rem)",
                        marginBottom: "0.4rem",
                        color: "#2c3e50",
                        overflowWrap: "break-word",
                      }}
                    >
                      <strong>{item.label}:</strong> {item.value}
                    </p>
                  ))}
                </div>
              </div>

              {/* 🔘 Buy Button */}
              <div className="border-top p-3 d-flex justify-content-center">
                <button
                  className="btn d-flex align-items-center gap-2"
                  style={{
                    outline: "none",
                    border: "none",
                    borderRadius: "6px",
                    background: "linear-gradient(to right, #fd79a8, #e84393)",
                    padding: "8px 16px",
                    color: "#fff",
                    fontFamily: "'Segoe UI', sans-serif",
                    fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                    transition: "transform 0.2s ease-in-out",
                  }}
                  onClick={() => handleBuyClick(selectedProduct)}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <i className="bi bi-bag-fill" style={{ fontSize: "1.2rem" }}></i>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {type !== "liked" && items.length > 0 && (
        <div
          className="fixed-bottom d-flex justify-content-end align-items-center p-3 gap-3"
          style={{ zIndex: 10000 }}
        >
          {/* Total Price */}
          <div className="fw-semibold text-end" style={{ minWidth: "fit-content" }}>
            Total: ₹{getTotal().toLocaleString()}
          </div>

          {/* Buy Now Button */}
          <button
            className="btn d-flex align-items-center"
            style={{
              outline: "none",
              border: "none",
              borderRadius: "6px",
              background: "linear-gradient(to right, #fd79a8, #e84393)",
              padding: "8px 16px",
              color: "#fff",
              fontFamily: "'Segoe UI', sans-serif",
              fontSize: "clamp(0.8rem, 2vw, 1rem)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
              transition: "transform 0.2s ease-in-out"
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            disabled={selectedProducts.length === 0}
            onClick={handleBulkBuy}
          >
            <i className="bi bi-bag-fill me-2" style={{ fontSize: "clamp(1rem, 1.7vw, 1.2rem)" }}></i>
            Buy Now
          </button>
        </div>
      )}

    </>

  );
};
