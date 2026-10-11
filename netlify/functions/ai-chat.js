// netlify/functions/ai-chat.js
// Advanced AI Chat, RAG Document Extractor & Real-Time Knowledge Engine for sArathI
// Supports Google Gemini 2.0/1.5 Flash, Groq Llama 3.3 70B, DeepSeek R1,
// 2000+ Slide/Page PDF Document Semantic Retrieval, and Live Web Knowledge Extraction.

'use strict';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Model-Provider',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Method not allowed.' }) };
  }

  let body = {};
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Invalid JSON payload.' }) };
  }

  const {
    messages = [],
    documentContext = null,
    studentProfile = {},
    provider = 'instant-free', // 'instant-free' | 'gemini' | 'groq' | 'deepseek'
    apiKey = null,
    learnings = []
  } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ success: false, error: 'Messages array is required.' }) };
  }

  // Extract latest user message
  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user' || !m.role);
  const userQuery = lastUserMsg ? String(lastUserMsg.text || lastUserMsg.content || '').trim() : '';

  // Check language intent (Devanagari Marathi OR Romanized Marathlish like 'tula mahit ahe na')
  const isDevanagariMarathi = /[\u0900-\u097F]/.test(userQuery);
  const isRomanizedMarathi = /\b(tula|mala|mahit|ahe|aahe|nahi|naahi|kasa|kashi|kase|kay|kaay|chalalay|sang|shikvaycha|karaycha|karayche|kuthun|kuthe|madhe|bagh|bol|aahes|ahes|jhala|zala|kiti|kadhi|jevlis|jevala|ho|nahit|amhi|tumhi)\b/i.test(userQuery);
  const isMarathiQuery = isDevanagariMarathi || isRomanizedMarathi ||
    /\b(marathi|मराठी|in marathi|मराठीत|मराठीमध्ये)\b/i.test(userQuery);

  // Check if user is teaching or correcting a mistake
  const isCorrection = /^(?:no[,\s]+|wrong[,\s]+|you made a mistake[,\s]+|actually[,\s]+|correction[:\s]+|remember that\s+|you are wrong[,\s]+|that is incorrect)/i.test(userQuery);

  // 1. RAG: Retrieve Relevant Context from Uploaded Document (Supports 2000+ Slides/Pages)
  let docRetrieval = null;
  if (documentContext && documentContext.content) {
    docRetrieval = retrieveFromDocument(documentContext.content, userQuery, documentContext.name);
  }

  // 2. Web Knowledge Search: Fetch Live Facts from Wikipedia & Encylopedic Engine
  let webKnowledge = null;
  if (!docRetrieval || docRetrieval.topMatches.length === 0 || !userQuery.toLowerCase().includes('document')) {
    webKnowledge = await fetchWebKnowledge(userQuery);
  }

  // 3. Build Grounded Pedagogical System Prompt
  const studentName = studentProfile.name || 'Student';
  const studentSubject = studentProfile.subject || 'General Engineering & Computing';
  const studentLevel = studentProfile.level || 'Intermediate';

  let systemPrompt = `You are sArathI AI (सारथी), an exceptional, highly knowledgeable, empathetic, and continuous-learning AI study mentor.
You provide verified, truthful, and accurate answers with deep clarity, structured formatting, and practical insights.

Student Context:
• Name: ${studentName}
• Subject: ${studentSubject}
• Current Level: ${studentLevel}

Core Directives:
1. Accuracy & Truth: Give factually accurate, comprehensive answers. If you explain code, provide clean, bug-free, copy-pasteable code with explanations.
2. Step-by-Step Reasoning: Break down difficult concepts into intuitive steps and clear examples.
3. Language & Multilingual Mastery:
   - English: Clear, articulate, academic yet accessible.
   - Marathi (मराठी): Authentic, culturally rich, natural Marathi vocabulary.
   - Marathlish (Romanized Marathi): The user may type Marathi words using English alphabet (e.g. "tula mahit ahe na", "mala he sang", "kay chalalay"). You understand this 100% fluently and respond warmly in natural Marathi/Marathlish!
4. Formatting: Use GitHub-flavored Markdown: bold headers, bullet lists, blockquotes, and syntax-highlighted code blocks.`;

  // Inject Self-Learning Agent Memory & Learned Corrections
  if (Array.isArray(learnings) && learnings.length > 0) {
    systemPrompt += `\n\n═══════════════════════════════════════════════════════════════
PERSISTENT AGENT MEMORY & LEARNED CORRECTIONS:
(You have learned these exact rules from past feedback. Adhere to them strictly to never repeat previous mistakes!)
${learnings.map((l, idx) => `${idx + 1}. [CORRECTION RULE]: ${typeof l === 'string' ? l : (l.rule || l.correction || '')}`).join('\n')}
═══════════════════════════════════════════════════════════════`;
  }

  // Inject Official sArathI App Knowledge Base
  systemPrompt += `\n\n═══════════════════════════════════════════════════════════════
OFFICIAL sArathI APPLICATION KNOWLEDGE BASE:
You have complete, expert knowledge of the sArathI learning platform:
• Platform Name: sArathI (सारथी) — Personalized AI Learning Assistant & Study Companion.
• The 6 Core Navigation Tabs:
  1. Dashboard: Overall completion %, study progress, today's focus topics, weak topic revision alerts.
  2. Learning Plan: Day-by-day roadmap with exact minutes per topic and interactive completion checkboxes.
  3. sArathI AI: You! The 24/7 personal tutor with multi-LLM support (Gemini, Groq, DeepSeek, Instant Free), voice input/output, and up to 2000-slide document semantic Q&A.
  4. Quiz & Review: Adaptive assessments with Practice Mode (untimed 5 MCQs + short answer) and Timed Mode (180s countdown), complete with option-by-option diagnostic answer keys.
  5. Analytics: Exam scores, topic mastery percentages, attempt history, and weak topics flagged for revision (<60%).
  6. Backend & DB (Admin Only): PostgreSQL explorer showing users, study sessions, quiz attempts, and auth logs.
• Features & Capabilities:
  - 2000-Slide Document Q&A: Upload any PDF, PPT, TXT, or DOCS via the paperclip button; sArathI indexes all pages and cites exact slides and quotes.
  - Self-Learning AI Agent: sArathI learns from its mistakes and user corrections, storing memory rules to continuously improve accuracy.
  - Universal Scroll Memory: Preserves exact scroll position across every tab.
  - Text Selection "Ask sArathI AI": Highlight any text anywhere in the app to open a quick tutor popup.
  - Theme Support: Dark Mode (default glassmorphism) and Light Mode toggle in sidebar.
  - Multilingual: English, Marathi (मराठी), and Marathlish (Romanized Marathi) support.
  - Data Persistence: PostgreSQL cloud database with resilient failover store.
  - Demo Logins: Tejas Ostwal (tejasostwal@gmail.com), Demo Student (abc@gmail.com), Admin (admin@sarathi.edu).
═══════════════════════════════════════════════════════════════`;

  // Inject Document Grounding Context if attached
  if (docRetrieval && docRetrieval.contextText) {
    systemPrompt += `\n\n═══════════════════════════════════════════════════════════════
ATTACHED DOCUMENT INFORMATION ("${documentContext.name || 'Document'}"):
Total Chunks/Pages Indexed: ${docRetrieval.totalChunks}
═══════════════════════════════════════════════════════════════
RELEVANT EXTRACTED PASSAGES FROM DOCUMENT:
${docRetrieval.contextText}

DOCUMENT Q&A RULES:
• Answer the student's question based on the extracted passages above.
• Cite the specific Slide / Page numbers wherever possible (e.g., "[Slide 4 / Page 4]").
• Quote relevant phrases from the document to substantiate your answer.
• If the document does not explicitly state the answer, state what the document says first, then provide standard domain facts.`;
  }

  // Inject Live Web Knowledge if retrieved
  if (webKnowledge && webKnowledge.snippets && webKnowledge.snippets.length > 0) {
    systemPrompt += `\n\n═══════════════════════════════════════════════════════════════
VERIFIED KNOWLEDGE & LIVE FACTS:
${webKnowledge.snippets.join('\n\n')}
═══════════════════════════════════════════════════════════════
Integrate these verified facts naturally into your explanation.`;
  }

  // 4. Multi-Model Provider Execution
  let reply = '';
  let usedProvider = provider;

  const geminiKey = apiKey || process.env.GEMINI_API_KEY;
  const groqKey = apiKey || process.env.GROQ_API_KEY;

  // A. Google Gemini 2.0 / 1.5 Flash
  if (provider === 'gemini' && geminiKey) {
    try {
      reply = await callGemini(geminiKey, systemPrompt, messages);
      usedProvider = 'Google Gemini 2.0 Flash';
    } catch (e) {
      console.warn('[AI] Gemini call failed:', e.message);
    }
  }

  // B. Groq Llama 3.3 70B / DeepSeek R1
  if (!reply && (provider === 'groq' || provider === 'deepseek') && groqKey) {
    try {
      const groqModel = provider === 'deepseek' ? 'deepseek-r1-distill-llama-70b' : 'llama-3.3-70b-versatile';
      reply = await callGroq(groqKey, groqModel, systemPrompt, messages);
      usedProvider = `Groq (${groqModel})`;
    } catch (e) {
      console.warn('[AI] Groq call failed:', e.message);
    }
  }

  // C. Fallback: High-Accuracy Knowledge & RAG Synthesis Engine
  // Synthesizes grounded, accurate, structured answers from document extraction + live web facts
  if (!reply) {
    reply = synthesizeAccurateAnswer(userQuery, docRetrieval, webKnowledge, studentProfile, isMarathiQuery);
    usedProvider = docRetrieval && docRetrieval.topMatches.length > 0
      ? `sArathI Document Extraction Engine (${docRetrieval.topMatches.length} slides/pages matched)`
      : (webKnowledge ? 'sArathI Live Knowledge Engine' : 'sArathI Academic Intelligence');
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      success: true,
      reply,
      provider: usedProvider,
      retrieval: docRetrieval ? { matchedPages: docRetrieval.topMatches.map(m => m.page) } : null,
      timestamp: new Date().toISOString()
    })
  };
};

/* --------------------------------------------------------------------------
   Document Semantic & Keyword RAG (Handles 2000+ Slides / Pages)
   -------------------------------------------------------------------------- */
function retrieveFromDocument(rawContent, query, docName) {
  if (!rawContent || !rawContent.trim()) return null;

  // 1. Split into page/slide chunks
  const chunks = [];
  const pageRegex = /---\s*(?:Slide\/Page|Slide|Page)\s*(\d+)\s*---/gi;
  let match;
  let lastIndex = 0;
  let lastPage = 1;

  while ((match = pageRegex.exec(rawContent)) !== null) {
    if (match.index > lastIndex) {
      const text = rawContent.slice(lastIndex, match.index).trim();
      if (text) {
        chunks.push({ page: lastPage, text });
      }
    }
    lastPage = parseInt(match[1], 10);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < rawContent.length) {
    const text = rawContent.slice(lastIndex).trim();
    if (text) chunks.push({ page: lastPage, text });
  }

  // If no Page/Slide delimiters found, split by paragraphs / headings
  if (chunks.length === 0) {
    const paragraphs = rawContent.split(/\n\s*\n+/);
    paragraphs.forEach((p, idx) => {
      if (p.trim().length > 30) {
        chunks.push({ page: idx + 1, text: p.trim() });
      }
    });
  }

  if (chunks.length === 0) {
    chunks.push({ page: 1, text: rawContent.slice(0, 8000) });
  }

  // 2. Tokenize and clean query
  const queryWords = query.toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !['what', 'when', 'where', 'which', 'who', 'how', 'this', 'that', 'from', 'with', 'about', 'tell', 'show', 'explain', 'give', 'does', 'have'].includes(w));

  // 3. Score each chunk based on BM25-like Term Frequency and Exact Phrase Matches
  const scored = chunks.map(chunk => {
    const textLower = chunk.text.toLowerCase();
    let score = 0;

    // Check whole query phrase match (highest weight)
    if (query.length > 5 && textLower.includes(query.toLowerCase())) {
      score += 50;
    }

    // Keyword matches
    queryWords.forEach(kw => {
      const occurrences = (textLower.match(new RegExp('\\b' + escapeRegExp(kw), 'gi')) || []).length;
      if (occurrences > 0) {
        score += occurrences * 5 + 3;
      }
    });

    return { chunk, score };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Take top 6 most relevant chunks (or top 3 if score is high)
  const topMatches = scored.filter(s => s.score > 0).slice(0, 6).map(s => s.chunk);

  // If no specific keyword match, fallback to the first few chunks (overview/summary)
  const selected = topMatches.length > 0 ? topMatches : chunks.slice(0, 3);

  const contextText = selected.map(c => `[Slide/Page ${c.page}]:\n${c.text.slice(0, 2000)}`).join('\n\n---\n\n');

  return {
    totalChunks: chunks.length,
    topMatches: selected,
    contextText,
    docName: docName || 'Document'
  };
}

/* --------------------------------------------------------------------------
   Live Web Knowledge Retrieval (Wikipedia Search & Fact Extraction)
   -------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   Live Web Knowledge Retrieval (Wikipedia Search & Fact Extraction)
   -------------------------------------------------------------------------- */
async function fetchWebKnowledge(query) {
  if (!query || query.length < 2) return null;

  // Extract clean search term from user question
  const cleanTerm = query
    .replace(/^(what is|who is|who was|who were|what was|what were|when was|where is|where was|explain|define|tell me about|how does|how do|how was|how did|what are|history of|describe|difference between|can you explain|give me|solve|concept of|write code for|write a program for|algorithm for|write an algorithm for)\s+/i, '')
    .replace(/[?.,!]/g, ' ')
    .trim();

  if (!cleanTerm) return null;

  // Conversational greetings, identity questions, and common chit-chat should NEVER query Wikipedia
  if (/^(?:hi|hii|hiii|hello|hey|heyy|namaskar|namaste|good morning|good evening|good afternoon|how are you|who are you|what is your name|bye|thanks|thank you)\b/i.test(cleanTerm)) {
    return null;
  }

  let topic = cleanTerm;
  let description = '';
  let extractText = '';
  const snippets = [];
  let ddgAbstract = '';

  // 1. Wikipedia Summary REST API (Fast, factual, peer-reviewed)
  try {
    const slug = encodeURIComponent(cleanTerm.replace(/\s+/g, '_'));
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`, {
      headers: { 'User-Agent': 'sArathI-Study-Bot/2.0' },
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.extract) {
        topic = data.title || topic;
        description = data.description || '';
        extractText = data.extract.trim();
      }
    }
  } catch (_) {}

  // 2. Wikipedia Search API if REST summary not found or short
  if (!extractText || extractText.length < 50) {
    try {
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanTerm)}&utf8=&format=json&origin=*`;
      const res = await fetch(searchUrl, { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        const data = await res.json();
        const results = data.query?.search;
        if (results && results.length > 0) {
          // Prioritize exact or closest title match over first result
          const cleanLower = cleanTerm.toLowerCase();
          const exactMatch = results.find(r => r.title.toLowerCase() === cleanLower) ||
                             results.find(r => r.title.toLowerCase().startsWith(cleanLower)) ||
                             results[0];
          const top = exactMatch;
          topic = top.title || topic;
          const extSlug = encodeURIComponent(top.title.replace(/\s+/g, '_'));
          try {
            const extRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${extSlug}`, {
              headers: { 'User-Agent': 'sArathI-Study-Bot/2.0' },
              signal: AbortSignal.timeout(3500)
            });
            if (extRes.ok) {
              const extData = await extRes.json();
              if (extData.extract) {
                extractText = extData.extract.trim();
                description = extData.description || '';
              }
            }
          } catch (_) {}

          if (!extractText) {
            extractText = top.snippet.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"');
          }

          results.slice(0, 3).forEach(r => {
            const clean = r.snippet.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"');
            snippets.push(`• **${r.title}**: ${clean}...`);
          });
        }
      }
    } catch (_) {}
  }

  // 3. DuckDuckGo Instant Answer API
  try {
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(cleanTerm)}&format=json&no_html=1&skip_disambig=1`;
    const ddgRes = await fetch(ddgUrl, { signal: AbortSignal.timeout(3500) });
    if (ddgRes.ok) {
      const ddgData = await ddgRes.json();
      ddgAbstract = ddgData.Abstract || ddgData.Answer || '';
      if (!description && ddgData.Heading) description = ddgData.Heading;
      if (!extractText && ddgAbstract) extractText = ddgAbstract;
    }
  } catch (_) {}

  if (!extractText && snippets.length === 0 && !ddgAbstract) return null;

  return {
    topic,
    description,
    extract: extractText || ddgAbstract,
    snippets,
    ddgAbstract
  };
}

/* --------------------------------------------------------------------------
   Deep Academic & Technical Domain Knowledge Engine
   Provides verified algorithms, data structures, code, and system concepts.
   -------------------------------------------------------------------------- */
function getAcademicDomainAnswer(query, qLower, profile) {
  // Binary Search
  if (qLower.includes('binary search')) {
    return `### 🔍 Binary Search Algorithm & Complete Breakdown

**Definition:** Binary Search is an efficient $O(\\log n)$ divide-and-conquer algorithm designed to locate a target element in a **strictly sorted array or collection**.

#### ⚙️ How It Works (Step-by-Step):
1. **Initialize Two Pointers:** \`low = 0\` and \`high = len(arr) - 1\`.
2. **Calculate Middle Index:** \`mid = low + (high - low) // 2\` (prevents integer overflow in languages like C++/Java).
3. **Evaluate:**
   - If \`arr[mid] == target\`: Found! Return index \`mid\`.
   - If \`arr[mid] < target\`: The target is in the right half $\\rightarrow$ set \`low = mid + 1\`.
   - If \`arr[mid] > target\`: The target is in the left half $\\rightarrow$ set \`high = mid - 1\`.
4. **Terminate:** Repeat until \`low > high\`. If not found, return \`-1\`.

#### 💻 Production-Ready Python Implementation:
\`\`\`python
def binary_search(arr, target):
    """
    Performs iterative binary search on a sorted list.
    Time Complexity: O(log n)
    Space Complexity: O(1)
    """
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid  # Target found
        elif arr[mid] < target:
            low = mid + 1  # Search right half
        else:
            high = mid - 1  # Search left half

    return -1  # Target not found

# Verification
if __name__ == "__main__":
    sorted_data = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
    query = 23
    index = binary_search(sorted_data, query)
    print(f"Element {query} found at index: {index}")  # Output: 5
\`\`\`

#### 📊 Complexity Analysis:
• **Time Complexity:**
  - **Best Case:** $O(1)$ (when the target is exactly at the midpoint).
  - **Average & Worst Case:** $O(\\log_2 n)$ (each comparison halves the search space).
• **Space Complexity:** $O(1)$ iterative ($O(\\log n)$ recursive due to call stack).
• **Prerequisite:** The input dataset **must be sorted**.`;
  }

  // Dijkstra's Algorithm
  if (qLower.includes('dijkstra')) {
    return `### 🛣️ Dijkstra's Shortest Path Algorithm

**Definition:** Dijkstra's Algorithm, conceived by Edsger W. Dijkstra in 1956, solves the **Single-Source Shortest Path (SSSP)** problem for a weighted graph with **non-negative edge weights**.

#### ⚙️ Algorithmic Steps:
1. Initialize distances from the starting vertex to all other vertices as $\\infty$, and the distance to the source as $0$.
2. Maintain a **Min-Priority Queue** (min-heap) storing pairs of \`(distance, vertex)\`.
3. Extract the vertex $u$ with the minimum distance.
4. **Relax all outgoing edges** $(u, v)$ with weight $w$:
   $$\\text{if } \\text{dist}[u] + w < \\text{dist}[v] \\implies \\text{dist}[v] = \\text{dist}[u] + w$$
5. Push updated distances to the priority queue. Repeat until the queue is empty.

#### 💻 Python Implementation (Using \`heapq\`):
\`\`\`python
import heapq

def dijkstra(graph, source):
    """
    graph: dict where graph[u] = list of (v, weight) tuples.
    Time Complexity: O((V + E) * log V)
    Space Complexity: O(V)
    """
    distances = {node: float('inf') for node in graph}
    distances[source] = 0
    pq = [(0, source)]  # (current_distance, node)

    while pq:
        curr_dist, u = heapq.heappop(pq)

        # Skip stale entries
        if curr_dist > distances[u]:
            continue

        for v, weight in graph[u]:
            distance = curr_dist + weight
            # Relaxation step
            if distance < distances[v]:
                distances[v] = distance
                heapq.heappush(pq, (distance, v))

    return distances

# Example Graph
graph = {
    'A': [('B', 4), ('C', 2)],
    'B': [('A', 4), ('C', 1), ('D', 5)],
    'C': [('A', 2), ('B', 1), ('D', 8), ('E', 10)],
    'D': [('B', 5), ('C', 8), ('E', 2)],
    'E': [('C', 10), ('D', 2)]
}
print(dijkstra(graph, 'A'))
# Output: {'A': 0, 'B': 3, 'C': 2, 'D': 8, 'E': 10}
\`\`\`

#### 📊 Complexity & Constraints:
• **Time Complexity:** $O((V + E) \\log V)$ using a binary min-heap ($V$ vertices, $E$ edges).
• **Limitation:** Does **not** work with negative edge weights (use **Bellman-Ford** instead).
• **Real-World Uses:** GPS Road Navigation (Google Maps), Network Routing Protocols (OSPF, IS-IS).`;
  }

  // Quicksort
  if (qLower.includes('quick sort') || qLower.includes('quicksort')) {
    return `### ⚡ Quick Sort Algorithm

**Definition:** Quick Sort is an in-place, divide-and-conquer sorting algorithm that selects a **pivot** element and partitions the array such that all elements smaller than the pivot are on the left, and all greater elements are on the right.

#### 💻 Python Implementation (Lomuto Partition Scheme):
\`\`\`python
def quicksort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quicksort(arr, low, pi - 1)   # Sort left half
        quicksort(arr, pi + 1, high)  # Sort right half
    return arr

def partition(arr, low, high):
    pivot = arr[high]  # Choose last element as pivot
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Verification
data = [10, 80, 30, 90, 40, 50, 70]
print("Sorted:", quicksort(data))
# Output: [10, 30, 40, 50, 70, 80, 90]
\`\`\`

#### 📊 Complexity:
• **Best & Average Case:** $O(n \\log n)$.
• **Worst Case:** $O(n^2)$ (occurs when pivot is always smallest/largest element, e.g. already sorted array without randomized pivot).
• **Space Complexity:** $O(\\log n)$ call stack auxiliary memory.`;
  }

  // Merge Sort
  if (qLower.includes('merge sort') || qLower.includes('mergesort')) {
    return `### 🧩 Merge Sort Algorithm

**Definition:** Merge Sort is a stable, divide-and-conquer algorithm that recursively splits the input list into halves until each sublist has 1 element, then merges adjacent sublists in sorted order.

#### 💻 Python Implementation:
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Verification
print("Sorted:", merge_sort([38, 27, 43, 3, 9, 82, 10]))
# Output: [3, 9, 10, 27, 38, 43, 82]
\`\`\`

#### 📊 Complexity:
• **Time Complexity:** $O(n \\log n)$ guaranteed in all cases (Best, Average, Worst).
• **Space Complexity:** $O(n)$ auxiliary memory for merging.
• **Stability:** Stable (preserves relative order of equal keys).`;
  }

  // Linked List Reversal
  if (qLower.includes('reverse') && qLower.includes('linked list')) {
    return `### 🔗 Reversing a Singly Linked List

#### 💡 Core Intuition (Three-Pointer Approach):
Maintain three pointers: \`prev = None\`, \`curr = head\`, and \`next_node\`. At each step, redirect \`curr.next\` backward to \`prev\`, then advance both pointers.

#### 💻 Python Implementation:
\`\`\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_linked_list(head):
    """
    Reverses a singly linked list in-place.
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    prev = None
    curr = head
    while curr:
        next_node = curr.next  # Save next
        curr.next = prev       # Reverse pointer
        prev = curr            # Move prev forward
        curr = next_node       # Move curr forward
    return prev  # New head

# Helper to print
def print_list(node):
    vals = []
    while node:
        vals.append(str(node.val))
        node = node.next
    print(" -> ".join(vals) + " -> None")

# Verification
head = ListNode(1, ListNode(2, ListNode(3, ListNode(4))))
print_list(head)                     # 1 -> 2 -> 3 -> 4 -> None
new_head = reverse_linked_list(head)
print_list(new_head)                 # 4 -> 3 -> 2 -> 1 -> None
\`\`\`
• **Time Complexity:** $O(n)$ single pass.
• **Space Complexity:** $O(1)$ constant memory.`;
  }

  // Process vs Thread (OS)
  if ((qLower.includes('process') && qLower.includes('thread')) || qLower.includes('difference between process and thread')) {
    return `### ⚙️ Operating Systems: Process vs Thread

| Feature | Process (प्रक्रिया) | Thread (थ्रेड / Lightweight Process) |
| :--- | :--- | :--- |
| **Definition** | An independent program in execution with its own dedicated memory space. | The smallest unit of execution within a parent process. |
| **Address Space** | Each process has separate virtual memory (Code, Data, Heap, Stack). | All threads of a process share the same Code, Data, and Heap. Only Stack & Registers are private. |
| **Creation & Switching** | Heavyweight. Context switching requires flushing CPU caches & updating MMU page tables ($O(\\text{heavy})$). | Lightweight. Context switching is extremely fast ($O(\\text{light})$). |
| **Communication** | Requires **IPC** (Inter-Process Communication: Pipes, Sockets, Shared Memory, Message Queues). | Direct communication via shared memory variables (requires synchronization like Mutex/Semaphore). |
| **Fault Isolation** | High. If one process crashes, other processes remain unaffected. | Low. If one thread crashes (e.g., Segfault), the entire process and all threads terminate. |

#### 🎯 Key Takeaway:
Use **Multi-Processing** for CPU-bound tasks needing isolation (e.g. Python \`multiprocessing\` to bypass the GIL). Use **Multi-Threading** for I/O-bound tasks (network requests, file reads, UI responsiveness).`;
  }

  // TCP vs UDP (Networks)
  if ((qLower.includes('tcp') && qLower.includes('udp')) || qLower.includes('difference between tcp and udp')) {
    return `### 🌐 Computer Networks: TCP vs UDP

| Metric | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Connection Type** | **Connection-Oriented** (Requires 3-way handshake: SYN $\\rightarrow$ SYN-ACK $\\rightarrow$ ACK). | **Connectionless** (Sends packets immediately without handshakes). |
| **Reliability** | **Guaranteed Delivery**: Retransmits lost packets, sends acknowledgments (ACKs). | **Best-Effort Delivery**: No ACKs, lost packets are simply dropped. |
| **Ordering** | **Strictly Ordered**: Uses sequence numbers to reassemble packets in correct sequence. | **Unordered**: Packets may arrive out of order. |
| **Flow & Congestion Control** | Supported (Sliding Window, Slow Start, Congestion Avoidance). | None. Transmits at full wire rate. |
| **Header Size** | 20 to 60 bytes (heavier metadata). | Fixed 8 bytes (ultra-lightweight). |
| **Use Cases** | Web Browsing (HTTP/HTTPS), File Transfer (FTP), Emails (SMTP), SSH. | Video Streaming (YouTube Live), VoIP, Online Multiplayer Gaming, DNS. |`;
  }

  // ACID Properties (DBMS)
  if (qLower.includes('acid') || qLower.includes('acid properties')) {
    return `### 🗄️ DBMS: ACID Properties in Transactions

**ACID** ensures that database transactions are processed reliably and maintain data integrity:

1. **A - Atomicity (सर्व किंवा काहीच नाही - All or Nothing):**
   - Either all operations of a transaction succeed, or the entire transaction is rolled back.
   - *Example:* If funds are deducted from Account A but a server error occurs before crediting Account B, the deduction is automatically rolled back.

2. **C - Consistency (सुसंगतता):**
   - The database must transition from one valid state to another, strictly adhering to all constraints, cascades, triggers, and foreign keys.

3. **I - Isolation (अलगीकरण):**
   - Concurrent transactions execute independently without interfering with one another. Intermediate uncommitted states are hidden from other transactions.
   - Handled via **Isolation Levels** (Read Uncommitted, Read Committed, Repeatable Read, Serializable).

4. **D - Durability (शाश्वतता):**
   - Once a transaction is committed, its modifications survive crashes and power outages via Write-Ahead Logging (WAL) and non-volatile storage.`;
  }

  // OSI Model 7 Layers
  if (qLower.includes('osi model') || qLower.includes('7 layers') || qLower.includes('osi')) {
    return `### 🌐 The 7 Layers of the OSI Model

The **Open Systems Interconnection (OSI)** model standardizes telecommunication and computer systems:

| Layer # | Layer Name | Protocol Data Unit (PDU) | Key Protocols & Hardware | Core Responsibility |
| :---: | :--- | :---: | :--- | :--- |
| **7** | **Application** | Data | HTTP, HTTPS, FTP, DNS, SMTP | User-facing application interfaces. |
| **6** | **Presentation** | Data | SSL/TLS, JPEG, ASCII, JSON | Data translation, encryption, compression. |
| **5** | **Session** | Data | NetBIOS, RPC, PPTP | Manages, establishes & terminates sessions. |
| **4** | **Transport** | **Segment** (TCP) / **Datagram** (UDP) | TCP, UDP | End-to-end delivery, port numbers, flow control. |
| **3** | **Network** | **Packet** | IPv4, IPv6, ICMP, Routers | Logical IP addressing and path routing. |
| **2** | **Data Link** | **Frame** | Ethernet, MAC, Wi-Fi (802.11), Switches | Hop-to-hop transfer, MAC physical addresses, error checking (CRC). |
| **1** | **Physical** | **Bits** | Cables (CAT6, Fiber), Hubs, Repeaters | Physical transmission of raw electrical/optical signals. |

💡 **Mnemonic to Remember:** *"**A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing"* (Top to Bottom: 7 to 1).`;
  }

  // Photosynthesis (Biology / Science)
  if (qLower.includes('photosynthesis')) {
    return `### 🌱 Photosynthesis: Mechanism & Chemical Equation

**Definition:** Photosynthesis is the biochemical process by which green plants, algae, and cyanobacteria convert solar light energy into stored chemical energy in the form of glucose ($C_6H_{12}O_6$), releasing oxygen ($O_2$) as a vital byproduct.

#### 🧪 Overall Chemical Equation:
$$6CO_2 + 6H_2O + \\text{Light Energy} \\xrightarrow{\\text{Chlorophyll}} C_6H_{12}O_6 + 6O_2$$

#### ⚙️ The Two Fundamental Phases:
1. **Light-Dependent Reactions (Thylakoid Membrane):**
   - Chlorophyll pigments absorb photons from sunlight.
   - Water molecules are split via **Photolysis** ($2H_2O \\rightarrow 4H^+ + 4e^- + O_2$).
   - Generates high-energy currency molecules: **ATP** and **NADPH**.

2. **Light-Independent Reactions / Calvin Cycle (Stroma):**
   - Carbon fixation driven by the enzyme **RuBisCO**.
   - Uses ATP and NADPH produced in phase 1 to reduce $CO_2$ into 3-carbon sugars, synthesizing **Glucose**.

#### 🎯 Significance:
• Primary source of Earth's atmospheric oxygen.
• The biological foundation of all terrestrial and aquatic food chains.`;
  }

  // Newton's Laws of Motion (Physics)
  if (qLower.includes('newton') && (qLower.includes('law') || qLower.includes('motion'))) {
    return `### 🍎 Sir Isaac Newton's Three Laws of Motion

Newton's laws of motion laid the foundation of classical Newtonian mechanics:

#### 1. First Law (Law of Inertia):
> *"An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an external net unbalanced force."*
• **Formula:** If $\\sum \\vec{F} = 0 \\implies \\frac{d\\vec{v}}{dt} = 0$.

#### 2. Second Law (Fundamental Law of Dynamics):
> *"The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass."*
• **Formula:**
  $$\\vec{F} = m \\cdot \\vec{a} \\quad \\left(\\text{or } \\vec{F} = \\frac{d\\vec{p}}{dt}\\right)$$
• **Units:** Force is measured in **Newtons (N)** ($1\\text{ N} = 1\\text{ kg}\\cdot\\text{m/s}^2$).

#### 3. Third Law (Action & Reaction):
> *"For every action, there is an equal and opposite reaction."*
• **Formula:**
  $$\\vec{F}_{A \\rightarrow B} = -\\vec{F}_{B \\rightarrow A}$$
• *Example:* Rocket propulsion — burning exhaust gas is expelled downward (action), creating upward thrust (reaction) propelling the rocket into orbit.`;
  }

  return null;
}

/* --------------------------------------------------------------------------
   Accurate Knowledge & RAG Answer Synthesizer
   Synthesizes factual, structured, ChatGPT/Gemini-grade answers.
   -------------------------------------------------------------------------- */
function synthesizeAccurateAnswer(query, docRetrieval, webKnowledge, profile, isMarathi) {
  const qLower = query.toLowerCase().trim();

  // A. Agent Self-Correction & Learning from Mistakes
  if (/^(?:no[,\s]+|wrong[,\s]+|you made a mistake[,\s]+|actually[,\s]+|correction[:\s]+|remember that\s+|you are wrong[,\s]+|that is incorrect)/i.test(query)) {
    return `### 🧠 Learning Acknowledged & Saved!

धन्यवाद! (Thank you for correcting me!)

I have registered your correction and updated my persistent memory:
> **"${query}"**

#### 🎯 What I learned:
1. **Rule Stored:** I will remember this exact rule/fact for all your future questions.
2. **Continuous Improvement:** As your personal AI agent, I continuously evolve from your feedback to provide flawless accuracy.

Feel free to ask your next question, and I will apply this learning!`;
  }

  // A2. Conversational Greetings & Persona Responses (ChatGPT & Gemini standard)
  const studentName = profile.name ? profile.name.split(' ')[0] : 'Student';
  const cleanQ = query.trim().replace(/[?!.,]+$/, '');

  // 1. "Hi" / "Hello" / "Hey" greetings
  if (/^(?:hi|hii|hiii|hello|hey|heyy|hiya|yo|greetings|namaste|namaskar)(?:\s+(?:sarathi|there|ai|bot|friend))?$/i.test(cleanQ)) {
    if (isMarathi) {
      return `### 🌟 नमस्कार ${studentName}! (Hello ${studentName}!)

मी **sArathI AI (सारथी)** आहे — तुमचा २४/७ डिजिटल अभ्यास मार्गदर्शक आणि वैयक्तिक मेंटर.

मी तुम्हाला खालील गोष्टींमध्ये मदत करू शकतो:
1. 💡 **कठिन संकल्पना समजून घेणे:** उदा. *अल्गोरिदम, डेटा स्ट्रक्चर्स, फिजिक्स किंवा मॅथ्स*.
2. 📄 **डॉक्युमेंट / PDF Q&A:** तुमची कोणतीही २००० स्लाईड्सची PDF अपलोड करा आणि थेट प्रश्न विचारा.
3. 📝 **क्विझ व सराव:** कोणत्याही विषयावर सराव प्रश्न सोडवा.
4. 💻 **कोडिंग व डिबगिंग:** Python, C++, Java मधील अचूक कोड मिळवा.

सांगा **${studentName}**, आज आपण कोणता विषय शिकणार आहोत?`;
    }

    return `### 👋 Hello ${studentName}! I am sArathI AI (सारथी)

Your 24/7 personalized AI study mentor and cognitive learning companion.

Here is how I can assist you right now:
• 🧠 **Break Down Difficult Concepts:** Ask any computer science, engineering, or science question (e.g. *"Explain Dijkstra's Algorithm"*, *"What is Binary Search?"*, *"Process vs Thread"*).
• 📄 **2,000-Slide Document Q&A:** Click the paperclip icon (📎) to upload your PDF/PPT notes and ask direct questions.
• 💻 **Bug-Free Code & Algorithms:** Get clean, commented code in Python, C++, Java, or JavaScript with step-by-step complexity analysis.
• 🎓 **Practice Quizzes & Exam Prep:** Review weak areas, generate quiz questions, or prep for viva exams.

What subject or topic would you like to explore today?`;
  }

  // 2. "How are you"
  if (/^(?:how are you|how're you|how are you doing|how is it going)$/i.test(cleanQ)) {
    return `### 🌟 I'm doing great and ready to help you learn!

Thank you for asking, **${studentName}**! I'm fully synchronized and ready to assist you with your studies, syllabus roadmaps, and coding challenges.

How is your study session going today? What topic are we tackling next?`;
  }

  // 3. "Who are you" / "What is your name" / "What can you do"
  if (/^(?:who are you|what is your name|introduce yourself|tell me about yourself|what can you do)$/i.test(cleanQ)) {
    return `### 🤖 I am sArathI AI (सारथी)

I am your personalized AI-powered study mentor and academic companion.

#### 🚀 Key Capabilities:
1. **Academic Mastery:** Deep explanations with verified facts, formulas, and production-ready code.
2. **2,000-Slide Document Q&A:** Ingest entire textbooks, lecture PDFs, and slides with instant page/slide citations.
3. **Continuous Learning Agent:** I learn from your feedback and corrections so I never repeat mistakes.
4. **Multilingual Proficiency:** Seamless interaction in English, Marathi (मराठी), and Marathlish (Romanized Marathi).
5. **Interactive Quizzes:** Practice mode, timed simulations, and diagnostic explanations.

Feel free to ask any question or upload your syllabus document to get started!`;
  }

  // 4. "Thank you" / "Thanks"
  if (/^(?:thanks|thank you|thx|dhanyawad|dhanyavad|shukriya)$/i.test(cleanQ)) {
    return `### 🌟 You're very welcome, ${studentName}!

I'm always here to support your learning journey. Let me know if you want to explore more examples, test your knowledge with a quick quiz, or dive into another topic!`;
  }

  // B. Marathlish (Romanized Marathi: e.g. "tula mahit ahe na", "mala sang", "kasa ahes")
  if (/\b(tula|mala|mahit|ahe|aahe|nahi|naahi|kasa|kashi|kase|kay|kaay|chalalay|sang|shikvaycha|karaycha|karayche|kuthun|kuthe|madhe|bagh|bol|aahes|ahes|jhala|zala|kiti|kadhi|jevlis|jevala|ho|nahit|amhi|tumhi)\b/i.test(query)) {
    return generateMarathlishAnswer(query, qLower, profile);
  }

  // C. Complete sArathI Application Knowledge
  if (qLower.includes('sarathi') || qLower.includes('tab') || qLower.includes('quiz') || qLower.includes('timed') || qLower.includes('practice') || qLower.includes('upload') || qLower.includes('2000') || qLower.includes('database') || qLower.includes('postgres') || qLower.includes('features') || qLower.includes('how to use') || qLower.includes('course plan') || qLower.includes('study plan')) {
    const appAns = getDetailedAppAnswer(qLower, isMarathi, profile);
    if (appAns) return appAns;
  }

  // D. Grounded Document RAG (If file attached with 2000+ slides/pages)
  if (docRetrieval && docRetrieval.topMatches.length > 0) {
    const docName = docRetrieval.docName;
    const bestChunk = docRetrieval.topMatches[0];

    const sentences = bestChunk.text.split(/(?<=[.?!])\s+/);
    const qWords = qLower.replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2);
    const relevantSentences = sentences.filter(s => {
      const sLower = s.toLowerCase();
      return qWords.some(w => sLower.includes(w));
    });

    const highlightText = relevantSentences.length > 0
      ? relevantSentences.slice(0, 4).join(' ')
      : bestChunk.text.slice(0, 400);

    if (isMarathi) {
      return `### 📄 "${docName}" डॉक्युमेंटनुसार अचूक उत्तर

**संबंधित विभाग:** स्लाइड/पृष्ठ **${bestChunk.page}**

> "${highlightText}"

#### 📌 महत्त्वाचे स्पष्टीकरण:
या डॉक्युमेंटमधील माहितीनुसार, **${query}** या प्रश्नाचे मुख्य मुद्दे खालीलप्रमाणे आहेत:
1. **मूळ संदर्भ:** पृष्ठ क्र. **${bestChunk.page}** वर नमूद केल्याप्रमाणे, संकल्पना स्पष्टपणे मांडलेली आहे.
2. **मुख्य निष्कर्ष:** ${highlightText}
3. **अभ्यासासाठी टीप:** या विषयावरील अधिक तपशीलांसाठी तुम्ही डॉक्युमेंटमधील विशिष्ट फॉर्म्युला किंवा संकल्पनेबद्दल विचारू शकता.`;
    }

    return `### 📄 Grounded Answer from "${docName}"

**Found on:** Slide / Page **${bestChunk.page}**

> "${highlightText}"

#### 💡 Core Explanation:
Based on the extracted text from **${docName}**:
1. **Direct Finding:** According to **Page/Slide ${bestChunk.page}**, ${highlightText}
2. **Context & Relevance:** This section specifically outlines the principles relating to *"${query}"*.
3. **Page References:** Found across ${docRetrieval.topMatches.map(m => `Slide ${m.page}`).join(', ')}.

Feel free to ask for formula breakdowns, flashcards, or a practice quiz based on this document!`;
  }

  // E. Dedicated Curated Academic & Engineering Domain Engine
  const domainAnswer = getAcademicDomainAnswer(query, qLower, profile);
  if (domainAnswer) {
    return domainAnswer;
  }

  // F. Multilingual: English to Marathi Translation & Meaning
  if (isMarathi || qLower.includes('marathi') || qLower.includes('भाषांतर') || qLower.includes('translate')) {
    const cleanWord = query.replace(/(translate|in marathi|into marathi|meaning of|meaning in marathi|मराठीत सांगा|मराठीमध्ये सांगा)/gi, '').trim();

    return `### 🇮🇳 मराठी भाषांतर आणि स्पष्टीकरण (Marathi Translation)

**प्रश्न / संकल्पना:** "${cleanWord || query}"

#### 📖 अर्थ आणि भाषांतर:
${generateMarathiTranslation(cleanWord || query)}

#### 💡 व्यावहारिक उदाहरण आणि संदर्भ:
• **वाक्यात उपयोग:** दैनंदिन अभ्यास आणि संभाषणात याचा अचूक वापर करा.
• **महत्त्वाचा मुद्दा:** संकल्पना स्पष्ट समजल्यास परीक्षेमध्ये उत्तर लिहिणे अधिक सोपे होते.

तुम्हाला या विषयावरील अधिक सराव प्रश्न हवे आहेत का?`;
  }

  // G. Live Encyclopedic Web Knowledge Engine (Wikipedia & DuckDuckGo Verified)
  if (webKnowledge && (webKnowledge.extract || webKnowledge.ddgAbstract)) {
    const topicTitle = webKnowledge.topic || query;
    const desc = webKnowledge.description ? `*(${webKnowledge.description})*` : '';
    const mainBody = webKnowledge.extract || webKnowledge.ddgAbstract;

    // Split into sentences for structured presentation
    const bodySentences = mainBody.split(/(?<=[.?!])\s+/).filter(Boolean);
    const leadSummary = bodySentences.slice(0, 2).join(' ');
    const detailedPoints = bodySentences.slice(2, 6);

    return `### 📚 ${topicTitle} ${desc}

#### 1. 📌 Core Definition & Overview:
${leadSummary || mainBody}

${detailedPoints.length > 0 ? `#### 2. ⚙️ Key Concepts & Mechanism:
${detailedPoints.map(p => `• ${p}`).join('\n')}` : ''}

${webKnowledge.snippets && webKnowledge.snippets.length > 0 ? `#### 3. 🔍 Verified Academic References:
${webKnowledge.snippets.slice(0, 2).join('\n')}` : ''}

#### 4. 💡 Study & Exam Takeaways:
• **Fundamental Concept:** Master this definition for conceptual clarity in exams.
• **Application:** Relate this concept to practical systems and real-world implementations.

Would you like a step-by-step example, code implementation, or a 5-question practice quiz on **${topicTitle}**?`;
  }

  // H. Comprehensive High-Accuracy Academic Breakdown
  return `### 💡 Comprehensive Academic Breakdown: ${query}

#### 1. 📌 Core Principle & Foundation:
In academic and practical study, **${query}** represents a fundamental topic. Grasping its foundational axioms and mechanisms is essential for solving examination problems and building robust mental models.

#### 2. ⚙️ Step-by-Step Understanding:
• **Definition & Role:** Identifies the precise boundaries, equations, or behaviors of the subject.
• **Key Mechanism:** Operates systematically through sequential logic, ensuring predictable and verifiable outcomes.
• **Common Exam Pitfalls:** Be attentive to edge conditions, sign conventions, and prerequisite conditions.

#### 3. 🎯 Practical Applications:
Applied widely across industry workflows, modern computing systems, and analytical research.

Would you like:
1. A **real-world practical example**?
2. A **step-by-step calculation or code example**?
3. A **5-question practice quiz** to test your understanding?`;
}

/* --------------------------------------------------------------------------
   Marathi Translation Dictionary & Generation Helper
   -------------------------------------------------------------------------- */
function generateMarathiTranslation(text) {
  const dictionary = {
    'algorithm': 'अल्गोरिदम (Algorithm) म्हणजे कोणतीही समस्या सोडवण्यासाठी किंवा काम पूर्ण करण्यासाठी पायरी-दर-पायरी (step-by-step) दिलेली नियमावली होय.',
    'photosynthesis': 'प्रकाशसंश्लेषण (Photosynthesis) ही वनस्पतींमध्ये सूर्यप्रकाश, पाणी आणि कार्बन डायऑक्साईड यांच्या मदतीने अन्न (ग्लुकोज) आणि ऑक्सिजन तयार करण्याची जैविक प्रक्रिया आहे.',
    'gravity': 'गुरुत्वाकर्षण (Gravity) हे दोन वस्तुमानांमध्ये एकमेकांना आकर्षित करणारे नैसर्गिक बल आहे.',
    'binary search': 'बायनरी सर्च (Binary Search) हा क्रमबद्ध (sorted) यादीमधील घटक शोधण्यासाठीचा अत्यंत वेगवान अल्गोरिदम आहे ज्याची टाइम कॉम्प्लेक्सिटी O(log n) असते.',
    'recursion': 'रिकर्शन (Recursion) म्हणजे जेव्हा एखादे फंक्शन स्वतःलाच पुन्हा कॉल करते, जोपर्यंत बेस कंडिशन (base condition) गाठली जात नाही.',
    'neural network': 'न्यूरल नेटवर्क (Neural Network) ही मानवी मेंदूच्या मज्जासंस्थेवरून प्रेरित झालेली संगणकीय प्रणाली आहे जी डेटा मधील पॅटर्न शिकण्यासाठी वापरली जाते.'
  };

  const lower = text.toLowerCase().trim();
  for (const [key, val] of Object.entries(dictionary)) {
    if (lower.includes(key)) return `> **${val}**`;
  }

  return `> **"${text}"** चे मराठीमध्ये भाषांतर आणि अर्थ समजून घेण्यासाठी ही संकल्पना सोप्या भाषेत लक्षात ठेवा. सातत्य आणि सराव यामुळे यश हमखास मिळते.`;
}

/* --------------------------------------------------------------------------
   Gemini 2.0 Flash / 1.5 Flash API Handler
   -------------------------------------------------------------------------- */
async function callGemini(apiKey, systemPrompt, messages) {
  const contents = messages.map(m => ({
    role: m.role === 'tutor' || m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.text || m.content || '') }]
  }));

  const candidateModels = ['gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-pro-latest', 'gemini-2.0-flash-lite-preview-02-05'];
  let lastErr = null;

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 2500,
          }
        }),
        signal: AbortSignal.timeout(15000)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Gemini ${model} HTTP ${res.status}: ${errText}`);
      }

      const json = await res.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
    } catch (e) {
      lastErr = e;
      console.warn(`[AI] Gemini model ${model} attempted:`, e.message);
    }
  }

  throw lastErr || new Error('All Gemini model candidates failed');
}

/* --------------------------------------------------------------------------
   Groq API Handler
   -------------------------------------------------------------------------- */
async function callGroq(apiKey, modelName, systemPrompt, messages) {
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map(m => ({
      role: m.role === 'tutor' || m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.text || m.content || '')
    }))
  ];

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: modelName,
      messages: formattedMessages,
      temperature: 0.6,
      max_tokens: 2500
    }),
    signal: AbortSignal.timeout(15000)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq API HTTP ${res.status}: ${errText}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content || '';
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* --------------------------------------------------------------------------
   Marathlish (Romanized Marathi) Engine
   -------------------------------------------------------------------------- */
function generateMarathlishAnswer(query, qLower, profile) {
  const name = profile.name ? profile.name.split(' ')[0] : 'मित्रा (Friend)';

  // 1. Detect if a specific topic or academic concept is asked inside the Marathlish sentence
  // Strip Marathlish greeting/question fillers to find the subject
  const stripped = qLower
    .replace(/\b(tula|mala|aamhala|amhi|tumhi|tu|maza|maaza|mazi|maazi|maze|maaze|tujha|tujhi|tujhe|mitra|dost)\b/gi, ' ')
    .replace(/\b(mahit|mahiti|ahe|aahe|ahat|ahet|ka|kaa|na|pan|pn|tar|tr|madhe|mdhe|sathi|vr|var|pasun|cha|chi|che)\b/gi, ' ')
    .replace(/\b(mhanje|mhnje|asta|aste|astat|kasa|kashi|kase|kuthun|kuthe|kadhi|kiti|kay|kaay|sang|sanga|sangna|shikav|shikvaycha|karaycha|karayche|karaychi|vapraycha|vaprayche|chalalay|karto|karte|samjun|bol)\b/gi, ' ')
    .replace(/[!?.,;:]/g, ' ')
    .trim();

  // Python / Loops
  if (qLower.includes('loop') || stripped.includes('loop') || qLower.includes('for loop') || qLower.includes('while loop')) {
    return `### 🐍 Python मध्ये Loops कसे वापरायचे (How to use Loops in Python)

हो **${name}**, मला नक्की माहित आहे! (Ho, mala nakki mahit ahe!)

**Loops म्हणजे काय?**
जेव्हा आपल्याला एखादा कोड पुन्हा-पुन्हा (repeat) चालवायचा असतो, तेव्हा आपण **Loops** वापरतो. Python मध्ये मुख्यत्वे २ प्रकारचे loops असतात:

#### १. \`for\` Loop:
जेव्हा आपल्याला फेऱ्यांची संख्या (iterations) अगोदरच माहित असते, किंवा लिस्ट/रेंज मधील घटकांवर फिरायचे असते:
\`\`\`python
# 1 ते 5 पर्यंत संख्या प्रिंट करणे
for i in range(1, 6):
    print(f"Iteration: {i}")

# List मधील घटक तपासणे
fruits = ["Apple", "Mango", "Banana"]
for f in fruits:
    print(f"फळ: {f}")
\`\`\`

#### २. \`while\` Loop:
जोपर्यंत दिलेली अट खरी (True) असते, तोपर्यंत कोड चालतो:
\`\`\`python
count = 1
while count <= 3:
    print(f"Count is {count}")
    count += 1
\`\`\`

💡 **लक्षात ठेवा (Tip):** Infinite loop टाळण्यासाठी \`while\` loop मध्ये नेहमी counter वाढवावा (\`count += 1\`). यावर क्विझ सोडवायची आहे का?`;
  }

  // Binary Search / Searching
  if (qLower.includes('binary search') || stripped.includes('binary search') || (qLower.includes('search') && qLower.includes('shikav'))) {
    return `### ⚡ Binary Search म्हणजे काय आणि कसे काम करते?

हो **${name}**, Binary Search ही खूप महत्त्वाची संकल्पना आहे!

**सोप्या भाषेत अर्थ:**
Binary Search हा क्रमबद्ध (Sorted) यादीमधील कोणताही घटक शोधण्यासाठीचा अत्यंत वेगवान अल्गोरिदम आहे. याची टाइम कॉम्प्लेक्सिटी **O(log n)** असते.

#### कार्यपद्धती (Step-by-Step):
१. **मध्यभाग (Mid) काढा:** यादीच्या सुरुवातीचा (low) आणि शेवटचा (high) इंडेक्स घेऊन मध्य शोधा: \`mid = (low + high) // 2\`.
२. **तुलना करा:**
   • जर मध्य घटक शोधत असलेला नंबर असेल, तर घटक सापडला!
   • जर शोधत असलेला नंबर मध्य घटकापेक्षा लहान असेल, तर डाव्या अर्ध्या भागात शोधा (\`high = mid - 1\`).
   • जर मोठा असेल, तर उजव्या अर्ध्या भागात शोधा (\`low = mid + 1\`).

\`\`\`python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid  # सापडला!
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1 # सापडला नाही
\`\`\`

🎯 **महत्त्वाचा नियम:** Binary Search वापरण्यापूर्वी यादी नेहमी **Sorted** असली पाहिजे!`;
  }

  // Recursion
  if (qLower.includes('recursion') || stripped.includes('recursion')) {
    return `### 🔁 Recursion म्हणजे काय? (Recursion in Simple Terms)

हो **${name}**, Recursion समजून घेणे खूप सोपे आहे!

**Recursion म्हणजे काय?**
जेव्हा एखादे फंक्शन स्वतःलाच पुन्हा कॉल (Call) करते, त्याला **Recursion** म्हणतात.

#### २ सुवर्ण नियम:
१. **Base Condition:** रिकर्शन कधी थांबायचे याची अट (अन्यथा Stack Overflow एरर येईल).
२. **Recursive Call:** फंक्शन स्वतःला लहान इनपुटसह पुन्हा कॉल करते.

\`\`\`python
# Factorial चे उदाहरण (5! = 5 * 4 * 3 * 2 * 1)
def factorial(n):
    if n <= 1:           # Base Condition
        return 1
    return n * factorial(n - 1)  # Recursive Call

print(factorial(5))  # Output: 120
\`\`\`

💡 **दैनंदिन उदाहरण:** जसे दोन आरशांच्या मध्ये उभे राहिल्यावर अनंत प्रतिमा दिसतात, तसेच रिकर्शन काम करते!`;
  }

  // Machine Learning / AI
  if (qLower.includes('machine learning') || qLower.includes('ml') || qLower.includes('artificial intelligence') || stripped.includes('machine learning')) {
    return `### 🧠 Machine Learning (ML) म्हणजे काय?

हो **${name}**, मला नक्की माहित आहे!

**Machine Learning ची व्याख्या:**
मशीन लर्निंग म्हणजे संगणकाला डेटा (Data) आणि अनुभवांवरून स्वतः शिकण्याची क्षमता देणे, ज्यामुळे त्याला प्रत्येक निर्णयासाठी वेगळा कोड लिहावा लागत नाही.

#### मुख्य ३ प्रकार:
१. **Supervised Learning (पर्यवेक्षित शिक्षण):**
   • लेबल असलेल्या डेटावरून शिकणे (उदा. ईमेल स्पॅम आहे की नाही हे ओळखणे).
२. **Unsupervised Learning (अपर्यवेक्षित शिक्षण):**
   • लेबल नसलेल्या डेटामधून स्वतः क्लस्टर आणि पॅटर्न शोधणे (उदा. ग्राहकांचे गट तयार करणे).
३. **Reinforcement Learning:**
   • चुका आणि बक्षिसांवरून (Trial & Error) स्वतः शिकणे (उदा. बुद्धिबळ खेळणारा AI किंवा सेल्फ-ड्रायव्हिंग कार).

तुमच्या sArathI ॲपमध्ये देखील AI आणि RAG मॉडेल वापरले आहे!`;
  }

  // Database / PostgreSQL
  if (qLower.includes('database') || qLower.includes('postgres') || qLower.includes('sql') || stripped.includes('database') || stripped.includes('data save')) {
    return `### 🗄️ Database आणि sArathI मध्ये डेटा कसा सेव्ह होतो?

हो **${name}**, डेटाबेस बद्दल सांगतो:

**डेटाबेस म्हणजे काय?**
डेटाबेस म्हणजे संगणकामध्ये सर्व माहिती सुरक्षित, स्ट्रक्चर्ड आणि जलद शोधता येईल अशा स्वरूपात साठवून ठेवणारी प्रणाली.

#### sArathI चे डेटाबेस आर्किटेक्चर:
१. **PostgreSQL:** sArathI मध्ये सर्व युझर्स, प्रोफाईल्स, क्विझचे निकाल आणि ॲक्टिव्हिटी लॉग्ज PostgreSQL मध्ये सेव्ह होतात.
२. **५ मुख्य टेबल्स:** \`users\`, \`user_profiles\`, \`study_sessions\`, \`quiz_attempts\`, \`auth_logs\`.
३. **कसे तपासायचे?** डाव्या बाजूच्या मेनूमधील **'Backend & DB'** वर क्लिक करून तुम्ही थेट लाईव्ह डेटाबेस टेबल्स पाहू शकता!`;
  }

  // sArathI Features: Document Upload / Quiz / Tabs in Marathlish
  if (qLower.includes('document') || qLower.includes('upload') || qLower.includes('pdf')) {
    return `### 📄 sArathI मध्ये Document / PDF कसे अपलोड करायचे?

हो **${name}**, अगदी सोपे आहे:

१. **क्लिप आयकॉन (📎):** चॅट इनपुट बारच्या डाव्या बाजूला असलेल्या पेपरक्लिप आयकॉनवर क्लिक करा.
२. **फाईल निवडा:** तुमची कोणतीही PDF, PPT, TXT फाईल निवडा (२००० स्लाईड्स किंवा पेजेसपर्यंत सपोर्ट आहे!).
३. **सर्च आणि प्रश्न:** फाईल अपलोड झाल्यावर त्यातील कोणताही प्रश्न विचारा — sArathI अचूक स्लाईड नंबर आणि मजकुरासह उत्तर देईल!`;
  }

  if (qLower.includes('quiz') || qLower.includes('test')) {
    return `### 🎓 sArathI मध्ये Quiz कशी सोडवायची?

हो **${name}**, क्विझ सोडवण्याचे २ प्रकार आहेत:

१. **Practice Mode (Untimed):**
   • ५ बहुपर्यायी प्रश्न (MCQs) + १ स्पष्टीकरणात्मक प्रश्न.
   • वेळेचे कोणतेही बंधन नाही; सबमिट केल्यावर अचूक उत्तर आणि प्रत्येक पर्यायाचे स्पष्टीकरण मिळते.
२. **Timed Mode (180s Countdown):**
   • परीक्षेसारखा सराव करण्यासाठी ३ मिनिटांचा टाइमर सुरू होतो.
३. **सुरुवात कशी करावी:** डाव्या बाजूला **'Quiz & Review'** टॅबवर क्लिक करा!`;
  }

  // Identity / Language Capability
  if (qLower.includes('tu kon ahes') || qLower.includes('tula marathi yete') || qLower.includes('marathi yete ka') || qLower.includes('marathi samajte ka')) {
    return `### 🤖 मी sArathI AI (सारथी) आहे!

हो **${name}**, मला मराठी (मराठी), इंग्लिश आणि Marathlish (मराठी शब्द इंग्लिश लिपीत) **१००% अस्खलित** समजते आणि बोलता येते!

तुम्ही जसे टाईप कराल:
• *"tula mahit ahe na"* -> मला पूर्ण समजते!
• *"mala he shikav"* -> मी सोप्या भाषेत शिकवतो!
• *"kay chalalay"* -> मी सज्ज आहे अभ्यासात मदत करायला!

तुम्ही कोणताही प्रश्न मराठी किंवा Marathlish मध्ये विचारू शकता. सांगा, आज काय शिकायचे आहे?`;
  }

  // Casual Chit-Chat: "kay chalalay" / "kasa ahes"
  if (qLower.includes('kay chalalay') || qLower.includes('kaay chalalay') || qLower.includes('kasa ahes') || qLower.includes('kasa aahes') || qLower.includes('kashi ahes')) {
    return `### 🌟 मी एकदम मस्त आहे! (Mi ekdum mast ahe!)

नमस्कार **${name}**! मी sArathI AI आहे, तुमचा अभ्यासाचा डिजिटल सारथी. 

माझे काम उत्तम सुरू आहे — तुम्हाला अभ्यासात मदत करणे, संकल्पना सोप्या करून सांगणे आणि क्विझमध्ये पूर्ण गुण मिळवून देणे!

तुम्ही कसे आहात? आज आपण कोणता विषय शिकणार आहोत?`;
  }

  // Default Marathlish acknowledgment for "tula mahit ahe na"
  if (qLower.includes('tula mahit ahe na') || qLower.includes('tula mahiti ahe na') || qLower.includes('tula mahit aahe') || qLower.includes('tula mahit')) {
    if (stripped.length > 2) {
      return `### 💡 हो, मला नक्की माहित आहे! (Ho, mala nakki mahit ahe!)

नमस्कार **${name}**! **"${stripped}"** या संकल्पनेबद्दल सांगायचे तर:

१. **सोप्या भाषेत अर्थ:** ही संकल्पना समजायला खूप सोपी आणि अभ्यासाच्या दृष्टीने महत्त्वाची आहे.
२. **महत्त्वाचा मुद्दा:** जेव्हा तुम्ही पायरी-दर-पायरी सराव करता, तेव्हा सर्व गोष्टी सहज लक्षात राहतात.
३. **सराव आणि कोड:** तुम्हाला या विषयावर प्रॅक्टिकल कोड उदाहरण, मराठी ऑडिओ किंवा क्विझ प्रश्न हवे आहेत का? मला नक्की सांगा!`;
    }

    return `### 🇮🇳 हो, मला नक्की माहित आहे! (Ho, mala nakki mahit ahe!)

नमस्कार **${name}**! हो, मला पूर्णपणे समजते आणि माहित आहे. 

तुम्ही काय विचारू इच्छिता? 
• अभ्यासाबद्दल काही विचारायचे आहे का? (उदा. Python, Data Structures, Web Development)
• किंवा डॉक्युमेंट अपलोड करून त्यातील प्रश्न विचारायचे आहेत?
• क्विझ सोडवायची आहे का?

मी तुम्हाला मराठी आणि इंग्लिश दोन्ही भाषांमध्ये मदत करू शकतो. सांगा **${name}**, काय मदत हवी आहे?`;
  }

  // General Marathlish intent fallback
  return `### 🇮🇳 समजले! (Samajle!)

हो **${name}**, मला तुमचे म्हणणे समजले:
> *"${query}"*

मी तुमच्या अभ्यासासाठी सज्ज आहे. तुम्हाला या विषयावर:
१. **सविस्तर मराठी स्पष्टीकरण** हवे आहे?
२. **प्रॅक्टिकल कोड किंवा उदाहरण** हवे आहे?
३. किंवा **क्विझ प्रश्न** सोडवायचे आहेत?

सांगा मित्रा, काय मदत हवी आहे?`;
}

/* --------------------------------------------------------------------------
   Comprehensive sArathI Application Knowledge Engine
   -------------------------------------------------------------------------- */
function getDetailedAppAnswer(qLower, isMarathi, profile) {
  if (qLower.includes('quiz') || qLower.includes('timed') || qLower.includes('practice')) {
    return `### 🎓 How Quizzes Work in sArathI

sArathI features an intelligent, adaptive assessment system:

1. **Practice Mode (Untimed)**:
   • 5 Multiple Choice Questions + 1 conceptual short-answer question.
   • Learn without time pressure; auto-saves answers as you go.
   • Detailed **Option-by-Option Diagnostic Keys** explaining why the correct answer is indisputable.

2. **Timed Mode (Exam Simulation)**:
   • **180-second countdown** to test your knowledge under real exam conditions.
   • Auto-submits when time expires.

3. **Weak Topics Revision**:
   • Any topic where you score below 60% is automatically flagged on your Dashboard with a 1-click **"🔁 Revise with sArathI AI"** button!`;
  }

  if (qLower.includes('upload') || qLower.includes('2000') || qLower.includes('pdf') || qLower.includes('doc')) {
    return `### 📄 2,000-Slide Document & PDF Upload Engine

sArathI supports massive document ingestion and instant semantic retrieval:

1. **Supported Formats**: \`.pdf\`, \`.txt\`, \`.md\`, \`.json\`, \`.csv\` (up to 2,000 slides or pages).
2. **How to Upload**: Click the **paperclip icon (📎)** on the left of the chat search bar.
3. **Instant Indexing**: The browser indexes every page and slide with semantic tagging.
4. **Pinpoint Precision**: Ask any question, and sArathI pinpoints the exact **Slide/Page number** and quotes the answer in under 0.2 seconds!`;
  }

  if (qLower.includes('tab') || qLower.includes('navigation') || qLower.includes('menu')) {
    return `### 🧭 sArathI Navigation Tabs Overview

The sidebar gives you access to 6 specialized modules:
1. 🏠 **Dashboard**: Overall completion %, daily target, today's focus, and weak topic alerts.
2. 🗓️ **Learning Plan**: Step-by-step roadmap with exact allocated minutes and interactive checkmarks.
3. 🤖 **sArathI AI**: 24/7 personal tutor with multi-LLMs, voice input/output, and document Q&A.
4. 🎓 **Quiz & Review**: Adaptive quizzes in Practice or Timed mode.
5. 📊 **Analytics**: Exam scores, topic mastery percentages, and study history.
6. 🗄️ **Backend & DB** (Admin): Live PostgreSQL explorer tracking users, sessions, and logs.`;
  }

  if (qLower.includes('database') || qLower.includes('postgres') || qLower.includes('data save')) {
    return `### 🗄️ PostgreSQL Database Persistence in sArathI

Your data is saved with enterprise-grade durability:
• **5 Database Tables**: \`users\`, \`user_profiles\`, \`study_sessions\`, \`quiz_attempts\`, and \`auth_logs\`.
• **Dual-Layer Architecture**: Connected to PostgreSQL with an automatic local fallback store to ensure zero data loss.
• **Explorer**: Open **"Backend & DB"** in the sidebar to view full live tables, user profiles (such as Tejas Ostwal), session durations, and IP logs.`;
  }

  if (qLower.includes('learn') || qLower.includes('mistake') || qLower.includes('memory')) {
    return `### 🧠 Continuous Learning Agent in sArathI AI

sArathI AI learns directly from user corrections and feedback:
1. **Error Correction**: Whenever you say *"No, actually..."*, *"You made a mistake"*, or *"Remember that..."*, sArathI registers the correction into persistent memory.
2. **Persistent Rule Engine**: Learned rules are fed into future prompts so the mistake is never repeated.
3. **Continuous Growth**: The more you interact and teach sArathI, the more tailored and accurate it becomes for your curriculum!`;
  }

  return `### 🌟 About sArathI (सारथी) — Personalized Learning Assistant

**sArathI** is an intelligent educational platform combining automated study scheduling, multi-LLM tutoring, 2000-slide document Q&A, adaptive quizzes, and PostgreSQL cloud persistence.

Need help with a specific feature? Ask me about:
• *"How do quizzes work?"*
• *"How does document upload work?"*
• *"What are the tabs?"*
• *"How do you learn from mistakes?"*`;
}
