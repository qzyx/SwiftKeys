import { Settings2 } from "lucide-react";

function DesktopTestSettingsForm() {
  return (
    <>
      {/* Desktop settings bar */}
      <div className="relative w-auto max-w-3xl shadow-md justify-between h-16 hidden items-center rounded-lg bg-secondary md:flex px-6 text-tertiary border border-tertiary/30">
        {/* Words/Time toggle */}
        <div className="flex items-center gap-3 font-karantina text-xl">
          <button className="button bg-background rounded-full border border-tertiary px-4 py-1.5 hover:bg-tertiary hover:text-background transition-colors">
            Words
          </button>
          <button className="button bg-secondary rounded-full border border-tertiary px-4 py-1.5 hover:bg-tertiary hover:text-background transition-colors">
            Time
          </button>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-tertiary/50 mx-6"></div>

        {/* Number options */}
        <div className="flex gap-2 items-center text-tertiary">
          {[5, 10, 20, 30, 40].map((num) => (
            <button
              key={num}
              className="px-3 button py-1.5 rounded-md hover:bg-tertiary/20 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-tertiary"
            >
              {num}
            </button>
          ))}
          <button className="flex button items-center gap-1.5 px-3 py-1.5 ml-2 bg-secondary border-tertiary border rounded-md hover:bg-tertiary hover:text-background transition-all duration-200 focus:bg-tertiary focus:text-background focus:outline-none">
            Custom
            <Settings2 size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

export default DesktopTestSettingsForm;
