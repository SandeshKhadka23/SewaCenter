import provider from "../../assets/images/provider.jpg";

export default function EditProfile() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Edit Profile
      </h1>

      <div className="bg-white rounded-2xl shadow p-8">

        <div className="flex flex-col md:flex-row gap-10">

          {/* Profile Image */}
          <div className="flex flex-col items-center">

            <img
              src={provider}
              alt="Provider"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
            />

            <button className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Change Photo
            </button>

          </div>

          {/* Form */}
          <div className="flex-1 grid md:grid-cols-2 gap-6">

            <div>
              <label className="font-semibold">
                Full Name
              </label>

              <input
                type="text"
                defaultValue="John Doe"
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">
                Email
              </label>

              <input
                type="email"
                defaultValue="john@gmail.com"
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">
                Phone
              </label>

              <input
                type="text"
                defaultValue="9800000000"
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">
                Profession
              </label>

              <input
                type="text"
                defaultValue="Electrician"
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">
                Address
              </label>

              <input
                type="text"
                defaultValue="Kathmandu, Nepal"
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">
                About Yourself
              </label>

              <textarea
                rows="5"
                defaultValue="Professional electrician with 8 years of experience."
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
                Save Changes
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}