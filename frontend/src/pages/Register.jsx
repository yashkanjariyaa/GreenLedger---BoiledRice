import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate for redirection

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9f29nQHK-XJifHGXKZnaN_EhS2lHOkbA",
  authDomain: "aceofhacks-c3cc1.firebaseapp.com",
  projectId: "aceofhacks-c3cc1",
  storageBucket: "aceofhacks-c3cc1.appspot.com",
  messagingSenderId: "852739775747",
  appId: "1:852739775747:web:f30589fefd4aeea72e1d36",
  measurementId: "G-YXR4Y2EJVR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function for redirection

  // Inside your handleRegister function
  const handleRegister = async () => {
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Register user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Log user details
      console.log("Registered user:", {
        email: user.email,
        dob: dob,
        firstName: firstName,
        lastName: lastName,
        // Add more details as needed
      });

      // Save user data to backend
      await axios.post("http://localhost:3000/api/auth/register", {
        email,
        password,
        firstName,
        lastName,
        dob,
      });

      // Now you can redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    setError(null);

    try {
      // Send login data to backend
      await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      //   console.log(response)

      // If login is successful on the backend
      if (response.status === 200) {
        navigate("/dashboard"); // Redirect to dashboard on successful login
      } else {
        setError("Login failed"); // Display error message if login fails
      }
    } catch (error) {
      setError("Login failed"); // Display error message if login fails
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log(user);
      navigate("/dashboard"); // Redirect to dashboard on successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookRegister = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log(user);
      navigate("/dashboard"); // Redirect to dashboard on successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">Register</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            inputMode="numeric" // Disable spinner controls
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Register
        </button>
        <p className="text-sm mt-2">
          Already have an account?{" "}
          <button className="text-blue-500">
            <Link to="/login">Login here</Link>
          </button>
        </p>
        <button
          onClick={handleGoogleRegister}
          className="w-full bg-red-500 text-white py-2 rounded-md mt-2"
        >
          Register with Google
        </button>
        <button
          onClick={handleFacebookRegister}
          className="w-full bg-blue-700 text-white py-2 rounded-md mt-2"
        >
          Register with Facebook
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
