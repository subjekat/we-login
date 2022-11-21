import React from "react";
import { authUser } from "../account/userAuth";
import { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeToken, storeToken } from "./userDataSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(32).required(),
});

const Login = () => {
  const token = useSelector((state: RootState) => state.userData.token);
  const dispatch = useDispatch();


  console.log("token", token);
  
  const showErrorToast = (errorMessage: string) => {
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showSuccessToast = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleLogoutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(removeToken());
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async (data: any) => {
    console.log({ data });
    try {
      const response = await authUser(data.email, data.password);
      console.log(response.data);
      if (response.data.status === true) {
        dispatch(storeToken(response.data.data));
        showSuccessToast("Login successful!");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data.status === false) {
          console.log(err.response?.data);
          showErrorToast("Login failed. Please check you email and password!");
        } else {
          showErrorToast("Login failed!");
        }
      } else {
        showErrorToast("Login failed!");
      }
    }
    reset();
  };
  return (
    <div>
      {token && token.length > 0 ? (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h3 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                You have successfully logged in!
              </h3>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogoutSubmit}>
              <div>                
                <button 
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                    type="submit">
                    Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   We mission login
                </h1>
                <form className="mt-6" onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.email && "Email is required or wrong format for email address!"}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />      
                        {errors.password && "Min 4 characters!"}
                        <br />
                    </div>
                    <div className="mt-6">
                        <button 
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                            type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
