export const requiredRule = (v) => !!v || "Required"


export const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "Email must be valid",
];

export const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 6 || "Password must be at least 6 characters",
];

export const nameRules = [
  (v) => !!v || "Name is required",
  (v) => v.length >= 2 || "Name must be at least 2 characters",
];

export const confirmPasswordRules = (password) => [
  (v) => !!v || "Confirm Password is required",
  (v) => v === password || "Passwords do not match",
];


export const createBlogFormRules = [
  (v) => !!v || "Required",
  (v) => (v && v.length > 6) || "Content must be more than 6 characters"

]

export const validContent = (v) => (v && v.length > 6) || "Content must be more than 6 characters"
