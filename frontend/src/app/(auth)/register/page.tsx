"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/auth/AuthLayout";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = (data: any) => console.log(data);

  return (
    <AuthLayout title="Create an account" subtitle="Get started with CVInsight AI today">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Name" {...register("name")} />
        <Input placeholder="Email" {...register("email")} />
        <Input type="password" placeholder="Password" {...register("password")} />
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
