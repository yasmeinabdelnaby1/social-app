import { Button } from "@heroui/react";
import { Input } from "@heroui/react";
import { RadioGroup, Radio } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from "../../../schema/registerSchema";
import { sendRegisterData } from "../../../services/registerService";
import { Alert } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Register() {


  let [isError, setError] = useState(false);
  let [isLoading, setLoading] = useState(false);
  let navigate = useNavigate ();

  const { register, control, handleSubmit, formState: { errors , isSubmitting} } = useForm({

    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "onBlur"
  });

 

async function onSubmitForm(data) {
    setLoading(false)
    setError(false)
    console.log("submitted data" ,data);
    try {
      let response = await sendRegisterData(data)
      setLoading(true)
setTimeout(() =>{
       navigate('/auth/login')

}, 1500)
    } catch(err) {
      setError(true)
        //  console.log (response)

    }

  }
  return (
    <>
    
      <section className="container py-10">
        <div className="max-w-100 md:max-w-1/2 lg:max-w-1/2 mx-auto ">
          <h1 className="text-4xl font-bold text-center text-sky-700">Register</h1>
          <form onSubmit={handleSubmit(onSubmitForm)} className=" bg-white shadow-2xl mt-3 p-12 rotate-sm flex flex-col gap-4 rounded-2xl">
            
          {isError && <Alert color="danger">Enter a valid data</Alert>}
          {isLoading && <Alert color="success">Success</Alert>}
            <Input  {...register('name')} label="Name" placeholder="Enter your Name" type="text" variant='bordered' color="secondary" />
            {errors.name && (<p className="text-red-500">{errors.name.message}</p>)}
            <Input  {...register('email')} label="Email" placeholder="Enter your email" type="email" variant='bordered' color="secondary" />
            {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}

            <Input  {...register('password')} label="Password" placeholder="Enter your Password" type="password" variant='bordered' color="secondary" />
            {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}

            <Input {...register('rePassword')} label="Confirm Password" placeholder="ConfirmPassword" type="password" variant='bordered' color="secondary" />
            {errors.rePassword && (<p className="text-red-500">{errors.rePassword.message}</p>)}

            <Input  {...register('dateOfBirth')} label="Date Of Birth" placeholder="Enter your date of birth" type="date" variant='bordered' color="secondary" />
            {errors.dateOfBirth && (<p className="text-red-500">{errors.dateOfBirth.message}</p>)}

            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} label="gender">
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </RadioGroup>
              )
              } />

            {errors.gender && (<p className="text-red-500">{errors.gender.message}</p>)}
            <Button isLoading={isSubmitting} type="submit" color="secondary" variant="shadow" >
              Register
            </Button>
             <Link to={'/auth/login'} className=" text-2xl text-sky-700 text-center">Already have account ? Login Now</Link>
          </form>
        </div>
      </section>


    </>
  )
}