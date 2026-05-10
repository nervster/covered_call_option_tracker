import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { MoveRight, LineChart, Cpu, ArrowRightLeft } from "lucide-react";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">S</div>
            <span className="text-xl font-bold tracking-tight">Rolling Option <span className="text-blue-600">Tracker</span></span>
          </div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </header>

      <main>
        {/* State 1: User is Logged In */}
        <SignedIn>
          <div className="animate-in fade-in duration-500">
            <Dashboard />
          </div>
        </SignedIn>
        <SignedOut>
          {/* Hero Section */}
          <section className="px-4 py-24 text-center lg:py-32">
            <div className="container mx-auto">
              <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Rolling Options Strategy, Simplified.
              </h1>
              <p className="mb-10 text-xl text-slate-600 leading-relaxed">
                A sophisticated engine built to automate the "Stair-Step" roll.
                Keep your premiums, adjust your strikes, and let our logic handle the math.
              </p>
              <SignInButton mode="modal">
                <button className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700">
                  Get Started <MoveRight className="ml-2 h-5 w-5" />
                </button>
              </SignInButton>
            </div>
          </section>

          {/* Feature Grid */}
          <section className="container mx-auto px-4 py-20 border-t">
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<LineChart className="h-10 w-10 text-blue-600" strokeWidth={1.5} />}
                title="Input Trade Data"
                desc="Easily log your covered calls. We capture the Greeks and underlying metrics automatically."
              />
              <FeatureCard
                icon={<Cpu className="h-10 w-10 text-purple-600" strokeWidth={1.5} />}
                title="Strategy Analysis"
                desc="Our Option Math engine evaluates your position against a target 5% rolling threshold."
              />
              <FeatureCard
                icon={<ArrowRightLeft className="h-10 w-10 text-emerald-600" strokeWidth={1.5} />}
                title="Execute the Roll"
                desc="Get clear recommendations on when to move your strike up to maintain a net-credit."
              />
            </div>
          </section>

          {/* Architecture / Developer Section */}
          <section className="bg-slate-900 py-20 text-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold mb-4 text-slate-100">Technical Architecture</h2>
                <p className="text-slate-400 max-w-2xl mb-12">Built for scale using modern cloud-native principles and type-safe infrastructure.</p>

                <div className="flex flex-wrap justify-center gap-4">
                  {['Java 21', 'Spring Boot 3', 'PostgreSQL', 'TypeScript', 'Clerk Auth', 'Render CI/CD'].map((tech) => (
                    <span key={tech} className="rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1 text-sm font-medium text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </SignedOut>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="group relative rounded-2xl border bg-white p-8 transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="mb-6 inline-flex rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200 transition-colors group-hover:bg-blue-50">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}