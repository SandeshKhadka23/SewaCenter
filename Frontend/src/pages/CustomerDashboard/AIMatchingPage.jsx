import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Car,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  Hammer,
  IndianRupee,
  LoaderCircle,
  MapPin,
  Paintbrush,
  Send,
  Settings,
  Sparkles,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import { providerApi } from "../../lib/api";

const CATEGORY_RULES = [
  {
    slug: "plumbing",
    name: "Plumbing",
    icon: Wrench,
    keywords: [
      "tap",
      "faucet",
      "pipe",
      "leak",
      "leaking",
      "water",
      "drain",
      "toilet",
      "sink",
      "geyser",
      "plumber",
      "sewage",
    ],
    explanation: "The issue appears related to water flow, pipes, drainage, or bathroom/kitchen fittings.",
  },
  {
    slug: "electrical",
    name: "Electrical",
    icon: Zap,
    keywords: [
      "electric",
      "electricity",
      "wire",
      "wiring",
      "switch",
      "socket",
      "fan",
      "light",
      "bulb",
      "fuse",
      "mcb",
      "power",
      "short circuit",
    ],
    explanation: "The issue appears related to wiring, power, lighting, switches, or electrical safety.",
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    icon: Sparkles,
    keywords: [
      "clean",
      "cleaning",
      "dust",
      "dirty",
      "stain",
      "kitchen cleaning",
      "bathroom cleaning",
      "deep clean",
      "office cleaning",
    ],
    explanation: "The request appears to need home, room, kitchen, bathroom, or office cleaning.",
  },
  {
    slug: "tutoring",
    name: "Tutoring",
    icon: GraduationCap,
    keywords: [
      "teacher",
      "tutor",
      "tuition",
      "math",
      "science",
      "english",
      "exam",
      "study",
      "homework",
      "class",
    ],
    explanation: "The request appears related to academic tutoring, homework, or exam preparation.",
  },
  {
    slug: "appliance",
    name: "Appliance Repair",
    icon: Settings,
    keywords: [
      "fridge",
      "refrigerator",
      "washing machine",
      "microwave",
      "ac",
      "air conditioner",
      "television",
      "tv",
      "heater",
      "appliance",
      "machine",
    ],
    explanation: "The issue appears related to a household appliance that needs inspection or repair.",
  },
  {
    slug: "carpentry",
    name: "Carpentry",
    icon: Hammer,
    keywords: [
      "wood",
      "wooden",
      "door",
      "window",
      "furniture",
      "table",
      "chair",
      "cabinet",
      "bed",
      "carpenter",
    ],
    explanation: "The request appears related to wooden furniture, doors, windows, or custom woodwork.",
  },
  {
    slug: "painting",
    name: "Painting",
    icon: Paintbrush,
    keywords: [
      "paint",
      "painting",
      "wall color",
      "wall colour",
      "repaint",
      "interior",
      "exterior",
      "putty",
    ],
    explanation: "The request appears related to wall preparation, interior painting, or exterior painting.",
  },
  {
    slug: "mechanic",
    name: "Mechanic",
    icon: Car,
    keywords: [
      "car",
      "bike",
      "motorbike",
      "vehicle",
      "engine",
      "brake",
      "tyre",
      "tire",
      "mechanic",
      "servicing",
    ],
    explanation: "The issue appears related to a car, bike, engine, brakes, tyres, or general servicing.",
  },
];

const URGENCY_RULES = {
  high: [
    "urgent",
    "emergency",
    "immediately",
    "right now",
    "spark",
    "smoke",
    "flood",
    "burst",
    "overflow",
    "no electricity",
    "short circuit",
    "badly",
    "danger",
  ],
  medium: ["today", "soon", "not working", "broken", "stopped", "problem"],
};

const SUGGESTIONS = [
  "My kitchen tap is leaking badly",
  "The bedroom light and socket are not working",
  "I need deep cleaning for my apartment",
  "My washing machine is making a loud noise",
];

function normalizeText(value) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function analyseIssue(issue) {
  const text = normalizeText(issue);

  const rankedCategories = CATEGORY_RULES.map((category) => {
    const matches = category.keywords.filter((keyword) => text.includes(keyword));
    return {
      ...category,
      matches,
      score: matches.reduce((total, keyword) => total + Math.max(1, keyword.split(" ").length), 0),
    };
  }).sort((a, b) => b.score - a.score);

  const category = rankedCategories[0]?.score > 0 ? rankedCategories[0] : CATEGORY_RULES[0];

  let urgency = "Low";
  if (URGENCY_RULES.high.some((keyword) => text.includes(keyword))) urgency = "High";
  else if (URGENCY_RULES.medium.some((keyword) => text.includes(keyword))) urgency = "Medium";

  const confidence = category.score > 0
    ? Math.min(98, 68 + category.score * 7)
    : 55;

  return {
    category,
    urgency,
    confidence,
    summary: category.score > 0
      ? category.explanation
      : "The request was not specific enough, so Plumbing is shown as a starting suggestion. Add more detail for a better match.",
  };
}

function parseExperience(value) {
  const match = String(value || "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function providerMatchScore(provider) {
  return (
    Number(provider.averageRating || provider.rating || 0) * 20 +
    Number(provider.jobsCompleted || provider.completedJobs || 0) * 0.1 +
    parseExperience(provider.experience) * 2 +
    (provider.verified ? 12 : 0) +
    (provider.isAvailable ? 8 : 0)
  );
}

function urgencyClasses(urgency) {
  if (urgency === "High") return "bg-red-50 text-red-600 ring-red-100";
  if (urgency === "Medium") return "bg-amber-50 text-amber-700 ring-amber-100";
  return "bg-emerald-50 text-emerald-700 ring-emerald-100";
}

function formatPrice(provider) {
  const price = Number(provider.price || provider.services?.[0]?.price || 0);
  if (!price) return "Price after inspection";

  const upper = Math.round(price * 1.35);
  return `NPR ${price.toLocaleString()} – ${upper.toLocaleString()}`;
}

function ProviderRow({ provider, rank, onView, onBook }) {
  const displayName = provider.businessName || provider.name || "Service Provider";
  const rating = Number(provider.averageRating || provider.rating || 0);
  const reviews = provider.reviewCount || provider.reviews || 0;
  const serviceName = provider.services?.[0]?.name || provider.category || "Home service";

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg sm:p-5">
      <div className="grid items-center gap-4 lg:grid-cols-[42px_1.6fr_1fr_1fr_1.05fr_auto]">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-bold text-white shadow-sm">
          {rank}
        </div>

        <div className="flex min-w-0 items-center gap-3">
          <img
            src={provider.profileImageUrl || provider.avatarUrl || provider.image || "https://ui-avatars.com/api/?background=eff6ff&color=2563eb&name=Service+Provider"}
            alt={displayName}
            className="h-14 w-14 rounded-full border border-slate-200 object-cover"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate font-bold text-slate-900">{displayName}</h3>
              {provider.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-blue-600" />}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                <Star className="h-3.5 w-3.5 fill-current" />
                {rating ? rating.toFixed(1) : "New"}
              </span>
              <span>({reviews})</span>
              <span>•</span>
              <span>{provider.experience || "Experienced professional"}</span>
            </div>
            <p className="mt-1 truncate text-xs text-slate-400">{serviceName}</p>
          </div>
        </div>

        <div className="border-slate-100 lg:border-l lg:pl-5">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
            <MapPin className="h-4 w-4 text-slate-400" />
            {provider.location || "Kathmandu"}
          </p>
          <p className="mt-1 text-xs text-slate-400">Nearby service area</p>
        </div>

        <div className="border-slate-100 lg:border-l lg:pl-5">
          <p className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
            <IndianRupee className="h-4 w-4 text-emerald-500" />
            {formatPrice(provider)}
          </p>
          <p className="mt-1 text-xs text-slate-400">Estimated price</p>
        </div>

        <div className="border-slate-100 lg:border-l lg:pl-5">
          <p className={`flex items-center gap-1.5 text-sm font-semibold ${provider.isAvailable ? "text-emerald-600" : "text-amber-600"}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${provider.isAvailable ? "bg-emerald-500" : "bg-amber-500"}`} />
            {provider.isAvailable ? "Available now" : "Schedule required"}
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <Clock3 className="h-3.5 w-3.5" />
            Typical response within 30–60 min
          </p>
        </div>

        <div className="flex gap-2 lg:flex-col">
          <button
            type="button"
            onClick={() => onView(provider.id)}
            className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 lg:flex-none"
          >
            View profile
          </button>
          <button
            type="button"
            onClick={() => onBook(provider.id)}
            className="flex-1 rounded-xl border border-blue-200 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 lg:flex-none"
          >
            Book now
          </button>
        </div>
      </div>
    </article>
  );
}

export default function AIMatchingPage() {
  const navigate = useNavigate();
  const [issue, setIssue] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  const visibleProviders = useMemo(
    () => (showAll ? providers : providers.slice(0, 3)),
    [providers, showAll],
  );

  async function handleMatch(event) {
    event?.preventDefault();

    const cleanIssue = issue.trim();
    if (cleanIssue.length < 5) {
      setError("Please describe the problem in at least a few words.");
      return;
    }

    setLoading(true);
    setError("");
    setShowAll(false);

    const result = analyseIssue(cleanIssue);
    setAnalysis(result);

    try {
      const response = await providerApi.list({
        category: result.category.slug,
        available: "true",
        limit: "12",
      });

      const ranked = [...(response.data || [])].sort(
        (a, b) => providerMatchScore(b) - providerMatchScore(a),
      );

      setProviders(ranked);
    } catch (requestError) {
      setProviders([]);
      setError(requestError.message || "Could not load matching providers.");
    } finally {
      setLoading(false);
    }
  }

  function useSuggestion(suggestion) {
    setIssue(suggestion);
    setAnalysis(null);
    setProviders([]);
    setError("");
  }

  const CategoryIcon = analysis?.category?.icon || BrainCircuit;

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_#eff6ff_0,_#f8fafc_45%,_#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Sewa AI Matching
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            How can we help you today?
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Describe your issue naturally. Sewa AI identifies the service category, estimates urgency, and ranks suitable providers from your database.
          </p>
        </section>

        <form onSubmit={handleMatch} className="mx-auto mt-8 max-w-5xl">
          <div className="flex items-center gap-3 rounded-2xl border border-blue-200 bg-white p-2 shadow-[0_16px_45px_rgba(37,99,235,0.10)] ring-4 ring-blue-50 transition focus-within:border-blue-400 focus-within:ring-blue-100">
            <div className="ml-3 hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex">
              <Sparkles className="h-5 w-5" />
            </div>
            <textarea
              value={issue}
              onChange={(event) => setIssue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleMatch(event);
                }
              }}
              rows={1}
              placeholder="Example: My kitchen tap is leaking badly"
              className="min-h-12 flex-1 resize-none bg-transparent px-2 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Find matching providers"
            >
              {loading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => useSuggestion(suggestion)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>

        {error && (
          <div className="mx-auto mt-5 flex max-w-5xl items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {analysis && (
          <section className="mx-auto mt-7 max-w-5xl">
            <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="font-bold text-slate-800">Sewa AI</span>
              analysed your request and ranked the best available matches.
            </div>

            <div className="grid gap-4 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/70 via-white to-blue-50/60 p-5 shadow-sm md:grid-cols-[1fr_0.72fr_1.35fr]">
              <div className="flex items-center gap-4 md:border-r md:border-slate-200 md:pr-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CategoryIcon className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Predicted category</p>
                  <div className="mt-1 flex items-center gap-2">
                    <h2 className="text-lg font-black text-slate-900">{analysis.category.name}</h2>
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  </div>
                  <p className="mt-1 text-xs font-semibold text-emerald-700">{analysis.confidence}% confidence</p>
                </div>
              </div>

              <div className="md:border-r md:border-slate-200 md:px-5">
                <p className="text-xs font-medium text-slate-400">Estimated urgency</p>
                <span className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-sm font-bold ring-1 ${urgencyClasses(analysis.urgency)}`}>
                  {analysis.urgency}
                </span>
              </div>

              <div className="md:pl-2">
                <p className="text-xs font-medium text-slate-400">Issue understanding</p>
                <p className="mt-1.5 text-sm font-medium leading-6 text-slate-700">{analysis.summary}</p>
              </div>
            </div>
          </section>
        )}

        {analysis && !loading && (
          <section className="mx-auto mt-7 max-w-5xl pb-12">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  {providers.length ? `Top ${Math.min(3, providers.length)} service providers` : "Matching providers"}
                </h2>
                <p className="mt-1 text-xs text-slate-500">Sorted using rating, completed jobs, verification, experience, and availability.</p>
              </div>
              {providers.length > 0 && (
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                  <BrainCircuit className="mr-1 inline h-3.5 w-3.5" />
                  Sorted by match score
                </span>
              )}
            </div>

            {providers.length > 0 ? (
              <>
                <div className="space-y-3">
                  {visibleProviders.map((provider, index) => (
                    <ProviderRow
                      key={provider.id}
                      provider={provider}
                      rank={index + 1}
                      onView={(id) => navigate(`/providers/${id}`)}
                      onBook={(id) => navigate(`/book/${id}`)}
                    />
                  ))}
                </div>

                {providers.length > 3 && (
                  <div className="mt-5 text-center">
                    <button
                      type="button"
                      onClick={() => setShowAll((current) => !current)}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      {showAll ? "Show top 3" : `View ${providers.length - 3} more providers`}
                      <ChevronDown className={`h-4 w-4 transition ${showAll ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <BrainCircuit className="mx-auto h-10 w-10 text-slate-300" />
                <h3 className="mt-3 font-bold text-slate-800">No available providers found</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  The issue was analysed successfully, but no approved and available provider exists in this category yet.
                </p>
                <button
                  type="button"
                  onClick={() => navigate(`/providers?category=${analysis.category.slug}`)}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                >
                  Browse all providers
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
