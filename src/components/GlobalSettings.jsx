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
      <div className="w-full flex items-center justify-between font-karantina text-2xl">
        <span className="text-background">Quick restart</span>
        <div className="flex gap-2">
          {["off", "tab", "enter", "space"].map((key) => (
            <button
              onClick={() => dispatch(setQuickStart(key))}
              className={`text-primary rounded-full bg-background w-25 py-1 ${
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

      <div className="w-full flex items-center justify-between font-karantina text-2xl">
        <span className="text-background">Font size</span>
        <div className="flex gap-2">
          {["sm", "md", "lg", "xl", "xxl"].map((key) => (
            <button
              onClick={() => dispatch(setFontSize(key))}
              className={`text-primary rounded-full bg-background w-25 py-1 ${
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
      <div className="w-full flex items-center justify-between font-karantina text-2xl">
        <span className="text-background">Smooth Line Scroll</span>
        <div className="flex gap-2">
          {["off", "on"].map((key) => (
            <button
              onClick={() => dispatch(setSmoothScrolling(key))}
              className={`text-primary rounded-full bg-background w-25 py-1 ${
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
