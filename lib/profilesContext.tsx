// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { Profile } from "@/profile-data";
// import mockProfiles from "@/profile-data";

// interface ProfileContextProps {
//   profiles: Profile[];
//   loadProfiles: () => Promise<Profile[]>;
//   getProfile: (id: number) => Promise<Profile | undefined>;
//   editProfile: (
//     id: number,
//     updatedData: Partial<Profile>
//   ) => Promise<Profile | undefined>;
//   deleteProfile: (id: number) => Promise<void>;
//   createProfile: (newProfile: Omit<Profile, 'id'>) => Promise<number>;
// }

// const ProfileContext = createContext<ProfileContextProps | undefined>(
//   undefined
// );

// export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//     const fetchProfiles = async () => {
//       const response = await fetch('/profiles');
//       const data = await response.json();
//       const parsedData = 
//     }
//   }, []);

//   useEffect(() => {
//     if (isMounted) {
//       localStorage.setItem("profiles", JSON.stringify(profiles));
//     }
//   }, [profiles, isMounted]);

//   const loadProfiles = () => profiles;

//   const getProfile = (id: number) => {
//     return profiles.find((profile) => profile.id === id);
//   };

//   const editProfile = (id: number, updatedData: Partial<Profile>) => {
//     setProfiles((prevProfiles) =>
//       prevProfiles.map((profile) =>
//         profile.id === id ? { ...profile, ...updatedData } : profile
//       )
//     );
//     return getProfile(id);
//   };

//   const createProfile = () => {
//     const maxId = Math.max(...profiles.map((profile) => profile.id));
//     const newId = maxId + 1;
//     const newProfile = {
//       id: newId,
//       name: "",
//       avatar: "/avatar1.png",
//       email: "",
//       description: "",
//       techStacks: [],
//       experience: 0,
//       availability: true,
//       project: null,
//       githubLink: "",
//     };
//     const updatedProfiles = [...profiles, newProfile];
//     setProfiles(updatedProfiles);
//     return newId;
//   };

//   const deleteProfile = (id: number) => {
//     const updatedProfiles = profiles.filter((profile) => profile.id !== id);
//     setProfiles(updatedProfiles);
//   };

//   return (
//     <ProfileContext.Provider
//       value={{
//         profiles,
//         loadProfiles,
//         getProfile,
//         editProfile,
//         deleteProfile,
//         createProfile,
//       }}
//     >
//       {children}
//     </ProfileContext.Provider>
//   );
// };

// export const useProfiles = () => {
//   const context = useContext(ProfileContext);
//   if (context === undefined) {
//     throw new Error("useProfiles must be used within ProfileProvider");
//   }
//   return context;
// };

// function mapDbToProfile(row: any) : Profile {
//   return {
//     id: row.id,
//     name: row.name,
//     avatar: row.avatar,
//     email: row.email,
//     description: row.description,
//     techStacks: row.tech_stacks, 
//     experience: row.experience,
//     availability: row.availability,
//     project: row.project,
//     githubLink: row.github_link
//   };
// }

// function mapProfileToDbRow(profile: Profile): any {
//   return {
//     id: profile.id,
//     name: profile.name,
//     avatar: profile.avatar,
//     email: profile.email,
//     description: profile.description,
//     tech_stacks: profile.techStacks, 
//     experience: profile.experience,
//     availability: profile.availability,
//     project: profile.project,  // Assuming project structure is compatible
//     github_link: profile.githubLink  // Map from camelCase to snake_case
//   };
// }
