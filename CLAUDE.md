# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

True/False quiz web app about Claude Code with three difficulty levels (Iniciante, Intermediário, Avançado), a 15-second per-question timer, immediate feedback with explanations, and anonymous result persistence via Supabase.

The full product spec lives in `prd.md`. Read it before starting or continuing work.

## Commands

```bash
npm install           # first time only
npm run dev           # Vite dev server (localhost:5173)
npm run build         # production build → dist/
npm run preview       # serve the dist/ build locally
```

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS (custom Anthropic palette) |
| Database | Supabase (PostgreSQL) |
| Client | `@supabase/supabase-js` |
| Deploy | Vercel (`main` branch = production) |

## Architecture

```
src/
  data/questions.js      ← 60 hardcoded questions (offline fallback)
  hooks/
    useQuiz.js           ← quiz state: question selection, scoring, session
    useTimer.js          ← 15s countdown, fires callback on expiry
  services/
    questionsService.js  ← fetch questions from Supabase
    sessionsService.js   ← save quiz_sessions + quiz_answers to Supabase
  lib/supabase.js        ← Supabase client (reads VITE_ env vars)
  components/            ← UI only, no business logic
  App.jsx                ← screen router (home → levelSelect → quiz → result)
```

All quiz logic lives in `useQuiz.js`. Components are purely presentational. If Supabase is unavailable, `questionsService.js` falls back to `src/data/questions.js` silently — sessions are not saved offline.

## Environment Variables

```env
# .env.local — do not commit
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

Set the same variables in Vercel → Settings → Environment Variables for production. The anon key is intentionally public — security is enforced via Row Level Security on all tables.

## Supabase Schema

Three tables: `questions`, `quiz_sessions`, `quiz_answers`. Full DDL (with RLS policies) is in `prd.md` section 6.3.

RLS rules:
- `questions`: public SELECT where `ativo = TRUE`
- `quiz_sessions` and `quiz_answers`: public INSERT only (no auth required)

## Critical Business Rules

- Each game has exactly **15 questions** drawn progressively: Iniciante → Intermediário → Avançado
- Distribution by chosen level: Iniciante (7+5+3), Intermediário (3+7+5), Avançado (1+4+10)
- Questions within each difficulty block are shuffled randomly each session
- Timer is **15 seconds** per question; expiry counts as wrong and auto-advances
- Explanation is always shown after a response (whether correct or incorrect)
- Session is saved to Supabase **only** when user clicks "Salvar resultado" (not automatically)
- Nickname defaults to "Anônimo" if left blank; max 30 chars; save button disables after first click

## Design Tokens

```
Background:  #F5F0E8   (Anthropic beige)
Primary:     #D97706   (Anthropic orange)
Text:        #1C1917
Secondary:   #78716C
Success:     #16A34A
Error:       #DC2626
Card bg:     #FFFFFF
Border:      #E7E5E4
Font:        Inter (Google Fonts)
```

Minimum button height: 48px (mobile touch target).
