import { z } from "zod";

// Common validation patterns
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .toLowerCase()
  .trim();

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(100, "Password must be less than 100 characters");

// Strong password validation (for signup)
export const strongPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be less than 100 characters")
  .regex(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
  .regex(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
  .regex(/^(?=.*\d)/, "Password must contain at least one number")
  .regex(/^(?=.*[@$!%*?&])/, "Password must contain at least one special character (@$!%*?&)");

export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(50, "Name must be less than 50 characters")
  .trim();

// Auth schemas
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema, // Using regular password for better UX, change to strongPasswordSchema for stronger validation
  name: nameSchema.optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password must be less than 100 characters"),
});

// Trip schemas
export const createTripSchema = z.object({
  destination: z
    .string()
    .min(1, "Destination is required")
    .max(100, "Destination must be less than 100 characters")
    .trim(),
  startDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid start date"),
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid end date"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .trim()
    .optional(),
});

export const createActivitySchema = z.object({
  day: z
    .number()
    .int()
    .min(1, "Day must be at least 1")
    .max(365, "Day must be less than 365"),
  time: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"),
  description: z
    .string()
    .min(1, "Activity description is required")
    .max(200, "Activity description must be less than 200 characters")
    .trim(),
  location: z
    .string()
    .max(100, "Location must be less than 100 characters")
    .trim()
    .optional(),
});

// Helper function to format validation errors
export function formatValidationError(error: z.ZodError) {
  const errors = error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message
  }));
  
  return {
    error: "Validation failed",
    details: errors,
    message: errors[0]?.message || "Invalid input data"
  };
}

// Types derived from schemas
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateTripInput = z.infer<typeof createTripSchema>;
export type CreateActivityInput = z.infer<typeof createActivitySchema>;