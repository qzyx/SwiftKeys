import React from "react";

export default function ThemeCard({ theme, isActive, onClick }) {
  const { name, colors } = theme;

  return (
    <div
      onClick={() => onClick(theme)}
      className={`theme-preview p-3 rounded-lg cursor-pointer transition-all duration-200 
                  ${isActive ? " scale-105" : "hover:scale-105"}`}
      style={{
        backgroundColor: colors.background,
      }}
    >
      <div
        className="mb-2 font-karantina text-lg"
        style={{ color: colors.primary }}
      >
        {name}
      </div>

      <div className="flex space-x-2">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: colors.primary }}
        ></div>
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: colors.secondary }}
        ></div>
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: colors.tertiary }}
        ></div>
      </div>

      <div
        className="mt-2 text-xs rounded p-1 text-center"
        style={{
          backgroundColor: colors.secondary,
          color: colors.tertiary,
        }}
      >
        Sample Text
      </div>
    </div>
  );
}
