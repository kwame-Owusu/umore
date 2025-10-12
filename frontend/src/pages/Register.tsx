import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { authAPI } from "../lib/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { isAxiosError } from "axios";
import {
  validateEmail,
  validatePassword,
  getPasswordStrength,
  type GetPasswordStrength,
} from "../lib/validation";
import logo from "../assets/umore_logo.svg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<GetPasswordStrength>(
    { level: "", color: "" }
  );

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    const passwordError = validatePassword(password, true);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await authAPI.register(email, password, username);

      const loginResponse = await authAPI.login(email, password);
      const { token, user } = loginResponse.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(
          err.response?.data?.error || "Login failed. Please check credentials."
        );
        if (err.response?.status === 409) {
          setError(err.response?.data?.error || "User already exists");
        }
      } else if (err instanceof Error) {
        setError(err.message || "Login failed. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="size-12">
              <img src={logo} alt="logo" />
            </div>
          </div>

          <CardTitle className="text-4xl text-brown-80">
            Create Account.
          </CardTitle>
          <CardDescription className="text-lg">
            Join us and start tracking your mood journey today.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-base">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordStrength(getPasswordStrength(e.target.value));
                  }}
                  placeholder="••••••••••••"
                  required
                  minLength={6}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {password && (
                <p className={`text-sm ${passwordStrength.color}`}>
                  Password strength: {passwordStrength.level}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-base">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-base text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-secondary font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
