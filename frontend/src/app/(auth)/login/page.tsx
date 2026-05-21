"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/auth/AuthLayout";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = (data: any) => console.log(data);

  return (
    <AuthLayout title="Welcome back" subtitle="Enter your credentials to access your account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Email" {...register("email")} />
        <Input type="password" placeholder="Password" {...register("password")} />
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
