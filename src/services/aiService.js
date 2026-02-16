const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

/**
 * Common fetch wrapper for OpenAI Chat Completion
 */
async function fetchChatCompletion(messages) {
    if (!OPENAI_API_KEY) {
        console.warn('OpenAI API Key is missing. Please set VITE_OPENAI_API_KEY.');
        throw new Error('API_KEY_MISSING');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages,
            temperature: 0.7,
            max_tokens: 500 // Ensures usage stays well below the 100 KRW limit per call
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'AI_REQUEST_FAILED');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

/**
 * Suggests a starting habit based on onboarding input
 */
export async function generateHabitSuggestion(profile) {
    const prompt = `
        User wants an ideal life described by these keywords: "${profile.idealLife}".
        Their current problematic habit is: "${profile.currentLife}".
        Based on this, suggest ONE "good habit" to start small.
        Return ONLY a JSON object with this exact structure:
        {
            "name": "Habit Name (Short)",
            "target": "Specific measurable action",
            "reason": "Why this helps based on their keywords"
        }
        Respond in Korean.
    `;

    try {
        const result = await fetchChatCompletion([
            { role: 'system', content: 'You are an expert habit coach specializing in tiny habits and behavior design.' },
            { role: 'user', content: prompt }
        ]);
        return JSON.parse(result);
    } catch (e) {
        console.error('AI Suggestion Error:', e);
        throw e;
    }
}

/**
 * Suggests 3 alternative behaviors for an experiment
 */
export async function generateAlternatives(habitCategory, customHabit) {
    const habitDisplay = customHabit || habitCategory;
    const prompt = `
        The user is struggling with: "${habitDisplay}".
        Suggest 3 distinct alternative behaviors (experiments) they can try instead.
        Return ONLY a JSON array of 3 objects with this exact structure:
        [
            { "id": 1, "title": "Experimental Behavior Name", "desc": "Brief explanation of how it helps" },
            { "id": 2, "title": "...", "desc": "..." },
            { "id": 3, "title": "...", "desc": "..." }
        ]
        Respond in Korean.
    `;

    try {
        const result = await fetchChatCompletion([
            { role: 'system', content: 'You are an expert in behavioral psychology and habit substitution.' },
            { role: 'user', content: prompt }
        ]);
        return JSON.parse(result);
    } catch (e) {
        console.error('AI Alternatives Error:', e);
        throw e;
    }
}
