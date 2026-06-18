"use client";

import { useAuth, SignInButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CandidateAttribution } from "@/components/CandidateAttribution";

interface Workflow {
  id: string;
  name: string;
  updatedAt: string;
}

// ---------- Palette ----------
// Paper background, near-black ink, and a single forest-teal accent.
// Swap these in one place if you ever want to retheme.
const ACCENT = "#1F6F5C";

// ---------- Helpers ----------
function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const diffMins = Math.round((Date.now() - date.getTime()) / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isRecentlyEdited(dateString: string) {
  return Date.now() - new Date(dateString).getTime() < 24 * 60 * 60 * 1000;
}

// ---------- Icons (inline SVG, zero extra dependencies) ----------
function IconOpen({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 13L13 7M13 7H8M13 7V12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPencil({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M13.5 3.5l3 3L7 16l-4 1 1-4L13.5 3.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTrash({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 6h12M8 6V4.5A1.5 1.5 0 019.5 3h1A1.5 1.5 0 0112 4.5V6m-6 0v9.5A1.5 1.5 0 007.5 17h5a1.5 1.5 0 001.5-1.5V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPlus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// The signature mark: one node branching into two, standing in for
// "flow." Used small in the header and large + faint in the empty state.
function FlowMark({ size = 28, opacity = 1 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" opacity={opacity} aria-hidden="true">
      <path
        d="M5 14H11M17 8H23M17 20H23M11 14L17 8M11 14L17 20"
        stroke={ACCENT}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="5" cy="14" r="2.6" fill={ACCENT} />
      <circle cx="17" cy="8" r="2.6" fill={ACCENT} />
      <circle cx="17" cy="20" r="2.6" fill={ACCENT} />
      <circle cx="23" cy="8" r="2" fill={ACCENT} opacity="0.4" />
      <circle cx="23" cy="20" r="2" fill={ACCENT} opacity="0.4" />
    </svg>
  );
}

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadWorkflows() {
    setError(null);
    try {
      const response = await fetch("/api/workflows");
      if (!response.ok) throw new Error("Failed to load workflows");
      const data = await response.json();
      setWorkflows(data);
    } catch (err) {
      console.error(err);
      setError("Couldn't load your workflows. Try refreshing the page.");
    } finally {
      setLoading(false);
    }
  }

  async function createWorkflow() {
    setError(null);
    try {
      const response = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Untitled workflow" }),
      });
      if (!response.ok) throw new Error("Failed to create workflow");
      const workflow = await response.json();
      router.push(`/workflow/${workflow.id}`);
    } catch (err) {
      console.error(err);
      setError("Couldn't create a new workflow. Try again.");
    }
  }

  async function deleteWorkflow(workflowId: string) {
    const confirmed = window.confirm("Delete this workflow? This can't be undone.");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/workflows/${workflowId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete workflow");
      setWorkflows((current) => current.filter((workflow) => workflow.id !== workflowId));
    } catch (err) {
      console.error(err);
      setError("Couldn't delete that workflow. Try again.");
    }
  }

  async function renameWorkflow(workflowId: string, currentName: string) {
    const newName = window.prompt("Rename workflow", currentName);
    if (!newName || newName.trim() === "") return;

    try {
      const response = await fetch(`/api/workflows/${workflowId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });
      if (!response.ok) throw new Error("Rename failed");
      setWorkflows((current) =>
        current.map((workflow) =>
          workflow.id === workflowId ? { ...workflow, name: newName.trim() } : workflow
        )
      );
    } catch (err) {
      console.error(err);
      setError("Couldn't rename that workflow. Try again.");
    }
  }

  useEffect(() => {
    if (isSignedIn) loadWorkflows();
  }, [isSignedIn]);

  // ---------- Auth not resolved yet ----------
  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F7F6F1]">
        <div className="flex items-center gap-3 text-[#5B6157]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#D8D5CB] border-t-[#1F6F5C]" />
          <span className="text-sm">Loading NextFlow…</span>
        </div>
      </div>
    );
  }

  // ---------- Signed out ----------
  if (!isSignedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F7F6F1] px-6">
        <CandidateAttribution/>
        <div className="w-full max-w-sm rounded-2xl border border-[#E4E1D8] bg-white p-8 text-center shadow-sm">
          <div className="mb-5 flex justify-center">
            <FlowMark size={36} />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-[#161A18]">
            Sign in to NextFlow
          </h1>
          <p className="mt-2 text-sm text-[#5B6157]">
            Build and manage your automation workflows in one place.
          </p>
          <div className="mt-6">
            <SignInButton mode="modal">
              <button className="w-full rounded-lg bg-[#1F6F5C] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#195A4A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6F5C]">
                Sign in
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Main dashboard ----------
  return (
    <main className="min-h-screen bg-[#F7F6F1] px-6 py-10 text-[#161A18] sm:px-10">
      <CandidateAttribution/>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#E4E1D8] pb-6">
          <div className="flex items-center gap-3">
            <FlowMark size={28} />
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">NextFlow</h1>
              <p className="text-sm text-[#5B6157]">
                {loading
                  ? "Workflow studio"
                  : `${workflows.length} workflow${workflows.length === 1 ? "" : "s"}`}
              </p>
            </div>
          </div>

          <button
            onClick={createWorkflow}
            className="flex items-center gap-1.5 rounded-lg bg-[#1F6F5C] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#195A4A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6F5C]"
          >
            <IconPlus className="h-4 w-4" />
            New workflow
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-lg border border-[#E3C9C2] bg-[#FAEFEC] px-4 py-3 text-sm text-[#8A2E22]">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="shrink-0 font-medium underline-offset-2 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-xl border border-[#E4E1D8] bg-white/60"
              />
            ))}
          </div>
        ) : workflows.length === 0 ? (
          <div className="relative overflow-hidden rounded-2xl border border-[#E4E1D8] bg-white px-8 py-16 text-center">
            <div className="pointer-events-none absolute right-6 top-6 hidden sm:block">
              <FlowMark size={120} opacity={0.06} />
            </div>
            <h2 className="text-lg font-semibold tracking-tight">Nothing built yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-[#5B6157]">
              Workflows you create will show up here. Start with a blank canvas — you can
              always duplicate or rename it later.
            </p>
            <button
              onClick={createWorkflow}
              className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-[#1F6F5C] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#195A4A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6F5C]"
            >
              <IconPlus className="h-4 w-4" />
              Create your first workflow
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {workflows.map((workflow) => {
              const recent = isRecentlyEdited(workflow.updatedAt);
              return (
                <div
                  key={workflow.id}
                  className="group rounded-xl border border-[#E4E1D8] bg-white p-4 transition-shadow hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-base font-semibold tracking-tight text-[#161A18]">
                      {workflow.name}
                    </h2>
                    <span
                      title={recent ? "Edited in the last 24 hours" : "No recent edits"}
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        recent ? "bg-[#1F6F5C]" : "bg-[#D8D5CB]"
                      }`}
                    />
                  </div>

                  <p className="mb-4 mt-1 text-xs text-[#8A8F86]">
                    Updated {formatRelativeTime(workflow.updatedAt)}
                  </p>

                  <div className="flex items-center gap-1.5 border-t border-[#EFEDE6] pt-3">
                    <button
                      onClick={() => router.push(`/workflow/${workflow.id}`)}
                      title="Open workflow"
                      className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-[#1F6F5C] transition-colors hover:bg-[#E4F2EC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6F5C]"
                    >
                      <IconOpen className="h-3.5 w-3.5" />
                      Open
                    </button>

                    <button
                      onClick={() => renameWorkflow(workflow.id, workflow.name)}
                      title="Rename workflow"
                      className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-[#5B6157] transition-colors hover:bg-[#F1EFE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6F5C]"
                    >
                      <IconPencil className="h-3.5 w-3.5" />
                      Rename
                    </button>

                    <button
                      onClick={() => deleteWorkflow(workflow.id)}
                      title="Delete workflow"
                      className="ml-auto flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-[#AE3B2E] transition-colors hover:bg-[#FAEFEC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AE3B2E]"
                    >
                      <IconTrash className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}