"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
const formSchema = z.object({
  username: z.string().min(2).max(50),
  awsAccountID: z.string().min(12).max(12), // AWS account IDs are typically 12 digits
  accessKeyID: z.string().min(16).max(128), // Access key IDs are alphanumeric and vary in length
  secretAccessKey: z.string().min(40), // Secret access keys are typically at least 40 characters long
  iamUserName: z.string().optional(), // Optional IAM username
  iamUserPassword: z.string().min(8).optional(), // Optional and should be at least 8 characters
  iamRole: z.string().optional(), // Optional IAM role name
  sshKey: z.string().optional(), // Optional SSH key for EC2 instances
  sslCertificate: z.string().optional(), // Optional SSL/TLS certificate
  // Additional specific service credentials can be added as needed
});
const Page = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-xl mx-auto my-auto mt-10"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
          name="awsAccountID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AWS Account ID</FormLabel>
              <FormControl>
                <Input placeholder="123456789012" {...field} />
              </FormControl>
              <FormDescription>Your 12-digit AWS account ID.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accessKeyID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Access Key ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Your AWS access key ID.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secretAccessKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret Access Key</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>Your AWS secret access key.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="iamUserName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IAM User Name</FormLabel>
              <FormControl>
                <Input placeholder="IAM User" {...field} />
              </FormControl>
              <FormDescription>
                The name of your IAM user, if applicable.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="iamUserPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IAM User Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Password for your IAM user, if applicable.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="iamRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IAM Role</FormLabel>
              <FormControl>
                <Input placeholder="IAM Role Name" {...field} />
              </FormControl>
              <FormDescription>
                The name of the IAM role, if used.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sshKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SSH Key</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Your SSH key for EC2 instances or other services.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sslCertificate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SSL/TLS Certificate</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Your SSL/TLS certificate for secure connections.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Page;
