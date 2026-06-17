# NextFlow

NextFlow is a visual AI workflow builder inspired by tools such as Galaxy.ai, Langflow, Flowise, and n8n.

Users can visually construct workflows using drag-and-drop nodes, execute workflows as Directed Acyclic Graphs (DAGs), track execution history, and persist workflows for future use.

---

## Features

### Workflow Builder

* Visual node-based workflow editor
* Drag-and-drop workflow construction
* Import and export workflows as JSON
* Auto-save support
* Cycle prevention
* Type-safe connections

### Nodes

#### Request Inputs

* Text input
* Image upload
* Input preview

#### Crop Image

* Adjustable crop parameters
* Image preview
* Simulated processing delay

#### Gemini Pro

* Gemini-powered AI generation
* Prompt chaining
* Workflow-based input propagation

#### Response

* Final workflow output display

---

## Execution Engine

* Directed Acyclic Graph (DAG) execution
* Dependency resolution
* Node execution persistence
* Workflow run history
* Parallel execution support

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

```bash
npm install
```

```bash
npm run dev
```

Create:

.env

with:

DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
GEMINI_API_KEY=
TRIGGER_SECRET_KEY=

---

## Deployment

Deployed using Vercel.

---

## Candidate

Akshat Paul

LinkedIn:
https://www.linkedin.com/in/akshat-paul/
