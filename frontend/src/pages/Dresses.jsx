return (
  <div className="min-h-screen bg-[#fafafa] flex font-sans">

    {/* Sidebar */}
    <aside className="w-64 bg-white border-r border-slate-100 p-6 flex flex-col justify-between">

      <div>
        <h1 className="text-xl font-bold mb-10">Aura Atelier</h1>

        <nav className="space-y-3 text-sm">

          <button className="w-full text-left px-4 py-2 rounded-lg bg-pink-50 text-pink-600 font-medium">
            Inventory
          </button>

          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50">
            Orders
          </button>

          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50">
            Customers
          </button>

        </nav>
      </div>

      <p className="text-xs text-slate-400">Aura Atelier System</p>

    </aside>


    {/* Main Content */}
    <div className="flex-1 p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <h2 className="text-3xl font-semibold">Inventory</h2>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dresses..."
          className="px-4 py-2 border border-slate-200 rounded-lg"
        />

      </div>


      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-12">

        <div className="bg-white p-6 rounded-xl border border-slate-100">
          <p className="text-3xl font-bold">{inventory.length}</p>
          <p className="text-sm text-slate-400">Total Dresses</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100">
          <p className="text-3xl font-bold">
            {inventory.filter((d) => d.status === "Available").length}
          </p>
          <p className="text-sm text-slate-400">Available</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100">
          <p className="text-3xl font-bold">
            ₹{inventory.reduce((a, c) => a + (Number(c.pricePerDay) || 0), 0)}
          </p>
          <p className="text-sm text-slate-400">Daily Value</p>
        </div>

      </div>


      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredInventory.map((d) => (
          <div
            key={d.id}
            className="bg-white border border-slate-100 rounded-xl p-6 hover:shadow-md transition"
          >

            <div className="h-40 bg-pink-50 rounded-lg mb-4 flex items-center justify-center text-4xl text-pink-300">
              {d.name.charAt(0)}
            </div>

            <h3 className="font-semibold text-lg">{d.name}</h3>

            <p className="text-sm text-slate-400">
              {d.category} • Size {d.size || "OS"}
            </p>

            <p className="text-xl font-bold mt-3">
              ₹{d.pricePerDay}
            </p>

            <button className="mt-3 text-sm text-pink-500 hover:underline">
              Edit
            </button>

          </div>
        ))}

      </div>


      {/* Floating Add Button */}
      <button className="fixed bottom-10 right-10 bg-pink-500 text-white w-14 h-14 rounded-full text-2xl shadow-lg hover:scale-105 transition">
        +
      </button>

    </div>

  </div>
);