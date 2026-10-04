// All editable site content lives here.
// Values marked TODO are placeholders — replace them before going live.

export const contact = {
  whatsapp: "91XXXXXXXXXX", // TODO: country code + number, no + or spaces. Example: 919876543210
  email: "hello@yourdomain.com", // TODO
  instagram: "jayesh_adhikari", // TODO: confirm handle
  youtube: "https://www.youtube.com/channel/UCNngy-8ek_PfBge8h4K65qQ",
};

// Portrait for the profile card. Drop the file into /public and set the path ("" = monogram placeholder).
export const portrait = ""; // TODO: e.g. "/jayesh.jpg" (portrait orientation, ~900x1200)

// Words the profile card types after "Hey, I'm".
export const typingWords = ["Jayesh", "a film editor", "a filmmaker", "a storyteller"];

export const site = {
  name: "Jayesh Adhikari",
  tagline: "Filmmaker and film editor, Ahmedabad",
  intro: "I edit short films, ad films and brand videos for filmmakers who want their footage to feel like the film they imagined. Based in Ahmedabad.",
  title: "Jayesh Adhikari | Filmmaker and film editor in Ahmedabad",
  description:
    "Jayesh Adhikari edits short films, ad films and brand videos for filmmakers. Send your footage and get a cut you can be proud of.",
};

export const services = [
  {
    title: "Short films and features",
    tags: ["Story", "Pacing", "Performance"],
    body: "A story-first cut. I work on pacing, performance, sound and music so the film holds attention from the first frame.",
  },
  {
    title: "Ad films and brand videos",
    tags: ["15 / 30 / 60 sec", "Cutdowns", "On brief"],
    body: "Sharp, on-brief edits for 15, 30 and 60 second spots, with cutdowns for every platform you need.",
  },
  {
    title: "Reels and social cuts",
    tags: ["9:16", "1:1", "Captions"],
    body: "Vertical and square versions of your film for Instagram and YouTube Shorts, ready to post.",
  },
  {
    title: "Colour and sound polish",
    tags: ["Colour correction", "Audio cleanup", "Mix"],
    body: "Basic colour correction, audio cleanup and mixing, so your film plays well on phones, TVs and festival screens.",
  },
];

export const whatToSend = [
  { title: "Your footage", body: "Any camera, any folder. A Google Drive or WeTransfer link is fine." },
  { title: "Script or notes", body: "Even a rough outline or voice note helps me follow the story." },
  { title: "A reference you like", body: "One film or ad whose feel you want to match." },
  { title: "Your deadline", body: "So I can plan the work and tell you early if it is tight." },
];

export const steps = [
  { title: "Share footage and brief", body: "Tell me about the project and send your files." },
  { title: "Rough cut", body: "I assemble the story and share a first version with you." },
  { title: "Feedback", body: "You tell me what to change and I refine the cut." },
  { title: "Final delivery", body: "You get the finished film exported for where it will play." },
];

export const faq = [
  {
    q: "How do I send large footage?",
    a: "Upload it to Google Drive, Dropbox or WeTransfer and share the link with me. If your internet is slow, tell me and we will find another way.",
  },
  {
    q: "What if I do not have a script?",
    a: "That is fine. Send a short note about what the film is about and who it is for. I will build the edit from your footage and we shape it together.",
  },
  {
    q: "How many rounds of changes do I get?",
    a: "We agree on the number of feedback rounds before I start, so there are no surprises for either of us.",
  },
  {
    q: "What will it cost?",
    a: "The price depends on the runtime, the amount of footage and the deadline. Send me the details and I will reply with a clear quote.",
  },
  {
    q: "Which formats do you deliver?",
    a: "Tell me where the film will play, such as YouTube, Instagram, TV or a festival, and I will export the right files.",
  },
];

export const projectTypes = [
  "Short film",
  "Ad film",
  "Brand video",
  "Music video",
  "Reels and social cuts",
  "Something else",
];

// Hero timeline: [start seconds, end seconds, label]
export type TimelineTrack = {
  name: string;
  kind: "v" | "g" | "a";
  wave?: "speech" | "music";
  clips: [number, number, string][];
};

export const timeline: { duration: number; fps: number; tracks: TimelineTrack[] } = {
  duration: 120,
  fps: 24,
  tracks: [
    { name: "V2", kind: "g", clips: [[0, 10, "Title"], [44, 56, "Lower third"], [104, 120, "End card"]] },
    {
      name: "V1",
      kind: "v",
      clips: [
        [0, 16, "Opening wide"],
        [16, 27, "Close-up"],
        [27, 49, "Walk and talk"],
        [49, 63, "Product hero"],
        [63, 76, "Reaction"],
        [76, 98, "Rooftop, golden hour"],
        [98, 120, "Final frame"],
      ],
    },
    { name: "A1", kind: "a", wave: "speech", clips: [[0, 62, "Dialogue"], [62, 120, "Dialogue"]] },
    { name: "A2", kind: "a", wave: "music", clips: [[6, 120, "Music"]] },
  ],
};


export const stats = [
  { value: "2011", label: "On stage and screen since" },
  { value: "BPA + MPA", label: "Performing arts degrees" },
];

export const formats = ["Short films", "Ad films", "Brand videos", "Music videos", "Reels and social cuts", "Colour and sound"];

// About — sourced from Jayesh's public blog (jayeshadhikari.blogspot.com).
// TODO: confirm with Jayesh and add recent credits.
export const about = {
  heading: "An editor trained on stage, cutting for performance",
  body: [
    "I studied performing arts in Ahmedabad, with a bachelor's and a master's degree, and spent years acting in and directing theatre before I sat down at an edit timeline.",
    "That is still how I cut. I watch for the performance first: the pause before a line, the look that lands, the moment a scene turns. Then I build the rhythm, sound and music around it.",
  ],
  credits: [
    { title: "Rangmanch", note: "Gujarati play, director", year: "2015" },
    { title: "Saari Raat", note: "by Badal Sircar, director", year: "" },
    { title: "Shanivaar Ko Do Baje", note: "by Surendra Varma, director", year: "" },
    { title: "Why I?", note: "Short film", year: "2012" },
    { title: "Char Din", note: "by Vijay Tendulkar, stage", year: "2011" },
  ],
};

// TODO: confirm periods with Jayesh.
export const journey = [
  { period: "Now", title: "Filmmaker and film editor", body: "Editing short films, ad films and brand videos for independent filmmakers and brands." },
  { period: "2014 – 2015", title: "Theatre director", body: "Directed Rangmanch and worked with Rep Market Production on stage work in Ahmedabad." },
  { period: "TODO", title: "Master of Performing Arts", body: "Advanced study in acting, direction and stagecraft." },
  { period: "2011", title: "Bachelor of Performing Arts", body: "Acting and theatre training; staged Insani Kathputlio Ka Tamasha and Char Din." },
];

// TODO: replace with real projects. href: watch link ("" = not clickable). thumb: image in /public ("" = gradient frame).
export const projects = [
  { title: "Short film title", description: "A story-first cut built around the lead performance.", year: "2025", role: "Editor, sound and colour", tags: ["Short film", "Edit", "Colour"], length: "12 min", href: "", thumb: "" },
  { title: "Ad film title", description: "A 45 second spot with cutdowns for every platform.", year: "2025", role: "Editor", tags: ["Ad film", "Cutdowns"], length: "45 sec", href: "", thumb: "" },
  { title: "Music video title", description: "Rhythm-led edit and grade for an independent artist.", year: "2024", role: "Editor and colourist", tags: ["Music video", "Colour"], length: "4 min", href: "", thumb: "" },
  { title: "Brand video title", description: "Brand story with motion titles and a clean sound mix.", year: "2024", role: "Editor and motion titles", tags: ["Brand video", "Motion"], length: "2 min", href: "", thumb: "" },
];

// TODO: confirm which tools Jayesh uses and how much. level is 0-100.
export const tools = [
  { name: "Adobe Premiere Pro", note: "Editing", level: 90, mark: "Pr", color: "#9999FF", bg: "#00005B" },
  { name: "DaVinci Resolve", note: "Colour and finishing", level: 75, mark: "Da", color: "#E8E8E8", bg: "#233A51" },
  { name: "Adobe After Effects", note: "Motion titles", level: 60, mark: "Ae", color: "#D291FF", bg: "#00005B" },
  { name: "Adobe Audition", note: "Sound cleanup and mix", level: 65, mark: "Au", color: "#00E4BB", bg: "#00005B" },
];

export const quote = {
  text: "Shoot aapka. Edit mera.",
  by: "Jayesh Adhikari",
};
