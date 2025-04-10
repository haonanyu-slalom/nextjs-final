'use server';

import { Profile } from '@/profile-data';
import OpenAI from 'openai';



export async function getBestMatch(profiles: Profile[], prompt: string) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
      });
  const systemPrompt = `
You are a matching assistant. Given a user's request and a list of profile objects, select the best match.
Respond the ids of the best-matching profiles, it should be combined with comma.

Profiles:
${JSON.stringify(profiles, null, 2)}
`;

  const res = await openai.responses.create({
    model: 'gpt-4o-mini',
    instructions:systemPrompt,
    input: prompt,
  });

  const reply = res.output_text.trim();
  const isNumberCommaList = /^(\d+\s*,\s*)*\d+$/.test(reply);
  if (!isNumberCommaList) {
    throw new Error('Something went wrong with the output!: ' + reply);
  }
  return reply;
}

