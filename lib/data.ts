import postgres from 'postgres'
import { Profile } from '@/profile-data' 
import { seedProfiles } from '@/app/seed/route';

import dotenv from 'dotenv';

dotenv.config();

const sql = postgres({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // ssl: 'require' // Remove or set to false for local databases without SSL
});

  export async function loadProfiles() {
    try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const data = await sql<Profile[]>`SELECT * FROM profiles`
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch profiles data from DB.');
    }
  }

  export async function getProfile(id: string): Promise<Profile | null> {
    try {
      const data = await sql<Profile[]>`
        SELECT * 
        FROM profiles
        WHERE profiles.id = ${id};
      `;
  
      return data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch profile by id.');
    }
  }

  export async function editProfile(id: string, updatedData: Partial<Profile>): Promise<Profile | null> {
    try {
      const updates = [];
      const values = [];
  
      if (updatedData.name !== undefined) {
        updates.push(`name = $${updates.length + 1}`);
        values.push(updatedData.name);
      }
      if (updatedData.avatar !== undefined) {
        updates.push(`avatar = $${updates.length + 1}`);
        values.push(updatedData.avatar);
      }
      if (updatedData.email !== undefined) {
        updates.push(`email = $${updates.length + 1}`);
        values.push(updatedData.email);
      }
      if (updatedData.description !== undefined) {
        updates.push(`description = $${updates.length + 1}`);
        values.push(updatedData.description);
      }
      if (updatedData.techStacks !== undefined) {
        updates.push(`tech_stacks = $${updates.length + 1}`);
        values.push(sql.array(updatedData.techStacks));
      }
      if (updatedData.experience !== undefined) {
        updates.push(`experience = $${updates.length + 1}`);
        values.push(updatedData.experience);
      }
      if (updatedData.availability !== undefined) {
        updates.push(`availability = $${updates.length + 1}`);
        values.push(updatedData.availability);
      }
      if (updatedData.project !== undefined) {
        updates.push(`project = $${updates.length + 1}`);
        values.push(JSON.stringify(updatedData.project));
      }
      if (updatedData.githubLink !== undefined) {
        updates.push(`github_link = $${updates.length + 1}`);
        values.push(JSON.stringify(updatedData.githubLink));
      }
  
      if (updates.length === 0) {
        throw new Error('No valid fields provided for update.');
      }
  
      const query = `UPDATE profiles SET ${updates.join(', ')} WHERE id = $${updates.length + 1}`;
      values.push(id);
  
      await sql.unsafe(query, values);

      return getProfile(id);
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to edit profile.');
    }
  }

  export async function deleteProfile (id: string) {
    try {
      await sql`DELETE FROM profiles WHERE id = ${id}`;
      loadProfiles();
    } catch (error) {
        console.error('Database Error:', error);
        console.error('Failed to delete profile.');
    }
  };

  export async function createProfile(): Promise<number> {
    try {
        // Define default values for a new profile
        const defaultProfile = {
        name: '',
        avatar: '',
        email: '',  // Note: To satisfy the UNIQUE constraint, ensure this is unique if necessary
        description: '',
        techStacks: [] as string[],  // Empty array
        experience: 0,
        availability: true,
        project: null,
        githubLink: '',
        };

        const result = await sql`
        INSERT INTO profiles (
            name, avatar, email, description, tech_stacks, experience, availability, project, github_link
        ) VALUES (
            ${defaultProfile.name},
            ${defaultProfile.avatar},
            ${defaultProfile.email},
            ${defaultProfile.description},
            ${sql.array(defaultProfile.techStacks)},
            ${defaultProfile.experience},
            ${defaultProfile.availability},
            ${defaultProfile.project ? JSON.stringify(defaultProfile.project) : null},
            ${defaultProfile.githubLink}
        )
        RETURNING id
        `;

        return result[0]?.id;  // Return the new profile ID

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to create profile.');
    }
  }

  export async function GET() {
    try {
        const result = await sql.begin((sql) => [
        seedProfiles(),
        ]);

        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
  }
  