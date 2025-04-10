import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { profiles } from '@/lib/mock-data';
import { Profile } from '@/profile-data';


const sql = postgres({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // ssl: 'require' // Remove or set to false for local databases without SSL
});

export async function seedProfiles() {
    await sql`
      CREATE TABLE IF NOT EXISTS profiles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        avatar TEXT,
        email TEXT UNIQUE NOT NULL,
        description TEXT,
        tech_stacks TEXT[],
        experience INTEGER,
        availability BOOLEAN,
        project JSONB,
        github_link TEXT
      );
    `;
  
    const insertedProfiles = await Promise.all(
      profiles.map(async (profile) => {
        const dbRow = mapProfileToDbRow(profile);
        return sql`
          INSERT INTO profiles (name, avatar, email, description, tech_stacks, experience, availability, project, github_link)
          VALUES (
            ${dbRow.name},
            ${dbRow.avatar},
            ${dbRow.email},
            ${dbRow.description},
            ${sql.array(dbRow.tech_stacks)},
            ${dbRow.experience},
            ${dbRow.availability},
            ${dbRow.project ? JSON.stringify(dbRow.project) : null},
            ${dbRow.github_link}
          )
          ON CONFLICT (email) DO NOTHING;
        `;
      })
    );
  
    return insertedProfiles;
}

function mapProfileToDbRow(profile: Profile): any {
  return {
    id: profile.id,
    name: profile.name,
    avatar: profile.avatar,
    email: profile.email,
    description: profile.description,
    tech_stacks: profile.techStacks, 
    experience: profile.experience,
    availability: profile.availability,
    project: profile.project,  
    github_link: profile.githubLink  
  };
}
