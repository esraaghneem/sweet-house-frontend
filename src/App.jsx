import { useEffect, useState } from 'react';
import './App.css';
import api from './services/api';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import sweetImage from './assets/images/pexels-vi-t-anh-nguy-n-2150409023-39240989.jpg';

const App = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [authPage, setAuthPage] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('sweet-house-theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );

    localStorage.setItem(
      'sweet-house-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((currentMode) => !currentMode);
    setMenuOpen(false);
  };

  const scrollToSection = (id) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(
      selectedCategory === categoryId ? null : categoryId
    );

    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 50);
  };

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.category_id === selectedCategory
      )
    : products;

  const getCategoryName = (categoryId) => {
    const category = categories.find(
      (item) => item.id === categoryId
    );

    return category?.name || 'Sweet House';
  };

  const getCategoryIcon = (index) => {
    const icons = [
      '🍰',
      '🧁',
      '🍪',
      '🍫',
      '🍓',
      '🍩',
      '🥐',
      '🍮',
    ];

    return icons[index % icons.length];
  };

  const getImageUrl = (image) => {
    if (!image) {
      return null;
    }

    if (image.startsWith('http')) {
      return image;
    }

    return `http://127.0.0.1:8000/storage/${image}`;
  };

  if (authPage) {
    return (
      <div className="auth-wrapper">
        <button
          className="back-home-button"
          onClick={() => setAuthPage(null)}
          type="button"
        >
          ← Back to Sweet House
        </button>

        {authPage === 'login' ? (
          <Login
            onLoginSuccess={() => {
              setAuthPage(null);
            }}
          />
        ) : (
          <Register
            onRegisterSuccess={() => {
              setAuthPage(null);
            }}
            onLoginClick={() => {
              setAuthPage('login');
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="app">
      {/* ==================== NAVBAR ==================== */}

      <nav className="navbar">
        <button
          className="logo"
          onClick={() => scrollToSection('home')}
          type="button"
        >
          Sweet House
        </button>

        <div className="nav-links">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('products')}
          >
            Products
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('categories')}
          >
            Categories
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('about')}
          >
            About
          </button>
        </div>

        <div className="nav-actions">
          {isAuthenticated && (
            <span className="welcome-user">
              Hi, {user?.name}
            </span>
          )}

          <div className="nav-menu-wrapper">
            <button
              className={`menu-button ${
                menuOpen ? 'active' : ''
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              type="button"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {menuOpen && (
              <>
                <div
                  className="menu-overlay"
                  onClick={() => setMenuOpen(false)}
                ></div>

                <div className="nav-dropdown">
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      scrollToSection('products')
                    }
                  >
                    <span>🛍</span>
                    Cart
                  </button>

                  {isAuthenticated ? (
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={handleLogout}
                    >
                      <span>↪</span>
                      Logout
                    </button>
                  ) : (
                    <>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          setAuthPage('login');
                        }}
                      >
                        <span>→</span>
                        Login
                      </button>

                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          setAuthPage('register');
                        }}
                      >
                        <span>＋</span>
                        Register
                      </button>
                    </>
                  )}

                  <div className="dropdown-divider"></div>

                  <button
                    className="dropdown-item theme-item"
                    type="button"
                    onClick={toggleDarkMode}
                  >
                    <span>{darkMode ? '☀' : '☾'}</span>
                    {darkMode
                      ? 'Light mode'
                      : 'Dark mode'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}

      <section className="hero" id="home">
        <div className="hero-background">
          <img
            src={sweetImage}
            alt="Sweet House desserts"
          />
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-label">SWEET HOUSE</span>

          <h1>
            Sweet moments,
            <br />
            <span>made fresh.</span>
          </h1>

          <p>
            Happiness is something sweet. Discover carefully
            made desserts created to make every moment a
            little more special.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              type="button"
              onClick={() =>
                scrollToSection('products')
              }
            >
              Explore Desserts
            </button>

            <button
              className="secondary-button"
              type="button"
              onClick={() =>
                scrollToSection('categories')
              }
            >
              View Categories
            </button>
          </div>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}

      <section className="section" id="categories">
        <div className="section-heading">
          <span>DISCOVER</span>

          <h2>Our Categories</h2>

          <p>
            Find something delicious for every sweet moment.
          </p>
        </div>

        {loadingCategories ? (
          <div className="loading-message">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="empty-message">
            No categories available.
          </div>
        ) : (
          <div className="categories-grid">
            {categories.map((category, index) => (
              <button
                className={`category-card ${
                  selectedCategory === category.id
                    ? 'selected'
                    : ''
                }`}
                key={category.id}
                type="button"
                onClick={() =>
                  handleCategoryClick(category.id)
                }
              >
                <div className="category-icon">
                  {getCategoryIcon(index)}
                </div>

                <h3>{category.name}</h3>

                <p>
                  Discover our delicious{' '}
                  {category.name} collection.
                </p>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ==================== PRODUCTS ==================== */}

      <section
        className="section featured-section"
        id="products"
      >
        <div className="section-heading">
          <span>OUR MENU</span>

          <h2>
            {selectedCategory
              ? getCategoryName(selectedCategory)
              : 'Sweet Selection'}
          </h2>

          <p>
            Freshly made desserts, ready to make your day
            sweeter.
          </p>

          {selectedCategory && (
            <button
              className="clear-filter-button"
              type="button"
              onClick={() =>
                setSelectedCategory(null)
              }
            >
              Show all products
            </button>
          )}
        </div>

        {loadingProducts ? (
          <div className="loading-message">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-message">
            No products available.
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const imageUrl = getImageUrl(
                product.image
              );

              return (
                <article
                  className="product-card"
                  key={product.id}
                >
                  <div className="product-image">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                      />
                    ) : (
                      <span>Sweet House</span>
                    )}
                  </div>

                  <div className="product-info">
                    <span>
                      {getCategoryName(
                        product.category_id
                      )}
                    </span>

                    <h3>{product.name}</h3>

                    {product.description && (
                      <p>{product.description}</p>
                    )}

                    <strong>
                      $
                      {Number(product.price).toFixed(
                        2
                      )}
                    </strong>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ==================== ABOUT ==================== */}

      <section
        className="about-section"
        id="about"
      >
        <div>
          <span>ABOUT SWEET HOUSE</span>

          <h2>
            Made with care,
            <br />
            served with love.
          </h2>
        </div>

        <div>
          <p>
            Sweet House is a place for people who believe
            that small sweet moments can make a big
            difference. We bring together carefully
            selected desserts in a warm and welcoming
            experience.
          </p>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}

      <footer className="footer">
        <div>
          <h3>Sweet House</h3>

          <p>
            Happiness is something sweet.
          </p>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>

          <a href="mailto:hello@sweethouse.com">
            hello@sweethouse.com
          </a>

          <a href="tel:+963000000000">
            <span className="phone-icon">☎</span>
            +963 000 000 000
          </a>
        </div>

        <div className="footer-copy">
          <p>
            © {new Date().getFullYear()} Sweet House.
            <br />
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
