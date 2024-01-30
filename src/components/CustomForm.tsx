"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// shadcn ui imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { prisma } from "@/prisma/client";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
});

async function main() {
  const user = await fetch("http://localhost:3000/api/posts", {
    method: "POST",
  });
  console.log(user);
}

export default function CustomForm() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const data = await fetch("http://localhost:3000/api/posts");
    const users = await data.json();
    setUsers(users);
    console.log(users);
  }

  useEffect(() => {
    // main()
    getUsers();
  }, []);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const user = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify(values),
    });
    console.log(user);
    // setUsers((prevUsers) => [...prevUsers, user.json()]);
    if (user) {
      getUsers();
    }
  }
  const handleDelete = async (id: string) => {
    const user = await fetch("http://localhost:3000/api/posts", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    console.log(user);
    // setUsers((prevUsers) => [...prevUsers, user.json()]);
    if (user) {
      getUsers();
    }
  };
  return (
    <>
      <div className="grid grid-cols-3">
        {users.map((user: any) => (
          <ul key={user.email} className="border rounded p-4 mb-4">
            <li className="font-bold">{user.name}</li>
            <li className="text-gray-600">{user.email}</li>
            <button
              className="border-gray-700 border  bottom-4 rounded-lg px-4 py-2"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </ul>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
