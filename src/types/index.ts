import { z } from "zod"
let imageValidator;

if (typeof window === "undefined") {
  imageValidator = z.null();
} else {
  imageValidator = z
    .instanceof(File)
    .refine((file) => file?.type === "image/png" || file?.type === "image/jpeg", {
      message: "Image file must be a png or jpg",
    });
}


export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }).max(20),
});

export const signUpFormSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/i, { message: "Invalid date string! Must be in YYYY-MM-DD format" }),
  phoneNumber: z.string().min(1, { message: "Phone Number is required" }),
  password: z
    .string()
    .min(8, { message: "Confirm Password must be at least 8 characters long" })
    .max(10, { message: "Confirm Password must be at most 10 characters long" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number.",
    })
    .refine(
      (password) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password),
      {
        message: "Password must contain at least one special character.",
      }
    ),
  confirmPassword: z
    .string()
    .min(8, { message: "Confirm Password is required" })
    .max(20),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const productFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z
    .string()
    .regex(/^\d+$/, { message: "Price must be a positive integer" }),
  quantityAvailable: z
    .string()
    .regex(/^\d+$/, { message: "Quantity must be a positive integer" }),
  image: imageValidator,
});
