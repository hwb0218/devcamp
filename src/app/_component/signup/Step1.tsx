import React from "react";
import { UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Schema } from "@/schema/signup";

interface Props {
  form: UseFormReturn<Schema>;
}

export default function Step1({ form }: Props) {
  return (
    <>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>이름</FormLabel>
            <FormControl>
              <Input placeholder="홍길동" {...field} className="w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>연락처</FormLabel>
            <FormControl>
              <Input placeholder="01000000000" {...field} className="w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>역할</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="역할을 선택해주세요" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="admin">관리자</SelectItem>
                <SelectItem value="user">일반 사용자</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
