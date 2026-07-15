import provider from "../../assets/images/provider.jpg";

function Field({ label, type = "text", defaultValue, full }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="text-sm font-medium" style={{ color: "#6B6B63" }}>
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-lg p-3 mt-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8A33D] focus:border-transparent"
        style={{ border: "1px solid #E7E2D4", background: "#FBFAF6" }}
      />
    </div>
  );
}

export default function EditProfile() {
  return (
    <div className="p-6 md:p-10 font-body" style={{ color: "#20261F" }}>
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest" style={{ color: "#8A8A78" }}>
          Account
        </span>
        <h1 className="font-display text-3xl font-semibold mt-1">Edit profile</h1>
        <p className="mt-1" style={{ color: "#6B6B63" }}>
          Keep your public details up to date.
        </p>
      </div>

      <div className="rounded-xl bg-white p-8" style={{ border: "1px solid #E7E2D4" }}>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Profile Image */}
          <div className="flex flex-col items-center shrink-0">
            <img
              src={provider}
              alt="Provider"
              className="w-36 h-36 rounded-full object-cover"
              style={{ border: "4px solid #E8A33D" }}
            />
            <button
              className="mt-5 px-5 py-2 rounded-lg font-medium text-white text-sm transition hover:opacity-90"
              style={{ background: "#20261F" }}
            >
              Change photo
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 grid md:grid-cols-2 gap-6">
            <Field label="Full name" defaultValue="John Doe" />
            <Field label="Email" type="email" defaultValue="john@gmail.com" />
            <Field label="Phone" defaultValue="9800000000" />
            <Field label="Profession" defaultValue="Electrician" />
            <Field label="Address" defaultValue="Kathmandu, Nepal" full />

            <div className="md:col-span-2">
              <label className="text-sm font-medium" style={{ color: "#6B6B63" }}>
                About yourself
              </label>
              <textarea
                rows="5"
                defaultValue="Professional electrician with 8 years of experience."
                className="w-full rounded-lg p-3 mt-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8A33D] focus:border-transparent"
                style={{ border: "1px solid #E7E2D4", background: "#FBFAF6" }}
              />
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                className="px-8 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
                style={{ background: "#20261F" }}
              >
                Save changes
              </button>
              <button
                className="px-8 py-3 rounded-lg font-semibold transition hover:bg-[#F1EEE3]"
                style={{ color: "#6B6B63" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}