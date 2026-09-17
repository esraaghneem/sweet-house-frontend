import { useEffect, useState } from 'react';
import './App.css';
import sweetHouseImage from './assets/images/sweet.jpg';
import api from './services/api';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryIcons = {
    Cakes: '🎂',
    Cupcakes: '🧁',
    Cookies: '🍪',
    Chocolate: '🍫',
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');

      setCategories(response.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');

      setProducts(response.data.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.category?.id === selectedCategory
      )
    : products;

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);

    document
      .getElementById('products')
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  };

  const handleProductsClick = () => {
    setSelectedCategory(null);

    document
      .getElementById('products')
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">Sweet House</div>

        <nav className="nav-links">
          <a href="#">Home</a>

          <a
            href="#products"
            onClick={handleProductsClick}
          >
            Products
          </a>

          <a href="#categories">Categories</a>

          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <button className="cart-button">Cart</button>
          <button className="login-button">Login</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="hero-label">
              Sweet moments, made fresh
            </span>

            <h1>
              Happiness is
              <br />
              <span>something sweet.</span>
            </h1>

            <p>
              Discover delicious desserts made with care,
              quality ingredients, and a little extra sweetness.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => {
                  setSelectedCategory(null);

                  document
                    .getElementById('products')
                    ?.scrollIntoView({
                      behavior: 'smooth',
                    });
                }}
              >
                Explore Desserts
              </button>

              <button
                className="secondary-button"
                onClick={() => {
                  document
                    .getElementById('categories')
                    ?.scrollIntoView({
                      behavior: 'smooth',
                    });
                }}
              >
                View Categories
              </button>
            </div>
          </div>

          <div className="hero-placeholder">
            <img
              src={sweetHouseImage}
              alt="Sweet House"
            />
          </div>
        </section>

        <section
          className="section"
          id="categories"
        >
          <div className="section-heading">
            <span>Discover</span>
            <h2>Our Categories</h2>
            <p>Find something sweet for every moment.</p>
          </div>

          <div className="categories-grid">
            {loadingCategories ? (
              <p>Loading categories...</p>
            ) : (
              categories.map((category) => (
                <div
                  className="category-card"
                  key={category.id}
                  onClick={() =>
                    handleCategoryClick(category.id)
                  }
                >
                  <div className="category-icon">
                    {categoryIcons[category.name] || '🍰'}
                  </div>

                  <h3>{category.name}</h3>

                  <p>
                    Discover delicious{' '}
                    {category.name.toLowerCase()}.
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        <section
          className="section featured-section"
          id="products"
        >
          <div className="section-heading">
            <span>Sweet picks</span>

            <h2>
              {selectedCategory
                ? categories.find(
                    (category) =>
                      category.id === selectedCategory
                  )?.name
                : 'Featured Desserts'}
            </h2>

            <p>
              {selectedCategory
                ? 'Delicious desserts from this category.'
                : 'Our delicious desserts.'}
            </p>
          </div>

          <div className="products-grid">
            {loadingProducts ? (
              <p>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p>No products found in this category.</p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                >
                  <div className="product-image">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                      />
                    ) : (
                      <span>Dessert</span>
                    )}
                  </div>

                  <div className="product-info">
                    <span>
                      {product.category?.name || 'Dessert'}
                    </span>

                    <h3>{product.name}</h3>

                    <strong>
                      ${Number(product.price).toFixed(2)}
                    </strong>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section
          className="about-section"
          id="about"
        >
          <div>
            <span>About Sweet House</span>
            <h2>Made with love, served with sweetness.</h2>
          </div>

          <p>
            Sweet House brings together delicious desserts and
            simple moments of happiness. Every treat is prepared
            with attention to quality, taste, and presentation.
          </p>
        </section>
      </main>

      <footer className="footer">
        <div>
          <h3>Sweet House</h3>
          <p>Making every moment a little sweeter.</p>
        </div>

        <p>© 2026 Sweet House. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
