import { ArrowRight, Boxes, CalendarClock, UsersRound } from "lucide-react";


export const Hero = () => {
  return (
    <section className="relative flex min-h-[66vh] items-center overflow-hidden px-4  pt-4 sm:pt-8 md:pt-10 lg:min-h-[56vh] lg:pb-12 xl:min-h-[62vh]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-orange-200/55 blur-3xl" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rose-200/45 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-100/55 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.5)_0%,transparent_45%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:gap-12 2xl:gap-16">
          <div className="space-y-6 text-center xl:text-left">
            <p className="hero-fade-up inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase text-white">
              For Shop Owners
            </p>

            <h1 className="hero-fade-up hero-delay-1 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl md:text-[2.05rem] lg:text-[2.6rem] xl:text-[2.85rem]">
              Change the way you run your bridal rental business.
            </h1>

            <p className="hero-fade-up hero-delay-2 mx-auto max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base xl:mx-0">
              Monitor inventory, plan outgoing rentals, handle returns, and keep
              your staff aligned with one focused owner dashboard.
            </p>

            <div className="hero-fade-up hero-delay-3 flex flex-wrap items-center justify-center gap-3 xl:justify-start">
              <button className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Open Owner Panel
                <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </button>
              <button className="rounded-xl border border-slate-300 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white">
                Check Today Plan
              </button>
            </div>

            
          </div>

          <div className="hero-fade-up hero-delay-2 flex w-full justify-center xl:justify-end">
            <div className="relative w-full max-w-lg">
              <img
                src="/images/dress.png"
                alt="Primary bridal dress"
                className="hero-float h-70 w-full object-contain sm:h-85 md:h-95 lg:h-90 xl:h-125"
              />
              <img
                src="/images/dress.png"
                alt="Secondary bridal dress"
                className="hero-float-tilt pointer-events-none absolute -bottom-2 left-2 h-42.5 w-[48%] object-contain opacity-90 sm:h-50 sm:w-[44%] md:h-55 md:w-[42%] lg:h-52.5 lg:w-[40%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
