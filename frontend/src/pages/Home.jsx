import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BadgeCheck, CalendarClock, Sparkles } from "lucide-react";
import LandingCards from "../components/LandingCards";
import { Hero } from "../components/Hero";

const Feature = ({ icon, title, description }) => (
  <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-slate-900/5 backdrop-blur">
    <div className="flex items-start gap-4">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white shadow-md">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold tracking-tight text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    </div>
  </div>
);

export const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate("/collections", { state: { category } });
  };

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-orange-200/55 blur-3xl" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rose-200/45 blur-3xl" />
        <div className="absolute bottom-16 left-1/3 h-80 w-80 rounded-full bg-cyan-100/55 blur-3xl" />
        <div className="absolute right-1/4 top-[54%] h-72 w-72 rounded-full bg-amber-100/45 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.5)_0%,transparent_45%)]" />
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl space-y-10 sm:space-y-14">
          <Hero />

          {/* Premium quick value props */}
          <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Feature
              icon={<Sparkles size={18} />}
              title="Curated premium collection"
              description="Gowns, sarees, lehengas, and more—kept fresh and ready for your next event."
            />
            <Feature
              icon={<CalendarClock size={18} />}
              title="Simple rental flow"
              description="Browse, book dates, pick up, and return. Manage everything from one place."
            />
            <Feature
              icon={<BadgeCheck size={18} />}
              title="Trusted quality"
              description="Clean presentation, clear pricing, and fast turnaround for repeat customers."
            />
          </section>

          {/* Collection preview (existing component) */}
          <LandingCards />

          {/* Editorial category spotlight */}
        {/* Fashion Editorial Showcase */}

<section className="rounded-[2.5rem] border border-white/60 bg-white/80 backdrop-blur p-8 sm:p-14 shadow-xl shadow-slate-900/5">

{/* Collection Highlight Section */}

<section className="rounded-[2.5rem] border border-white/60 bg-white/80 backdrop-blur p-8 sm:p-14 shadow-xl shadow-slate-900/5">

{/* Heading */}

  <div className="text-center max-w-2xl mx-auto">

<p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-400">
  Lumiya Collection
</p>

<h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
  Style for every celebration
</h2>

<p className="mt-4 text-sm text-slate-600 leading-relaxed">
  Explore a curated wardrobe designed for weddings, celebrations, and
  unforgettable moments. Discover looks that combine elegance,
  craftsmanship, and modern fashion.
</p>


  </div>

{/* Highlight Cards */}

  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">


<div className="rounded-3xl bg-gradient-to-br from-cyan-100 via-white to-white border border-slate-100 p-8 text-center shadow-sm hover:shadow-lg transition">
  <h3 className="text-lg font-semibold text-slate-900">
    Curated Styles
  </h3>
  <p className="mt-2 text-sm text-slate-600">
    Thoughtfully selected outfits designed to bring elegance and confidence to every event.
  </p>
</div>

<div className="rounded-3xl bg-gradient-to-br from-rose-100 via-white to-white border border-slate-100 p-8 text-center shadow-sm hover:shadow-lg transition">
  <h3 className="text-lg font-semibold text-slate-900">
    Celebration Ready
  </h3>
  <p className="mt-2 text-sm text-slate-600">
    Perfect looks for weddings, parties, and special moments that deserve something extraordinary.
  </p>
</div>

<div className="rounded-3xl bg-gradient-to-br from-amber-100 via-white to-white border border-slate-100 p-8 text-center shadow-sm hover:shadow-lg transition">
  <h3 className="text-lg font-semibold text-slate-900">
    Timeless Fashion
  </h3>
  <p className="mt-2 text-sm text-slate-600">
    Styles that blend tradition and modern design to create unforgettable impressions.
  </p>
</div>


  </div>

{/* Button */}

  <div className="mt-12 flex justify-center">

<Link
  to="/collections"
  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white shadow-md hover:bg-slate-800 transition"
>
  View All Collection
  <ArrowRight size={14} />
</Link>


  </div>

</section>

</section>


          {/* Final CTA */}
          <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-10 text-white shadow-2xl shadow-slate-900/20 sm:px-10">
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-rose-500/25 blur-3xl" />
              <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
            </div>

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-300">
                  Ready
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  Build a premium rental experience.
                </h2>
                <p className="mt-2 text-sm text-slate-300 max-w-xl">
                  Keep your inventory organized, track bookings, and make returns effortless—so customers can rent again.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-900 hover:bg-slate-100"
                >
                  Open dashboard
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/dashboard/booked-dresses"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-white/10"
                >
                  Manage returns
                </Link>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pb-10 pt-2 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Dress Admin • Premium rental management
          </footer>
        </div>
      </div>
    </div>
  );
};
