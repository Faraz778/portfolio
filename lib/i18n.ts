// Minimal i18n layer: a single dictionary keyed by dot-path, with each leaf
// carrying both the ES and EN copy. Consumers read via `useLanguage().t()`
// which resolves the path for the active language. Keeping it flat and
// co-located (rather than adding a dependency like next-intl) keeps the
// project tiny and makes the strings easy to audit.
export type Lang = "es" | "en";

export const LANGUAGES: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "en";

type Leaf = Record<Lang, string>;
type Node = Leaf | { [key: string]: Node };

function isLeaf(node: Node): node is Leaf {
  return typeof (node as Leaf).es === "string";
}

export const DICT = {
  picker: {
    season: { es: "Estación", en: "Season" },
    language: { es: "Idioma", en: "Language" },
  },
  seasons: {
    spring: { es: "Primavera", en: "Spring" },
    summer: { es: "Verano", en: "Summer" },
    autumn: { es: "Otoño", en: "Autumn" },
    winter: { es: "Invierno", en: "Winter" },
  },
  nav: {
    aria: { es: "Secciones", en: "Sections" },
    home: { es: "Inicio", en: "Home" },
    stack: { es: "Stack", en: "Stack" },
    experience: { es: "Education", en: "Education" },
    project: { es: "Proyecto", en: "Project" },
    contact: { es: "Contacto", en: "Contact" },
  },
  header: {
    availability: {
      es: "Open to opportunities",
      en: "Open to opportunities",
    },
  },
  hero: {
    greeting: { es: "Hola, soy", en: "Hi, I am" },
    roleLine: {
      es: "Full Stack .NET Developer.",
      en: "Full Stack .NET Developer.",
    },
    tagline: {
      es: "Building modern web applications with .NET and React.",
      en: "Building modern web applications with .NET and React.",
    },
    cv: { es: "Descargar CV", en: "Download CV" },
    hire: { es: "Contactarme", en: "Contact me" },
    scroll: { es: "Scroll para explorar", en: "Scroll to explore" },
    keysHint: {
      es: "· hover sobre las teclas",
      en: "· hover over the keys",
    },
  },
  stack: {
    title: { es: "Tech Stack", en: "Tech Stack" },
    hint: {
      es: "(hint: pasa el ratón por una tecla)",
      en: "(hint: hover over a key)",
    },
    hintMobile: {
      es: "Las herramientas con las que construyo.",
      en: "The tools I build with.",
    },
  },
   experience: {
    title: { es: "Education", en: "Education" },
    subtitle: {
      es: "My learning journey.",
      en: "My learning journey.",
    },
  },
  projects: {
    kicker: { es: "proyecto", en: "project" },
    viewMore: { es: "Ver más", en: "View more" },
    openSite: { es: "Abrir sitio", en: "Visit site" },
    viewCode: { es: "Ver código", en: "View code" },
    close: { es: "Cerrar", en: "Close" },
    stackLabel: { es: "Stack", en: "Stack" },
    overview: { es: "Resumen", en: "Overview" },
  },
  contact: {
    kicker: { es: "contacto", en: "contact" },
    title: { es: "¿Hablamos?", en: "Let's talk?" },
    body: {
      es: "Si lo que has visto te interesa, el teclado ya está listo para recibir el primer mensaje.",
      en: "If what you've seen interests you, the keyboard is ready for the first message.",
    },
    copyEmail: { es: "Copiar email", en: "Copy email" },
    openMail: { es: "Abrir mail", en: "Open mailto" },
    github: { es: "GitHub", en: "GitHub" },
    linkedin: { es: "LinkedIn", en: "LinkedIn" },
    emailToast: { es: "Email copiado", en: "Email copied" },
    footer: {
      es: "© 2026 Muhammad Faraz. All rights reserved.",
      en: "© 2026 Muhammad Faraz. All rights reserved.",
    },
  },
    keyboard: {
    taglines: {
      dotnet: {
        es: "One platform, from APIs to full web apps.",
        en: "One platform, from APIs to full web apps.",
      },
      csharp: {
        es: "Strongly typed and surprisingly pleasant to write.",
        en: "Strongly typed and surprisingly pleasant to write.",
      },
      aspnetcore: {
        es: "Fast, structured web apps and APIs on .NET.",
        en: "Fast, structured web apps and APIs on .NET.",
      },
      efcore: {
        es: "Entity Framework Core: C# objects in, database rows out.",
        en: "Entity Framework Core: C# objects in, database rows out.",
      },
      sqlserver: {
        es: "Where the data lives, waiting for a well-written query.",
        en: "Where the data lives, waiting for a well-written query.",
      },
      react: {
        es: "Components, components, components.",
        en: "Components, components, components.",
      },
      javascript: {
        es: "Where it all started. Still here, still in charge.",
        en: "Where it all started. Still here, still in charge.",
      },
      html5: {
        es: "The bones of any page.",
        en: "The bones of any page.",
      },
      css3: {
        es: "What separates good from beautiful.",
        en: "What separates good from beautiful.",
      },
      bootstrap: {
        es: "Responsive layouts, fast.",
        en: "Responsive layouts, fast.",
      },
      git: {
        es: "History and a time machine for your code.",
        en: "History and a time machine for your code.",
      },
      github: {
        es: "Where the code lives and gets shared.",
        en: "Where the code lives and gets shared.",
      },
      restapi: {
        es: "Clear endpoints, predictable JSON.",
        en: "Clear endpoints, predictable JSON.",
      },
      linq: {
        es: "Query collections in C# without writing the loops.",
        en: "Query collections in C# without writing the loops.",
      },
      postman: {
        es: "Test every endpoint before the frontend does.",
        en: "Test every endpoint before the frontend does.",
      },
    },
  },
} as const satisfies Record<string, Node>;

// Resolve a dotted path in the dictionary for a given language.
export function translate(path: string, lang: Lang): string {
  const parts = path.split(".");
  let ref: Node = DICT as unknown as Node;
  for (const p of parts) {
    if (isLeaf(ref)) return path;
    ref = (ref as { [key: string]: Node })[p];
    if (ref === undefined) return path;
  }
  if (isLeaf(ref)) return ref[lang] ?? ref.es ?? path;
  return path;
}
