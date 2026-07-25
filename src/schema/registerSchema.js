import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().nonempty("Name is Required").min(3, "Name must be at least 3 charcters").max(10, "Name must be 10 charcters"),
    email: z.string().nonempty("Email is required").email("Enter avalid Email"),
    password: z
        .string()
        .nonempty("Password is required")
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
            "Enter a valid Password"
        ), rePassword: z.string().nonempty("Confirm Password is required"),
    dateOfBirth: z.string().nonempty("Date of Birth is required").refine((date) => {
        //selsct age
        let currentYear = new Date().getFullYear();
        let selectedYear = new Date(date).getFullYear();
        let age = currentYear - selectedYear;
        return age >= 18;
    }, "Age not Allowed less than 18 years old"),

    gender: z.enum(["male", "female"], "choose male or female")

}).refine((data) => data.password === data.rePassword, {
    message: "Password not matched",
    path: ["rePassword"]
})














