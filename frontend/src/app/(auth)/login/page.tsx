"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/auth/AuthLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { loginSchema, LoginSchema } from "@/lib/validations";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  
  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await api.post("/auth/login", data);
      login(response.data.user);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      // You should add proper toast notification here
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Enter your credentials to access your account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input placeholder="Email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Input type="password" placeholder="Password" {...register("password")} />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <Button className="w-full">Sign In</Button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary font-medium">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}
