import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from "axios";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

type LoginInputs = {
    name? : string;
    email: string;
    password: string;
};


const Auth = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>();
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
      if(isLogin){
        axios.post('http://localhost:5000/api/login', data, {withCredentials : true})
        .then((res) => {
          if(res.status === 200){
            navigate("/editor");
          }
        })
        .catch((err) => {
          console.error(`This is the error here in this call ${err}`)
        });
      }else{
        axios.post('http://localhost:5000/api/users', data, {withCredentials : true})
        .then((res) => {
          console.log(res, "response coming");
        })
        .catch((err) => {
          console.error(`This is the error here in this call ${err}`)
        });
      }
    };

    return (
      <>
        {isLogin ? "Login" : "Signup"}
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name input */}
            {!isLogin && <input placeholder="John Doe" {...register("name", { required: false })} />}
            <br/>
            {errors.name && <span>This field is required</span>}
            <input 
                {...register("email", {
                    required: "Email is required", // Custom error message
                    pattern: {
                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, // Email regex pattern
                        message: "Please enter a valid email", // Custom error message for invalid email
                    }
                })} 
            />
            <br/>
            {errors.email && <span>{errors.email.message}</span>}
            <input {...register("password", { required: true })} />
            {errors.password && <span>This field is required</span>}

            <input type="submit" />
        </form>
        <div style={{width : "fitContent"}} className="signUpText" onClick={() => {setIsLogin(false)}}>Not a User, Sign up today</div>
        <div style={{width : "fitContent"}} className="loginText" onClick={() => setIsLogin(true)}>Already a User, Please login</div>
      </>  
    );
}

export default Auth;
