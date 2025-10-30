import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import workTime from '../assets/WorkTime.png'
import Google from '../assets/GOOG.png'
import eye from '../assets/show_password.png'
import eyeHide from '../assets/eye-hide.png'
import './Jsignup.css'

export const Jsignup = () => {
  const [passwordShow, setPasswordShow] = useState(true)

  const togglePasswordView = () => {
    setPasswordShow((prev) => !prev)
  }

  const initialValues = { username: "", email: "", password: "", phone: "" }
  const [formValues, setFormValues] = useState(initialValues)

  const [errors, setErrors] = useState({})

  const handleForm = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
    setErrors({ ...errors, [name]: "" })
  }

  const validateForm = () => {
    const newErrors = {}

    const regexOfMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!formValues.username.trim()) {
      newErrors.username = "Username is required"
    }

    if (!formValues.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!regexOfMail.test(formValues.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formValues.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(formData) {
    if (!validateForm()) {
      return false // stops form submit if errors
    }
    console.log("Signed up successfully") // This Code is removed after backend integration
  }

  return (
    <div className="j-sign-up-page">
      <header className="j-sign-up-header">
        <Link to="/Job-portal" className="logo">
          <span className="logo-text">job portal</span>
        </Link>
        <div className="j-sign-up-header-links">
          <span className='no-account'>Already have an account?</span>
          <Link to="/Job-portal/jobseeker/login" className="signup-btn">Login</Link>
          <div className="separator"></div>
          <Link to='/Job-portal/employer/login' className="employer-redirect-link">Employers Login</Link>
        </div>
      </header>

      <div className="j-sign-up-body">
        <div className="signup-illustration">
          <img src={workTime} alt="Signup Illustration" />
        </div>

        <form action={handleSubmit} className="j-sign-up-form">
          <h2>Create an Account</h2>

          <label>User name</label>
          <input type="text" name="username" value={formValues.username} onChange={handleForm} placeholder="Enter your name" className={errors.username ? "input-error" : ""} />
          {errors.username && <span className="error-msg">{errors.username}</span>}

          <label>Email ID</label>
          <input type="text" name="email" value={formValues.email} onChange={handleForm} placeholder="Enter your Email ID" className={errors.email ? "input-error" : ""} />
          {errors.email && <span className="error-msg">{errors.email}</span>}

          <label>Password</label>
          <div className="password-wrapper">
            <input type={passwordShow ? "password" : "text"} name="password" value={formValues.password} onChange={handleForm} placeholder="Create a new password" className={errors.password ? "input-error" : ""} />
            <span className="eye-icon" onClick={togglePasswordView}><img src={passwordShow ? eye : eyeHide} className='show-icon' alt='show' /></span>
          </div>
          {errors.password && <span className="error-msg">{errors.password}</span>}

          <label>Mobile number (optional)</label>
          <input type="tel" name="phone" value={formValues.phone} onChange={handleForm} placeholder="Enter your mobile number" />

          <button className="j-sign-up-submit">Signup</button>

          <div className="divider">Or Continue with</div>

          <button className="google-btn">
            <img
              src={Google}
              alt="Google"
            />
            Google
          </button>
        </form>
      </div>
    </div>
  );
}
