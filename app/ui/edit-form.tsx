"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useProfiles } from "@/lib/profilesContext";
import { notFound, redirect, useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  avatar: z.string(),
  email: z.string().email(),
  description: z.string().min(10),
  techStacks: z.string(), // comma separated input
  experience: z.number().min(0),
  availability: z.boolean(),
  githubLink: z.string().url(),
  projectTitle: z.string().optional(),
  projectDescription: z.string().optional(),
});

export default function ProfileForm({ id }: { id: string }) {
  const router = useRouter();
  const { getProfile, editProfile, deleteProfile } = useProfiles();
  const profile = getProfile(Number(id));
  if (!profile) {
    notFound();
  }

  function handleDeleteProfile(): void {
    deleteProfile(Number(id));
    router.push("/");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.name,
      avatar: profile.avatar,
      email: profile.email,
      description: profile.description,
      techStacks: profile.techStacks.join(","),
      experience: profile.experience,
      availability: profile.availability,
      githubLink: profile.githubLink.toString(),
      projectTitle: profile.project?.title,
      projectDescription: profile.project?.description,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const profile = {
      ...values,
      techStacks: values.techStacks.split(",").map((s) => s.trim()),
      project:
        values.projectTitle && values.projectDescription
          ? {
              title: values.projectTitle,
              description: values.projectDescription,
            }
          : null,
    };
    editProfile(Number(id), profile);
    redirect("/profile/" + id);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/avatar.jpg"
                  {...field}
                />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="techStacks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stacks</FormLabel>
              <FormControl>
                <Input placeholder="React, Node.js, TailwindCSS" {...field} />
              </FormControl>
              <FormDescription>
                Enter comma-separated tech stacks
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.valueAsNumber;
                    field.onChange(isNaN(value) ? "0" : Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="!m-0">Available for projects</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Link</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/yourname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Project Section */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold mb-2">Current Project</h3>
          <FormField
            control={form.control}
            name="projectTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="Awesome Project" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the project..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Save</Button>
          <Link
            href={"/profile/" + id}
            className={buttonVariants({ variant: "outline" })}
          >
            Back
          </Link>

          <Button
            variant="destructive"
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to delete this profile?"
              );
              if (confirmed) {
                handleDeleteProfile();
              }
            }}
          >
            Delete
          </Button>
        </div>
      </form>
    </Form>
  );
}
