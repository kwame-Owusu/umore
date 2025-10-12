export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+(?:\.[^\s@]+)*$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

export const validatePassword = (password: string, isRegister: boolean = false): string | null => {
  if (!password) return "Password is required";

  if (!isRegister) return null; // For login, just check not empty

  // Basic validation for register - allow submission but warn
  if (password.length < 6) return "Password must be at least 6 characters long";

  return null;
};

export const getPasswordStrength = (password: string): GetPasswordStrength => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;

  if (score <= 2) return { level: "Weak", color: "text-red-500" };
  if (score <= 3) return { level: "Medium", color: "text-yellow-500" };
  return { level: "Strong", color: "text-green-500" };
};

export interface GetPasswordStrength {
  level: string
  color: string
}