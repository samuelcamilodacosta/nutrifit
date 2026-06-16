const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL || 'llama-3.3-70b-versatile';
const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY?.trim();

function buildSystemPrompt(lang) {
  const locale = lang === 'en'
    ? 'Respond in English.'
    : 'Responda em português brasileiro.';

  return `You are NutriFit AI, a friendly nutrition assistant inside a web app.

${locale}

Help users with:
- Food nutrients and calories (scale by portion when grams are given)
- Weight and diet analysis when they share weight (kg), height (cm), age and goal
- Practical, educational diet tips

Never give clinical diagnoses or medical prescriptions. Remind users to consult a nutritionist for clinical guidance when discussing personal diet plans.

Keep answers concise. Use **bold** for key numbers and bullet lists for nutrients.`;
}

function emptyResponseError(lang) {
  return lang === 'en'
    ? 'The model returned an empty response. Please try again.'
    : 'O modelo retornou uma resposta vazia. Tente novamente.';
}

function mapGroqError(status, body, lang) {
  const msg = body?.error?.message ?? '';

  if (status === 429 || /rate|quota/i.test(msg)) {
    return lang === 'en'
      ? 'Groq rate limit reached. Wait a moment and try again.'
      : 'Limite do Groq atingido. Aguarde um momento e tente novamente.';
  }
  if (status === 401 || (status === 400 && /API key|authentication/i.test(msg))) {
    return lang === 'en'
      ? 'Invalid Groq API key. Check VITE_GROQ_API_KEY in your .env file.'
      : 'Chave do Groq inválida. Verifique VITE_GROQ_API_KEY no arquivo .env.';
  }
  if (status === 403) {
    return lang === 'en'
      ? 'Groq API access denied. Create a free key at https://console.groq.com/keys'
      : 'Acesso negado ao Groq. Crie uma chave gratuita em https://console.groq.com/keys';
  }

  return lang === 'en'
    ? `Groq error (${status}). ${msg || 'Try again in a moment.'}`
    : `Erro no Groq (${status}). ${msg || 'Tente novamente em instantes.'}`;
}

function apiKeyMissingError(lang) {
  return lang === 'en'
    ? '**API key missing.** Create a free key at https://console.groq.com/keys and add it to `.env` as `VITE_GROQ_API_KEY=your_key`, then restart the dev server.'
    : '**Chave de API ausente.** Crie uma chave gratuita em https://console.groq.com/keys e adicione no `.env` como `VITE_GROQ_API_KEY=sua_chave`, depois reinicie o servidor.';
}

export function getApiKey() {
  return GROQ_KEY;
}

export async function getNutriFitAiResponse(messages, lang, apiKey = GROQ_KEY) {
  if (!apiKey) {
    throw new Error(apiKeyMissingError(lang));
  }

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: buildSystemPrompt(lang) },
        ...messages.map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.text,
        })),
      ],
      temperature: 0.6,
      max_tokens: 1024,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(mapGroqError(res.status, data, lang));
  }

  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error(emptyResponseError(lang));
  return text;
}

export function formatAssistantMessage(text) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return {
      key: i,
      parts: parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return { bold: true, text: part.slice(2, -2), key: j };
        }
        return { bold: false, text: part, key: j };
      }),
    };
  });
}
