import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// System Red Flags for immediate interception
const EMERGENCY_KEYWORDS = [
  'chest pain', 'shortness of breath', 'arm numbness', 
  'suicide', 'self harm', 'stroke', 'slurred speech'
];

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content.toLowerCase();

  // Tier 1: Emergency Interception Check
  const isEmergency = EMERGENCY_KEYWORDS.some(keyword => lastMessage.includes(keyword));

  if (isEmergency) {
    const emergencyPayload = JSON.stringify({
      isEmergency: true,
      message: "⚠️ EMERGENCY NOTICE: Your symptoms may indicate a critical medical emergency. Please dial emergency services (e.g., 911 in the US/Canada, 112 in Europe, 102/108 in India) or go to the nearest emergency room immediately."
    });
    
    return new Response(emergencyPayload, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Tier 2: Call GenAI with Safety System Instructions
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are PulseAI, an educational health assistant. 
        - Answer health questions clearly using accessible, layperson language.
        - Structure responses into: 1. Direct Overview, 2. Possible Considerations, 3. Preventive / Self-Care Steps, 4. When to See a Doctor.
        - ALWAYS emphasize that you are an AI, not a doctor.`
      },
      ...messages
    ],
  });

  // Return streamed response
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}