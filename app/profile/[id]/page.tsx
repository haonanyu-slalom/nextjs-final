// Tailwind-based Developer Profile Page UI

import { Button } from "@/components/ui/button";

const mockProfile = {
  id: 1,
  name: "Jane Doe",
  avatar: "/avatar1.png",
  techStacks: ["React", "Node.js", "TailwindCSS"],
  level: "Senior",
  bio: "Frontend engineer with 6 years of experience in building scalable applications.",
  ongoingProjects: [
    {
      title: "Dev Directory",
      description: "A directory of top developers with AI features.",
    },
    { title: "Task Manager", description: "Productivity app for agile teams." },
  ],
  team: ["Alice", "Bob", "Charlie"],
};

export default async function DeveloperProfile(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  console.log(id);
  const dev = mockProfile; // Would fetch by ID in a real app

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
            <p className="text-gray-600 text-sm">{dev.level} Developer</p>
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

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{dev.bio}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Ongoing Projects</h2>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {dev.ongoingProjects.map((project, i) => (
              <li key={i}>
                <strong>{project.title}:</strong> {project.description}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Team</h2>
          <div className="flex gap-3 flex-wrap">
            {dev.team.map((member) => (
              <span
                key={member}
                className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full"
              >
                {member}
              </span>
            ))}
          </div>
        </section>

        <div className="flex gap-4">
          <Button variant="default">Contact</Button>
          <Button variant="outline">Back</Button>
        </div>
      </div>
    </div>
  );
}
