"use client";

// Tailwind-based Developer Directory Homepage UI (Grid View with AI Integration + Large Input Textarea)

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const developers = [
  {
    id: 1,
    name: "Jane Doe",
    avatar: "/avatar1.png",
    techStacks: ["React", "Node.js"],
    level: "Senior",
    bio: "Frontend engineer with 6 years of experience",
  },
  {
    id: 2,
    name: "John Smith",
    avatar: "/avatar2.png",
    techStacks: ["Python", "Django", "AI"],
    level: "Mid",
    bio: "Backend and AI enthusiast",
  },
];

export default function DeveloperDirectory() {
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [requirementText, setRequirementText] = useState("");

  const filteredDevs = developers.filter((dev) => {
    return (
      dev.name.toLowerCase().includes(search.toLowerCase()) &&
      (!selectedTech || dev.techStacks.includes(selectedTech))
    );
  });

  const handleAIRecommendation = async () => {
    setLoadingAI(true);
    // Simulate async AI call using requirementText
    setTimeout(() => {
      console.log("User requirement:", requirementText);
      setRecommended([developers[0]]);
      setLoadingAI(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Dev Directory</h1>
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <textarea
            placeholder="Describe your developer needs..."
            value={requirementText}
            onChange={(e) => setRequirementText(e.target.value)}
            className="w-full sm:w-[40rem] h-24 p-2 border border-gray-300 rounded-lg shadow-sm"
          />
          <Button
            onClick={handleAIRecommendation}
            disabled={loadingAI}
            className="self-start"
          >
            {loadingAI ? "Recommending..." : "Recommend Developers"}
          </Button>
        </div>
        {recommended.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Recommended Developers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommended.map((dev) => (
                <Card
                  key={dev.id}
                  className="rounded-2xl shadow-md border-blue-500 border"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={dev.avatar}
                        alt={dev.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="text-lg font-semibold">{dev.name}</h2>
                        <p className="text-sm text-gray-600">
                          {dev.level} Developer
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{dev.bio}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {dev.techStacks.map((tech: string) => (
                        <span
                          key={tech}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Link
                        href="profile/1"
                        className={buttonVariants({ variant: "outline" })}
                      >
                        View Profile
                      </Link>
                      <Button>Add to List</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search developers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>

      <div className="mb-4 flex gap-2 flex-wrap">
        {["React", "Node.js", "Python", "Django", "AI"].map((tech) => (
          <Button
            key={tech}
            variant={selectedTech === tech ? "default" : "outline"}
            onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
          >
            {tech}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredDevs.map((dev) => (
          <Card key={dev.id} className="rounded-2xl shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={dev.avatar}
                  alt={dev.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{dev.name}</h2>
                  <p className="text-sm text-gray-600">{dev.level} Developer</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-700">{dev.bio}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {dev.techStacks.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <Link
                  href="profile/1"
                  className={buttonVariants({ variant: "outline" })}
                >
                  View Profile
                </Link>
                <Button>Add to List</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
