# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Java八股文网 — a VuePress 2 static site for Java interview preparation content, deployed to GitHub Pages at java-baguwen.com.

## Commands

- `pnpm docs:dev` — start dev server (port defaults to 8080)
- `pnpm docs:build` — production build, output to `src/.vuepress/dist`
- `pnpm docs:clean-dev` — dev server with cache cleared

## Architecture

Built with **VuePress 2** (rc.9) + **vuepress-theme-hope** (rc.38), bundled via Vite.

### Config files (all in `src/.vuepress/`)

| File | Purpose |
|------|---------|
| `config.ts` | Site title, lang, base path |
| `theme.ts` | Theme options, plugins (Giscus comments, mdEnhance with mermaid, components) |
| `navbar.ts` | Top navigation bar |
| `sidebar.ts` | Full sidebar tree (~800 lines) — all content navigation defined here |
| `styles/` | SCSS: `index.scss`, `config.scss`, `palette.scss` |
| `public/` | Static assets (favicon, logo) |

### Content structure

All content lives under `src/` as Markdown files. Top-level directories map to major topic areas:

- `basic/` — Java fundamentals (generics, reflection, annotations, etc.)
- `list/` — Java collections (ArrayList, HashMap, ConcurrentHashMap, etc.)
- `concurrency/` — Java concurrency (AQS, ReentrantLock, ThreadLocal, thread pools, etc.)
- `mysql/` — MySQL deep dives (indexes, locks, transactions, MVCC, etc.)
- `redis/` — Redis topics (data structures, persistence, clustering, distributed locks)
- `spring/`, `springboot/`, `springmvc/`, `springcloud/` — Spring ecosystem
- `mq/` — Message queues (Kafka, RocketMQ, RabbitMQ)
- `jvm/` — JVM internals and tuning
- `algo/` — Algorithm problems (strings, arrays, linked lists, trees, sorting)
- `tool/` — Developer tools (Git, IDEA, Cursor, Maven, Nginx, etc.)
- `interview/` — Interview process, resume, salary negotiation
- `eq/` — Soft skills for programmers

`src/home.md` is the main landing page. `src/README.md` is the VuePress home page with hero layout.

### Adding new content

1. Create a `.md` file in the appropriate topic directory
2. Add a sidebar entry in `src/.vuepress/sidebar.ts` under the matching prefix/group
3. If it's a new top-level section, also add a navbar entry in `src/.vuepress/navbar.ts`

## Deployment

GitHub Actions workflow (`.github/workflows/docs.yml`): on push to `master`, builds with pnpm + Node 20 and deploys `src/.vuepress/dist` to the `gh-pages` branch using `crazy-max/ghaction-github-pages`.

## Tech notes

- Package manager: **pnpm** (lock file present), but npm lock file also exists
- Language: TypeScript for config, Chinese (zh-CN) for all content
- Markdown enhancements enabled: mermaid diagrams, code tabs, task lists, image lazy loading, includes
