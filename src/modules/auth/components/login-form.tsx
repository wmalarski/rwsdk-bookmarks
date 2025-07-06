"use client";

import { useForm } from "@tanstack/react-form";
import { type ComponentProps, useState } from "react";
import * as v from "valibot";

import { Button } from "@/components/button";
import { Form, FormFooter, FormTitle } from "@/components/form";
import { Link } from "@/components/link";
import { TextField } from "@/components/text-field";
import { formatValidationErrors } from "@/lib/formatters";
import { link } from "@/lib/links";

import { authClient } from "../auth-client";

export const LoginForm = () => {
  const [result, setResult] = useState("");

  const formValidation = v.object({
    email: v.pipe(v.string(), v.email()),
    password: v.pipe(v.string(), v.nonEmpty()),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      authClient.signIn.email(value, {
        onError: (ctx) => setResult(`Error: ${ctx.error.message}`),
        onRequest: () => setResult("Logging in..."),
        onSuccess: () => {
          setResult("Login successful!");
          window.location.href = "/protected";
        },
      });
    },
    validators: {
      onChange: formValidation,
    },
  });

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit();
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormTitle>Login</FormTitle>
      <form.Field name="email">
        {(field) => (
          <TextField
            errorMessage={formatValidationErrors(field.state.meta.errors)}
            id={field.name}
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            placeholder="Email"
            type="email"
            value={field.state.value}
          />
        )}
      </form.Field>
      <form.Field name="password">
        {(field) => (
          <TextField
            errorMessage={formatValidationErrors(field.state.meta.errors)}
            id={field.name}
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            placeholder="Password"
            type="password"
            value={field.state.value}
          />
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button isDisabled={!canSubmit} type="submit">
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        )}
      </form.Subscribe>

      <FormFooter>
        <Link className="text-sm" href={link("/user/signup")}>
          Sign Up
        </Link>
      </FormFooter>

      {result && <div>{result}</div>}
    </Form>
  );
};
