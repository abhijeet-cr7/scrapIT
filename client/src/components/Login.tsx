import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type LoginInputs = {
    name: string;
    email: string;
    password: string;
};

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>();

    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        fetch('https://localhost/api/users', {
            method: 'POST', // Specify the request method (POST)
            headers: {
              'Content-Type': 'application/json', // Tell the server we're sending JSON data
            },
            body: JSON.stringify(data), // Convert the data to JSON format
          })
            .then(response => {
              // Check if the response is OK (status code 2xx)
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json(); // Parse the response as JSON
            })
            .then(data => {
              console.log('Success:', data); // Handle the response data here
            })
            .catch(error => {
              console.error('Error:', error); // Handle any errors
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name input */}
            <input defaultValue="John Doe" {...register("name", { required: false })} />
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
            {errors.email && <span>{errors.email.message}</span>}
            <input {...register("password", { required: true })} />
            {errors.password && <span>This field is required</span>}

            <input type="submit" />
        </form>
    );
}

export default Login;
