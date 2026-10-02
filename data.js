/* ============================================================
   Free LLM Radar — data file
   ------------------------------------------------------------
   This is the ONLY file the daily refresh job rewrites.
   index.html is the stable presentation layer — do not regenerate it.

   Schema per offer:
     id          unique slug (stable across runs — do not rename)
     name        provider display name
     sub         short qualifier shown next to the name
     kind        'portable' | 'client' | 'keyless' | 'credit'
     budget      NUMBER used for sorting. 0 = unmetered/unpublished.
     unit        how to read budget, e.g. 'tokens/day', 'tokens one-time', '$300'
     end         ISO date 'YYYY-MM-DD' or null for ongoing
     added       ISO date the offer surfaced or last materially changed
     status      'new' | 'extended' | 'expiring' | 'active'
     card        true if a credit card is required
     china       true if the provider serves China directly
     reach       'global' | 'cn-direct' | 'cn-only'
                   global    = a user outside mainland China can sign up and use it
                   cn-direct = Chinese vendor, but reachable from outside (intl
                               platform, gateway, or region-aware routing)
                   cn-only   = mainland account / phone number / real-name ID
                               required; effectively unusable from outside
                 Set this on every new offer. `china` is the older boolean and is
                 kept only for compatibility — `reach` is the field the dashboard
                 filters on. cn-only is NOT the same as china:true.
     link        direct signup / key-creation URL (NOT the marketing homepage)
     linkLabel   button text, e.g. 'Get key'
     budgetNote  human-readable allowance description
     models      array of exact model IDs
     base        API base URL, or a '— client-bound' note
     auth        auth style
     steps       array of numbered setup steps (HTML allowed inline)
     test        copy-paste verification command
     warn        optional red callout (HTML allowed)
     note        optional blue callout (HTML allowed)

   Rules for the refresh job:
     - NEVER delete an offer without recording it in the rail under 'closed'
     - Preserve existing ids exactly; new offers get new slugs
     - Set status 'new' only on the run where an offer first appears
     - Update 'added' only when the offer materially changes
     - Re-verify 'end' dates every run — promotions get extended silently
     - Keep budget/unit honest: a daily cap is not equivalent to a one-time grant
   ============================================================ */

window.RADAR = {
  updated: '2026-10-02T08:20:00+08:00',
  verifiedBy: 'Run 2 of 2026-10-02. Vendor primary pages read directly: workbuddy.cn/events/invite (即日起至2026年10月31日 + 受邀好友 2,000 积分 截止日期 2026年10月31日 — both unchanged), docs.qoder.com/events/flashoffer (still free, end date still TBA), vercel.com/changelog/ling-3-1-flash-is-now-available-on-ai-gateway (free to 13 Oct, unchanged), vercel.com/ai-gateway/models/laya (Laya, free, promo ends 31 Oct — NOT added, out of scope), opencode.ai/docs/zen (all ten free models still "limited time", NO published end dates — tracker-claimed 5/10 Oct expiries rejected), inference-docs.cerebras.ai/support/change-log ($5 trial credit after a verified payment method — correction of 2026-10-02 stands), ai21.com/pricing vs docs.ai21.com/docs/usage-cost (AI21 own pages DISAGREE on trial length: 7 days vs three months — see the ai21 note). Tracker-corroborated, not vendor-read: MiniMax Code double check-in + ZCode Trust Build + GLM night-free all still to 7 Oct (aipromonow, igetoken); Hunyuan Hy3 限免 + Hy4 night-free to 31 Oct, night hours 23:00-08:00, Hy4 last start 10 Oct (aipromonow).',
  offers: [
  {
    "id": "amd",
    "name": "AMD Radeon Cloud",
    "sub": "Token Factory",
    "kind": "portable",
    "budget": 0,
    "unit": "$10/day",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": true,
    "reach": "cn-direct",
    "link": "https://developer.amd.com.cn/en/radeon/tokenfactory",
    "linkLabel": "Get key",
    "budgetNote": "~$10/day spend cap, resets Asia/Shanghai midnight · 30 req/min · 8 concurrent",
    "models": [
      "DeepSeek-V4-Flash",
      "DeepSeek-V4-Flash-0731",
      "DeepSeek-V4.1-Flash",
      "DeepSeek-V4-Flash-Vision-Exp",
      "Qwen3.8-Flash-Next",
      "Qwen3.8-27B",
      "GLM-5.3-Flash",
      "MiMo-V2.6-Flash",
      "MiniCPM5-2B",
      "MinerU2.5-Pro"
    ],
    "base": "https://developer.amd.com.cn/radeon/api/v1",
    "auth": "Bearer (OpenAI) / x-api-key (Anthropic)",
    "steps": [
      "Go to <b>developer.amd.com.cn/en/radeon/tokenfactory</b> — the <b>/en/</b> path gives English labels.",
      "Click <b>登录 / Log in</b> top-right, choose the <b>verification code</b> tab.",
      "Enter your email → <b>发送验证码 / Send code</b> → enter the 6-digit code. No card, no ID check.",
      "Click a model under <b>Public Free Model APIs</b>, copy the API Key (starts <b>sk-</b>).",
      "One key drives every free model — no separate key per model."
    ],
    "test": "curl https://developer.amd.com.cn/radeon/api/v1/chat/completions \\\n  -H \"Authorization: Bearer $AMD_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"DeepSeek-V4-Flash\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "<b>Two traps.</b> The page has two model blocks — <b>Public Free Model APIs</b> (free) and <b>Dedicated Model APIs</b> (consumes credits), with the same MiniCPM models in both. Always take from Public. Second: first-token latency is slow, worse at peak. Flagged BETA, so the roster can change.",
    "note": "Rare and valuable: speaks <b>both OpenAI and Anthropic protocols</b> on one key. Claude Code works with no translation proxy — set ANTHROPIC_BASE_URL to the same URL."
  },
  {
    "id": "groq",
    "name": "Groq",
    "sub": "LPU inference",
    "kind": "portable",
    "budget": 200000,
    "unit": "tokens/day",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://console.groq.com/keys",
    "linkLabel": "Get key",
    "budgetNote": "30 req/min · 1,000 req/day · 8K tokens/min · 200K tokens/day",
    "models": [
      "openai/gpt-oss-120b",
      "openai/gpt-oss-20b",
      "qwen/qwen3.8-27b",
      "whisper-large-v3"
    ],
    "base": "https://api.groq.com/openai/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Go to <b>console.groq.com/keys</b>, sign up with Google, GitHub or email.",
      "Click <b>Create API Key</b>, name it anything.",
      "Copy it immediately — shown once only. Starts with <b>gsk_</b>."
    ],
    "test": "curl https://api.groq.com/openai/v1/chat/completions \\\n  -H \"Authorization: Bearer $GROQ_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"openai/gpt-oss-120b\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "<b>The 200K token/day cap is the real limit.</b> 1,000 requests sounds generous but works out to ~200 tokens per request. Chat is fine; a coding agent with file context exhausts a day's budget in a handful of turns. Cached tokens do not count."
  },
  {
    "id": "gemini",
    "name": "Google Gemini",
    "sub": "Flash / Flash-Lite line",
    "kind": "portable",
    "budget": 0,
    "unit": "unpublished",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://aistudio.google.com/apikey",
    "linkLabel": "Get key",
    "budgetNote": "~15 req/min · 1,500 req/day (Google no longer publishes these — read them in AI Studio)",
    "models": [
      "gemini-3.8-flash",
      "gemini-3.7-flash",
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.1-flash-lite",
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
      "gemma-4"
    ],
    "base": "https://generativelanguage.googleapis.com/v1beta/openai/",
    "auth": "Authorization: Bearer",
    "steps": [
      "Go to <b>aistudio.google.com/apikey</b>, sign in with a Google account.",
      "Click <b>Create API key</b>. Pick an existing Cloud project or let it create one.",
      "Copy the key — starts with <b>AIza</b>."
    ],
    "test": "curl https://generativelanguage.googleapis.com/v1beta/openai/chat/completions \\\n  -H \"Authorization: Bearer $GEMINI_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"gemini-3.5-flash\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "<b>Google's own pricing table marks free-tier content as used to improve their products.</b> Paid tier says no. This disqualifies the free tier for client code, proprietary source, or anything under an NDA. Pro models are not free at all.",
    "note": "<b>Endpoint quirk:</b> the native path wants <b>?key=</b> as a query parameter, not a Bearer header. Use the <b>/openai/</b> path shown above and your existing OpenAI code works unchanged."
  },
  {
    "id": "openrouter",
    "name": "OpenRouter",
    "sub": "Model aggregator",
    "kind": "portable",
    "budget": 0,
    "unit": "req/day",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://openrouter.ai/keys",
    "linkLabel": "Get key",
    "budgetNote": "20 req/min · 50 req/day free → 1,000 req/day after a one-time $10 purchase",
    "models": [
      "nvidia/nemotron-3-ultra-550b-a55b:free",
      "inclusionai/ling-3.0-flash-fin:free",
      "poolside/laguna-s-2.1:free"
    ],
    "base": "https://openrouter.ai/api/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Sign up at <b>openrouter.ai</b> — Google or GitHub login.",
      "Go to <b>openrouter.ai/keys</b> → <b>Create Key</b>. Starts with <b>sk-or-v1-</b>.",
      "Optional but significant: buy <b>$10 of credit once</b>. It is a lifetime condition, not a balance — the 20× daily limit increase is permanent even after you spend it."
    ],
    "test": "# list what is free right now — do this instead of hardcoding\ncurl https://openrouter.ai/api/v1/models \\\n  -H \"Authorization: Bearer $OPENROUTER_API_KEY\" | grep -o '\"[^\"]*:free\"' | sort -u",
    "warn": "The free roster rotates weekly. <b>Read model IDs from the API at runtime</b> rather than hardcoding them, or your app breaks on someone else's pricing decision."
  },
  {
    "id": "inception",
    "name": "InceptionLabs",
    "sub": "Mercury",
    "kind": "portable",
    "budget": 100000000,
    "unit": "tokens one-time",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://platform.inceptionlabs.ai/dashboard/api-keys",
    "linkLabel": "Get key",
    "budgetNote": "100M free tokens on signup · no payment details required",
    "models": [
      "mercury-2.5"
    ],
    "base": "https://api.inceptionlabs.ai/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Sign up at <b>platform.inceptionlabs.ai</b> — no card requested.",
      "The 100M free tokens are credited automatically.",
      "Go to <b>Dashboard → API Keys</b> and create a key."
    ],
    "test": "curl https://api.inceptionlabs.ai/v1/chat/completions \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer $INCEPTION_API_KEY\" \\\n  -d '{\"model\":\"mercury-2.5\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}],\"max_completion_tokens\":8192}'",
    "note": "Supports <b>reasoning_effort</b>, <b>temperature</b> and <b>max_completion_tokens</b>. Works with LiteLLM, LangChain, AISuite and the plain OpenAI client."
  },
  {
    "id": "nvidia",
    "name": "NVIDIA NIM",
    "sub": "132 model catalogue",
    "kind": "portable",
    "budget": 0,
    "unit": "~40 req/min",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://build.nvidia.com",
    "linkLabel": "Get key",
    "budgetNote": "Up to ~40 req/min, model-specific · phone verification, not a card",
    "models": [
      "z-ai/glm-5.2",
      "z-ai/glm-5.3-flash",
      "moonshotai/kimi-k2.6"
    ],
    "base": "https://integrate.api.nvidia.com/v1",
    "auth": "Authorization: Bearer (nvapi- prefix)",
    "steps": [
      "Create an account at <b>build.nvidia.com</b>. Email verification, then phone verification.",
      "Pick any model, click <b>Get API Key</b>. Starts with <b>nvapi-</b>.",
      "The same key works across the entire catalogue."
    ],
    "test": "curl https://integrate.api.nvidia.com/v1/chat/completions \\\n  -H \"Authorization: Bearer $NVIDIA_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"z-ai/glm-5.2\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "Community reports are mixed — multiple developers describe hitting <b>429 rate limits</b> and occasional unresponsiveness under load. Great catalogue for trying models; do not build a production path on it."
  },
  {
    "id": "cloudflare",
    "name": "Cloudflare Workers AI",
    "sub": "40 models",
    "kind": "portable",
    "budget": 0,
    "unit": "10K neurons/day",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://dash.cloudflare.com",
    "linkLabel": "Get token",
    "budgetNote": "10,000 Neurons/day shared across all models · then $0.011 per 1,000 Neurons",
    "models": [
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "@cf/mistral/mistral-7b-instruct-v0.1",
      "@cf/qwen/qwen1.5-7b-chat"
    ],
    "base": "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Sign up at <b>dash.cloudflare.com</b> — free account, no card.",
      "Sidebar → <b>AI → Workers AI</b>.",
      "Copy your <b>Account ID</b> from the URL or sidebar — you need it in the base URL.",
      "<b>My Profile → API Tokens → Create Token</b> with Workers AI permissions."
    ],
    "test": "curl https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/ai/v1/chat/completions \\\n  -H \"Authorization: Bearer $CF_API_TOKEN\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"@cf/meta/llama-3.3-70b-instruct-fp8-fast\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "The quota is in <b>Neurons</b>, a normalised compute unit — <b>not tokens</b>. The effective allowance depends heavily on which model you pick, so budget by testing rather than calculating."
  },
  {
    "id": "mistral",
    "name": "Mistral AI",
    "sub": "Experiment mode",
    "kind": "portable",
    "budget": 0,
    "unit": "unpublished",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://console.mistral.ai",
    "linkLabel": "Get key",
    "budgetNote": "~1 req/sec · 500K tokens/min · Mistral stopped publishing free-tier numbers",
    "models": [
      "mistral-medium-3-5-128b",
      "open-mistral-7b",
      "open-mixtral-8x7b"
    ],
    "base": "https://api.mistral.ai/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Sign up at <b>console.mistral.ai</b>.",
      "Complete phone verification.",
      "Create a key under <b>API Keys</b>. Read your numeric limits in the admin console — they are not in the docs."
    ],
    "test": "curl https://api.mistral.ai/v1/chat/completions \\\n  -H \"Authorization: Bearer $MISTRAL_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"mistral-medium-3-5-128b\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "Experiment-mode traffic <b>may be used for training</b>. Treat it like the Gemini free tier — not for confidential material."
  },
  {
    "id": "cohere",
    "name": "Cohere",
    "sub": "Trial key",
    "kind": "portable",
    "budget": 0,
    "unit": "1K calls/month",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://dashboard.cohere.com/api-keys",
    "linkLabel": "Get key",
    "budgetNote": "1,000 calls/month · chat 20 req/min · embeddings 2,000 inputs/min · rerank 10 req/min",
    "models": [
      "command-a-218b",
      "command-a-111b",
      "command-r"
    ],
    "base": "https://api.cohere.com/v2",
    "auth": "Authorization: Bearer (v2)",
    "steps": [
      "Sign up at <b>dashboard.cohere.com</b>.",
      "Open <b>API Keys</b> — a trial key is issued automatically."
    ],
    "test": "curl https://api.cohere.com/v2/chat \\\n  -H \"Authorization: Bearer $COHERE_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"command-a-218b\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "<b>Non-commercial use only.</b> Note the auth header differs by version — v2 uses Bearer, v1 used <b>X-API-Key</b>. Older tutorials will trip you up."
  },
  {
    "id": "zhipu",
    "name": "Z.ai / Zhipu GLM",
    "sub": "Flash models",
    "kind": "portable",
    "budget": 0,
    "unit": "1K req/day",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": true,
    "reach": "cn-direct",
    "link": "https://open.bigmodel.cn",
    "linkLabel": "Get key",
    "budgetNote": "~1,000 req/day but only <b>1 concurrent request</b> — no parallel calls at all",
    "models": [
      "glm-4.7-flash",
      "glm-4.6v-flash",
      "glm-z1-flash",
      "glm-4v-flash"
    ],
    "base": "https://open.bigmodel.cn/api/paas/v4",
    "auth": "Authorization: Bearer",
    "steps": [
      "Sign up at <b>open.bigmodel.cn</b> (China) or <b>z.ai</b> (international).",
      "Real-name verification may be required depending on region.",
      "Create a key in the console under API Keys."
    ],
    "test": "curl https://open.bigmodel.cn/api/paas/v4/chat/completions \\\n  -H \"Authorization: Bearer $ZHIPU_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"glm-4.7-flash\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "<b>1 concurrent request</b> is the binding constraint — you cannot parallelise at all. Models also rotate; older Flash versions get decommissioned, so read the console model page rather than hardcoding IDs."
  },
  {
    "id": "modelscope",
    "name": "ModelScope",
    "sub": "61 models",
    "kind": "portable",
    "budget": 0,
    "unit": "2K calls/day",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": true,
    "reach": "cn-only",
    "link": "https://modelscope.cn",
    "linkLabel": "Get token",
    "budgetNote": "2,000 calls/day total · dynamic per-model caps",
    "models": [
      "MiniMax/MiniMax-M2.5",
      "qwen-qwen3-5-35b-a3b",
      "qwen-qwen3-5-27b"
    ],
    "base": "https://api-inference.modelscope.cn/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Sign up at <b>modelscope.cn</b>.",
      "<b>Bind your Alibaba Cloud account</b> — required, the API rejects unbound accounts.",
      "Create an access token in your account settings."
    ],
    "test": "curl https://api-inference.modelscope.cn/v1/chat/completions \\\n  -H \"Authorization: Bearer $MODELSCOPE_TOKEN\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"MiniMax/MiniMax-M2.5\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "Alibaba Cloud account binding is mandatory. Chinese-language registration flow."
  },
  {
    "id": "siliconflow",
    "name": "SiliconFlow",
    "sub": "Chinese models",
    "kind": "portable",
    "budget": 0,
    "unit": "30 req/min",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": true,
    "reach": "cn-only",
    "link": "https://cloud.siliconflow.cn",
    "linkLabel": "Get key",
    "budgetNote": "30 req/min · 60K tokens/min · identity verification required",
    "models": [
      "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
      "deepseek-ai/DeepSeek-OCR",
      "BAAI/bge-m3"
    ],
    "base": "https://api.siliconflow.cn/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Sign up at <b>cloud.siliconflow.cn</b>.",
      "Complete identity verification — required before keys work.",
      "Create an API key in the console."
    ],
    "test": "curl https://api.siliconflow.cn/v1/chat/completions \\\n  -H \"Authorization: Bearer $SILICONFLOW_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"deepseek-ai/DeepSeek-R1-Distill-Qwen-7B\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "note": "Also gives free embeddings (bge-m3) and rerankers, which most free tiers do not — useful for RAG prototypes."
  },
  {
    "id": "sambanova",
    "name": "SambaNova",
    "sub": "DeepSeek hosting",
    "kind": "portable",
    "budget": 200000,
    "unit": "tokens/day",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://cloud.sambanova.ai",
    "linkLabel": "Get key",
    "budgetNote": "20 req/min · <b>20 req/day</b> · 200K tokens/day",
    "models": [
      "deepseek-v3-1",
      "deepseek-v3-2-preview",
      "minimax-m2-7"
    ],
    "base": "https://api.sambanova.ai/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Sign up at <b>cloud.sambanova.ai</b>.",
      "Create an API key in the console."
    ],
    "test": "curl https://api.sambanova.ai/v1/chat/completions \\\n  -H \"Authorization: Bearer $SAMBANOVA_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"deepseek-v3-1\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "<b>20 requests per day</b> is very tight. Useful as an occasional high-capability fallback, not as a primary."
  },
  {
    "id": "cerebras",
    "name": "Cerebras",
    "sub": "Wafer-scale inference",
    "kind": "portable",
    "budget": 0,
    "unit": "$5 one-time",
    "end": null,
    "added": "2026-10-02",
    "status": "expiring",
    "card": true,
    "china": false,
    "reach": "global",
    "link": "https://cloud.cerebras.ai",
    "linkLabel": "Get key",
    "budgetNote": "<b>$5 trial credit, one-time</b> · expires <b>30 days after it is granted</b> · requires a verified payment method before API access works at all · trial limits ~5 RPM / 30K uncached TPM / 1M TPD per model",
    "models": [
      "gpt-oss-120b",
      "qwen-3.8-27b"
    ],
    "base": "https://api.cerebras.ai/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Sign up at <b>cloud.cerebras.ai</b>. Playground and API stay locked until you add a payment method.",
      "<b>Add a verified payment method.</b> The $5 credit is only granted after this step — unusual for a free tier.",
      "Create an API key. The $5 is now on the clock: it expires 30 days from the grant.",
      "Spend it deliberately. There is no renewal — once the credit is gone or expired, access stops until you buy credits."
    ],
    "test": "curl https://api.cerebras.ai/v1/chat/completions \\\n  -H \"Authorization: Bearer $CEREBRAS_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"gpt-oss-120b\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "<b>CORRECTION — this is not a 1M-tokens/day free tier and never now will be.</b> Cerebras replaced its open free tier with a <b>$5 free trial</b> that expires 30 days after the grant, and the vendor states plainly that it <b>does not offer a no-cost tier that renews automatically</b>. Earlier runs of this list quoted the old 1M tokens/day figure from third-party trackers; the vendor's own change log (2026-07-16) and rate-limit page now say otherwise. A card is required, and the countdown starts at the grant, not at first use.",
    "note": "Still the fastest tokens-per-second you can get for free — the hardware claim is genuine. But treat it as a one-month evaluation, not a standing allowance. A first pay-as-you-go purchase moves you to the Developer tier, which removes the hourly and daily caps."
  },
  {
    "id": "hf",
    "name": "Hugging Face",
    "sub": "Inference Providers",
    "kind": "portable",
    "budget": 0,
    "unit": "$0.10/month",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://huggingface.co/settings/tokens",
    "linkLabel": "Get token",
    "budgetNote": "$0.10/month free · $2.00/month on PRO ($9) · credit-metered, not rate-limited",
    "models": [
      "meta-llama-3-1-8b-instruct",
      "google/gemma-3-4b-it",
      "qwen2-5-coder-7b-instruct"
    ],
    "base": "https://router.huggingface.co/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Sign up at <b>huggingface.co</b>.",
      "Go to <b>Settings → Access Tokens</b>.",
      "Create a token with read permissions."
    ],
    "test": "curl https://router.huggingface.co/v1/chat/completions \\\n  -H \"Authorization: Bearer $HF_TOKEN\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"meta-llama-3-1-8b-instruct\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "$0.10/month is very small — enough for a few hundred short requests. Effectively a smoke test rather than a working budget."
  },
  {
    "id": "llm7",
    "name": "LLM7.io",
    "sub": "Key optional",
    "kind": "portable",
    "budget": 0,
    "unit": "~60 req/hour",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://token.llm7.io",
    "linkLabel": "Get token",
    "budgetNote": "~10 req/min · ~60 req/hour anonymous · a free token raises it",
    "models": [
      "gpt-oss-20b",
      "mistral-Nemo-Instruct-2407",
      "minimax-m2.7"
    ],
    "base": "https://api.llm7.io/v1",
    "auth": "Optional Bearer",
    "steps": [
      "No signup needed for anonymous use — call the endpoint directly.",
      "For higher limits, get a free token at <b>token.llm7.io</b>."
    ],
    "test": "# works with no key at all\ncurl https://api.llm7.io/v1/chat/completions \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"gpt-oss-20b\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "note": "One of the few endpoints where the key is genuinely optional. Good for a zero-friction smoke test before committing to a signup anywhere."
  },
  {
    "id": "pollinations",
    "name": "Pollinations",
    "sub": "Anonymous endpoint",
    "kind": "keyless",
    "budget": 0,
    "unit": "per-IP",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://pollinations.ai",
    "linkLabel": "Open",
    "budgetNote": "Anonymous · rate-limited per IP",
    "models": [
      "default"
    ],
    "base": "https://text.pollinations.ai",
    "auth": "None",
    "steps": [
      "No signup, no key. Call the endpoint directly."
    ],
    "test": "# literally one line\ncurl \"https://text.pollinations.ai/Explain%20the%20CAP%20theorem%20in%20one%20sentence\"",
    "note": "Simplest possible call on this list. Rate-limited per IP, so do not build anything durable on it."
  },
  {
    "id": "ovh",
    "name": "OVHcloud AI Endpoints",
    "sub": "EU-hosted",
    "kind": "keyless",
    "budget": 0,
    "unit": "~2 req/min",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://endpoints.ai.cloud.ovh.net",
    "linkLabel": "Open",
    "budgetNote": "~2 req/min anonymous · includes chat, embeddings and Whisper",
    "models": [
      "qwen3.5-397b-a17b",
      "meta-llama-3_3-70b-instruct",
      "qwen3.6-27b"
    ],
    "base": "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1",
    "auth": "None (anonymous tier)",
    "steps": [
      "Anonymous tier works immediately — no signup.",
      "Register for a higher quota at <b>endpoints.ai.cloud.ovh.net</b>."
    ],
    "test": "curl https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/chat/completions \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"meta-llama-3_3-70b-instruct\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "note": "One of the few free tiers that also covers <b>Whisper</b> transcription and embeddings, not just chat."
  },
  {
    "id": "qoder",
    "name": "Qoder",
    "sub": "Qwen3.8-Flash free",
    "kind": "client",
    "budget": 0,
    "unit": "unmetered",
    "end": null,
    "added": "2026-09-30",
    "status": "extended",
    "card": false,
    "china": true,
    "reach": "cn-direct",
    "link": "https://qoder.com/download",
    "linkLabel": "Download",
    "budgetNote": "Billing coefficient 0.0× — calls consume <b>no Credits at all</b>, even on a zero-balance free account",
    "models": [
      "Qwen3.8-Flash"
    ],
    "base": "— client-bound, no API key",
    "auth": "—",
    "steps": [
      "Download from <b>qoder.com/download</b> (Windows, macOS, Linux). China version: <b>qoder.com.cn</b>.",
      "Sign up or sign in. A free account is fine — no card, no subscription.",
      "Open the <b>model selector</b> and choose <b>Qwen3.8-Flash</b>.",
      "Use it. No claiming, no coupon, no activation step — the 0.0× rate applies automatically.",
      "Separately, claim the <b>100 daily Credits</b> from the activities page. These are not consumed by Qwen3.8-Flash, so they stay available for other models."
    ],
    "test": "— no API endpoint. Client-bound usage only.",
    "note": "<b>Extended.</b> Originally ending 30 September, Qoder has extended this — Qwen3.8-Flash stays free from 1 October onward. No action needed. The new end date will be announced on their event page in advance."
  },
  {
    "id": "kilo",
    "name": "Kilo Code",
    "sub": "Auto Free tier",
    "kind": "client",
    "budget": 0,
    "unit": "unspecified",
    "end": null,
    "added": "2026-09-30",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://kilo.ai/install",
    "linkLabel": "Install",
    "budgetNote": "Free-model tier (<b>Auto Free</b>) · no credit card, no provider key · free catalog rotates as providers change pricing",
    "models": [
      "kilo-auto/free",
      "stealth/space-bunny-alpha",
      "nvidia/nemotron-3-super-120b-a12b:free",
      "poolside/laguna-s-2-1:free"
    ],
    "base": "— client-bound, no public Kilo API",
    "auth": "—",
    "steps": [
      "Install Kilo Code into VS Code, JetBrains or the CLI.",
      "Create a free Kilo Cloud account — <b>no credit card required</b> for the free models.",
      "Open the model picker and choose <b>Auto Free</b>, or any model marked <b>Free</b>.",
      "Work. Switch to a paid, local or BYOK model whenever your task changes."
    ],
    "test": "— free models are client-bound. Kilo accepts external keys if you want portable capacity.",
    "warn": "Free hosted inference is <b>not</b> the same as free-to-download weights. The free catalog updates live and a listing can disappear the moment the upstream provider changes its pricing — the free list is a rotating promotion, not a standing commitment.",
    "note": "Open source (MIT) and model-agnostic: the same client can run free hosted models, your own AMD or Groq key, or a local Ollama model. Verified 30 Sep 2026 at <b>kilo.ai/landing/free-models</b>."
  },
  {
    "id": "stepfun",
    "name": "StepFun Step 5 Preview",
    "sub": "Free Coding Plan days",
    "kind": "client",
    "budget": 0,
    "unit": "15–75 days",
    "end": null,
    "added": "2026-09-30",
    "status": "active",
    "card": false,
    "china": true,
    "reach": "cn-direct",
    "link": "https://platform.stepfun.com",
    "linkLabel": "Claim",
    "budgetNote": "<b>15 days</b> of Coding Plan on signup · +15 after your first successful call · +15 per invite, up to <b>45 bonus days</b> (75 total)",
    "models": [
      "Step 5 Preview",
      "Step 3.7 Flash"
    ],
    "base": "https://api.stepfun.com/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Register at <b>platform.stepfun.com</b> and sign in.",
      "Claim the free <b>Coding Plan</b> from the Step 5 Preview activity page — this is a daily-quota giveaway, first-come.",
      "Make one successful call — a further <b>15 days</b> is credited automatically.",
      "Invite friends for up to <b>45 more days</b>.",
      "Call the API with the OpenAI-compatible base URL below, or use Step Plan inside the client."
    ],
    "test": "curl https://api.stepfun.com/v1/chat/completions \\\n  -H \"Authorization: Bearer $STEP_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"step-5-preview\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "<b>Daily allocation limits.</b> The claim is first-come and the day's quota is often gone — you may need to come back the next morning. It is a Coding Plan grant (subscription-style usage), not a token balance you can bank.",
    "note": "Step 5 Preview is a 600B-parameter sparse MoE (27B active) with a 1M context window. The platform exposes an <b>OpenAI-compatible</b> endpoint at <b>api.stepfun.com/v1</b>, so it drops into existing OpenAI code — unusual for a Chinese client-bound offer. Verified 30 Sep 2026 at platform.stepfun.com."
  },
  {
    "id": "opencodezen",
    "name": "OpenCode Zen",
    "sub": "Free model gateway",
    "kind": "portable",
    "budget": 0,
    "unit": "free models",
    "end": null,
    "added": "2026-09-30",
    "status": "active",
    "card": true,
    "china": false,
    "reach": "global",
    "link": "https://opencode.ai/docs/zen",
    "linkLabel": "Get key",
    "budgetNote": "<b>10 models at $0</b> input and output · no per-token charge · an OpenCode Zen API key is required",
    "models": [
      "stealth/space-bunny-free",
      "longcat-2.5-preview-free",
      "mimo-v2.6-flash-free",
      "nemotron-3-ultra-free",
      "nemotron-3.5-lightning-free",
      "muse-spark-1.3-contributor-free",
      "big-pickle",
      "jev-1.13-free",
      "ling-3.0-flash-fin-free",
      "mimo-v2.5-free"
    ],
    "base": "https://opencode.ai/zen/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Sign in to <b>OpenCode Zen</b> and add billing details — required to issue a key even for free models.",
      "Copy the Zen API key.",
      "In the OpenCode TUI run <b>/connect</b>, select <b>OpenCode Zen</b>, and paste the key.",
      "Select any <b>free</b> model from the list."
    ],
    "test": "curl https://opencode.ai/zen/v1/chat/completions \\\n  -H \"Authorization: Bearer $OPENCODE_ZEN_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"nemotron-3-ultra-free\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "<b>Billing details are collected at signup</b>, and auto-reload will top the account up by $20 whenever the balance drops below $5. Disable auto-reload unless you intend to pay. Also check each model: most of the free ones <b>train on your prompts</b>; only Space Bunny and LongCat 2.5 are zero-retention.",
    "note": "Unlike a client-bound list, Zen issues a <b>portable key</b> — the free models can be wired into any OpenAI-compatible tool, not just OpenCode. Ten free models live as of 30 Sep 2026; none publish an end date, all are 'limited time'. Verified 30 Sep 2026 at opencode.ai/docs/zen."
  },
  {
    "id": "zcode-trust",
    "name": "ZCode — Trust Build",
    "sub": "GLM-5.3-Flash",
    "kind": "client",
    "budget": 100000000,
    "unit": "tokens one-time",
    "end": "2026-10-07",
    "added": "2026-09-29",
    "status": "active",
    "card": false,
    "china": true,
    "reach": "cn-direct",
    "link": "https://zcode.z.ai/en",
    "linkLabel": "Download",
    "budgetNote": "~100M GLM-5.3-Flash tokens · ~100,000 allocations, first-come first-served · claim window 28 Sep → 7 Oct",
    "models": [
      "GLM-5.3-Flash"
    ],
    "base": "— client-bound, no API key",
    "auth": "—",
    "steps": [
      "Download and install ZCode from <b>zcode.z.ai/en</b>.",
      "Open the client and sign in.",
      "Claim roughly <b>100M GLM-5.3-Flash tokens</b> from the in-client banner.",
      "<b>Use them the same day.</b> Tokens typically land around 11pm and expire at midnight the following day."
    ],
    "test": "— no API endpoint. Client-bound usage only.",
    "warn": "<b>The claim window is 10 days; the usable window is roughly one evening.</b> Tokens land late and expire at the next midnight. Claim it on a day you can actually sit down and work, not as a reserve."
  },
  {
    "id": "zcode-weekend",
    "name": "ZCode — Weekend Build",
    "sub": "GLM-5.3-Flash",
    "kind": "client",
    "budget": 300000000,
    "unit": "tokens/weekend",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": true,
    "reach": "cn-direct",
    "link": "https://zcode.z.ai/en",
    "linkLabel": "Download",
    "budgetNote": "<b>300M tokens</b> per weekend round · Friday 20:00 → Monday 09:00, recurring",
    "models": [
      "GLM-5.3-Flash"
    ],
    "base": "— client-bound, no API key",
    "auth": "—",
    "steps": [
      "Download and install ZCode from <b>zcode.z.ai/en</b>.",
      "Sign in — new and existing users both qualify, subscribed or not.",
      "Wait for the window: <b>Friday 20:00 → Monday 09:00</b>.",
      "On login a claim popup appears. Click it for <b>300M tokens</b>.",
      "Use them before Monday 09:00."
    ],
    "test": "— no API endpoint. Client-bound usage only.",
    "note": "If you want GLM-5.3-Flash as a <b>portable key</b> instead, get it from <b>AMD Token Factory</b> — it is on their free list and the key works anywhere."
  },
  {
    "id": "cline",
    "name": "Cline",
    "sub": "Rotating FREE models",
    "kind": "client",
    "budget": 0,
    "unit": "unspecified",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://cline.bot",
    "linkLabel": "Install",
    "budgetNote": "Rotating free-model promotion · look for models with the <b>FREE</b> tag",
    "models": [
      "GLM-5.3-Flash",
      "DeepSeek V4 Flash"
    ],
    "base": "— client-bound, no public Cline API",
    "auth": "—",
    "steps": [
      "Install from <b>cline.bot</b> — pick your editor (VS Code, JetBrains, or CLI).",
      "Sign in with a Cline account.",
      "Open the model selector and pick a model carrying the <b>FREE</b> tag.",
      "Work. When the quota runs out it offers ClinePass at $9.99/month."
    ],
    "test": "— free models are client-bound. Cline itself accepts external keys if you want portable capacity.",
    "note": "Cline is <b>model-agnostic</b> — you can point it at your own AMD or Groq key and use it as a client for a portable provider."
  },
  {
    "id": "opencode",
    "name": "OpenCode",
    "sub": "New-model previews",
    "kind": "client",
    "budget": 100000,
    "unit": "tokens",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://opencode.ai",
    "linkLabel": "Install",
    "budgetNote": "~100K tokens on <code>high</code> mode · free access to models the day they launch",
    "models": [
      "GLM-5.3-Flash preview",
      "Meta muse spark 1.3",
      "MiMo-V2.5 Free",
      "DeepSeek V4 Flash Free"
    ],
    "base": "— free models are client-bound",
    "auth": "—",
    "steps": [
      "Install from <b>opencode.ai</b>.",
      "Sign in for the free-model allowance.",
      "Pick a free model — this is how people try models the day they launch.",
      "Expect roughly 100K tokens before the allowance runs out on high mode."
    ],
    "test": "— free models are client-bound.",
    "note": "OpenCode has <b>native support for AMD Radeon Cloud</b>. Add your AMD key under Settings → Providers and you get a portable provider inside a good terminal client."
  },
  {
    "id": "minimaxcode",
    "name": "MiniMax Code",
    "sub": "Double check-in credits",
    "kind": "client",
    "budget": 0,
    "unit": "2× daily",
    "end": "2026-10-07",
    "added": "2026-09-29",
    "status": "active",
    "card": false,
    "china": true,
    "reach": "cn-direct",
    "link": "https://www.minimax.io",
    "linkLabel": "Open",
    "budgetNote": "<b>Double</b> the normal free credits on daily check-in · 28 Sep → 7 Oct",
    "models": [
      "M3.1-Flash-Preview"
    ],
    "base": "— client-bound",
    "auth": "—",
    "steps": [
      "Install the MiniMax Code client and sign in.",
      "Complete the <b>daily check-in</b> — during the window it pays double.",
      "New and existing users both qualify."
    ],
    "test": "— client-bound.",
    "note": "Token Plan subscribers also had their quotas reset in this window."
  },
  {
    "id": "inkstone",
    "name": "Shanghai AI Lab",
    "sub": "Intern InkStone",
    "kind": "portable",
    "budget": 50000000,
    "unit": "tokens/month",
    "end": null,
    "added": "2026-09-29",
    "status": "active",
    "card": false,
    "china": true,
    "reach": "cn-only",
    "link": "https://intern-ai.org.cn",
    "linkLabel": "Open",
    "budgetNote": "Monthly free allowance during beta · <b>1 ink point offsets up to ~50M tokens</b> (measured on DeepSeek-V4-Flash)",
    "models": [
      "书生-S2",
      "Atria-Dawn-Preview",
      "Agents-A1",
      "DeepSeek",
      "GLM",
      "Kimi",
      "MiniMax",
      "Qwen"
    ],
    "base": "— see console",
    "auth": "Bearer",
    "steps": [
      "Register at the Intern InkStone console during the test period.",
      "Claim the monthly free ink points.",
      "Three models — 书生-S2, Atria-Dawn-Preview, Agents-A1 — are temporarily free of point deductions."
    ],
    "test": "— consult the console for the current endpoint.",
    "note": "One of the few offers with a <b>genuine monthly refresh</b> rather than a one-off countdown. Worth having if you want a renewable floor."
  },
  {
    "id": "gmi",
    "name": "GMI Cloud",
    "sub": "Hy Image 3.5 Preview",
    "kind": "portable",
    "budget": 0,
    "unit": "free week",
    "end": "2026-10-01",
    "added": "2026-09-29",
    "status": "expiring",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://www.gmicloud.ai",
    "linkLabel": "Open",
    "budgetNote": "Free for one week · Playground, MCP and API",
    "models": [
      "hy-image-v3.5-preview"
    ],
    "base": "— see console",
    "auth": "Bearer",
    "steps": [
      "Register and sign in at GMI Cloud.",
      "Select <b>hy-image-v3.5-preview</b> in the Playground, via MCP, or through the API."
    ],
    "test": "— consult the console for the current endpoint.",
    "warn": "Closes <b>1 October</b>. Image generation only."
  },
  {
    "id": "wenxin",
    "name": "Baidu Wenxin 4.0",
    "sub": "+ Tencent Hunyuan Hy3",
    "kind": "client",
    "budget": 0,
    "unit": "free access",
    "end": "2026-09-30",
    "added": "2026-09-28",
    "status": "expiring",
    "card": false,
    "china": true,
    "reach": "cn-only",
    "link": "https://wenxiaoyan.baidu.com",
    "linkLabel": "Open",
    "budgetNote": "Free access to the full Wenxin 4.0 line · <b>ended 30 September 2026</b> · the Hunyuan Hy3 overflow option on this row was separately extended to 31 October — see the Hunyuan Hy4 row",
    "models": [
      "Wenxin 4.0 Turbo",
      "Wenxin 4.0",
      "Wenxin 3.5",
      "Hunyuan Hy3"
    ],
    "base": "— client-bound",
    "auth": "—",
    "steps": [
      "Update the Wenxiaoyan app. No coupon or code needed.",
      "For Hunyuan Hy3, switch models in the WorkBuddy or CodeBuddy model menu."
    ],
    "test": "— client-bound.",
    "warn": "<b>Closed 30 September 2026.</b> Baidu's free window on the Wenxin 4.0 line ran through 30 September and reverted to paid on 1 October. The Hunyuan Hy3 half of this row was <b>extended to 31 October</b> and now lives on the Hunyuan Hy4 row — switch models inside WorkBuddy or CodeBuddy rather than claiming anything here."
  },
  {
    "id": "manus",
    "name": "Manus Cue",
    "sub": "Invite code",
    "kind": "client",
    "budget": 0,
    "unit": "free access",
    "end": null,
    "added": "2026-09-29",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://manus.im",
    "linkLabel": "Open",
    "budgetNote": "Early free access · invite code <b>MEETCUE</b> · limited spots, first-come",
    "models": [
      "Cue agent"
    ],
    "base": "— client-bound",
    "auth": "—",
    "steps": [
      "Download Cue for web, Android or desktop. iOS is still in review.",
      "Register in the client and enter the invite code <b>MEETCUE</b>."
    ],
    "test": "— client-bound.",
    "note": "Personal agent app, not a coding tool."
  },
  {
    "id": "doubao",
    "name": "Doubao (豆包)",
    "sub": "Free 30-day Standard plan",
    "kind": "client",
    "budget": 0,
    "unit": "30 days free",
    "end": "2026-10-17",
    "added": "2026-10-01",
    "status": "active",
    "card": false,
    "china": true,
    "reach": "cn-only",
    "link": "https://www.doubao.com/",
    "linkLabel": "Open",
    "budgetNote": "30 days of the <b>Standard</b> plan free · every user qualifies, free and paying alike · claimed by downloading or upgrading the desktop client · campaign reported to run to <b>17 October 2026</b>",
    "models": [
      "Doubao Seed series"
    ],
    "base": "— client-bound",
    "auth": "—",
    "steps": [
      "Download or upgrade the <b>Doubao PC app</b> (or Doubao Work PC). The grant is attached to the desktop client.",
      "Sign in. Both free and paying accounts are eligible — no card, no code, no invitation.",
      "The 30-day Standard entitlement applies automatically. It covers the cloud computer, task mode and multi-Agent parallelism.",
      "Already claimed the previous round? The next 30 days are granted as the current one expires — no action needed."
    ],
    "test": "— client-bound.",
    "warn": "<b>Thirty days from claim, not a tier.</b> The Standard plan reverts to paid when the entitlement lapses. This is ByteDance's consumer assistant, not the Volcano Ark API platform — <b>there is no key here</b> and nothing on this row can be wired into your own stack. Verification level: <b>multi-source</b> — ByteDance's 24 September announcement as carried by Tencent News, Sohu, Chinaz and others; the vendor's own campaign page was not read directly, so treat 17 October as approximate.",
    "note": "Paid subscribers are not downgraded — their existing term is extended instead, and they keep peak-hour priority. This is the second round in a month: an identical 30-day grant ran from 25 August."
  },
  {
    "id": "hunyuan",
    "name": "Tencent Hunyuan Hy4",
    "sub": "Preview",
    "kind": "client",
    "budget": 0,
    "unit": "14 days daily",
    "end": "2026-10-31",
    "added": "2026-10-01",
    "status": "extended",
    "card": false,
    "china": true,
    "reach": "cn-only",
    "link": "https://console.cloud.tencent.com/hunyuan",
    "linkLabel": "Open",
    "budgetNote": "New or never-tried users: <b>14 days of daily free quota from first use</b> — first conversation must start by <b>10 October</b> · existing users: free <b>23:00–08:00</b> nightly, <b>extended to 31 October</b> · Hunyuan Hy3 限免 likewise extended to 31 October",
    "models": [
      "Hunyuan Hy4 preview",
      "Hunyuan Hy3"
    ],
    "base": "— switch inside WorkBuddy / CodeBuddy",
    "auth": "—",
    "steps": [
      "Open WorkBuddy or CodeBuddy.",
      "Switch to <b>Hunyuan Hy4 preview</b> in the model menu — no API wiring needed.",
      "Never used it? Start your first conversation before <b>10 October</b>; the 14-day clock runs from that first use.",
      "Already tried it? Night-time usage is free at <b>23:00–08:00</b> — extended to <b>31 October</b>. Outside those hours usage consumes points normally.",
      "Hy3 (限免) is free to switch to inside the same client, also extended to <b>31 October</b>."
    ],
    "test": "— client-bound.",
    "note": "770B MoE with 1M context. <b>Text-only</b> — image and video tasks route to other models and bill normally. <b>Extended:</b> a joint WorkBuddy/Hunyuan announcement on 30 September pushed both the Hy3 限免 window and the Hy4 preview night-free window from 30 September to <b>31 October</b>; the 10 October last-start date for the new-user 14 days is unchanged. Tencent Cloud TokenHub also gives new users 1M tokens for the Hy4 preview API if you want the API route."
  },
  {
    "id": "glmnight",
    "name": "Z.ai GLM Coding Plan",
    "sub": "Night-time free credits",
    "kind": "client",
    "budget": 0,
    "unit": "night hours",
    "end": "2026-10-07",
    "added": "2026-09-29",
    "status": "extended",
    "card": false,
    "china": true,
    "reach": "cn-direct",
    "link": "https://z.ai",
    "linkLabel": "Open",
    "budgetNote": "Free usage <b>23:00–09:00</b> Beijing time · <b>GLM-5.3-Flash only</b> · <b>paid Coding Plan subscribers only</b> · via ZCode 3.10+ or AutoClaw · a 5-hour/week cap still applies",
    "models": [
      "GLM-5.3-Flash"
    ],
    "base": "— client-bound",
    "auth": "—",
    "steps": [
      "You need an active <b>paid GLM Coding Plan</b> — the campaign covers paying subscribers only, not free accounts.",
      "Use <b>ZCode 3.10 or later</b> (or AutoClaw) during the window. The discount applies automatically inside 23:00–09:00 Beijing time; there is nothing to claim.",
      "Select GLM-5.3-Flash specifically — every other model keeps consuming quota normally.",
      "Plan around the <b>5-hour/week</b> cap: once you hit it, the night window is closed to you until the limit resets."
    ],
    "test": "— client-bound.",
    "note": "Extended to <b>7 October</b>. The vendor notice also doubles quota for GLM-5.3-Flash when used through other plan-supported agents outside ZCode and AutoClaw."
  },
  {
    "id": "minimaxplat",
    "name": "MiniMax Platform",
    "sub": "M3 / M2",
    "kind": "portable",
    "budget": 0,
    "unit": "free trial",
    "end": "2026-11-07",
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": true,
    "reach": "cn-direct",
    "link": "https://platform.minimaxi.com",
    "linkLabel": "Open",
    "budgetNote": "Free trial access to M3 and M2",
    "models": [
      "MiniMax-M3",
      "MiniMax-M2"
    ],
    "base": "— see console",
    "auth": "Bearer",
    "steps": [
      "Register at the MiniMax open platform.",
      "Free trial access applies to M3 and M2."
    ],
    "test": "— consult the console for the current endpoint."
  },
  {
    "id": "volcano",
    "name": "Volcano Ark Agent Plan",
    "sub": "Small tier",
    "kind": "credit",
    "budget": 0,
    "unit": "¥9.9/mo",
    "end": "2026-11-08",
    "added": "2026-09-28",
    "status": "active",
    "card": true,
    "china": true,
    "reach": "cn-only",
    "link": "https://www.volcengine.com/product/doubao",
    "linkLabel": "Open",
    "budgetNote": "¥9.9/month for the first two months (normally ~¥40) · Medium also ~2.5× off",
    "models": [
      "Doubao Seed series"
    ],
    "base": "— see console",
    "auth": "Bearer",
    "steps": [
      "Register at Volcano Engine.",
      "Subscribe to Agent Plan Small during the promotional window.",
      "Medium tier carries a similar ~2.5× discount."
    ],
    "test": "— consult the console.",
    "note": "A <b>discount</b>, not a free tier — included here because it is the cheapest way onto Doubao."
  },
  {
    "id": "bailian",
    "name": "Alibaba Bailian",
    "sub": "Largest one-time grant",
    "kind": "credit",
    "budget": 70000000,
    "unit": "tokens one-time",
    "end": "2026-12-28",
    "added": "2026-09-29",
    "status": "active",
    "card": false,
    "china": true,
    "reach": "cn-only",
    "link": "https://bailian.console.aliyun.com",
    "linkLabel": "Claim",
    "budgetNote": "<b>70M tokens</b> new-user grant, plus 1M per model on top · ~90-day validity",
    "models": [
      "Qwen3.8-Max",
      "DeepSeek",
      "GLM-5.2",
      "Kimi-K3"
    ],
    "base": "— see console",
    "auth": "Bearer",
    "steps": [
      "Register at <b>bailian.console.aliyun.com</b> with real-name authentication.",
      "The 70M token grant is credited automatically.",
      "Claim the additional 1M per model for Qwen3.8-Max, DeepSeek, GLM-5.2 and Kimi-K3.",
      "<b>Use it inside the 90-day window</b> — unused quota is wiped on expiry."
    ],
    "test": "— consult the console for the current endpoint.",
    "warn": "<b>Unused quota is wiped at expiry</b> — it does not roll over. This is the largest single one-time grant on this list, so do not sit on it."
  },
  {
    "id": "vertex",
    "name": "Google Cloud Vertex AI",
    "sub": "Cloud grant",
    "kind": "credit",
    "budget": 0,
    "unit": "$300",
    "end": "2026-12-28",
    "added": "2026-09-28",
    "status": "active",
    "card": true,
    "china": false,
    "reach": "global",
    "link": "https://cloud.google.com/free",
    "linkLabel": "Claim",
    "budgetNote": "$300 credit · 90 days",
    "models": [
      "Gemini",
      "Model Garden"
    ],
    "base": "— see console",
    "auth": "Service account JSON",
    "steps": [
      "Sign up at <b>cloud.google.com/free</b>.",
      "Enable the Vertex AI API.",
      "Create a service account and download the JSON key.",
      "<b>Set a budget alert before you use it.</b>"
    ],
    "test": "— use the Google Cloud SDK or REST with the service account.",
    "warn": "<b>Converts to paid silently</b> when the credit expires or runs dry. Set the budget alert at activation, not later."
  },
  {
    "id": "oci",
    "name": "Oracle Cloud (OCI)",
    "sub": "Cloud grant",
    "kind": "credit",
    "budget": 0,
    "unit": "$300",
    "end": "2026-10-29",
    "added": "2026-09-28",
    "status": "active",
    "card": true,
    "china": false,
    "reach": "global",
    "link": "https://www.oracle.com/cloud/free/",
    "linkLabel": "Claim",
    "budgetNote": "$300 credit · <b>30 days only</b>",
    "models": [
      "OCI Generative AI"
    ],
    "base": "— see console",
    "auth": "OCI signature",
    "steps": [
      "Sign up at <b>oracle.com/cloud/free</b>.",
      "A card is required for identity verification — a small amount is charged and refunded.",
      "Claim the credits in the console."
    ],
    "test": "— use the OCI SDK.",
    "warn": "<b>30 days</b> is the shortest window of the major cloud grants.",
    "note": "<b>Status as of 30 Sep 2026:</b> the card is charged a small refundable amount at signup. Both the $300 grant and the 30-day clock start at activation, not at signup — the 30-day figure is the grant validity, not a hard closure date shown here."
  },
  {
    "id": "azure",
    "name": "Azure AI Foundry",
    "sub": "Cloud grant",
    "kind": "credit",
    "budget": 0,
    "unit": "$200",
    "end": "2026-10-29",
    "added": "2026-09-28",
    "status": "active",
    "card": true,
    "china": false,
    "reach": "global",
    "link": "https://azure.microsoft.com/free/",
    "linkLabel": "Claim",
    "budgetNote": "$200 credit · 30 days",
    "models": [
      "Azure OpenAI",
      "Model catalog"
    ],
    "base": "— see deployment endpoint",
    "auth": "api-key header",
    "steps": [
      "Sign up at <b>azure.microsoft.com/free</b>.",
      "Deploy a model in AI Foundry.",
      "Grab the endpoint and key from the deployment page."
    ],
    "test": "curl https://YOUR-RESOURCE.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT/chat/completions?api-version=2024-10-21 \\\n  -H \"api-key: $AZURE_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "Note the auth differs — Azure uses an <b>api-key header</b>, not Authorization Bearer, and requires an <b>api-version</b> query parameter. <b>30-day</b> window.",
    "note": "<b>Status as of 30 Sep 2026:</b> the 30-day count starts at activation, not signup. The grant converts to pay-as-you-go when it expires — set a budget alert before you deploy anything."
  },
  {
    "id": "bedrock",
    "name": "Amazon Bedrock",
    "sub": "Cloud grant",
    "kind": "credit",
    "budget": 0,
    "unit": "up to $200",
    "end": "2027-03-28",
    "added": "2026-09-28",
    "status": "active",
    "card": true,
    "china": false,
    "reach": "global",
    "link": "https://aws.amazon.com/bedrock/",
    "linkLabel": "Claim",
    "budgetNote": "Up to $200 credit · 6 months — the longest window of the majors",
    "models": [
      "Claude",
      "Llama",
      "Nova",
      "Titan"
    ],
    "base": "— regional endpoint",
    "auth": "AWS SigV4",
    "steps": [
      "Sign up at <b>aws.amazon.com</b>.",
      "Request model access for the models you want in the Bedrock console.",
      "Create an IAM user with Bedrock permissions."
    ],
    "test": "— <b>Bedrock uses AWS SigV4 signing, not a Bearer token.</b> Use the AWS SDK (boto3) rather than raw curl.",
    "note": "The 6-month window makes this the most forgiving cloud grant, but the SigV4 requirement means you cannot just swap a base URL."
  },
  {
    "id": "fireworks",
    "name": "Fireworks AI",
    "sub": "Via AMD program",
    "kind": "credit",
    "budget": 0,
    "unit": "$50",
    "end": "2026-12-28",
    "added": "2026-09-28",
    "status": "active",
    "card": true,
    "china": false,
    "reach": "global",
    "link": "https://app.fireworks.ai/signup",
    "linkLabel": "Claim",
    "budgetNote": "$50 credit · valid 90 days · OpenAI-compatible managed endpoint",
    "models": [
      "Llama",
      "Mixtral",
      "MiniMax",
      "Kimi K"
    ],
    "base": "https://api.fireworks.ai/inference/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Join the <b>AMD AI Developer Program</b> at developer.amd.com/ai-developer-program — free, English, 2–3 business days for approval.",
      "Go to <b>Member Perks → Request Cloud Credits</b> and fill in the form.",
      "Choose the <b>Fireworks AI</b> route over the GPU route.",
      "Redeem at <b>app.fireworks.ai/signup</b>."
    ],
    "test": "curl https://api.fireworks.ai/inference/v1/chat/completions \\\n  -H \"Authorization: Bearer $FIREWORKS_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"accounts/fireworks/models/llama-v3p3-70b-instruct\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "note": "<b>The best English-language route onto AMD hardware.</b> Same program also offers $100 of bare-metal GPU credits — but those expire 30 days after activation, so only claim them when you have a training job ready."
  },
  {
    "id": "anyscale",
    "name": "Anyscale",
    "sub": "Cloud grant",
    "kind": "credit",
    "budget": 0,
    "unit": "$100",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": true,
    "china": false,
    "reach": "global",
    "link": "https://www.anyscale.com",
    "linkLabel": "Claim",
    "budgetNote": "$100 credit · expiry not stated",
    "models": [
      "Open-source models"
    ],
    "base": "— see console",
    "auth": "Bearer",
    "steps": [
      "Sign up at <b>anyscale.com</b>.",
      "A card is required."
    ],
    "test": "— consult the console.",
    "warn": "Expiry window is not published. Assume it is short."
  },
  {
    "id": "ai21",
    "name": "AI21 Labs",
    "sub": "Cloud grant",
    "kind": "credit",
    "budget": 0,
    "unit": "$10",
    "end": "2026-10-06",
    "added": "2026-10-02",
    "status": "expiring",
    "card": true,
    "china": false,
    "reach": "global",
    "link": "https://studio.ai21.com",
    "linkLabel": "Claim",
    "budgetNote": "$10 credit · <b>7 days</b>",
    "models": [
      "Jamba Large 1.7",
      "Jamba Mini 2"
    ],
    "base": "https://api.ai21.com/studio/v1",
    "auth": "Authorization: Bearer",
    "steps": [
      "Sign up at <b>studio.ai21.com</b>.",
      "The $10 credit is applied automatically."
    ],
    "test": "curl https://api.ai21.com/studio/v1/chat/completions \\\n  -H \"Authorization: Bearer $AI21_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"jamba-large-1-7\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "<b>7-day window.</b> Only worth claiming if you will use it this week.",
    "note": "<b>Rolling trial, not a shared deadline — and AI21's own pages disagree on its length.</b> Read on 2 October 2026: <b>ai21.com/pricing</b> states the $10 credit is good for <b>7 days</b>, while <b>docs.ai21.com/docs/usage-cost</b> states new accounts get a $10 credit <b>good for three months</b>. The two have not been reconciled, so treat the length as uncertain and confirm it in your own account after registering. What is certain is that the clock runs from <b>your</b> signup, not from a campaign date — the date on this row is a placeholder carried from the last refresh, not a deadline anyone can miss. No card is needed to start."
  },
  {
    "id": "stability",
    "name": "Stability AI",
    "sub": "Image generation",
    "kind": "credit",
    "budget": 0,
    "unit": "25 credits",
    "end": null,
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": false,
    "reach": "global",
    "link": "https://platform.stability.ai",
    "linkLabel": "Claim",
    "budgetNote": "25 free credits (~$0.25) · 0.9–8 credits per image",
    "models": [
      "Stable Diffusion",
      "Stable Image"
    ],
    "base": "https://api.stability.ai/v2beta",
    "auth": "Authorization: Bearer",
    "steps": [
      "Sign up at <b>platform.stability.ai</b>.",
      "25 credits are credited on registration."
    ],
    "test": "— image generation endpoints under /v2beta.",
    "note": "Small but no card required. Image generation rather than text."
  },
  {
    "id": "wechat",
    "name": "WeChat Mini Program Growth Plan II",
    "sub": "Developer program",
    "kind": "credit",
    "budget": 1000000000,
    "unit": "tokens",
    "end": "2026-12-31",
    "added": "2026-09-28",
    "status": "active",
    "card": false,
    "china": true,
    "reach": "cn-only",
    "link": "https://mp.weixin.qq.com",
    "linkLabel": "Enroll",
    "budgetNote": "<b>1 billion tokens + 100,000 AI images</b> · enrollment open until 31 Dec",
    "models": [
      "Various"
    ],
    "base": "— see mini program backend",
    "auth": "—",
    "steps": [
      "Open your mini program backend.",
      "Go to <b>行业能力 → 小程序成长计划</b> (Industry capabilities → Mini Program Growth Plan).",
      "Enroll. Individual accounts qualify, not just companies."
    ],
    "test": "— integrated via the mini program backend.",
    "note": "The largest headline number on this list by an order of magnitude, and the longest enrollment window. Only useful if you have a WeChat mini program — personal accounts qualify."
  },
  {
    "id": "workbuddy",
    "name": "WorkBuddy",
    "sub": "Free tier + invite bonus",
    "kind": "client",
    "budget": 0,
    "unit": "points · not tokens",
    "end": "2026-10-31",
    "added": "2026-10-01",
    "status": "extended",
    "card": false,
    "china": true,
    "reach": "cn-only",
    "link": "https://www.workbuddy.cn/",
    "linkLabel": "Open",
    "budgetNote": "体验版 (Experience) tier costs <b>¥0</b> and gives <b>500 points/month</b> with Auto model scheduling across all models. Register through this page's link and you also get <b>2,000 bonus points</b>. Invite campaign runs <b>to 31 October 2026</b>.",
    "models": [
      "Auto — all models during the promo",
      "Hunyuan Hy4 preview",
      "Hunyuan Hy3"
    ],
    "base": "— client-bound",
    "auth": "—",
    "steps": [
      "Install WorkBuddy and register. No card needed.",
      "The <b>体验版 / Experience</b> tier is ¥0/month — 500 points, 5 projects, 5 GB library, 10 hosted apps.",
      "Leave the model on <b>Auto</b> — scheduling across all models is currently free on this tier.",
      "Registered via the link on this page? The 2,000 new-user points should land on signup — the bonus now runs <b>to 31 October 2026</b>."
    ],
    "test": "— client-bound.",
    "warn": "<b>Extended.</b> The 2,000-point new-user bonus was due to close on 30 September; the vendor's invite page now states 即日起至 2026年10月31日, and the bonus itself carries a 31 October deadline. Re-check before relying on it. The 500/month tier is separately marked 限时免费 (limited-time free) and is still shown as such on the pricing page.",
    "note": "Points are WorkBuddy's internal unit, <b>not tokens</b> — a task costs points depending on model and length, so there is no honest token figure to quote. That is why this row shows no token allowance. Included here because the free tier is genuinely ¥0 and the invite bonus is real, not because it ranks well."
  },
  {
    "id": "ling31",
    "name": "Ling 3.1 Flash",
    "sub": "Ant InclusionAI · gateway promo",
    "kind": "portable",
    "budget": 0,
    "unit": "free until 13 Oct",
    "end": "2026-10-13",
    "added": "2026-10-02",
    "status": "new",
    "card": false,
    "china": true,
    "reach": "cn-direct",
    "link": "https://vercel.com/ai-gateway/models/ling-3.1-flash",
    "linkLabel": "Open",
    "budgetNote": "<b>$0.00 input and output</b> through Vercel AI Gateway and Command Code · free window to <b>13 October 2026</b> · 262K context on the gateway (the model itself supports 1M) · Command Code caps at 300 requests/day/account",
    "models": [
      "inclusionai/ling-3.1-flash",
      "inclusionai/ling-3.1-flash-free"
    ],
    "base": "https://ai-gateway.vercel.sh/v1",
    "auth": "Authorization: Bearer (AI Gateway key or BYOK)",
    "steps": [
      "Easiest route: sign in to <b>Vercel AI Gateway</b> and pick <b>inclusionai/ling-3.1-flash</b> from the model list. No separate vendor signup.",
      "In code, use <b>inclusionai/ling-3.1-flash-free</b> — the <b>-free</b> ID <b>stops serving</b> when the promotion ends instead of silently billing you.",
      "Coding-agent route: install Command Code, subscribe to <b>Go</b> or above, then run <b>cmdc --model inclusionai/ling-3.1-flash:free</b>.",
      "<b>Use it before 13 October.</b> After that the plain model ID starts billing and the <b>-free</b> ID is switched off."
    ],
    "test": "curl https://ai-gateway.vercel.sh/v1/chat/completions \\\n  -H \"Authorization: Bearer $AI_GATEWAY_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\":\"inclusionai/ling-3.1-flash-free\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'",
    "warn": "<b>Two IDs, two different endings.</b> The standard ID begins billing the moment the promotion ends; the <b>-free</b> ID simply stops serving. Use the <b>-free</b> ID if you do not want a surprise charge. Note also that <b>Command Code needs a paid Go-tier subscription</b> — the free window is on the model, not on the client.",
    "note": "A genuinely new model — Ant's InclusionAI released Ling-3.1-flash on 30 September 2026: ~560B total parameters, ~25B active per token, coding- and agent-oriented. The gateway is the zero-friction way to try it; the model is also carried free on Command Code. This is a <b>third-party gateway</b> promotion of a vendor model, not an Ant first-party free tier — Ant has not published a public free allowance of its own."
  },
  {
    "id": "dsharness",
    "name": "DeepSeek Harness",
    "sub": "Desktop launch credit",
    "kind": "client",
    "budget": 0,
    "unit": "¥6 credit",
    "end": "2026-10-06",
    "added": "2026-10-02",
    "status": "new",
    "card": false,
    "china": true,
    "reach": "cn-only",
    "link": "https://github.com/deepseek-ai/deepseek-harness",
    "linkLabel": "Download",
    "budgetNote": "<b>¥6 credit</b> on login to the official DeepSeek Harness desktop app · Windows and macOS (Apple Silicon) · campaign reported to run to about <b>6 October 2026</b>, or until the allocation is exhausted",
    "models": [
      "DeepSeek V4 series"
    ],
    "base": "— client-bound, no portable key",
    "auth": "—",
    "steps": [
      "Download the official <b>DeepSeek Harness</b> desktop build — Windows x64 or macOS arm64. Linux is not available yet.",
      "Sign in with your DeepSeek account.",
      "If no credit appears, <b>sign out and sign in again</b> — that is the widely reported workaround.",
      "Spend it inside the app. It is a balance, not a key, and it does not transfer to the API."
    ],
    "test": "— client-bound. The credit is a balance inside the desktop app, not an API key.",
    "warn": "<b>Small and short.</b> ¥6 is a rounding error against real coding work, and the window closes around 6 October, or earlier if the allocation runs out. Verification level: <b>multi-source</b> — DeepSeek's 29 September launch announcement as carried by Sina Tech, Sohu and Chinese tech press; the credit is not documented on DeepSeek's own pricing page.",
    "note": "The value here is the <b>app</b>, not the ¥6 — this is DeepSeek's official desktop client for its coding harness. Treat the credit as a nudge to install it, and evaluate the tool rather than the grant."
  }
],
  rail: [
  {
    "d": "today",
    "label": "Today · 2 Oct",
    "items": [
      {
        "c": "exp",
        "n": "AI21 $10 trial — AI21's own pages disagree on the length",
        "t": "ai21.com/pricing says 7 days; docs.ai21.com/docs/usage-cost says three months. Not reconciled, so the length is uncertain. The 6 Oct date on that row is a placeholder — the clock runs from your own signup either way. No card needed to start."
      },
      {
        "c": "exp",
        "n": "CORRECTION — Cerebras is not a 1M-token/day free tier",
        "t": "The vendor replaced its open free tier with a $5 trial credit that expires 30 days after the grant, and states it offers no free tier that renews. A card is required before API access works at all. Confirmed on inference-docs.cerebras.ai rate-limits and the 2026-07-16 change-log entry. The old 1M/day figure came from third-party trackers and should not have been published."
      },
      {
        "c": "new",
        "n": "Ling 3.1 Flash — free to 13 Oct",
        "t": "Ant's InclusionAI model, $0.00 in and out through Vercel AI Gateway and Command Code. Use the -free model ID: it stops serving at the end rather than billing you. Confirmed on Vercel's own changelog."
      },
      {
        "c": "new",
        "n": "DeepSeek Harness — ¥6 desktop credit",
        "t": "Official desktop client launched 29 Sep. Sign in, and sign out/in again if the credit does not show. Small grant, short window (about 6 Oct) — the app is the point."
      },
      {
        "c": "ext",
        "n": "Qoder Qwen3.8-Flash — still free, no end date",
        "t": "Re-read on docs.qoder.com/events/flashoffer today: extended past 30 Sep, end date to be announced on that page. No action needed."
      },
      {
        "c": "exp",
        "n": "ZCode Trust Build / MiniMax Code / GLM night-free — 7 Oct",
        "t": "All three still listed as running to 7 October. GLM night-free is paid Coding Plan subscribers only; Trust Build tokens land late and expire next midnight."
      },
      {
        "c": "exp",
        "n": "AI21 $10 credit — 6 Oct",
        "t": "7-day window. Still a poor claim unless you will use Jamba this week."
      },
      {
        "c": "exp",
        "n": "Doubao 30-day Standard — ~17 Oct",
        "t": "Second round of the desktop grant. Date rests on reporting of the 24 Sep announcement, not the vendor campaign page, so it stays approximate."
      }
    ]
  },
  {
    "d": "yesterday",
    "label": "Yesterday · 1 Oct",
    "items": [
      {
        "c": "ext",
        "n": "WorkBuddy invite bonus — 31 Oct",
        "t": "Vendor page still reads 即日起至2026年10月31日; the 2,000-point new-user bonus carries the same deadline. The ¥0 体验版 is still shown as 限时免费."
      },
      {
        "c": "ext",
        "n": "Hunyuan Hy3 限免 + Hy4 night-free — 31 Oct",
        "t": "Joint WorkBuddy/Hunyuan announcement, 30 Sep. Night hours 23:00–08:00; last start date for the new-user 14-day quota is still 10 October."
      },
      {
        "c": "new",
        "n": "Doubao — 30 free days of the Standard plan",
        "t": "Every user qualifies. Client-bound; no key. Now marked active rather than new — status 'new' applies only on the run an offer first appears."
      },
      {
        "c": "dead",
        "n": "Wenxin 4.0 free series — closed",
        "t": "Baidu's free window ran through 30 September. The Hunyuan Hy3 half was extended instead and now lives on the Hunyuan Hy4 row."
      },
      {
        "c": "exp",
        "n": "GMI Hy Image 3.5 — free week ended",
        "t": "Window was 25 Sep → 1 Oct. Image generation only."
      },
      {
        "c": "exp",
        "n": "ZCode Trust Build / MiniMax Code / GLM night-free — 7 Oct",
        "t": "All three end 7 October."
      }
    ]
  },
  {
    "d": "week",
    "label": "Earlier this week · 30 Sep",
    "items": [
      {
        "c": "new",
        "n": "Kilo Code — Auto Free tier",
        "t": "Free hosted models, no card, no provider key. Rotating catalogue."
      },
      {
        "c": "new",
        "n": "StepFun Step 5 Preview",
        "t": "15 free Coding Plan days, +15 after first call, +45 by invite. Daily claim quota — often gone."
      },
      {
        "c": "new",
        "n": "OpenCode Zen — 10 free models",
        "t": "Portable key, not client-bound. Billing details required; auto-reload can charge you."
      },
      {
        "c": "ext",
        "n": "Qoder Qwen3.8-Flash — extended",
        "t": "Confirmed on docs.qoder.com/events/flashoffer: free continues past 30 Sep, end date TBA on that page."
      },
      {
        "c": "new",
        "n": "ZCode Trust Build opens",
        "t": "~100M GLM-5.3-Flash tokens. Claim 28 Sep → 7 Oct. Tokens expire next midnight."
      },
      {
        "c": "new",
        "n": "MiniMax Code — double credits",
        "t": "Daily check-in pays 2× through 7 Oct."
      },
      {
        "c": "new",
        "n": "Shanghai AI Lab InkStone",
        "t": "Monthly free token allowance during beta. 1 ink point ≈ 50M tokens."
      },
      {
        "c": "ext",
        "n": "Hunyuan Hy4 preview",
        "t": "14 days daily free from first use. Start by 10 Oct."
      }
    ]
  },
  {
    "d": "closed",
    "label": "Closed this week",
    "items": [
      {
        "c": "dead",
        "n": "Baidu Wenxin 4.0 (client)",
        "t": "Free access to the Wenxin 4.0 line ended 30 Sep and reverted to paid on 1 Oct. The Hunyuan Hy3 overflow option on that row was extended to 31 Oct instead."
      },
      {
        "c": "dead",
        "n": "GMI Cloud Hy Image 3.5",
        "t": "Free week ran 25 Sep → 1 Oct."
      },
      {
        "c": "dead",
        "n": "Vercel AI Gateway × Jev",
        "t": "Ended 25 Sep."
      },
      {
        "c": "dead",
        "n": "Baidu Comate beta",
        "t": "Ended 24 Sep. 9 models unlimited tokens."
      },
      {
        "c": "dead",
        "n": "iFlytek Spark X2.5",
        "t": "Ended 23 Sep, 00:00."
      },
      {
        "c": "dead",
        "n": "WorkBuddy DeepSeek V4.1 discount",
        "t": "Ended 23 Sep."
      }
    ]
  }
]
};
