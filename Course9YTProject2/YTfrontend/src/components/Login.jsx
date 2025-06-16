import axios from "axios";
import { useState } from "react";

function Login(props) {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [avatar, setAvatar] = useState("");


 function handleusername(e){
  setuserName(e.target.value);
 }

 function handleemail(e){
  setEmail(e.target.value);
 }

 function handlepassword(e){
  setPassword(e.target.value);
 }

   function handleimage(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
      setAvatar(reader.result);
    }
     
  }




  async function handleRegister() {

    const response = fetch("http://localhost:8050/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
        userName,
        email,
        password
      })
    })
    const result = response.then( (data)=> data.json() )
    result.then((data)=>{
        console.log(data, "data")
      alert("Registered succesfully");
      setAvatar("");
      setuserName("")
      setPassword("")
      setEmail("")
      props.onClose();
    })
    
  }

  function handleLogin() {
    const response = fetch("http://localhost:8050/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const result = response.then( (data)=> data.json() )
    result.then((data)=>{
        alert(data.message);
        localStorage.setItem("userid",data.user._id);
        localStorage.setItem("username",data.user.username);
        localStorage.setItem("useravatar", data.user.avatar);
        localStorage.setItem("token" , data.AccessToken);
        setuserName("");
        setPassword("");
        setEmail("");
        props.onClose();

    })

  }

  return (
    <div
      
      className={`fixed flex top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        props.isVisible ? "" : "hidden"
      }`}
    >
      <div className="relative w-full max-w-md max-h-full h-screen items-center justify-center mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            data-testid="login-modal"
            
            onClick={props.onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-2 lg:px-8">
            <h3 className="mb-2 border-b border-gray-400 text-center text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <form className="space-y-6" action="#">
              {!isSignUp && (
                <div>

                  <div className="mt-4">
                    <label className="block mb-1 text-white text-sm">Upload Avatar</label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleimage}
                      className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded mb-2"
                    />

                  </div>



                  <label
                    htmlFor="username"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={userName}
                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter your name"
                    onChange={handleusername}
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name12@company.com"
                  required
                  onChange={handleemail}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  onChange={handlepassword}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Lost Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={
                  !isSignUp ? (e) => handleRegister(e) : (e) => handleLogin(e)
                }
              >
                {!isSignUp ? "Register" : "Login to your account"}
              </button>
              {isSignUp ?
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <a
                  href="#"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                  onClick={() => setIsSignUp(false)}
                >
                  Create account
                </a>
              </div>
              :
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Have registered?{" "}
                <a
                  href="#"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                  onClick={() => setIsSignUp(true)}
                >
                  Login account
                </a>
              </div>
            }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;