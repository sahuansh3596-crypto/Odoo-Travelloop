export default function TraveloopFrontend() {
  const navItems = [
    'Home',
    'Create Trip',
    'Itinerary',
    'Trips',
    'Community',
    'Checklist',
    'Notes',
    'Expenses',
    'Profile',
    'Admin'
  ];

  const cards = [
    {
      title: 'Paris Adventure',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
      desc: '5 Days • France'
    },
    {
      title: 'Goa Beach Trip',
      image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200&auto=format&fit=crop',
      desc: '3 Days • India'
    },
    {
      title: 'Swiss Mountains',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
      desc: '7 Days • Switzerland'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-600">Traveloop</h1>

          <ul className="hidden lg:flex gap-6 font-medium">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-blue-600 transition duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1400&auto=format&fit=crop"
          alt="travel"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Plan Your Dream Journey
            </h1>

            <p className="text-xl text-slate-200 mt-6 max-w-2xl mx-auto">
              Smart travel planning with itinerary management, budget tracking,
              community sharing and packing checklist.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition">
                Create Trip
              </button>

              <button className="bg-white hover:bg-slate-200 text-slate-900 px-8 py-4 rounded-2xl text-lg font-semibold transition">
                Explore Places
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="bg-white rounded-3xl p-6 shadow-lg grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search destination"
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select className="border rounded-xl px-4 py-3 outline-none">
            <option>Group By</option>
            <option>Budget</option>
            <option>Country</option>
          </select>

          <select className="border rounded-xl px-4 py-3 outline-none">
            <option>Filter</option>
            <option>Adventure</option>
            <option>Beach</option>
          </select>

          <button className="bg-blue-600 text-white rounded-xl px-6 py-3 hover:bg-blue-700 transition">
            Search Trips
          </button>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold">Top Destinations</h2>
          <button className="text-blue-600 font-semibold">View All</button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition duration-300"
            >
              <img
                src={card.image}
                alt={card.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold">{card.title}</h3>
                <p className="text-slate-500 mt-2">{card.desc}</p>

                <button className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition">
                  View Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Create Trip */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-50 rounded-3xl p-8 shadow-lg">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Create New Trip
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="date"
                className="border rounded-xl px-4 py-4"
              />

              <input
                type="date"
                className="border rounded-xl px-4 py-4"
              />

              <input
                type="text"
                placeholder="Destination"
                className="border rounded-xl px-4 py-4"
              />

              <select className="border rounded-xl px-4 py-4">
                <option>Trip Type</option>
                <option>Adventure</option>
                <option>Business</option>
              </select>
            </div>

            <textarea
              placeholder="Additional Information"
              className="w-full border rounded-xl px-4 py-4 mt-6 h-40"
            ></textarea>

            <div className="text-center mt-8">
              <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl hover:bg-blue-700 transition text-lg">
                Create Trip
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose Traveloop?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            'Trip Planning',
            'Budget Tracking',
            'Community Sharing',
            'Packing Checklist'
          ].map((feature) => (
            <div
              key={feature}
              className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition"
            >
              <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto mb-6 flex items-center justify-center text-3xl">
                ✈️
              </div>

              <h3 className="text-2xl font-bold">{feature}</h3>

              <p className="text-slate-500 mt-4">
                Modern tools to manage and organize your travel experience.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold">Travel Community</h2>

          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
            Share your travel memories, experiences and explore adventures from
            travelers all around the world.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white text-slate-900 rounded-3xl p-6"
              >
                <img
                  src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1200&auto=format&fit=crop"
                  className="rounded-2xl h-56 w-full object-cover"
                />

                <h3 className="text-2xl font-bold mt-5">Amazing Journey</h3>

                <p className="text-slate-500 mt-3">
                  Incredible adventure experience shared by the community.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-14">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Traveloop</h2>
            <p className="mt-4 text-slate-400">
              Smart travel planning platform for modern travelers.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Pages</h3>
            <ul className="space-y-3">
              <li>Home</li>
              <li>Create Trip</li>
              <li>Itinerary</li>
              <li>Expenses</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
            <ul className="space-y-3">
              <li>Budget Planner</li>
              <li>Travel Notes</li>
              <li>Checklist</li>
              <li>Community</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-slate-400">
              <li>Email: support@traveloop.com</li>
              <li>Phone: +91 9876543210</li>
              <li>India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-slate-500">
          © 2026 Traveloop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
