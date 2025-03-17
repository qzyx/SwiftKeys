import { useDispatch, useSelector } from "react-redux";
import {
  setFontSize,
  setMaxLineWidth,
  setQuickStart,
  setSmoothScrolling,
} from "../features/Settings/SettingsSlice";

export default function GlobalSettings() {
  const quick_start = useSelector((state) => state.settings.quick_start);
  const smooth_scrolling = useSelector(
    (state) => state.settings.smooth_scrolling
  );
  const max_line_width = useSelector((state) => state.settings.max_line_width);
  const font_size = useSelector((state) => state.settings.font_size);
  const dispatch = useDispatch();

  return (
    <div className="p-4 gap-3 flex flex-col">
      {/* Quick Restart Setting */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between font-karantina text-2xl gap-2">
        <span className="text-background whitespace-nowrap">Quick restart</span>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          {["off", "tab", "enter", "space"].map((key) => (
            <button
              onClick={() => dispatch(setQuickStart(key))}
              className={`text-primary rounded-full bg-background min-w-[5rem] py-1 px-2 text-center ${
                quick_start === key
                  ? "bg-primary text-secondary"
                  : "hover:bg-primary hover:text-secondary"
              }`}
              key={key}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size Setting */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between font-karantina text-2xl gap-2">
        <span className="text-background whitespace-nowrap">Font size</span>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          {["sm", "md", "lg", "xl", "xxl"].map((key) => (
            <button
              onClick={() => dispatch(setFontSize(key))}
              className={`text-primary rounded-full bg-background min-w-[5rem] py-1 px-2 text-center ${
                font_size === key
                  ? "bg-primary text-secondary"
                  : "hover:bg-primary hover:text-secondary"
              }`}
              key={key}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Smooth Line Scroll Setting */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between font-karantina text-2xl gap-2">
        <span className="text-background whitespace-nowrap">
          Smooth Line Scroll
        </span>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          {["off", "on"].map((key) => (
            <button
              onClick={() => dispatch(setSmoothScrolling(key))}
              className={`text-primary rounded-full bg-background min-w-[5rem] py-1 px-2 text-center ${
                smooth_scrolling === key
                  ? "bg-primary text-secondary"
                  : "hover:bg-primary hover:text-secondary"
              }`}
              key={key}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
