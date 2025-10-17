// app/components/LoginForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValue = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValue) => {
    console.log(values);
    toast.success("Logged in!"); // apenas exemplo
  };

  const isPending = form.formState.isSubmitting;

  return (
    <Card className="flex flex-col gap-6 max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Login to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input placeholder="Email" {...form.register("email")} />
          <Input placeholder="Password" type="password" {...form.register("password")} />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
