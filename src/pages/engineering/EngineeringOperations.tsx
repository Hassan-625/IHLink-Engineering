import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Activity,
  CalendarDays,
  ClipboardList,
  Cpu,
  RadioTower,
  FileText, Target, ShieldAlert, Receipt, Users, MessagesSquare, RefreshCw, ArrowRight,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuickContact } from "@/components/QuickContact";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
type OpRow = Record<string, any>;
const field =
  "w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:border-amber-500";
type Request = {
  id: string;
  request_number: string;
  project_title: string;
  discipline: string;
  status: string;
  created_at: string;
};
type Project = {
  id: string;
  project_number: string;
  name: string;
  discipline: string;
  stage: string;
  progress: number;
  lead_engineer: string | null;
  status: string;
};
export function EngineeringQuoteLive() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({
      discipline: "control",
      organisation: "",
      project_title: "",
      problem_statement: "",
      location: "",
      preferred_assessment_date: "",
      budget_range: "under-500k",
    }),
    [busy, setBusy] = useState(false),
    [note, setNote] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!user) {
      nav("/signin?next=/engineering/quote");
      return;
    }
    if (!supabase) return;
    setBusy(true);
    const { data, error } = await supabase
      .from("engineering_requests")
      .insert({
        ...f,
        user_id: user.id,
        preferred_assessment_date: f.preferred_assessment_date || null,
      })
      .select("request_number")
      .single();
    setBusy(false);
    if (error) {
      setNote(error.message);
      return;
    }
    setNote(`Project brief ${data.request_number} submitted.`);
    setTimeout(() => nav("/engineering/dashboard"), 700);
  }
  return (
    <>
      <Header product="engineering" />
      <main className="min-h-screen bg-amber-50/40 py-14">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-bold text-amber-700">
            Engineering project request
          </p>
          <h1 className="mt-2 text-4xl font-black">
            Tell us what you want to build
          </h1>
          {note && (
            <div className="mt-5 rounded-xl border bg-white p-3 text-sm">
              {note}
            </div>
          )}
          <Card className="mt-8">
            <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-bold">
                Engineering area
                <select
                  className={`${field} mt-2`}
                  value={f.discipline}
                  onChange={(e) => setF({ ...f, discipline: e.target.value })}
                >
                  <option value="control">Control systems</option>
                  <option value="robotics">Robotics & automation</option>
                  <option value="instrumentation">Instrumentation</option>
                  <option value="networking">
                    Networking & infrastructure
                  </option>
                </select>
              </label>
              <label className="text-sm font-bold">
                Organisation
                <input
                  className={`${field} mt-2`}
                  value={f.organisation}
                  onChange={(e) => setF({ ...f, organisation: e.target.value })}
                />
              </label>
              <label className="text-sm font-bold">
                Project title
                <input
                  required
                  className={`${field} mt-2`}
                  value={f.project_title}
                  onChange={(e) =>
                    setF({ ...f, project_title: e.target.value })
                  }
                />
              </label>
              <label className="text-sm font-bold">
                Site location
                <input
                  className={`${field} mt-2`}
                  value={f.location}
                  onChange={(e) => setF({ ...f, location: e.target.value })}
                />
              </label>
              <label className="text-sm font-bold">
                Preferred assessment date
                <input
                  type="date"
                  className={`${field} mt-2`}
                  value={f.preferred_assessment_date}
                  onChange={(e) =>
                    setF({ ...f, preferred_assessment_date: e.target.value })
                  }
                />
              </label>
              <label className="text-sm font-bold">
                Budget range
                <select
                  className={`${field} mt-2`}
                  value={f.budget_range}
                  onChange={(e) => setF({ ...f, budget_range: e.target.value })}
                >
                  <option value="under-500k">Under ₦500,000</option>
                  <option value="500k-2m">₦500,000–₦2,000,000</option>
                  <option value="2m-10m">₦2,000,000–₦10,000,000</option>
                  <option value="10m+">Above ₦10,000,000</option>
                </select>
              </label>
              <label className="text-sm font-bold md:col-span-2">
                Problem, target and operating environment
                <textarea
                  required
                  rows={6}
                  className={`${field} mt-2`}
                  value={f.problem_statement}
                  onChange={(e) =>
                    setF({ ...f, problem_statement: e.target.value })
                  }
                />
              </label>
              <div className="md:col-span-2">
                <Button
                  disabled={busy}
                  themeClass="bg-amber-500 hover:bg-amber-600"
                >
                  {busy ? "Submitting…" : "Submit project brief"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
      <Footer product="engineering" />
    </>
  );
}
export function EngineeringDashboardLive() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]),
    [projects, setProjects] = useState<Project[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [selected, setSelected] = useState(""),
    [ops, setOps] = useState<Record<string, OpRow[]>>({});
  const load = useCallback(async () => {
    if (!supabase || !user) return;
    const [r, p] = await Promise.all([
      supabase
        .from("engineering_requests")
        .select("id,request_number,project_title,discipline,status,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("engineering_projects")
        .select(
          "id,project_number,name,discipline,stage,progress,lead_engineer,status",
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
    ]);
    setRequests((r.data || []) as Request[]);
    const projectRows=(p.data || []) as Project[]; setProjects(projectRows);
    const pid=selected||projectRows[0]?.id||""; if(pid&&!selected)setSelected(pid);
    if(pid){const names=["engineering_proposals","engineering_milestones","engineering_documents","engineering_tests","engineering_risks","engineering_invoices","engineering_team_members","engineering_messages","engineering_change_requests"];const rs=await Promise.all(names.map(n=>supabase!.from(n).select("*").eq("project_id",pid).order("created_at",{ascending:false})));const next:Record<string,OpRow[]>={};names.forEach((n,i)=>next[n]=rs[i].data||[]);setOps(next)}
    setError(r.error?.message || p.error?.message || "");
    setLoading(false);
  }, [user, selected]);
  useEffect(() => {
    void load();
  }, [load]);
  return (
    <div className="min-h-screen bg-slate-50">
      <Header product="engineering" showAnnouncement={false} />
      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-amber-700">Client workspace</p>
            <h1 className="text-3xl font-black">Engineering operations</h1>
          </div>
          <Link to="/engineering/quote">
            <Button themeClass="bg-amber-500 hover:bg-amber-600">
              New project
            </Button>
          </Link>
        </div>
        {error && (
          <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {error}
          </div>
        )}
        <div className="mt-7 grid gap-4 md:grid-cols-4">
          {[
            [ClipboardList, "Requests", requests.length],
            [
              Activity,
              "Active projects",
              projects.filter((x) => x.status === "active").length,
            ],
            [
              CalendarDays,
              "Assessments",
              requests.filter((x) => x.status === "assessment_scheduled")
                .length,
            ],
            [
              Cpu,
              "Average progress",
              projects.length
                ? Math.round(
                    projects.reduce((n, x) => n + x.progress, 0) /
                      projects.length,
                  ) + "%"
                : "0%",
            ],
          ].map(([I, l, v]) => {
            const Icon = I as typeof Cpu;
            return (
              <Card key={String(l)}>
                <Icon className="h-5 w-5 text-amber-700" />
                <p className="mt-4 text-sm text-muted">{String(l)}</p>
                <p className="text-2xl font-black">{String(v)}</p>
              </Card>
            );
          })}
        </div>
        <Card className="mt-6">
          <h2 className="font-bold">Project requests</h2>
          <div className="mt-4 divide-y">
            {requests.map((x) => (
              <div key={x.id} className="flex justify-between py-4">
                <div>
                  <b>{x.project_title}</b>
                  <p className="text-xs text-muted">
                    {x.request_number} · {x.discipline}
                  </p>
                </div>
                <span className="text-xs font-bold capitalize text-amber-700">
                  {x.status.replaceAll("_", " ")}
                </span>
              </div>
            ))}
            {!requests.length && !loading && (
              <p className="py-5 text-sm text-muted">
                No engineering request yet.
              </p>
            )}
          </div>
        </Card>
        {!!projects.length&&<Card className="mt-6"><label className="text-sm font-bold">Project workspace <select className="ml-3 rounded-lg border p-2" value={selected} onChange={e=>setSelected(e.target.value)}>{projects.map(p=><option key={p.id} value={p.id}>{p.project_number} — {p.name}</option>)}</select></label></Card>}
        <Card className="mt-6">
          <h2 className="font-bold">Active projects</h2>
          <div className="mt-4 divide-y">
            {projects.map((x) => (
              <div key={x.id} className="py-4">
                <div className="flex justify-between">
                  <div>
                    <b>{x.name}</b>
                    <p className="text-xs text-muted">
                      {x.project_number} · {x.stage} ·{" "}
                      {x.lead_engineer || "Engineer being assigned"}
                    </p>
                  </div>
                  <b>{x.progress}%</b>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-amber-500"
                    style={{ width: `${x.progress}%` }}
                  />
                </div>
              </div>
            ))}
            {!projects.length && !loading && (
              <p className="py-5 text-sm text-muted">
                Approved work will appear here with assessments, equipment and
                field reports.
              </p>
            )}
          </div>
        </Card>
        {!!selected&&<div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[
          [FileText,"Proposals","engineering_proposals","Commercial and technical proposals for this project."],[Target,"Milestones","engineering_milestones","Project stages, targets and delivery checkpoints."],[ClipboardList,"Engineering documents","engineering_documents","Drawings, reports and controlled project documents."],[Activity,"Testing & commissioning","engineering_tests","Testing, commissioning and verification records."],[ShieldAlert,"Risk register","engineering_risks","Project risks, mitigations and operational concerns."],[Receipt,"Invoices","engineering_invoices","Project invoices and commercial records."],[Users,"Project team","engineering_team_members","Assigned engineers and project responsibilities."],[MessagesSquare,"Project messages","engineering_messages","Project communication and recorded updates."],[RefreshCw,"Change requests","engineering_change_requests","Scope and implementation change requests."]
        ].map(([I,title,key,description])=>{const Icon=I as typeof Activity;return <Card key={String(key)} className="group shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-start justify-between"><div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-950 text-white"><Icon className="h-6 w-6"/></div><span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-black text-amber-800">{(ops[String(key)]||[]).length}</span></div><h2 className="mt-4 font-black">{String(title)}</h2><p className="mt-2 text-sm text-muted">{String(description)}</p><div className="mt-4 space-y-2">{(ops[String(key)]||[]).slice(0,3).map(x=><div key={x.id} className="rounded-lg border p-3 text-sm"><b>{x.title||x.proposal_number||x.invoice_number||x.display_name||x.body}</b><p className="text-xs text-muted capitalize">{String(x.status||x.approval_status||x.role_title||"recorded").replaceAll("_"," ")}</p></div>)}{!(ops[String(key)]||[]).length&&<p className="text-xs text-muted">No records yet.</p>}</div><span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950">Project module <ArrowRight className="h-4 w-4"/></span></Card>})}</div>}
      </main>
    </div>
  );
}
export function EngineeringSupportLive() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({
      subject: "",
      category: "diagnostics",
      message: "",
    }),
    [busy, setBusy] = useState(false),
    [note, setNote] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!user) {
      nav("/signin?next=/engineering/support");
      return;
    }
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase
      .from("engineering_support_tickets")
      .insert({ ...f, user_id: user.id });
    setBusy(false);
    setNote(error?.message || "Engineering support request submitted.");
    if (!error) setF({ subject: "", category: "diagnostics", message: "" });
  }
  return (
    <>
      <Header product="engineering" />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <RadioTower className="mx-auto h-12 w-12 text-amber-700" />
          <h1 className="mt-4 text-4xl font-black">Engineering support</h1>
          <p className="mt-3 text-muted">
            Diagnostics, maintenance, calibration and documentation assistance.
          </p>
        </div>
        {note && (
          <div className="mt-6 rounded-xl border bg-white p-3 text-sm">
            {note}
          </div>
        )}
        <QuickContact className="mx-auto mt-8 max-w-3xl" />
        <Card className="mx-auto mt-8 max-w-3xl">
          <form onSubmit={submit} className="grid gap-4">
            <input
              required
              className={field}
              placeholder="Subject"
              value={f.subject}
              onChange={(e) => setF({ ...f, subject: e.target.value })}
            />
            <select
              className={field}
              value={f.category}
              onChange={(e) => setF({ ...f, category: e.target.value })}
            >
              <option value="diagnostics">System diagnostics</option>
              <option value="maintenance">Maintenance visit</option>
              <option value="calibration">Calibration</option>
              <option value="documentation">Documentation help</option>
              <option value="other">Other</option>
            </select>
            <textarea
              required
              rows={6}
              className={field}
              placeholder="Describe the system, symptoms, location and urgency"
              value={f.message}
              onChange={(e) => setF({ ...f, message: e.target.value })}
            />
            <Button
              disabled={busy}
              themeClass="bg-amber-500 hover:bg-amber-600"
            >
              {busy ? "Submitting…" : "Submit support request"}
            </Button>
          </form>
        </Card>
      </main>
      <Footer product="engineering" />
    </>
  );
}
