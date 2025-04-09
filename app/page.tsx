"use client";
// Tailwind-based Developer Directory Homepage UI (Grid View with AI Integration + Large Input Textarea)

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Profile } from "@/profile-data";
import MultiSelectDropdown from "@/components/ui/multiselect";
import TeamDialog from "@/components/ui/team-dialog";
import { useProfiles } from "@/lib/profilesContext";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

export default function DeveloperDirectory() {
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedExp, setSelectedExp] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [requirementText, setRequirementText] = useState("");
  
  const router = useRouter();
  const { profiles, createProfile, loadProfiles, getProfile } = useProfiles();
  const [members, setMembers] = useState<Profile[]>([]);

  const filteredDevs = profiles.filter((dev) => {
    const nameFiltered = dev.name.toLowerCase().includes(search.toLowerCase());
    const techFiltered =
      selectedTech.length === 0 ||
      selectedTech.some((tech) => dev.techStacks.includes(tech));
    const expFiltered =
      selectedExp.length === 0 ||
      selectedExp.some((exp) =>
        exp === "Junior"
          ? dev.experience <= 2
          : exp === "Mid"
          ? dev.experience <= 6
          : dev.experience > 6
      );
    const avFiltered =
      selectedAvailability.length === 0 ||
      selectedAvailability.some((av) =>
        av === "Available" ? dev.availability : !dev.availability
      );
    return nameFiltered && techFiltered && expFiltered && avFiltered;
  });

  function handleCreateProfile() {
    const id = createProfile();
    router.push("/profile/" + id + "/edit");
  }

  const handleAIRecommendation = async () => {
    setLoadingAI(true);
    // Simulate async AI call using requirementText
    setTimeout(() => {
      console.log("User requirement:", requirementText);
      setRecommended([profiles[0]]);
      setLoadingAI(false);
    }, 1000);
  };

  const toggleMember = (dev: Profile) => {
    if (isMember(dev.id)) {
      setMembers(members.filter(mem => mem.id !== dev.id));
    } else {
      setMembers([...members, dev]);
    };
  };

  const isMember = (devId: number) => {
    return members.some(member => member.id === devId);
  }

  useEffect(() => {
    const savedMembers = localStorage.getItem("members");
    if(savedMembers) {
      setMembers(JSON.parse(savedMembers))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Dev Directory</h1>
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <textarea
              placeholder="Describe your developer needs..."
              value={requirementText}
              onChange={(e) => setRequirementText(e.target.value)}
              className="w-full sm:w-[40rem] h-24 p-2 border border-gray-300 rounded-lg shadow-sm"
            />
            <Button onClick={handleAIRecommendation} disabled={loadingAI}>
              {loadingAI ? "Recommending..." : "Recommend Developers"}
            </Button>
          </div>

          <TeamDialog members={members}></TeamDialog>
        </div>

        {recommended.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Recommended Developers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommended.map((dev: Profile) => (
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
                          {dev.experience} year(s) experience
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">
                      {dev.description}
                    </p>
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
                        href={"profile/" + dev.id}
                        className={buttonVariants({ variant: "outline" })}
                      >
                        View Profile
                      </Link>
                      <Button
                        onClick={() => toggleMember(dev)}
                        variant={isMember(dev.id) ? "secondary" : "default"}
                      >
                        {isMember(dev.id) 
                        ? (<>Remove from List</>)
                        : (<>Add to List</>)
                        }
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="mb-2">
        <Input
          type="text"
          placeholder="Search developers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          <MultiSelectDropdown
            title="Tech Stack"
            selectedOptions={selectedTech}
            onSelectChange={setSelectedTech}
          />
          <MultiSelectDropdown
            title="Experience Level"
            selectedOptions={selectedExp}
            onSelectChange={setSelectedExp}
          />
          <MultiSelectDropdown
            title="Availability"
            selectedOptions={selectedAvailability}
            onSelectChange={setSelectedAvailability}
          />
        </div>

        <Button onClick={handleCreateProfile}>Add Profile</Button>
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
                  <div className="flex gap-4">
                    <h2 className="text-lg font-semibold">{dev.name}</h2>
                    {dev.availability ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mt-2"></CheckCircle>
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mt-2"></XCircle>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {dev.experience} year(s) experience
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-700">{dev.description}</p>
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
                  href={"profile/" + dev.id}
                  className={buttonVariants({ variant: "outline" })}
                >
                  View Profile
                </Link>
                <Button
                  onClick={() => toggleMember(dev)}
                  variant={isMember(dev.id) ? "secondary" : "default"}
                >
                  {isMember(dev.id) 
                  ? (<>Remove from List</>)
                  : (<>Add to List</>)
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
