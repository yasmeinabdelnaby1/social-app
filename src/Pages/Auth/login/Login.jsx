import { Button } from "@heroui/react";
import { Input } from "@heroui/react";
import { useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {loginSchema} from '../../../schema/loginSchema'
import {sendLoginData} from '../../../services/loginService'
import { Alert } from "@heroui/react";
import { useState, useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../../../context/tokenContext"; 

export default function Login() {
  
    let [isError, setError] = useState(false);
  let [isLoading, setLoading] = useState(false);
    let navigate = useNavigate();
    
  let {setToken} = useContext(tokenContext)
  
    const { register, handleSubmit, formState: { errors , isSubmitting} } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur"
    });
  
    async function onSubmitForm(data) {
        setError(false);
        setLoading(false);
    
        try {
            let response = await sendLoginData(data);
              setLoading(true);
            // حفظ التوكن في localStorage
            localStorage.setItem('token', response.data.token);
            // تحديث التوكن في context
                      navigate('/'); // Home
            setToken(response.data.token);
         } catch(err) {
            setError(true);
           // console.error("Login error:", err);
        }
    }
    return (
        <div>
            <section className="container py-10">
                <div className="max-w-100 md:max-w-1/2 lg:max-w-1/2 mx-auto ">
                    <h1 className="text-4xl font-bold text-center text-sky-700">Login</h1>
                    <form onSubmit={handleSubmit(onSubmitForm)} className="bg-white shadow-2xl mt-3 p-12 rotate-sm flex flex-col gap-4 rounded-2xl">
                        
                        {isError && <Alert color="danger">Invalid email or password</Alert>}
                        {isLoading && <Alert color="success">Login successful! Redirecting...</Alert>}
                        
                        <Input {...register('email')} label="Email" placeholder="Enter your email" type="email" variant='bordered' color="secondary" />
                        {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}

                        <Input {...register('password')} label="Password" placeholder="Enter your Password" type="password" variant='bordered' color="secondary" />
                        {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}
                        
                        <Button isLoading={isSubmitting} type="submit" color="secondary" variant="shadow">
                            Login
                        </Button>
                        
                        <Link to={'/auth/signup'} className="text-2xl text-sky-800 text-center">
                            Don't have an account? Register Now
                        </Link>
                    </form>
                </div>
            </section>
        </div>
    );
}