"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/auth/AuthLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema, RegisterSchema } from "@/lib/validations";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  
  const onSubmit = async (data: RegisterSchema) => {
    try {
      const response = await api.post("/auth/register", data);
      login(response.data.user);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
      // You should add proper toast notification here
    }
  };

  return (
    <AuthLayout title="Create an account" subtitle="Get started with CVInsight AI today">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input placeholder="Name" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Input placeholder="Email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Input type="password" placeholder="Password" {...register("password")} />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <Button className="w-full">Sign Up</Button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-medium">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
