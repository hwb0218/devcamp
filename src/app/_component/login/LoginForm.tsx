"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Schema, schema } from "@/schema/login";
import ActionButtons from "./ActionButtons";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const form = useForm<Schema>({
    mode: "onSubmit",
    resolver: zodResolver(schema)
  });

  const onSubmit = (values: Schema) => {
    alert(JSON.stringify(values, null, 4));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-3 overflow-x-hidden *:mx-1">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="hello@sparta-devcamp.com" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ActionButtons />
      </form>
    </Form>
  );
}
