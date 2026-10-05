// All editable site content lives here.
// Values marked TODO are placeholders — replace them before going live.

export const contact = {
  whatsapp: "917698363615", // country code + number, used for wa.me links
  phone: "+91 76983 63615",
  email: "jayesh.adhikari5@gmail.com",
  instagram: "jayesh_adhikari",
  youtube: "https://www.youtube.com/@jayeshadhikarifilms",
  hireForm: "https://docs.google.com/forms/d/e/1FAIpQLSfook7DdaM8ZO7rUSCCk3gAXz1HvFG9cVtZqUWsloHLr1wQkg/viewform",
  portfolio: "https://drive.google.com/drive/folders/1CJDmc3U_WzgSiFaNKeOApFHUI26keZ-B",
};

// Portrait for the profile card. Drop the file into /public and set the path ("" = monogram placeholder).
export const portrait = "/jayesh.jpg"; // "" falls back to the on-set reel below

// Photos for the profile card reel when there is no portrait (from his Carrd gallery).
export const reel = ["/gallery/camera-operating.jpg", "/gallery/on-set-camera.jpg", "/gallery/interview-setup.jpg", "/gallery/location-crew.jpg", "/gallery/cinema-camera.jpg"];

// Words the profile card types after "Hey, I'm".
export const typingWords = ["Jayesh", "a creative director", "a filmmaker", "a videographer", "an editor"];

export const site = {
  name: "Jayesh Adhikari",
  tagline: "Creative director · Filmmaker · Videographer · Editor",
  intro: "Creative director at Jayesh Adhikari Films. I direct, shoot and edit short films, ad films and corporate projects that connect with audiences, from the first idea to the final cut.",
  title: "Jayesh Adhikari | Creative director and filmmaker in Ahmedabad",
  description:
    "Jayesh Adhikari is a creative director, filmmaker, videographer and editor in Ahmedabad, making short films, ad films and corporate films from idea to final cut.",
};

export const services = [
  {
    title: "Creative direction",
    tags: ["Concept", "Script", "Direction"],
    body: "From the first idea to the shot list: concept, script, casting and direction, so the film is planned around the story before a camera rolls.",
  },
  {
    title: "Corporate films",
    tags: ["Brand story", "Documentary", "Events"],
    body: "Company stories, documentaries and event films for businesses and institutions, like the 60-year journey of Shree Santram Hospital.",
  },
  {
    title: "Videography",
    tags: ["Shoot", "Lighting", "Interviews"],
    body: "On-set camera and lighting for ads, interviews and testimonials, with a crew sized to the project.",
  },
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
  "Corporate film",
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

// Transitions between consecutive V1 clips (one per cut, in order). Shown on the
// timeline and performed in the program monitor.
export type TransitionKind = "zoom" | "whip" | "leak" | "glitch" | "dip" | "blur";

export const timeline: { duration: number; fps: number; tracks: TimelineTrack[]; transitions: { kind: TransitionKind; name: string }[] } = {
  duration: 120,
  fps: 24,
  tracks: [
    { name: "V2", kind: "g", clips: [[0, 10, "Title"], [44, 56, "Lower third"], [104, 120, "End card"]] },
    {
      name: "V1",
      kind: "v",
      clips: [
        [0, 16, "JA Films ident"],
        [16, 27, "Juth ka Shikar (AI film)"],
        [27, 49, "South Africa · skydive"],
        [49, 63, "Ad film"],
        [63, 76, "Story film"],
        [76, 98, "Sculptor Academy"],
        [98, 120, "South Africa · aerial"],
      ],
    },
    { name: "A1", kind: "a", wave: "speech", clips: [[0, 62, "Dialogue"], [62, 120, "Dialogue"]] },
    { name: "A2", kind: "a", wave: "music", clips: [[6, 120, "Music"]] },
  ],
  transitions: [
    { kind: "zoom", name: "Zoom dissolve" },
    { kind: "whip", name: "Whip pan" },
    { kind: "leak", name: "Light leak" },
    { kind: "glitch", name: "Glitch cut" },
    { kind: "dip", name: "Dip to black" },
    { kind: "blur", name: "Blur dissolve" },
  ],
};


// count: animates up to this number. Source: the Jayesh Adhikari Films YouTube channel bio.
export const stats: { count?: number; value?: string; suffix?: string; label: string }[] = [
  { count: 15, suffix: "+", label: "Short films at national and international festivals" },
  { count: 5, label: "Festival awards and official selections" },
  { value: "BPA + MPA", label: "Performing arts degrees" },
];

// From his channel bio: people he has worked with.
export const workedWith = [
  "Sanjay Mishra",
  "Vijay Raaz",
  "Sonu Sood",
  "Dia Mirza",
  "Sunil Shetty",
  "Bhagyashree",
  "Mandira Bedi",
  "Manoj Joshi",
  "Gaur Gopal Das",
  "Aman Gupta",
  "Ranveer Allahbadia",
  "Neil Bhatt",
  "Aditya Lakhia",
  "Navin Kasturia",
  "Sangram Singh",
  "Dev Gadhvi",
  "Sneh Desai",
  "Shivangi Desai",
  "Aditi Thakor",
];

export const formats = ["Short films", "Ad films", "Brand videos", "Music videos", "Reels and social cuts", "Colour and sound"];

// About — from the Jayesh Adhikari Films channel bio and his blog (jayeshadhikari.blogspot.com).
export const about = {
  heading: "Every frame tells a story. I cut for the performance in it.",
  body: [
    "I'm a filmmaker and editor from Ahmedabad who brings emotions to life through storytelling. Through Jayesh Adhikari Films I make short films, ad films and corporate projects. More than 15 of my short films have been recognised at national and international festivals: first prize at the Sabarmati Festival Film Competition, third prize at HCL and Filmwallas' #ACutBeyond for The Hajji, and official selections at the Ahmedabad International Children Film Festival and the Chennai Film Festival.",
    "I trained in performing arts, with a bachelor's and a master's degree, and spent years acting in and directing theatre before I sat at an edit timeline. That is still how I cut: performance first, the pause before a line, the look that lands. Then rhythm, sound and music around it.",
  ],
  credits: [
    { title: "Waah Zindagi", note: "Assistant Director · ZEE5 feature with Sanjay Mishra and Vijay Raaz", year: "2021" },
    { title: "Bhanwar", note: "Gujarati feature, directed by Aditi Thakor", year: "2017" },
    { title: "The Last Monday", note: "Honoured at the 2nd LK International Short Film Festival, Kochi", year: "2026" },
    { title: "Rukh", note: "Director · Official Selection, Ahmedabad International Children Film Festival", year: "2019" },
    { title: "Lakshya", note: "Co-director with Jalpa Joshi · Official Selection, Chennai Film Festival", year: "2019" },
    { title: "The Hajji (Haji)", note: "Director · 3rd prize, #ACutBeyond by HCL Technologies and Filmwallas", year: "2017" },
    { title: "Sabarmati Festival Film Competition", note: "1st prize, ₹1,50,000", year: "2016" },
    { title: "Restart", note: "Official Selection, Divya Bhaskar Short Film Competition", year: "" },
    { title: "Zehar", note: "Short film · Director and actor", year: "" },
    { title: "Savdhan India", note: "TV episode · Actor", year: "" },
    { title: "First short film", note: "Story and actor · praised by Mahesh Bhatt (Gujarat Samay)", year: "" },
    { title: "Rangmanch", note: "Gujarati play, director", year: "2015" },
    { title: "Saari Raat", note: "by Badal Sircar, director", year: "" },
    { title: "Why I?", note: "Short film", year: "2012" },
  ],
};

// TODO: confirm periods with Jayesh.
export const journey = [
  { period: "Now", title: "Jayesh Adhikari Films", body: "Writing, directing and editing short films, plus ad films, brand videos and testimonials for clients. 15+ short films recognised at festivals." },
  { period: "2021", title: "Assistant Director, Waah Zindagi", body: "ZEE5 feature directed by Dinesh S Yadav, starring Naveen Kasturia, Plabita Borthakur, Vijay Raaz and Sanjay Mishra." },
  { period: "2014 – 2015", title: "Theatre director", body: "Directed Rangmanch and worked with Rep Market Production on stage work in Ahmedabad." },
  { period: "2013", title: "Master of Performing Arts", body: "Advanced study in acting, direction and stagecraft." },
  { period: "2011", title: "Bachelor of Performing Arts", body: "Acting and theatre training; staged Insani Kathputlio Ka Tamasha and Char Din." },
];

// Real work, from YouTube. youtube = video id (used for the thumbnail and the in-page player).
// Years are approximate (from upload age). TODO: confirm years and Jayesh's role on each.
export const projects = [
  {
    title: "Haji",
    description: "A boy goes out of his way to help his neighbour experience the holy prayer of Hajj, with the help of virtual reality. 3rd prize at #ACutBeyond by HCL Technologies and Filmwallas.",
    year: "2017",
    role: "Director",
    tags: ["Short film", "Award winner", "Drama"],
    length: "8:29",
    youtube: "dUw5-fYwmoE",
  },
  {
    title: "Rukh",
    description: "Rukh means expression, and way. Official Selection at the Ahmedabad International Children Film Festival 2019.",
    year: "2019",
    role: "Director",
    tags: ["Short film", "Festival selection"],
    length: "4:25",
    youtube: "oToYdnvwIDQ",
  },
  {
    title: "Restart",
    description: "Official Selection at the Divya Bhaskar Short Film Competition.",
    year: "2025",
    role: "Filmmaker",
    tags: ["Short film", "Official selection"],
    length: "1:39",
    youtube: "LF9xr7fJl30",
  },
  {
    title: "Sakshi Chandraakar",
    description: "Client testimonial film for India's #1 career branding coach.",
    year: "2025",
    role: "Jayesh Adhikari Films",
    tags: ["Testimonial", "Brand video"],
    length: "1:46",
    youtube: "CMxincJYyqg",
  },
  {
    title: "60 Years of Shree Santram Hospital",
    description: "A documentary on the six-decade journey of Shree Santram Hospital, made with Nru Films and Entertainment.",
    year: "2018",
    role: "With Nru Films and Entertainment",
    tags: ["Documentary", "Long form"],
    length: "23:45",
    youtube: "offnAqGCUt4",
  },
  {
    title: "Jayesh Adhikari Films ident",
    description: "Animated logo introduction for his production banner.",
    year: "2025",
    role: "Jayesh Adhikari Films",
    tags: ["Motion", "Logo sting"],
    length: "0:08",
    youtube: "qLHBmT04MUQ",
  },
];

// TODO: confirm which tools Jayesh uses and how much. level is 0-100.
export const tools = [
  { name: "Adobe Premiere Pro", note: "Editing", level: 98, mark: "Pr", color: "#9999FF", bg: "#00005B" },
  { name: "DaVinci Resolve", note: "Colour and finishing", level: 97, mark: "Da", color: "#E8E8E8", bg: "#233A51" },
  { name: "Adobe After Effects", note: "Motion titles", level: 96, mark: "Ae", color: "#D291FF", bg: "#00005B" },
  { name: "Adobe Audition", note: "Sound cleanup and mix", level: 96, mark: "Au", color: "#00E4BB", bg: "#00005B" },
];

export const quote = {
  text: "Every frame tells a story. All it needs is honesty, passion and heart.",
  by: "Jayesh Adhikari",
};

// Behind the scenes, shown as a contact sheet. The first "set" photo is the large hero frame.
// chapter: "set" | "events" | "posters". w/h are the file's pixel size.
export const galleryChapters = [
  { id: "all", label: "All" },
  { id: "set", label: "On set" },
  { id: "events", label: "Premieres & events" },
  { id: "celebs", label: "With celebrities" },
  { id: "posters", label: "Posters" },
] as const;

export type GalleryChapter = (typeof galleryChapters)[number]["id"];

export const gallery: { src: string; w: number; h: number; caption: string; chapter: Exclude<GalleryChapter, "all"> }[] = [
  { src: "/gallery/location-crew.jpg", w: 1080, h: 1080, caption: "On location with the crew", chapter: "set" },
  { src: "/gallery/cinema-camera.jpg", w: 1080, h: 1060, caption: "Cinema camera setup", chapter: "set" },
  { src: "/gallery/bus-stop-shoot.jpg", w: 1080, h: 1080, caption: "Shooting at a bus stop", chapter: "set" },
  { src: "/gallery/on-set-camera.jpg", w: 710, h: 518, caption: "On set", chapter: "set" },
  { src: "/gallery/edit-timeline.jpg", w: 960, h: 1260, caption: "The edit: Restart on the timeline", chapter: "set" },
  { src: "/gallery/script-reading.jpg", w: 1080, h: 1076, caption: "Script on set", chapter: "set" },
  { src: "/gallery/camera-operating.jpg", w: 960, h: 1280, caption: "Behind the camera", chapter: "set" },
  { src: "/gallery/interview-setup.jpg", w: 720, h: 1280, caption: "Interview shoot", chapter: "set" },
  { src: "/gallery/on-location.jpg", w: 1080, h: 1080, caption: "On location", chapter: "set" },
  { src: "/gallery/bhanwar-premiere.jpg", w: 1034, h: 1034, caption: "Bhanwar premiere", chapter: "events" },
  { src: "/gallery/boss-have-to-dhamaal-premiere.jpg", w: 704, h: 703, caption: "Boss Have To Dhamaal premiere", chapter: "events" },
  { src: "/gallery/with-sonu-sood.jpg", w: 1280, h: 1280, caption: "On set with Sonu Sood", chapter: "celebs" },
  // Names below are only given where the photo itself proves who it is. TODO: client to supply the rest.
  { src: "/gallery/celeb-robert-kiyosaki.jpg", w: 1000, h: 988, caption: "With Robert Kiyosaki, PIC Billionaire Mastermind Retreat", chapter: "celebs" },
  { src: "/gallery/celeb-pic-event.jpg", w: 1000, h: 1004, caption: "Backstage at a PIC event", chapter: "celebs" },
  { src: "/gallery/celeb-pic-event-2.jpg", w: 1000, h: 996, caption: "At a PIC event", chapter: "celebs" },
  { src: "/gallery/celeb-live-event.jpg", w: 1000, h: 1006, caption: "Filming a live event", chapter: "celebs" },
  { src: "/gallery/celeb-with-cast.jpg", w: 1000, h: 1002, caption: "With the cast", chapter: "celebs" },
  { src: "/gallery/celeb-shoot-day.jpg", w: 1000, h: 1002, caption: "Shoot day", chapter: "celebs" },
  { src: "/gallery/celeb-on-set-2.jpg", w: 1000, h: 1230, caption: "On set", chapter: "celebs" },
  { src: "/gallery/celeb-on-set-3.jpg", w: 1000, h: 994, caption: "On set", chapter: "celebs" },
  { src: "/gallery/celeb-backstage.jpg", w: 1000, h: 998, caption: "Backstage", chapter: "celebs" },
  { src: "/gallery/waah-zindagi-poster.jpg", w: 1080, h: 1081, caption: "Waah Zindagi (ZEE5), Assistant Director", chapter: "posters" },
  { src: "/gallery/hajji-poster.jpg", w: 1080, h: 820, caption: "The Hajji, prize-winning short film", chapter: "posters" },
  { src: "/gallery/bhanwar-poster.jpg", w: 1066, h: 1600, caption: "Bhanwar (2017), Gujarati feature", chapter: "posters" },
  { src: "/gallery/zehar-poster.jpg", w: 990, h: 1000, caption: "Zehar, short film", chapter: "posters" },
];


// Awards, selections and press, each backed by a photo or document he supplied.
// stats "5" above counts the Award, Official selection and Honour rows here; keep them in sync.
export const recognition = [
  { kind: "Award", title: "1st prize", detail: "Sabarmati Festival Film Competition 2016 · ₹1,50,000", src: "/press/sabarmati-first-prize.jpg", w: 1080, h: 1080 },
  { kind: "Award", title: "3rd prize · The Hajji", detail: "#ACutBeyond short film contest by HCL Technologies and Filmwallas, 2017", src: "/press/filmwallas-making-of-hajji.jpg", w: 1000, h: 988 },
  { kind: "Official selection", title: "Rukh", detail: "Ahmedabad International Children Film Festival 2019", src: "/press/aicff-rukh-certificate.jpg", w: 1000, h: 682 },
  { kind: "Official selection", title: "Lakshya", detail: "Chennai Film Festival 2019", src: "/press/lakshya-chennai-selection.jpg", w: 970, h: 1000 },
  { kind: "Honour", title: "The Last Monday", detail: "2nd LK International Short Film Festival, Kochi, 2026", src: "/press/lkisff-2026-delegate.jpg", w: 758, h: 1000 },
  { kind: "Press", title: "Praised by Mahesh Bhatt", detail: "Gujarat Samay on his first short film, which he wrote and acted in", src: "/press/gujarat-samay-mahesh-bhatt.jpg", w: 1080, h: 1080 },
  { kind: "Press", title: "Director of The Hajji", detail: "Filmwallas feature on the prize-winning short", src: "/press/hajji-director.jpg", w: 994, h: 1000 },
];


// Real client quotes only. The section stays hidden while this is empty.
// To collect them, send past clients the message in TESTIMONIALS.md.
export const testimonials: { quote: string; name: string; role: string; project?: string }[] = [];
