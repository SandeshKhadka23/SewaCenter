import { Star, Quote } from "lucide-react";
import StatCard from "./StatCard";

const reviews = [
  {
    id: 1,
    customer: "Ram Sharma",
    rating: 5,
    review: "Excellent service. Very professional and arrived on time.",
    date: "10 July 2026",
  },
  {
    id: 2,
    customer: "Sita Karki",
    rating: 4,
    review: "Good work. Highly recommended.",
    date: "8 July 2026",
  },
  {
    id: 3,
    customer: "Hari KC",
    rating: 5,
    review: "Very friendly and fixed everything perfectly.",
    date: "5 July 2026",
  },
];

const AVATAR_PALETTE = ["#3B6E8F", "#3E7C59", "#E8A33D", "#B24C3C", "#6B5B95"];

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function avatarColor(name) {
  const sum = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_PALETTE[sum % AVATAR_PALETTE.length];
}

export default function Reviews() {
  const total = reviews.length;
  const average = (reviews.reduce((a, r) => a + r.rating, 0) / total).toFixed(1);

  return (
    <div className="p-6 md:p-10 font-body" style={{ color: "#20261F" }}>
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest" style={{ color: "#8A8A78" }}>
          Customer voice
        </span>
        <h1 className="font-display text-3xl font-semibold mt-1">Reviews</h1>
        <p className="mt-1" style={{ color: "#6B6B63" }}>
          What customers are saying about your work.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-md">
        <StatCard
          title="Average rating"
          value={average}
          subtitle={`${total} reviews`}
          icon={Star}
          accent="#E8A33D"
        />
        <StatCard
          title="Total reviews"
          value={total}
          subtitle="All time"
          icon={Quote}
          accent="#3B6E8F"
        />
      </div>

      <div className="space-y-4 max-w-3xl">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="relative rounded-xl bg-white p-6"
            style={{ border: "1px solid #E7E2D4" }}
          >
            <Quote
              size={30}
              className="absolute top-5 right-5"
              style={{ color: "#F1EEE3" }}
            />

            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold font-display shrink-0"
                style={{ background: avatarColor(review.customer) }}
              >
                {initials(review.customer)}
              </div>
              <div>
                <h2 className="font-semibold">{review.customer}</h2>
                <p className="text-xs" style={{ color: "#8A8A78" }}>
                  {review.date}
                </p>
              </div>
            </div>

            <div className="flex gap-0.5 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  style={{ color: "#E8A33D" }}
                  fill={i < review.rating ? "#E8A33D" : "none"}
                />
              ))}
            </div>

            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#3F3F37" }}>
              {review.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}