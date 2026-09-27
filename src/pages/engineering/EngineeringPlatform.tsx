import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ExperiencePhoto } from "@/components/ExperiencePhoto";
import { ManagedContentSections } from "@/components/ManagedContentSections";
import { useManagedHero } from "@/hooks/useManagedHero";
import {
  Cpu,
  Bot,
  Gauge,
  Network,
  RadioTower,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Activity,
  CalendarDays,
} from "lucide-react";

const disciplines = [
  {
    key: "control",
    title: "Control Systems",
    icon: Gauge,
    text: "Model, simulate and implement feedback control for industrial, energy and building systems.",
    services: [
      "System modelling",
      "PID and advanced control",
      "PLC and SCADA integration",
      "MATLAB/Simulink validation",
    ],
  },
  {
    key: "robotics",
    title: "Robotics & Automation",
    icon: Bot,
    text: "Purpose-built automation, mobile robots and intelligent electromechanical prototypes.",
    services: [
      "Robot prototyping",
      "Industrial automation",
      "Embedded intelligence",
      "Motion and actuator control",
    ],
  },
  {
    key: "instrumentation",
    title: "Instrumentation",
    icon: RadioTower,
    text: "Measurement systems that turn physical processes into reliable, actionable data.",
    services: [
      "Sensor integration",
      "Data acquisition",
      "Calibration and testing",
      "IoT monitoring",
    ],
  },
  {
    key: "networking",
    title: "Networking & Infrastructure",
    icon: Network,
    text: "Secure connected systems for offices, schools, laboratories and industrial sites.",
    services: [
      "Network design",
      "Wireless deployment",
      "Security hardening",
      "Monitoring and maintenance",
    ],
  },
];

export function EngineeringHome() {
  const hero = useManagedHero("engineering");
  return (
    <>
      <Header
        product="engineering"
        announcementText="Engineering intelligent systems for real-world performance"
      />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-950 via-slate-900 to-orange-900 text-white">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-24 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-bold text-amber-300 uppercase tracking-[.18em] text-sm">
                {hero?.eyebrow || "IHLink Engineering"}
              </p>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight mt-4">
                {hero?.title || "From engineering concept to working system."}
              </h1>
              <p className="text-lg text-amber-100/80 mt-6 max-w-xl">
                {hero?.body || "Control engineering, robotics, automation, instrumentation and network infrastructure designed for businesses, schools, researchers and industry."}
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to={hero?.cta_link || "/engineering/quote"}>
                  <Button themeClass="bg-amber-500 hover:bg-amber-600">
                    {hero?.cta_label || "Discuss a project"}
                  </Button>
                </Link>
                <Link to="/engineering/portfolio">
                  <Button variant="secondary">View capabilities</Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {disciplines.map((d) => (
                <Link to={`/engineering/${d.key}`} key={d.key}>
                  <Card
                    className="!bg-white/10 border-white/15 text-white h-full"
                    hover
                  >
                    <d.icon className="w-9 h-9 text-amber-400" />
                    <h3 className="font-bold mt-4">{d.title}</h3>
                    <p className="text-xs text-white/60 mt-2">
                      Explore capability
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <ExperiencePhoto src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=85" alt="A programmable robot representing automation and intelligent control engineering" eyebrow="Robotics and intelligent control" title="From calculations and prototypes to working automated systems" text="Our engineering work is grounded in control, robotics, instrumentation, testing and real operating environments—not only diagrams and presentations." accentClass="text-amber-700" />
        <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20">
          <div className="max-w-2xl">
            <p className="text-amber-700 font-bold">Engineering capabilities</p>
            <h2 className="text-4xl font-black mt-2">
              Practical expertise across connected systems
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {disciplines.map((d) => (
              <Card hover key={d.key}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-amber-100 grid place-items-center">
                    <d.icon className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{d.title}</h3>
                    <p className="text-muted mt-2">{d.text}</p>
                    <Link
                      to={`/engineering/${d.key}`}
                      className="inline-flex items-center gap-2 text-amber-700 font-bold mt-5"
                    >
                      View services <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
        <ManagedContentSections pageKey="engineering" />
      </main>
      <Footer product="engineering" />
    </>
  );
}

export function EngineeringService({ type }: { type: string }) {
  const d = disciplines.find((x) => x.key === type) || disciplines[0];
  return (
    <>
      <Header product="engineering" />
      <main>
        <section className="bg-slate-950 text-white">
          <div className="max-w-[1100px] mx-auto px-6 py-20 flex flex-col md:flex-row gap-10 items-center">
            <div className="w-24 h-24 rounded-3xl bg-amber-500 grid place-items-center shrink-0">
              <d.icon className="w-12 h-12" />
            </div>
            <div>
              <p className="text-amber-400 font-bold">IHLink Engineering</p>
              <h1 className="text-4xl font-black mt-2">{d.title}</h1>
              <p className="text-slate-300 mt-4 max-w-2xl">{d.text}</p>
            </div>
          </div>
        </section>
        <section className="max-w-[1100px] mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-xl font-bold">What we deliver</h2>
            <div className="space-y-4 mt-6">
              {d.services.map((x) => (
                <p className="flex items-center gap-3" key={x}>
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  {x}
                </p>
              ))}
            </div>
          </Card>
          <Card className="bg-amber-50">
            <h2 className="text-xl font-bold">
              Start with an engineering review
            </h2>
            <p className="text-muted mt-3">
              Share the problem, operating environment, performance target and
              available resources. Our team will define a suitable technical
              approach.
            </p>
            <Link to="/engineering/quote">
              <Button
                themeClass="bg-amber-500 hover:bg-amber-600"
                className="mt-6"
              >
                Request assessment
              </Button>
            </Link>
          </Card>
        </section>
      </main>
      <Footer product="engineering" />
    </>
  );
}

export function EngineeringQuote() {
  return (
    <>
      <Header product="engineering" />
      <main className="min-h-screen bg-amber-50/40 py-14">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-amber-700 font-bold">Project request</p>
          <h1 className="text-4xl font-black mt-2">
            Tell us what you want to build
          </h1>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="md:col-span-2">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="border rounded-xl p-3"
                  placeholder="Full name"
                />
                <input
                  className="border rounded-xl p-3"
                  placeholder="Email address"
                />
                <select className="border rounded-xl p-3 bg-white">
                  <option>Select engineering area</option>
                  {disciplines.map((x) => (
                    <option key={x.key}>{x.title}</option>
                  ))}
                </select>
                <input
                  className="border rounded-xl p-3"
                  placeholder="Organisation"
                />
              </div>
              <textarea
                className="border rounded-xl p-3 w-full mt-4 min-h-36"
                placeholder="Describe the problem, expected outcome and environment"
              />
              <Button
                themeClass="bg-amber-500 hover:bg-amber-600"
                className="mt-4"
              >
                Submit project brief
              </Button>
            </Card>
            <Card>
              <Cpu className="w-8 h-8 text-amber-700" />
              <h2 className="font-bold mt-4">What happens next?</h2>
              <div className="space-y-4 mt-5 text-sm">
                {[
                  "Technical review",
                  "Discovery call",
                  "Scope and proposal",
                  "Project kickoff",
                ].map((x, i) => (
                  <p key={x}>
                    <b>
                      {i + 1}. {x}
                    </b>
                  </p>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer product="engineering" />
    </>
  );
}

export function EngineeringDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header product="engineering" showAnnouncement={false} />
      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <p className="text-amber-700 font-bold">Client workspace</p>
        <h1 className="text-3xl font-black mt-1">Engineering projects</h1>
        <div className="grid md:grid-cols-4 gap-4 mt-7">
          {[
            [ClipboardList, "Active projects", "3"],
            [Activity, "Open milestones", "8"],
            [CalendarDays, "Next review", "18 Sep"],
            [Cpu, "System tests", "92%"],
          ].map(([I, l, v]) => {
            const Icon = I as typeof Cpu;
            return (
              <Card key={String(l)}>
                <Icon className="w-5 h-5 text-amber-700" />
                <p className="text-sm text-muted mt-4">{String(l)}</p>
                <p className="text-2xl font-black">{String(v)}</p>
              </Card>
            );
          })}
        </div>
        <Card className="mt-6">
          <h2 className="font-bold">Current projects</h2>
          <div className="divide-y mt-4">
            {[
              ["Smart Energy Load Controller", "Prototype testing", "72%"],
              ["Laboratory DAQ System", "Hardware integration", "48%"],
              ["Campus Network Upgrade", "Site survey", "20%"],
            ].map((x) => (
              <div className="py-5" key={x[0]}>
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">{x[0]}</p>
                    <p className="text-sm text-muted">{x[1]}</p>
                  </div>
                  <b>{x[2]}</b>
                </div>
                <div className="h-2 rounded-full bg-slate-100 mt-3">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: x[2] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}

export function EngineeringSupport() {
  return (
    <>
      <Header product="engineering" />
      <main className="max-w-5xl mx-auto px-6 py-16 text-center">
        <RadioTower className="w-12 h-12 mx-auto text-amber-700" />
        <h1 className="text-4xl font-black mt-4">Engineering support</h1>
        <p className="text-muted mt-3">
          Request diagnostics, scheduled maintenance, calibration or technical
          assistance for an active project.
        </p>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {[
            "System diagnostics",
            "Maintenance visit",
            "Documentation help",
          ].map((x) => (
            <Card hover key={x}>
              <h2 className="font-bold">{x}</h2>
              <p className="text-sm text-muted mt-2">
                Open a support request and track the response from your
                workspace.
              </p>
            </Card>
          ))}
        </div>
      </main>
      <Footer product="engineering" />
    </>
  );
}
