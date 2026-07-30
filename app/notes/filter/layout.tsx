import React from "react";

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <aside
        style={{
          flex: "0 0 200px",
          width: "200px",
          minWidth: "200px",
          backgroundColor: "#212529",
        }}
      >
        {sidebar}
      </aside>

      <div style={{ flex: "1", minWidth: "0" }}>{children}</div>
    </div>
  );
}
