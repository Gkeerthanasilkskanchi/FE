
const filterCategories = [
    {
        title: "By Fabric",
        options: [
            "Silk Sarees",
            "Cotton Sarees",
            "Chiffon/Georgette Sarees",
            "Linen Sarees",
            "Crepe & Satin Sarees",
        ],
    },
    {
        title: "By Region / Tradition",
        options: [
            "Kanchipuram (Tamil Nadu)",
            "Banarasi (Uttar Pradesh)",
            "Paithani (Maharashtra)",
            "Bandhani (Rajasthan/Gujarat)",
            "Patola (Gujarat)",
            "Sambalpuri (Odisha)",
            "Chikankari Sarees (Lucknow)",
            "Assam Silk (Muga)",
            "Kasavu (Kerala)",
        ],
    },
    {
        title: "By Style",
        options: [
            "Lehenga Saree",
            "Half-and-Half Saree",
            "Ready-to-Wear Saree",
        ],
    },
];

const products = [
    { id: 1, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 2, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 3, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 4, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 5, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 6, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 7, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 8, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 9, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 10, title: 'Card title', imgSrc: '/images/saree.jfif' },
];

export const Products = () => {
    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mt-4">
                <h4>Our Collections</h4>

                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Filter Collections
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end nested-dropdown">
                        {filterCategories.map((category, idx) => (
                            <li className="dropdown-submenu" key={idx}>
                                <a className="dropdown-item dropdown-toggle" href="#">
                                    {category.title}
                                </a>
                                <ul className="dropdown-menu">
                                    {category.options.map((option, optIdx) => (
                                        <li key={optIdx}>
                                            <span className="dropdown-item-text">{option}</span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div
                className="mt-4 overflow-auto"
                style={{ height: "calc(100vh - 80px)",width:"100%" }}
            >
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card">
                                <img src={product.imgSrc} className="card-img-top" style={{ height: '200px' }} alt="saree" />
                                <div className="card-body">
                                    <a><span className="card-title">{product.title}</span></a>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <a className="btn btn-primary">Buy Now</a>
                                        </div>
                                        <div>
                                            <a className="btn btn-secondary">
                                                <i className="bi bi-cart-plus"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};
