import { useDispatch, useSelector } from "react-redux";
import {
  setFontSize,
  setMaxLineWidth,
} from "../features/Settings/SettingsSlice";

export default function GlobalSettings() {
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
              className="text-primary rounded-full bg-background w-25 py-1"
              key={key}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full flex items-center justify-between font-karantina text-2xl">
        <span className="text-background">Max line width</span>
        <div className="flex gap-2">
          <input
            onChange={(e) => dispatch(setMaxLineWidth(e.target.value))}
            value={max_line_width}
            type="number"
            className="text-primary rounded-full bg-background w-25 focus:outline-none text-center py-1"
          ></input>
        </div>
      </div>
      <div className="w-full flex items-center justify-between font-karantina text-2xl">
        <span className="text-background">Font size</span>
        <div className="flex gap-2">
          <input
            onChange={(e) => dispatch(setFontSize(e.target.value))}
            value={font_size}
            type="number"
            className="text-primary rounded-full bg-background w-25 focus:outline-none text-center py-1"
          ></input>
        </div>
      </div>
      <div className="w-full flex items-center justify-between font-karantina text-2xl">
        <span className="text-background">Smooth Line Scroll</span>
        <div className="flex gap-2">
          {["off", "on"].map((key) => (
            <button
              className="text-primary rounded-full bg-background w-25 py-1"
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
