import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = ({ onRegisterSuccess, onLoginClick }) => {
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    if (form.password !== form.password_confirmation) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await register(form);

      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
    } catch (error) {
      const validationErrors = error.response?.data?.errors;

      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0]?.[0];
        setError(firstError || 'Registration failed.');
      } else {
        setError(
          error.response?.data?.message ||
            'Registration failed. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modern-page">
      <div className="auth-modern-card">
        <div className="auth-brand-side">
          <div className="auth-brand-content">
            <span className="auth-small-title">
              SWEET HOUSE
            </span>

            <h1>
              Life is better
              <br />
              <span>with something sweet.</span>
            </h1>

            <p>
              Create your account and discover desserts
              made for your sweetest moments.
            </p>

            <div className="auth-decoration">
              <span>✦</span>
              <span>♡</span>
              <span>✦</span>
            </div>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-form-header">
            <span>WELCOME</span>

            <h2>Create your account</h2>

            <p>
              Join Sweet House and make every moment a
              little sweeter.
            </p>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full name</label>

              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  minLength="8"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_confirmation">
                  Confirm password
                </label>

                <input
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >
              {loading ? (
                'Creating account...'
              ) : (
                <>
                  Create account
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-login-link">
            <span>Already have an account?</span>

            <button
              type="button"
              onClick={onLoginClick}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;