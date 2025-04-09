"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Profile } from '@/profile-data'
import mockProfiles from '@/profile-data';

interface ProfileContextProps {
    profiles: Profile[];
    loadProfiles: () => Profile[];
    getProfile: (id: number) => Profile | undefined;
    editProfile: (id: number, updatedData: Partial<Profile>) => Profile | undefined;
    deleteProfile: (id: number) => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        
        const storedProfiles = localStorage.getItem("profiles");
        if (storedProfiles) {
            setProfiles(JSON.parse(storedProfiles))
        }
    }, [])

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("profiles", JSON.stringify(profiles))
        }
    }, [profiles, isMounted]);

    const loadProfiles = () => profiles;

    const getProfile = (id: number) => {
        return profiles.find(profile => profile.id === id);
    };

    const editProfile = (id: number, updatedData: Partial<Profile>) => {
        setProfiles((prevProfiles) => 
            prevProfiles.map(profile => profile.id === id 
                ? {...profile, ...updatedData}
                : profile
            )
        );
        return getProfile(id);
    };

    const deleteProfile = (id: number) => {
        const updatedProfiles = profiles.filter((profile) => profile.id !== id);
        setProfiles(updatedProfiles);
    };

    return (
        <ProfileContext.Provider value={{profiles, loadProfiles, getProfile, editProfile, deleteProfile}}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfiles = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error("useProfiles must be used within ProfileProvider");
    }
    return context;
};