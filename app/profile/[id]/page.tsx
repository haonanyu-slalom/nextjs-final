// Tailwind-based Developer Profile Page UI
"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { useProfiles } from "@/lib/profilesContext";
import {
  CheckCircle,
  Code,
  ExternalLink,
  Github,
  Mail,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function DeveloperProfile({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = use(paramsPromise); // 👈 unwrap the Promise
  const id = Number(params.id);
  const { profiles, loadProfiles, getProfile } = useProfiles();
  const profile = getProfile(Number(id));
  const level =
    profile!.experience <= 2
      ? "Junior"
      : profile!.experience <= 6
      ? "Mid"
      : "Senior";
  const dev = profile!; // Would fetch by ID in a real app

  const currentProject = () => {
    return (
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Current Project</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Code className="w-4 h-4 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              {dev.project?.title}
            </h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {dev.project?.description}
          </p>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={dev.avatar}
            alt={dev.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{dev.name}</h1>
            <p className="text-gray-600 text-sm">{level} Developer</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {dev.techStacks.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 text-sm text-gray-700 space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <a href={`mailto:${dev.email}`} className="hover:underline">
              {dev.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-gray-500" />
            <a
              href={dev.githubLink.toString()}
              target="_blank"
              className="hover:underline"
            >
              {dev.githubLink.toString()}
            </a>
          </div>
          <div className="flex items-center gap-2">
            {dev.availability ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Available for new projects</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-500" />
                <span>Not available</span>
              </>
            )}
          </div>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {dev.description}
          </p>
        </section>

        {!dev.availability && currentProject()}

        <div className="flex gap-4">
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Back
          </Link>

          <Link
            href={`/profile/${id}/edit`}
            className={buttonVariants({ variant: "outline" })}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
