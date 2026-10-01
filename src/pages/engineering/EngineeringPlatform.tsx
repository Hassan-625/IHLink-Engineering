import {ServiceGuide} from '@/components/ServiceGuide';
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ExperiencePhoto } from "@/components/ExperiencePhoto";
import { ManagedContentSections } from "@/components/ManagedContentSections";
import { useManagedHero } from "@/hooks/useManagedHero";
import { IH_LINK_LOGO } from "@/assets/ihlinkLogo";
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
            <div><figure className="mb-6"><img src="/images/service-scene-clean.webp" alt="IHLink Engineering team service illustration" width="1672" height="941" className="block h-auto w-full rounded-2xl"/><figcaption className="mt-2 text-xs text-white/60">IHLink service illustration.</figcaption></figure><div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3"><img src={IH_LINK_LOGO} alt="IHLink" className="h-11 w-11 rounded-xl bg-white object-contain p-1"/><div><b className="block">IHLink Engineering</b><span className="text-xs text-amber-100/70">Control • Robotics • Instrumentation</span></div></div><div className="grid grid-cols-2 gap-4">
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
            </div></div>
          </div>
        </section>
        <ServiceGuide/><ExperiencePhoto src="/images/service-scene-clean.webp" alt="IHLink Engineering team service illustration" eyebrow="Robotics and intelligent control" title="From calculations and prototypes to working automated systems" text="Our engineering work is grounded in control, robotics, instrumentation, testing and real operating environments—not only diagrams and presentations." accentClass="text-amber-700" />
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
        <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-20"><div className="grid gap-6 lg:grid-cols-3"><Card><p className="font-bold text-amber-700">Applications</p><h2 className="mt-2 text-xl font-black">Industry, research and intelligent infrastructure</h2><p className="mt-3 text-sm text-muted">Suitable for process control, automation prototypes, smart monitoring, laboratory systems, energy projects, connected facilities and network infrastructure.</p></Card><Card><p className="font-bold text-amber-700">Engineering workflow</p><h2 className="mt-2 text-xl font-black">Requirements to validated system</h2><p className="mt-3 text-sm text-muted">We capture operating conditions and performance targets, design the architecture, prototype or simulate where appropriate, integrate hardware/software, test and document the delivered system.</p></Card><Card><p className="font-bold text-amber-700">Project evidence</p><h2 className="mt-2 text-xl font-black">Traceable decisions and deliverables</h2><p className="mt-3 text-sm text-muted">Projects can include specifications, diagrams, models, code or configuration, test records, commissioning notes and support documentation according to scope.</p></Card></div><div className="mt-8 rounded-3xl bg-slate-950 p-8 text-white"><h2 className="text-2xl font-black">Before requesting an engineering assessment</h2><p className="mt-3 max-w-4xl text-slate-300">Share the problem, site or operating environment, available power and interfaces, sensors/actuators or equipment involved, target performance, safety constraints, timeframe and any existing drawings or data. This lets the team assess feasibility before committing to a build.</p><Link to="/engineering/quote" className="mt-6 inline-flex items-center gap-2 font-bold text-amber-400">Request an engineering review <ArrowRight className="h-4 w-4"/></Link></div></section><ManagedContentSections pageKey="engineering" />
      </main>
      <Footer product="engineering" />
    </>
  );
}

export function EngineeringPortfolio() {
  return <>
    <Header product="engineering" />
    <main className="max-w-[1180px] mx-auto px-6 py-16">
      <p className="font-bold text-amber-700">IHLink Engineering</p>
      <h1 className="mt-2 text-4xl font-black">Engineering capabilities</h1>
      <p className="mt-4 max-w-3xl text-muted">Explore the systems we design, build and support. Each area links to its services and the project request process.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {disciplines.map(d => <Card key={d.key}>
          <d.icon className="h-8 w-8 text-amber-700" />
          <h2 className="mt-4 text-xl font-bold">{d.title}</h2>
          <p className="mt-2 text-muted">{d.text}</p>
          <ul className="mt-4 space-y-2 text-sm">{d.services.map(service => <li key={service} className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-amber-700" />{service}</li>)}</ul>
          <Link className="mt-6 inline-flex items-center gap-2 font-bold text-amber-700" to={`/engineering/${d.key}`}>Explore {d.title} <ArrowRight className="h-4 w-4" /></Link>
        </Card>)}
      </div>
      <Link to="/engineering/quote" className="mt-10 inline-block"><Button>Discuss a project</Button></Link>
    </main>
    <Footer product="engineering" />
  </>;
}

export function EngineeringContact() {
  return <>
    <Header product="engineering" />
    <main className="mx-auto max-w-[950px] px-6 py-20">
      <p className="font-bold text-amber-700">IHLink Engineering</p>
      <h1 className="mt-2 text-4xl font-black">Get in touch</h1>
      <p className="mt-4 max-w-2xl text-muted">Tell us what you are building or the engineering problem you need solved. The project request form records your requirements for a response from the team.</p>
      <div className="mt-9 grid gap-5 md:grid-cols-2">
        <Card><h2 className="text-xl font-bold">Start a project</h2><p className="mt-2 text-sm text-muted">Describe the system, site, timeframe and support you need.</p><Link to="/engineering/quote" className="mt-5 inline-block"><Button>Request a quote</Button></Link></Card>
        <Card><h2 className="text-xl font-bold">Existing project support</h2><p className="mt-2 text-sm text-muted">Sign in to see your projects and contact the delivery team through your support workspace.</p><Link to="/engineering/support" className="mt-5 inline-block"><Button variant="secondary">Open support</Button></Link></Card>
      </div>
    </main>
    <Footer product="engineering" />
  </>;
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
