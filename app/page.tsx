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
import { CheckCircle, Filter, XCircle } from "lucide-react";
import { getBestMatch } from "./actions/chat";

export default function DeveloperDirectory() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedExp, setSelectedExp] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [havingAIError, setHavingAIError] = useState(false);
  const [requirementText, setRequirementText] = useState("");

  const router = useRouter();
  const { profiles, createProfile, getProfile } = useProfiles();
  const [members, setMembers] = useState<Profile[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("members");
      if (saved) setMembers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem("members", JSON.stringify(members));
    }
  }, [members, hasMounted]);

  const filteredDevs = profiles.filter((dev) => {
    const nameFiltered = dev.name.toLowerCase().includes(search.toLowerCase());
    const techFiltered =
      selectedTech.length === 0 ||
      selectedTech.every((tech) => dev.techStacks.includes(tech));
    const expFiltered =
      selectedExp.length === 0 ||
      selectedExp.some((exp) =>
        exp === "Junior"
          ? dev.experience <= 2
          : exp === "Mid"
          ? dev.experience > 2 && dev.experience <= 6
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

  const getDropdownTitle = (selected: string[], title: string) => {
    if (selected.length === 0) return title;
    return `${title} (${selected.length})`;
  };

  const handleAIRecommendation = async () => {
    setHavingAIError(false);
    setLoadingAI(true);

    console.log("User requirement:", requirementText);
    let matchedIds;
    try {
      matchedIds = await getBestMatch(profiles, requirementText);
      if (matchedIds.length == 0) {
        throw new Error("no results found");
      }
      const matchedProfiles = matchedIds.map((id) => getProfile(Number(id)));
      setRecommended(matchedProfiles);
      setLoadingAI(false);
    } catch (err) {
      setLoadingAI(false);
      setRecommended([]);
      setHavingAIError(true);
    }
  };

  const toggleMember = (dev: Profile) => {
    setMembers((prevMembers) => {
      const isExisting = prevMembers.some((member) => member.id === dev.id);
      if (isExisting) {
        return prevMembers.filter((member) => member.id !== dev.id);
      } else {
        return [...prevMembers, dev];
      }
    });
  };

  const isMember = (devId: number) => {
    return members.some((member) => member.id === devId);
  };

  const handleInput = (e: any) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 192); // 192px = max-h-48
    textarea.style.height = `${newHeight}px`;
    setRequirementText(textarea.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Engineer Pool</h1>
        <br></br>
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <textarea
              placeholder="Describe your developer needs..."
              value={requirementText}
              onInput={handleInput}
              className="w-full sm:w-[40rem] max-h-48 overflow-auto resize-none p-2 border border-gray-300 rounded-lg shadow-sm"
            />
            <Button onClick={handleAIRecommendation} disabled={loadingAI}>
              {loadingAI ? "Recommending..." : "Recommend Developers"}
            </Button>
          </div>

          <TeamDialog
            members={members}
            onRemoveMember={(memberId) => {
              setMembers((prev) => prev.filter((m) => m.id !== memberId));
            }}
          />
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
                    <p className="mt-2 text-sm text-gray-700">
                      {dev.description}
                    </p>
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
                        {isMember(dev.id) ? "Remove from Team" : "Add to Team"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {havingAIError && (
          <div className="text-red-600 bg-red-100 p-4 rounded mt-4">
            🚨 Oops! We don't find any match. Please check your requirement
            text! And make sure you have set up the OPENAI API KEY!
          </div>
        )}
      </header>
      <div className="flex items-center justify-between mb-6 space-x-6">
        {/* Search Bar */}
        <div className="flex-shrink-0 w-1/3 sm:w-64">
          <Input
            type="text"
            placeholder="Search developers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Filters Section */}
        <div className="flex items-center space-x-6">
          {/* Filters Title */}
          <div className="flex items-center space-x-2 text-gray-700 font-semibold text-lg">
            <Filter size={18} className="text-gray-500" />
            <h6 className="tracking-wide">Filters</h6>
          </div>

          {/* MultiSelect Dropdowns */}
          <MultiSelectDropdown
            title={getDropdownTitle(selectedTech, "Tech Stack")}
            selectedOptions={selectedTech}
            onSelectChange={setSelectedTech}
          />
          <MultiSelectDropdown
            title={getDropdownTitle(selectedExp, "Experience Level")}
            selectedOptions={selectedExp}
            onSelectChange={setSelectedExp}
          />
          <MultiSelectDropdown
            title={getDropdownTitle(selectedAvailability, "Availability")}
            selectedOptions={selectedAvailability}
            onSelectChange={setSelectedAvailability}
          />
        </div>

        {/* Add Profile Button */}
        <div className="flex-shrink-0">
          <Button onClick={handleCreateProfile}>Add Profile</Button>
        </div>
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
                  {isMember(dev.id) ? "Remove from Team" : "Add to Team"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
