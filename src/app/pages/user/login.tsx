"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { authClient } from "@/lib/auth-client";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSignUp = () => {
    startTransition(() => {
      authClient.signUp.email(
        {
          email,
          name,
          password,
        },
        {
          onError: (ctx) => {
            console.log("error", ctx.error);
            setResult(`Error: ${ctx.error.message}`);
          },
          onRequest: () => setResult("Signing up..."),
          onSuccess: () => {
            setResult("Signup successful!");
            window.location.href = "/protected";
          },
        },
      );
    });
  };

  const handleLogin = () => {
    startTransition(() => {
      authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onError: (ctx) => setResult(`Error: ${ctx.error.message}`),
          onRequest: () => setResult("Logging in..."),
          onSuccess: () => {
            setResult("Login successful!");
            window.location.href = "/protected"; // redirect to protected page
          },
        },
      );
    });
  };

  return (
    <>
      <TextField
        onChange={setName}
        placeholder="Name (for sign-up)"
        type="text"
        value={name}
      />
      <TextField
        onChange={setEmail}
        placeholder="Email"
        type="email"
        value={email}
      />
      <TextField
        onChange={setPassword}
        placeholder="Password"
        type="password"
        value={password}
      />

      <Button isDisabled={isPending} onClick={handleLogin}>
        {isPending ? "Logging in..." : "Log In"}
      </Button>
      <Button isDisabled={isPending} onClick={handleSignUp}>
        {isPending ? "Signing up..." : "Sign Up"}
      </Button>

      {result && <div>{result}</div>}
    </>
  );
}
