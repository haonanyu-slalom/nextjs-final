'use server';

import { Profile, techStacks } from '@/profile-data';
import OpenAI from 'openai';



export async function getBestMatch(profiles: Profile[], prompt: string): Promise<number[]> {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
      });

const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: [
        {
            role: "system",
            content:
                `
                You are given a list of engineers, each with various attributes (e.g., experience, skills, availability). I will provide you with a set of requirements, and your task is to select the engineers who strictly meet the criteria.

However, skills may be mentioned in various places (e.g., a dedicated "skills" field, "tech stack" field, or as part of job experience), so make sure you consider all sources of information when evaluating whether an engineer meets the skills requirements. If a skill like Swift is mentioned anywhere (including work experience), consider that as part of the evaluation.

Steps:

1. Review the requirement text carefully.

2. Check each engineer against the requirements:

Ensure the engineer has the required skills, even if those skills are not explicitly listed in the "tech stack" field but may appear in their work experience or other sections.

Verify the engineer's availability.

3. Only select the engineers who meet all of the criteria.

If an engineer has all the required skills and is available, select them.

If an engineer doesn't meet any requirement (skills, availability, etc.), exclude them.

Return only the ids.

Profiles:
${JSON.stringify(profiles)}
`,
        },
        { role: "user", content: prompt },
    ],
    text: {
        format: {
            type: "json_schema",
            name: "ids",
            schema: {
                "type": "object",
                "properties": {
                  "ids": {
                    "type": "array",
                    "items": {
                      "type": "number"
                    }
                  }
                },
                "required": ["ids"],
                "additionalProperties": false
              },
            strict: true,
        },
    },
});

    const reply = JSON.parse(response.output_text);
    console.log(reply.ids)
  return reply.ids;
}



export async function getSummary(profile: Profile) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
      });

const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: `
You are a professional profile writer. Given the following engineer profile object, write an attractive and engaging summary paragraph suitable for a portfolio website or developer directory. Use a friendly yet professional tone.

Enrich the summary by analyzing the GitHub profile at the provided githubLink — highlight key projects, contributions, programming languages, or technologies if available. Avoid listing everything; instead, pick the most impressive or unique aspects that match the engineer’s profile.

Here is the engineer profile object in json format:

${JSON.stringify(profile)}

Write a compelling and concise summary in one paragraph, around 80–120 words.
`,
});
  return response.output_text;
}

