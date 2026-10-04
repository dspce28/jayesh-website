// All editable site content lives here.
// Values marked TODO are placeholders — replace them before going live.

export const contact = {
  whatsapp: "91XXXXXXXXXX", // TODO: country code + number, no + or spaces. Example: 919876543210
  email: "hello@yourdomain.com", // TODO
  instagram: "jayesh_adhikari", // TODO: confirm handle
};

export const site = {
  name: "Jayesh Adhikari",
  tagline: "Filmmaker and film editor, Ahmedabad",
  title: "Jayesh Adhikari | Filmmaker and film editor in Ahmedabad",
  description:
    "Jayesh Adhikari edits short films, ad films and brand videos for filmmakers. Send your footage and get a cut you can be proud of.",
};

// TODO: replace each row with a real project.
// href: YouTube / Vimeo / Drive link ("" = not clickable yet).
// thumb: path to an image in /public, e.g. "/work/short-film.jpg" ("" = plain dark frame).
export const work = [
  { title: "Short film title", type: "Short film", length: "12 min", role: "Edit, sound and colour", href: "", thumb: "" },
  { title: "Ad film title", type: "Ad film for a brand", length: "45 sec", role: "Edit and cutdowns", href: "", thumb: "" },
  { title: "Music video title", type: "Music video", length: "4 min", role: "Edit and colour", href: "", thumb: "" },
  { title: "Brand video title", type: "Brand video", length: "2 min", role: "Edit and motion titles", href: "", thumb: "" },
];

export const services = [
  {
    title: "Short films and features",
    body: "A story-first cut. I work on pacing, performance, sound and music so the film holds attention from the first frame.",
  },
  {
    title: "Ad films and brand videos",
    body: "Sharp, on-brief edits for 15, 30 and 60 second spots, with cutdowns for every platform you need.",
  },
  {
    title: "Reels and social cuts",
    body: "Vertical and square versions of your film for Instagram and YouTube Shorts, ready to post.",
  },
  {
    title: "Colour and sound polish",
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

// About — sourced from Jayesh's public blog (jayeshadhikari.blogspot.com).
// TODO: confirm with Jayesh, add recent credits, and add a portrait at /public/jayesh.jpg.
export const about = {
  heading: "An editor trained on stage",
  body: [
    "I studied performing arts in Ahmedabad, with a bachelor's and a master's degree, and spent years acting in and directing theatre before I sat down at an edit timeline.",
    "That is still how I cut. I watch for the performance first: the pause before a line, the look that lands, the moment a scene turns. Then I build the rhythm, sound and music around it.",
  ],
  roles: ["Filmmaker", "Film editor", "Theatre director", "Actor", "Singer and composer"],
  credits: [
    { year: "2015", title: "Rangmanch", note: "Gujarati play, director" },
    { year: "—", title: "Saari Raat", note: "by Badal Sircar, director" },
    { year: "—", title: "Shanivaar Ko Do Baje", note: "by Surendra Varma, director" },
    { year: "2012", title: "Why I?", note: "Short film" },
    { year: "2011", title: "Char Din", note: "by Vijay Tendulkar, stage" },
  ],
};
