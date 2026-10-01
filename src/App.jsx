import { useEffect, useState } from 'react';
import './App.css';
import api from './services/api';
import { createOrder } from './services/orderService';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import sweetImage from './assets/images/pexels-vi-t-anh-nguy-n-2150409023-39240989.jpg';
import { useCart } from './context/CartContext.jsx';
import { useMemo } from 'react';
const SPARKLE_COUNT = 30;

const Sparkles = () => {
  const sparkles = useMemo(
    () =>
      Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 6 + Math.random() * 12,
        delay: -Math.random() * 12,
        duration: 8 + Math.random() * 8,
        drift: (Math.random() - 0.5) * 120,
        twinkle: 1.2 + Math.random() * 1.6,
        dot: false,
      })),
    []
  );

  return (
    <div className="sugar-sprinkles" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className={`sparkle ${s.dot ? 'dot' : ''}`}
          style={{
            '--x': `${s.x}%`,
            '--size': `${s.size}px`,
            '--delay': `${s.delay}s`,
            '--duration': `${s.duration}s`,
            '--drift': `${s.drift}px`,
            '--twinkle': `${s.twinkle}s`,
          }}
        />
      ))}
    </div>
  );
};
const App = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [authPage, setAuthPage] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [orderLoading, setOrderLoading] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');
  const [orderError, setOrderError] = useState('');

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
      setCartOpen(false);
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

  // عند الضغط على Products في الناف بار: تصفير الفلتر + عرض كل المنتجات
  const handleProductsNavClick = () => {
    setSelectedCategory(null);
    setMenuOpen(false);

    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 50);
  };

  // عند الضغط على Home: تصفير الفلتر أيضاً
  const handleHomeNavClick = () => {
    setSelectedCategory(null);
    setMenuOpen(false);

    setTimeout(() => {
      document.getElementById('home')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 50);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(
      Number(selectedCategory) === Number(categoryId)
        ? null
        : categoryId
    );

    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 50);
  };

  const handleAddToCart = (product) => {
    addToCart(product);

    setOrderMessage('');
    setOrderError('');
  };

  const handleOpenCart = () => {
    setMenuOpen(false);
    setOrderMessage('');
    setOrderError('');
    setCartOpen(true);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  const handlePlaceOrder = async () => {
    setOrderMessage('');
    setOrderError('');

    if (!isAuthenticated) {
      setCartOpen(false);
      setAuthPage('login');
      return;
    }

    if (cartItems.length === 0) {
      setOrderError('Your cart is empty.');
      return;
    }

    setOrderLoading(true);

    try {
      const items = cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      const response = await createOrder(items);

      setOrderMessage(
        response.message || 'Order created successfully.'
      );

      setProducts((currentProducts) =>
        currentProducts.map((product) => {
          const orderedItem = cartItems.find(
            (item) => item.id === product.id
          );

          if (!orderedItem) {
            return product;
          }

          return {
            ...product,
            stock: Math.max(
              0,
              Number(product.stock) - orderedItem.quantity
            ),
          };
        })
      );

      clearCart();
    } catch (error) {
      console.error('Order creation failed:', error);

      const backendMessage =
        error.response?.data?.message;

      const validationErrors =
        error.response?.data?.errors;

      if (validationErrors?.items?.length) {
        setOrderError(validationErrors.items[0]);
      } else {
        setOrderError(
          backendMessage ||
            'Failed to place the order. Please try again.'
        );
      }
    } finally {
      setOrderLoading(false);
    }
  };

const getProductCategoryId = (product) =>
  Number(product.category_id ?? product.category?.id);

const filteredProducts = selectedCategory
  ? products.filter(
      (product) =>
        getProductCategoryId(product) === Number(selectedCategory)
    )
  : products;

const getCategoryName = (categoryId) => {
  const category = categories.find(
    (item) => Number(item.id) === Number(categoryId)
  );

  return category?.name || 'Sweet House';
};

  const getCategoryIcon = (index) => {
    const icons = [
      '🍰',
      '🍫',
      '🍪',
      '🧁',
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
      <div className="auth-page-wrapper">
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
    <>
<Sparkles />

  <div className="app">
        <nav className="navbar">
        <button
          className="logo"
          onClick={handleHomeNavClick}
          type="button"
        >
          Sweet House
        </button>

        <div className="nav-links">
          <button
            type="button"
            onClick={handleHomeNavClick}
          >
            Home
          </button>

          <button
            type="button"
            onClick={handleProductsNavClick}
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
                    onClick={handleOpenCart}
                  >
                    <span>🛍</span>
                    Cart

                    {cartCount > 0 && (
                      <span className="cart-count">
                        {cartCount}
                      </span>
                    )}
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

      {cartOpen && (
        <>
          <div
            className="cart-drawer-overlay"
            onClick={handleCloseCart}
          ></div>

          <aside className="cart-drawer">
            <div className="cart-drawer-header">
              <div>
                <span className="cart-drawer-label">
                  YOUR ORDER
                </span>

                <h2>Your Cart</h2>
              </div>

              <button
                className="cart-close-button"
                type="button"
                onClick={handleCloseCart}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-drawer-empty">
                <div className="cart-empty-icon">🛍</div>

                <h3>Your cart is empty</h3>

                <p>
                  Add some delicious desserts and they
                  will appear here.
                </p>

                <button
                  className="primary-button"
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    scrollToSection('products');
                  }}
                >
                  Explore Desserts
                </button>
              </div>
            ) : (
              <>
                <div className="cart-drawer-items">
                  {cartItems.map((item) => {
                    const imageUrl = getImageUrl(
                      item.image
                    );

                    return (
                      <div
                        className="cart-drawer-item"
                        key={item.id}
                      >
                        <div className="cart-drawer-item-image">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={item.name}
                            />
                          ) : (
                            <span>Sweet House</span>
                          )}
                        </div>

                        <div className="cart-drawer-item-content">
                          <div className="cart-drawer-item-top">
                            <div>
                              <span className="cart-item-category">
                                {getCategoryName(
                                  item.category_id
                                )}
                              </span>

                              <h3>{item.name}</h3>
                            </div>

                            <button
                              className="cart-remove-button"
                              type="button"
                              onClick={() =>
                                removeFromCart(item.id)
                              }
                              aria-label={`Remove ${item.name}`}
                            >
                              ×
                            </button>
                          </div>

                          <div className="cart-drawer-item-bottom">
                            <strong>
                              $
                              {Number(item.price).toFixed(
                                2
                              )}
                            </strong>

                            <div className="cart-quantity-controls">
                              <button
                                type="button"
                                onClick={() =>
                                  decreaseQuantity(item.id)
                                }
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>

                              <span>{item.quantity}</span>

                              <button
                                type="button"
                                onClick={() =>
                                  increaseQuantity(item.id)
                                }
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <span className="cart-drawer-subtotal">
                              $
                              {(
                                Number(item.price) *
                                item.quantity
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="cart-drawer-footer">
                  <div className="cart-drawer-summary">
                    <div>
                      <span>Items</span>
                      <strong>{cartCount}</strong>
                    </div>

                    <div className="cart-drawer-total">
                      <span>Total</span>
                      <strong>
                        ${cartTotal.toFixed(2)}
                      </strong>
                    </div>
                  </div>

                  {orderMessage && (
                    <div className="order-success">
                      {orderMessage}
                    </div>
                  )}

                  {orderError && (
                    <div className="order-error">
                      {orderError}
                    </div>
                  )}

                  <button
                    className="place-order-button"
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={orderLoading}
                  >
                    {orderLoading
                      ? 'Placing Order...'
                      : 'Place Order'}
                  </button>

                  <button
                    className="clear-cart-button"
                    type="button"
                    onClick={() => {
                      clearCart();
                      setOrderMessage('');
                      setOrderError('');
                    }}
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </aside>
        </>
      )}

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
              onClick={handleProductsNavClick}
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
Number(selectedCategory) === Number(category.id)
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

                    <button
                      className="add-to-cart-button"
                      type="button"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      disabled={Number(product.stock) <= 0}
                    >
                      {Number(product.stock) <= 0
                        ? 'Out of Stock'
                        : 'Add to Cart'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

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
    </>
  );
};

export default App;