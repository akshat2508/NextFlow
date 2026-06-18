# NextFlow

## Live Demo

[Nextflow vercel link
](https://next-flow-delta-ten.vercel.app/)
## Demo Video

[Assignment Demo Video
](https://drive.google.com/file/d/1uubatUDPDckhY1LD_hbWRl7ylGVTn7R-/view?usp=sharing)
## GitHub Repository

https://github.com/akshat2508/nextflow

---

## Overview

NextFlow is a visual AI workflow builder inspired by tools such as Galaxy.ai, Langflow, Flowise, and n8n.

Users can visually construct workflows using drag-and-drop nodes, execute workflows as Directed Acyclic Graphs (DAGs), track execution history, and persist workflows for future use.

---

## Features

### Workflow Builder

* Visual node-based workflow editor
* Drag-and-drop workflow construction
* Import and export workflows as JSON
* Workflow persistence
* Cycle prevention (DAG validation)
* Type-safe connections
* Animated workflow edges
* React Flow MiniMap
* Pan, zoom, and fit-view support

### Nodes

#### Request Inputs

* Text input fields
* Image upload fields
* Dynamic field creation
* Input preview

#### Crop Image

* Adjustable crop parameters
* Image preview
* Trigger.dev execution
* 30+ second processing delay (assignment requirement)

#### Gemini 3.1 Pro

* Gemini-powered AI generation
* Prompt chaining
* System prompts
* Inline response rendering
* Workflow-based input propagation

#### Response

* Final workflow output display
* Result collection node

---

## Execution Engine

* Directed Acyclic Graph (DAG) execution
* Dependency resolution
* Parallel execution support
* Selective execution
* Workflow run persistence
* Node execution tracking
* Execution history

---

## Tech Stack

* Next.js 15
* React 19
* TypeScript
* Prisma
* Neon PostgreSQL
* Clerk Authentication
* Zustand
* React Flow
* Trigger.dev
* Google Gemini
* Tailwind CSS

---

## Screenshots

### Dashboard

(Add screenshot)

### Workflow Builder

(Add screenshot)

### Execution History

(Add screenshot)

---

## Local Setup

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Create a `.env` file:

```env
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
GEMINI_API_KEY=
TRIGGER_SECRET_KEY=
```

---

## Deployment

Deployed on Vercel.

---

## Candidate

**Akshat Paul**

LinkedIn:

https://www.linkedin.com/in/akshat-paul/
