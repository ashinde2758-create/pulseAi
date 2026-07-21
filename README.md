1. Generative AI & Retrieval (Core Engine)
Framework: Use RAG (Retrieval-Augmented Generation) connected to trusted health databases (like WHO, CDC, or PubMed open datasets) to ground the AI responses and reduce hallucinations.

LLM Integration: Utilize flexible APIs (e.g., Google Gemini API, OpenAI API, or Anthropic Claude) with tailored system prompts to enforce empathetic, clear, non-diagnostic language.

2. Responsible AI & Safety (Crucial for High Marks)
Intent Triage: Build an early filter for emergency keywords (e.g., chest pain, severe bleeding, sudden numbness). Immediately trigger a distinct "Seek Emergency Care (108/911)" UI alert rather than generating standard text.

Inline Disclaimers: Present clear, non-intrusive medical disclaimers prominently in both the UI frame and chat outputs.

3. Dynamic Web UI & User Experience
Tech Stack: Next.js / React or Vue with Tailwind CSS for a responsive, modern interface.

Interactive Features:

Interactive symptom checklist or body map picker that feeds into the LLM context.

Real-time streaming responses (Server-Sent Events / WebSockets) so the user isn't waiting on a blank screen.

Downloadable/exportable summary sheets for users to take to an actual doctor.
