export default function Reviews() {
  const reviews = [
    {
      id: 1,
      customer: "Ram Sharma",
      rating: 5,
      review:
        "Excellent service. Very professional and arrived on time.",
      date: "10 July 2026",
    },
    {
      id: 2,
      customer: "Sita Karki",
      rating: 4,
      review:
        "Good work. Highly recommended.",
      date: "8 July 2026",
    },
    {
      id: 3,
      customer: "Hari KC",
      rating: 5,
      review:
        "Very friendly and fixed everything perfectly.",
      date: "5 July 2026",
    },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Customer Reviews
      </h1>

      <div className="space-y-6">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="bg-white rounded-2xl shadow p-6"
          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-xl font-semibold">
                  {review.customer}
                </h2>

                <p className="text-gray-500 text-sm">
                  {review.date}
                </p>

              </div>

              <div className="text-yellow-500 text-xl">
                {"⭐".repeat(review.rating)}
              </div>

            </div>

            <p className="mt-4 text-gray-700">
              {review.review}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}