export interface TrackTheme {
  backgroundTop: string;
  backgroundBottom: string;
  cloudTint: string;
  haze: string;
  accent: string;
  glow: string;
  panelBackground: string;
  panelBorder: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  src: string;
  mood: string;
  theme: TrackTheme;
}

export const TRACKS: Track[] = [
  {
    id: "alma",
    title: "Alma",
    artist: "Gustavo Cerati",
    album: "Bocanada",
    year: "1999",
    src: "/audio/Alma-Cerati.mp3",
    mood: "Sugiero que nos quedemos...",
    theme: {
      backgroundTop: "#15243b",
      backgroundBottom: "#02050d",
      cloudTint: "rgba(106, 180, 255, 0.18)",
      haze: "rgba(112, 173, 255, 0.10)",
      accent: "#77b9ff",
      glow: "rgba(130, 194, 255, 0.82)",
      panelBackground: "rgba(4, 12, 24, 0.96)",
      panelBorder: "#77b9ff",
    },
  },
  {
    id: "bocanada",
    title: "Bocanada",
    artist: "Gustavo Cerati",
    album: "Bocanada",
    year: "1999",
    src: "/audio/bocanada.mp3",
    mood: "Cuando no hay más que decirnos...",
    theme: {
      backgroundTop: "#15243b",
      backgroundBottom: "#02050d",
      cloudTint: "rgba(106, 180, 255, 0.18)",
      haze: "rgba(112, 173, 255, 0.10)",
      accent: "#77b9ff",
      glow: "rgba(130, 194, 255, 0.82)",
      panelBackground: "rgba(4, 12, 24, 0.96)",
      panelBorder: "#77b9ff",
    },
  },
  {
    id: "puente",
    title: "Puente",
    artist: "Gustavo Cerati",
    album: "Bocanada",
    year: "1999",
    src: "/audio/Puente-Cerati.mp3",
    mood: "Adorable puente se ha creado entre los dos",
    theme: {
      backgroundTop: "#15243b",
      backgroundBottom: "#02050d",
      cloudTint: "rgba(106, 180, 255, 0.18)",
      haze: "rgba(112, 173, 255, 0.10)",
      accent: "#77b9ff",
      glow: "rgba(130, 194, 255, 0.82)",
      panelBackground: "rgba(4, 12, 24, 0.96)",
      panelBorder: "#77b9ff",
    },
  },
  {
    id: "riobabel",
    title: "Rio Babel",
    artist: "Gustavo Cerati",
    album: "Bocanada",
    year: "1999",
    src: "/audio/RioBabel-Cerati.mp3",
    mood: "Fluir sin un fin",
    theme: {
      backgroundTop: "#15243b",
      backgroundBottom: "#02050d",
      cloudTint: "rgba(106, 180, 255, 0.18)",
      haze: "rgba(112, 173, 255, 0.10)",
      accent: "#77b9ff",
      glow: "rgba(130, 194, 255, 0.82)",
      panelBackground: "rgba(4, 12, 24, 0.96)",
      panelBorder: "#77b9ff",
    },
  },
  {
    id: "verbocarne",
    title: "Verbo Carne",
    artist: "Gustavo Cerati",
    album: "Bocanada",
    year: "1999",
    src: "/audio/VerboCarne-Cerati.mp3",
    mood: "La inútil perfección de buscar el silencio",
    theme: {
      backgroundTop: "#15243b",
      backgroundBottom: "#02050d",
      cloudTint: "rgba(106, 180, 255, 0.18)",
      haze: "rgba(112, 173, 255, 0.10)",
      accent: "#77b9ff",
      glow: "rgba(130, 194, 255, 0.82)",
      panelBackground: "rgba(4, 12, 24, 0.96)",
      panelBorder: "#77b9ff",
    },
  },
];