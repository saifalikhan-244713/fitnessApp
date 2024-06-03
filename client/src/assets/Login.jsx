// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { login, signup } from "../api";
// // import apple from "../assets/images/appleLogin.png";
// // import spinach from "../assets/images/spinachLogin.png";
// // import orange from "../assets/images/orangeLogin.png";
// // import beetroot from "../assets/images/beetrootLogin.png";
// // import cauliflower from "../assets/images/cauliflowerLogin.png";
// // import pumpkin from "../assets/images/pumpkinLogin.png";
// // import banana from "../assets/images/bananaLogin.png";
// // import tomato from "../assets/images/tomatoLogin.png";
// // import grapes from "../assets/images/grapesLogin.png";
// // import strawberry from "../assets/images/strawberryLogin.png";
// // import cabbage from "../assets/images/cabbageLogin.png";
// // import pineapple from "../assets/images/pineappleLogin.png";

// // import styles from "../styles/HomeStyles.module.css";

// // const Login = () => {
// //   const [formData, setFormData] = useState({ email: "", password: "" });
// //   const [isSignup, setIsSignup] = useState(false);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (isSignup) {
// //       try {
// //         const { data } = await signup(formData);
// //         console.log(data); // Handle signup success
// //         setIsSignup(false); // Switch to login form after successful signup
// //       } catch (error) {
// //         console.error(error); // Handle signup error
// //       }
// //     } else {
// //       try {
// //         const { data } = await login(formData);
// //         console.log(data);
// //         localStorage.setItem("userEmail", data.result.email);
// //         navigate("/calculator", { state: { email: data.result.email } });
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     }
// //   };

// //   return (
// //     <div className={styles.loginParent}>
// //       <div className="row">
// //         <div className={`col-lg-6 ${styles.loginLeft}`}>
// //           NutriFix
// //           <div className={styles.imageContainer}>
// //             <img src={apple} alt="Apple" className={styles.fruitImage} />
// //             <img src={orange} alt="Orange" className={styles.fruitImage} />
// //             <img src={spinach} alt="Spinach" className={styles.fruitImage} />
// //             <img src={tomato} alt="Tomato" className={styles.fruitImage} />
// //             <img src={cauliflower} alt="Cauliflower" className={styles.fruitImage} />
// //             <img src={beetroot} alt="Beetroot" className={styles.fruitImage} />
// //             <img src={pumpkin} alt="Pumpkin" className={styles.fruitImage} />
// //             <img src={banana} alt="Banana" className={styles.fruitImage} />
// //             <img src={grapes} alt="Grapes" className={styles.fruitImage} />
// //             <img src={pineapple} alt="Pineapple" className={styles.fruitImage} />
// //             <img src={strawberry} alt="Strawberry" className={styles.fruitImage} />
// //             <img src={cabbage} alt="Cabbage" className={styles.fruitImage} />
// //             <img src={orange} alt="Orange" className={styles.fruitImage} />
// //             <img src={spinach} alt="Spinach" className={styles.fruitImage} />
// //             <img src={apple} alt="Apple" className={styles.fruitImage} />
// //             <img src={pumpkin} alt="Pumpkin" className={styles.fruitImage} />
// //             <img src={grapes} alt="Grapes" className={styles.fruitImage} />
// //           </div>
// //         </div>
// //         <div className={`col-lg-6 ${styles.loginRight}`}>
// //           <form className={styles.loginForm} onSubmit={handleSubmit}>
// //             <div className={styles.loginHead}>{isSignup ? "Sign Up" : "Welcome Back! Log In"}</div>
// //             {isSignup && (
// //               <>
// //                 <input
// //                   type="text"
// //                   name="firstName"
// //                   placeholder="First Name"
// //                   onChange={handleChange}
// //                 />
// //                 <input
// //                   type="text"
// //                   name="lastName"
// //                   placeholder="Last Name"
// //                   onChange={handleChange}
// //                 />
// //               </>
// //             )}
// //             <input
// //               type="email"
// //               name="email"
// //               placeholder="Email"
// //               onChange={handleChange}
// //             />
// //             <input
// //               type="password"
// //               name="password"
// //               placeholder="Password"
// //               onChange={handleChange}
// //             />
// //             <button className={styles.loginButton} type="submit">{isSignup ? "Sign up" : "Log in"}</button>
// //           </form>
// //           <div className={styles.signupBtnBox}>
// //             {isSignup ? (
// //               <>Already a member? <button className={styles.signupLink} onClick={() => setIsSignup(false)}>Log in!</button></>
// //             ) : (
// //               <>Not a member yet? <button className={styles.signupLink} onClick={() => setIsSignup(true)}>Sign up!</button></>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login, signup } from "../api";
// import apple from "../assets/images/appleLogin.png";
// import spinach from "../assets/images/spinachLogin.png";
// import orange from "../assets/images/orangeLogin.png";
// import beetroot from "../assets/images/beetrootLogin.png";
// import cauliflower from "../assets/images/cauliflowerLogin.png";
// import pumpkin from "../assets/images/pumpkinLogin.png";
// import banana from "../assets/images/bananaLogin.png";
// import tomato from "../assets/images/tomatoLogin.png";
// import grapes from "../assets/images/grapesLogin.png";
// import strawberry from "../assets/images/strawberryLogin.png";
// import cabbage from "../assets/images/cabbageLogin.png";
// import pineapple from "../assets/images/pineappleLogin.png";

// import styles from "../styles/HomeStyles.module.css";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [isSignup, setIsSignup] = useState(false);
//   const [error, setError] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError({ email: "", password: "" }); // Reset errors
//     if (isSignup) {
//       try {
//         const { data } = await signup(formData);
//         console.log(data); // Handle signup success
//         setIsSignup(false); // Switch to login form after successful signup
//       } catch (error) {
//         console.error(error); // Handle signup error
//       }
//     } else {
//       try {
//         const { data } = await login(formData);
//         console.log(data);
//         localStorage.setItem("userEmail", data.result.email);
//         navigate("/calculator", { state: { email: data.result.email } });
//       } catch (error) {
//         console.error(error);
//         if (error.response && error.response.status === 401) {
//           setError({ ...error, password: "Wrong password" });
//         } else if (error.response && error.response.status === 404) {
//           setError({ ...error, email: "Email not found" });
//         } else {
//           setError({ ...error, password: "An error occurred" });
//         }
//       }
//     }
//   };

//   return (
//     <div className={styles.loginParent}>
//       <div className="row">
//         <div className={`col-lg-6 ${styles.loginLeft}`}>
//           NutriFix
//           <div className={styles.imageContainer}>
//             <img src={apple} alt="Apple" className={styles.fruitImage} />
//             <img src={orange} alt="Orange" className={styles.fruitImage} />
//             <img src={spinach} alt="Spinach" className={styles.fruitImage} />
//             <img src={tomato} alt="Tomato" className={styles.fruitImage} />
//             <img src={cauliflower} alt="Cauliflower" className={styles.fruitImage} />
//             <img src={beetroot} alt="Beetroot" className={styles.fruitImage} />
//             <img src={pumpkin} alt="Pumpkin" className={styles.fruitImage} />
//             <img src={banana} alt="Banana" className={styles.fruitImage} />
//             <img src={grapes} alt="Grapes" className={styles.fruitImage} />
//             <img src={pineapple} alt="Pineapple" className={styles.fruitImage} />
//             <img src={strawberry} alt="Strawberry" className={styles.fruitImage} />
//             <img src={cabbage} alt="Cabbage" className={styles.fruitImage} />
//             <img src={orange} alt="Orange" className={styles.fruitImage} />
//             <img src={spinach} alt="Spinach" className={styles.fruitImage} />
//             <img src={apple} alt="Apple" className={styles.fruitImage} />
//             <img src={pumpkin} alt="Pumpkin" className={styles.fruitImage} />
//             <img src={grapes} alt="Grapes" className={styles.fruitImage} />
//           </div>
//         </div>
//         <div className={`col-lg-6 ${styles.loginRight}`}>
//           <form className={styles.loginForm} onSubmit={handleSubmit}>
//             <div className={styles.loginHead}>{isSignup ? "Sign Up" : "Welcome Back! Log In"}</div>
//             {isSignup && (
//               <>
//                 <input
//                   type="text"
//                   name="firstName"
//                   placeholder="First Name"
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="lastName"
//                   placeholder="Last Name"
//                   onChange={handleChange}
//                 />
//               </>
//             )}
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//             />
//             {error.email && <div className={styles.error}>{error.email}</div>}
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//             />
//             {error.password && <div className={styles.error}>{error.password}</div>}
//             <button className={styles.loginButton} type="submit">{isSignup ? "Sign up" : "Log in"}</button>
//           </form>
//           <div className={styles.signupBtnBox}>
//             {isSignup ? (
//               <>Already a member? <button className={styles.signupLink} onClick={() => setIsSignup(false)}>Log in!</button></>
//             ) : (
//               <>Not a member yet? <button className={styles.signupLink} onClick={() => setIsSignup(true)}>Sign up!</button></>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../api";
import apple from "../assets/images/appleLogin.png";
import spinach from "../assets/images/spinachLogin.png";
import orange from "../assets/images/orangeLogin.png";
import beetroot from "../assets/images/beetrootLogin.png";
import cauliflower from "../assets/images/cauliflowerLogin.png";
import pumpkin from "../assets/images/pumpkinLogin.png";
import banana from "../assets/images/bananaLogin.png";
import tomato from "../assets/images/tomatoLogin.png";
import grapes from "../assets/images/grapesLogin.png";
import strawberry from "../assets/images/strawberryLogin.png";
import cabbage from "../assets/images/cabbageLogin.png";
import pineapple from "../assets/images/pineappleLogin.png";

import styles from "../styles/HomeStyles.module.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ email: "", password: "" }); // Reset errors
    if (isSignup) {
      try {
        const { data } = await signup(formData);
        console.log(data); // Handle signup success
        setIsSignup(false); // Switch to login form after successful signup
      } catch (error) {
        console.error(error); // Handle signup error
      }
    } else {
      try {
        const { data } = await login(formData);
        console.log(data);
        localStorage.setItem("userEmail", data.result.email);
        navigate("/calculator", { state: { email: data.result.email } });
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          setError({ ...error, password: "Wrong password" });
        } else if (error.response && error.response.status === 404) {
          setError({ ...error, email: "Email not found" });
        } else {
          setError({ ...error, password: "Sorry, your password is incorrect" });
        }
      }
    }
  };

  return (
    <div className={styles.loginParent}>
      <div className="row">
        <div className={`col-lg-6 ${styles.loginLeft}`}>
          NutriFix
          <div className={styles.imageContainer}>
            <img src={apple} alt="Apple" className={styles.fruitImage} />
            <img src={orange} alt="Orange" className={styles.fruitImage} />
            <img src={spinach} alt="Spinach" className={styles.fruitImage} />
            <img src={tomato} alt="Tomato" className={styles.fruitImage} />
            <img src={cauliflower} alt="Cauliflower" className={styles.fruitImage} />
            <img src={beetroot} alt="Beetroot" className={styles.fruitImage} />
            <img src={pumpkin} alt="Pumpkin" className={styles.fruitImage} />
            <img src={banana} alt="Banana" className={styles.fruitImage} />
            <img src={grapes} alt="Grapes" className={styles.fruitImage} />
            <img src={pineapple} alt="Pineapple" className={styles.fruitImage} />
            <img src={strawberry} alt="Strawberry" className={styles.fruitImage} />
            <img src={cabbage} alt="Cabbage" className={styles.fruitImage} />
            <img src={orange} alt="Orange" className={styles.fruitImage} />
            <img src={spinach} alt="Spinach" className={styles.fruitImage} />
            <img src={apple} alt="Apple" className={styles.fruitImage} />
            <img src={pumpkin} alt="Pumpkin" className={styles.fruitImage} />
            <img src={grapes} alt="Grapes" className={styles.fruitImage} />
          </div>
        </div>
        <div className={`col-lg-6 ${styles.loginRight}`}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.loginHead}>{isSignup ? "Sign Up" : "Welcome Back! Log In"}</div>
            {isSignup && (
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            {error.email && <div className={styles.errorMessage}>{error.email}</div>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {error.password && <div className={styles.errorMessage}>{error.password}</div>}
            <button className={styles.loginButton} type="submit">{isSignup ? "Sign up" : "Log in"}</button>
          </form>
          <div className={styles.signupBtnBox}>
            {isSignup ? (
              <>Already a member? <button className={styles.signupLink} onClick={() => setIsSignup(false)}>Log in!</button></>
            ) : (
              <>Not a member yet? <button className={styles.signupLink} onClick={() => setIsSignup(true)}>Sign up!</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
