import {
  siBlazor,
  siBootstrap,
  siCss,
  siDotnet,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJson,
  siNuget,
  siPostman,
  siReact,
  siSqlite,
} from "simple-icons";

export type SkillIcon = {
  title: string;
  slug: string;
  path: string;
  hex: string;
};

// Some of our skills have no icon in simple-icons (C#, ASP.NET Core, EF Core,
// SQL Server, REST API, LINQ). For those we reuse the closest available icon
// but override the title and slug, so the hover text and the tagline show the
// real skill name. The 3D title is drawn on one line and does not wrap, so keep
// titles short: the widest original title ("Tailwind CSS") is about 1.5 units
// wide, and "ASP.NET Core" is about 1.6.
function standIn(icon: SkillIcon, title: string, slug: string): SkillIcon {
  return { ...icon, title, slug };
}

// 3×5 grid — consumed by the 3D keyboard (one icon per keycap) and, on mobile,
// by the flat list below for the static skills grid that replaces the
// hover-driven keyboard interaction. Taglines live in the i18n dictionary
// under `keyboard.taglines.<slug>`.
export const SKILLS_GRID: readonly (readonly SkillIcon[])[] = [
  [
    siDotnet,
    standIn(siBlazor, "C#", "csharp"),
    standIn(siDotnet, "ASP.NET Core", "aspnetcore"),
    standIn(siNuget, "EF Core", "efcore"),
    standIn(siSqlite, "SQL Server", "sqlserver"),
  ],
  [
    siReact,
    siJavascript,
    siHtml5,
    standIn(siCss, "CSS3", "css3"),
    siBootstrap,
  ],
  [
    siGit,
    siGithub,
    standIn(siJson, "REST API", "restapi"),
    standIn(siDotnet, "LINQ", "linq"),
    siPostman,
  ],
] as const;

export const SKILLS_FLAT: readonly SkillIcon[] = SKILLS_GRID.flat();