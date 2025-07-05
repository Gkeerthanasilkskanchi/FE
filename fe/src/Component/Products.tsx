import { useEffect, useState } from "react";
import { addCartProducts, addLikedProducts, addOrderService, getCategory, getProductByCategory, getProducts } from "../API/API";
import { toast } from "react-toastify";
import { Loader } from "./Loader";


export const Products = () => {
    const [products, setProducts] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [isCategorySelected,setIsCategorySelected] = useState(false);
    const [category,setCategory] = useState<any>([]);

    useEffect(() => {
        fetchProducts();
    }, [selectedProduct]);
    const email = sessionStorage.getItem("userEmail");
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
            toast.error(err.response?.data?.message);
        } finally {
            setLoading(false);
            fetchProducts();
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
            fetchProducts(); // or fetchProducts()
        }
    };

     const fetchProducts = async () => {
        try {
            setLoading(true);
            const response: any = await getCategory();
            console.log(response,"response")
            if (Array.isArray(response?.data?.data)) {
                setCategory(response.data?.data);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    // const fetchProducts = async () => {
    //     try {
    //         setLoading(true);
    //         const response: any = await getProducts(email);
    //         if (Array.isArray(response.data)) {
    //             setProducts(response.data);
    //         }
    //     } catch (error) {
    //         console.error("Failed to fetch products:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleBuyClick = async (product: any) => {
        try {
            const email = sessionStorage.getItem("userEmail");
            if (!email) { toast.error("Login to buy a product", { autoClose: 1000 }); }
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

    const categorySelected = async(product :any)=>{
        setLoading(true);
        const response = await getProductByCategory(product?.category,email);
        if(response?.data){
            setIsCategorySelected(true);
            setProducts(response?.data?.data);
        }
        setLoading(false);
    }

    const handleImageClick = (product: any) => {
        setSelectedProduct(product);
        // setSelectedImages(product);
        setShowModal(true);
    };


    return (
        <>
            <Loader loading={loading}></Loader>
            {!isCategorySelected && <div className="container my-5">
            <h3
              className="text-center mb-4 fw-bold text-para"
              style={{
                marginTop: "70px",
                fontSize: "clamp(1.2rem, 4vw, 2rem)" 
              }}
            >
             Product Categories
            </h3>
            <div className="row g-3">
             {category?.map((item:any, idx:any) => (
                <div className="col-lg-3 col-sm-2 d-flex " key={idx}>
                  <div className="card promise-item p-3 rounded-4 border-0 neon-hover w-100" style={{ maxWidth: "200px" }}>
                    {/* <h4 className="fw-bold text-primary">{item?.image}</h4> */}
                    <img
                                        src={item?.image || '/FE/images/default.jpg'}
                                        className="card-img-top"
                                        onClick={() => categorySelected(item)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#productDetailModal"
                                        style={{
                                            height: '150px',
                                            width: '100%',
                                            objectFit: 'fill',
                                            objectPosition: 'center',
                                            backgroundColor: '#f8f8f8',
                                            cursor: 'pointer',

                                        }}

                                        alt={item?.category}


                                    />
                    <h3 className="fw-bold text-primary mt-3" onClick={()=> categorySelected(item)}>{item?.category}</h3>
                  </div>
                </div>
              ))}
            </div>



          </div>}
            {isCategorySelected && <div className="container">
                {/* Header & Filter */}
                <div className="d-flex justify-content-between align-items-center">
                    <div className="w-100">
                        <h4 className="text-center fw-boldj text-clip-gradient">Our Collections</h4>
                    </div>

                </div>

                {/* Product Grid */}
                <div
                    className="mt-4 h-100"
                    style={{ width: "100%" }}
                >
                    <div className="row g-4">
                        {products?.map((product: any) => (
                            <div
                                key={product.id}
                                className="col-12 col-sm-6 col-lg-4"

                            >
                                <div className="card h-100 shadow-sm border-0" >
                                    <img
                                        src={product?.image || '/FE/images/default.jpg'}
                                        className="card-img-top"
                                        onClick={() => handleImageClick(product)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#productDetailModal"
                                        style={{
                                            height: '300px',
                                            width: '100%',
                                            objectFit: 'fill',
                                            objectPosition: 'center',
                                            backgroundColor: '#f8f8f8',
                                            cursor: 'pointer',

                                        }}

                                        alt={product.title}


                                    />

                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span
                                                className="fw-bold text-truncate"
                                                style={{ cursor: "pointer", textDecoration: "underline", maxWidth: "70%", color: "#270206" }}
                                                onClick={() => handleImageClick(product)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#productDetailModal"
                                                title={product.title}

                                            >
                                                {product?.title}
                                            </span>

                                            <span className="fw-bold">
                                                ₹{product?.price}
                                            </span>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center gap-2 mt-auto ps-4 pe-4">
                                            <button
                                                className="d-flex align-items-center justify-content-center gap-1 text-white fw-semibold"
                                                style={{
                                                    backgroundColor: '#ff69b4',
                                                    border: 'none',
                                                    borderRadius: '30px',
                                                    padding: '6px 16px',
                                                    fontSize: 'clamp(10px, 1vw, 14px)',
                                                    width: '80px', // Adjust width as needed
                                                    height: "40px",
                                                    whiteSpace: 'nowrap', // Prevent line break
                                                }}
                                                title="Buy Now"
                                                onClick={() => handleBuyClick(product)}
                                            >
                                                <i
                                                    className="bi bi-bag"
                                                    style={{
                                                        fontSize: 'clamp(12px, 1.5vw, 16px)',
                                                        marginTop: "15px"

                                                    }}
                                                ></i>
                                                <span>Buy Now</span>
                                            </button>





                                            <button style={{ outline: 'none', border: 'none', borderRadius: '5px', background: 'none' }} title="Add to Cart" onClick={() => addToCart(product.id)}>
                                                {product?.is_product_in_cart ? <i className="bi bi-cart-plus" style={{ fontSize: "30px" }}></i>
                                                    : <i className="bi bi-cart" style={{ fontSize: "30px" }}></i>}

                                            </button>
                                            <button style={{ outline: 'none', border: 'none', borderRadius: '5px', background: 'none' }} className="primary" title="Like Product" onClick={() => likeProduct(product.id)}>
                                                {!(product?.is_product_liked) ? <i className="bi bi-suit-heart heart-style " style={{ fontSize: '30px' }}></i>
                                                    : <i className="bi bi-heart-fill heart-style " style={{ fontSize: '30px' }}></i>}

                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedProduct && (
                    <div
                        className="modal fade"
                        id="productDetailModal"
                        tabIndex={-1}
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "550px", width: "92%" }}>
                            <div
                                className="modal-content position-relative"
                                style={{
                                    borderRadius: "5px",
                                    boxShadow: "0 6px 12px rgba(0,0,0,0.12)",
                                }}
                            >
                                {/* ❌ Close Icon */}
                                <i
                                    className="bi bi-x"
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
                                    onMouseOver={(e) => (e.currentTarget.style.border = "2px solid black")}
                                    onMouseOut={(e) => (e.currentTarget.style.border = "none")}
                                />

                                {/* 🟣 Title */}
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

                                {/* 🔵 Two Column Layout – FORCED SIDE-BY-SIDE */}
                                <div
                                    className="d-flex flex-row px-3 pb-3"
                                    style={{
                                        flexWrap: "nowrap", // 🚨 prevent stacking
                                        maxHeight: "80vh",
                                        overflowY: "auto",
                                        backgroundColor: "#fff",
                                        gap: "12px",
                                    }}
                                >
                                    {/* Left Side – Image + About */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <img
                                            src={selectedProduct.image || "/FE/images/default.jpg"}
                                            className="img-fluid rounded"
                                            alt={selectedProduct.title}
                                            style={{
                                                height: "130px",
                                                width: "100%",
                                                objectFit: "contain",
                                                backgroundColor: "#f0f0f0",
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
                                                lineHeight: "1.4",
                                                textAlign: "justify",
                                                marginTop: "0.8rem",
                                                marginLeft:"43%",                                              overflowWrap: "break-word",
                                            }}
                                        >
                                            {selectedProduct.about}
                                        </p>
                                    </div>

                                    {/* Right Side – Details */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
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
                                                    fontSize: "clamp(0.7rem, 1.4vw, 0.85rem)",
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
                                <div className="border-top p-2 d-flex justify-content-center">
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
                                            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                                            boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                                            transition: "transform 0.2s ease-in-out",
                                        }}
                                        onClick={() => handleBuyClick(selectedProduct)}
                                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    >
                                        <i
                                            className="bi bi-bag-fill me-2"
                                            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)" }}
                                        ></i>
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}









            </div>}
        </>

    );
};
