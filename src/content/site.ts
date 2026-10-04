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
export const portrait = ""; // TODO: e.g. "/jayesh.jpg" (portrait orientation, ~900x1200). Until set, the card cycles on-set photos.

// Photos for the profile card reel when there is no portrait (from his Carrd gallery).
export const reel = ["/gallery/camera-operating.jpg", "/gallery/on-set-camera.jpg", "/gallery/interview-setup.jpg", "/gallery/on-set-desk.jpg", "/gallery/presenter-shoot.jpg"];

// Words the profile card types after "Hey, I'm".
export const typingWords = ["Jayesh", "a filmmaker", "an editor", "a storyteller", "a creative director"];

export const site = {
  name: "Jayesh Adhikari",
  tagline: "Filmmaker, editor and creative director, Ahmedabad",
  intro: "Filmmaker and editor who brings emotions to life through storytelling. Through Jayesh Adhikari Films I make short films, ad films and corporate projects that connect with audiences.",
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


// count: animates up to this number. Source: the Jayesh Adhikari Films YouTube channel bio.
export const stats: { count?: number; value?: string; suffix?: string; label: string }[] = [
  { count: 15, suffix: "+", label: "Short films at national and international festivals" },
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
    "I'm a filmmaker and editor from Ahmedabad who brings emotions to life through storytelling. Through Jayesh Adhikari Films I make short films, ad films and corporate projects. More than 15 of my short films have been recognised at national and international festivals: Haji won at an international film festival in Singapore, and Rukh was selected at the International Children Film Festival.",
    "I trained in performing arts, with a bachelor's and a master's degree, and spent years acting in and directing theatre before I sat at an edit timeline. That is still how I cut: performance first, the pause before a line, the look that lands. Then rhythm, sound and music around it.",
  ],
  credits: [
    { title: "Waah Zindagi", note: "Assistant Director · ZEE5 feature with Sanjay Mishra and Vijay Raaz", year: "2021" },
    { title: "Bhanwar", note: "Gujarati feature, directed by Aditi Thakor", year: "2017" },
    { title: "Haji", note: "Short film, winner at an international film festival, Singapore", year: "" },
    { title: "Rukh", note: "Selected, International Children Film Festival", year: "" },
    { title: "Restart", note: "Official Selection, Divya Bhaskar Short Film Competition", year: "" },
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
  { period: "TODO", title: "Master of Performing Arts", body: "Advanced study in acting, direction and stagecraft." },
  { period: "2011", title: "Bachelor of Performing Arts", body: "Acting and theatre training; staged Insani Kathputlio Ka Tamasha and Char Din." },
];

// Real work, from YouTube. youtube = video id (used for the thumbnail and the in-page player).
// Years are approximate (from upload age). TODO: confirm years and Jayesh's role on each.
export const projects = [
  {
    title: "Haji",
    description: "A boy goes out of his way to help his neighbour experience the holy prayer of Hajj. Winner at an international film festival in Singapore.",
    year: "2025",
    role: "Director",
    tags: ["Short film", "Award winner", "Drama"],
    length: "8:29",
    youtube: "dUw5-fYwmoE",
  },
  {
    title: "Rukh",
    description: "A short film selected at the International Children Film Festival.",
    year: "2025",
    role: "Filmmaker",
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
  { name: "Adobe Premiere Pro", note: "Editing", level: 90, mark: "Pr", color: "#9999FF", bg: "#00005B" },
  { name: "DaVinci Resolve", note: "Colour and finishing", level: 75, mark: "Da", color: "#E8E8E8", bg: "#233A51" },
  { name: "Adobe After Effects", note: "Motion titles", level: 60, mark: "Ae", color: "#D291FF", bg: "#00005B" },
  { name: "Adobe Audition", note: "Sound cleanup and mix", level: 65, mark: "Au", color: "#00E4BB", bg: "#00005B" },
];

export const quote = {
  text: "Every frame tells a story. All it needs is honesty, passion and heart.",
  by: "Jayesh Adhikari",
};

// Behind the scenes, from his Carrd gallery. w/h are the file's pixel size.
export const gallery = [
  { src: "/gallery/on-set-camera.jpg", w: 710, h: 518, caption: "On set" },
  { src: "/gallery/edit-timeline.jpg", w: 960, h: 1260, caption: "The edit: Restart on the timeline" },
  { src: "/gallery/waah-zindagi-poster.jpg", w: 1080, h: 1081, caption: "Waah Zindagi (ZEE5), Assistant Director" },
  { src: "/gallery/camera-operating.jpg", w: 960, h: 1280, caption: "Behind the camera" },
  { src: "/gallery/studio-setup.jpg", w: 1280, h: 946, caption: "Studio lighting setup" },
  { src: "/gallery/interview-setup.jpg", w: 720, h: 1280, caption: "Interview shoot" },
  { src: "/gallery/with-sonu-sood.jpg", w: 1280, h: 1280, caption: "On set with Sonu Sood" },
  { src: "/gallery/bhanwar-poster.jpg", w: 1066, h: 1600, caption: "Bhanwar (2017), Gujarati feature" },
  { src: "/gallery/presenter-shoot.jpg", w: 1280, h: 960, caption: "Brand shoot" },
  { src: "/gallery/jail-set.jpg", w: 960, h: 1138, caption: "Set build" },
  { src: "/gallery/on-set-desk.jpg", w: 821, h: 630, caption: "Prep" },
  { src: "/gallery/studio-wide.jpg", w: 1044, h: 612, caption: "Studio floor" },
];
