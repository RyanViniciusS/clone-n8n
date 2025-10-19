"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"; // ✅ Certifique-se de importar
import { cn } from "@/lib/utils";
import Link from "next/link"; // ✅ Correção aqui
import { authClient } from "@/lib/auth-client";

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
    try {
      await authClient.signIn.email(
        {
          email: values.email, // ✅ pegar do form
          password: values.password, // ✅ pegar do form
          callbackURL: "/", // redireciona para home
        },
        {
          onSuccess: () => {
            router.push("/"); // redireciona
          },
          onError: (ctx) => {
            console.error("Better Auth error context:", ctx);
            toast.error(ctx.error?.message || "Failed to login");
          },
        }
      );
    } catch (error) {
      console.error("Login error:", error); // mostra detalhes completos do erro
      toast.error("Failed to login");
    }
  };

  const isPending = form.formState.isSubmitting;

  return (
    <Card className="flex flex-col gap-6 max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Login to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className=" grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant={"outline"} className="w-full" type="button" disabled={isPending}>
                  Continue with GitHub
                </Button>
                <Button variant={"outline"} className="w-full" type="button" disabled={isPending}>
                  Continue with Google
                </Button>
              </div>
              <div className="grid  gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="m@example.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="****" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <Button type="submit" className="w-full " disabled={isPending}>
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;'t have an acoont?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Signup
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
