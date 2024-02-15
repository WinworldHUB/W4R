import PageLayout from "../lib/components/page-layout";
import { useState } from "react";
import { PageRoutes } from "../lib/constants";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleSignIn = () => {
    // Email validation
    if (!email.trim() || !email.includes("@")) {
      setEmailError("Invalid email address");
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
      return;
    }

    // If validations pass, proceed with sign in
    // For demonstration, let's assume sign-in is successful and navigate to the dashboard
    navigate(PageRoutes.Home);
  };

  return (
    <PageLayout>
      <div className="main-content mt-0">
        <section className="min-vh-100 mb-8">
          <div
            className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
            style={{
              backgroundImage: "url('/assets/img/curved-images/img-6.jpg')",
            }}
          >
            <span className="mask bg-gradient-dark opacity-6"></span>
          </div>
          <div className="container">
            <div className="row mt-lg-n10 mt-md-n11 mt-n10">
              <div className="col-xl-6 col-lg-7 col-md-9 mx-auto">
                <div className="card card-bg card-shadow border-0">
                  <div className="card-body">
                    <form role="form text-left">
                      <div className="mb-4">
                        <input
                          type="email"
                          className={`form-control ${emailError ? 'is-invalid' : ''}`}
                          placeholder="Email"
                          aria-label="Email"
                          aria-describedby="email-addon"
                          value={email}
                          onChange={handleEmailChange}
                        />
                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="password-addon"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn bg-gradient-dark w-100 my-4 mb-2"
                          onClick={handleSignIn}
                        >
                          Sign up
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default SignIn;
