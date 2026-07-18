// ─── Gift Categories (V5: 32 categories × 3 questions = 96 total) ─────────────
// NOTE: Question texts below are placeholders — populate from V5 HTML.

export const GIFT_CATEGORIES = [
  { id: "A",  name: "Administration",            questions: [1,  2,  3]  },
  { id: "B",  name: "Apostleship / Missions",    questions: [4,  5,  6]  },
  { id: "C",  name: "Celibacy",                  questions: [7,  8,  9]  },
  { id: "D",  name: "Craftsmanship",             questions: [10, 11, 12] },
  { id: "E",  name: "Creative Communication",    questions: [13, 14, 15] },
  { id: "F",  name: "Discernment",               questions: [16, 17, 18] },
  { id: "G",  name: "Encouragement",             questions: [19, 20, 21] },
  { id: "H",  name: "Evangelism",               questions: [22, 23, 24] },
  { id: "I",  name: "Exhortation",              questions: [25, 26, 27] },
  { id: "J",  name: "Exorcism / Deliverance",   questions: [28, 29, 30] },
  { id: "K",  name: "Faith",                    questions: [31, 32, 33] },
  { id: "L",  name: "Giving",                   questions: [34, 35, 36] },
  { id: "M",  name: "Healing",                  questions: [37, 38, 39] },
  { id: "N",  name: "Helps / Service",          questions: [40, 41, 42] },
  { id: "O",  name: "Hospitality",              questions: [43, 44, 45] },
  { id: "P",  name: "Intercession",             questions: [46, 47, 48] },
  { id: "Q",  name: "Interpretation of Tongues",questions: [49, 50, 51] },
  { id: "R",  name: "Knowledge",                questions: [52, 53, 54] },
  { id: "S",  name: "Leadership",               questions: [55, 56, 57] },
  { id: "T",  name: "Mercy",                    questions: [58, 59, 60] },
  { id: "U",  name: "Miracles",                 questions: [61, 62, 63] },
  { id: "V",  name: "Missionary",               questions: [64, 65, 66] },
  { id: "W",  name: "Music",                    questions: [67, 68, 69] },
  { id: "X",  name: "Next Generation",          questions: [70, 71, 72] },
  { id: "Y",  name: "Production",               questions: [73, 74, 75] },
  { id: "Z",  name: "Prophecy",                 questions: [76, 77, 78] },
  { id: "AA", name: "Service",                  questions: [79, 80, 81] },
  { id: "AB", name: "Shepherding / Pastoring",  questions: [82, 83, 84] },
  { id: "AC", name: "Teaching",                 questions: [85, 86, 87] },
  { id: "AD", name: "Tongues",                  questions: [88, 89, 90] },
  { id: "AE", name: "Voluntary Poverty",        questions: [91, 92, 93] },
  { id: "AF", name: "Wisdom",                   questions: [94, 95, 96] },
] as const;

// ─── Gift Questions (V5: 96 questions) ─────────────────────────────────────────
// TODO: Replace all texts with verbatim content from V5 HTML.

export const GIFT_QUESTIONS: Record<number, string> = {
  // Administration
  1:  "I like to organize people, tasks, and events.",
  2:  "I am careful, thorough, and skilled at managing details.",
  3:  "I can clarify goals and develop strategies or plans to accomplish them.",
  // Apostleship / Missions
  4:  "I would like to start churches in places where they do not presently exist.",
  5:  "I am attracted to the idea of serving in another country or ethnic community.",
  6:  "I am willing to take an active part in starting a new church.",
  // Celibacy
  7:  "I feel called to a life of singleness for the sake of greater ministry.",
  8:  "I find that being unmarried frees me to serve God more fully.",
  9:  "I sense God's grace enabling me to be content without marriage.",
  // Craftsmanship
  10: "I enjoy working creatively with wood, cloth, paints, metal, glass, or other materials.",
  11: "I am skilled in working with different kinds of tools.",
  12: "I enjoy making things for use in ministry.",
  // Creative Communication
  13: "I enjoy challenging people's perspective of God by using various forms of art.",
  14: "I enjoy developing and using my artistic skills (art, drama, music, photography, etc.).",
  15: "I like finding new and fresh ways of communicating God's truth.",
  // Discernment
  16: "I can readily distinguish between spiritual truth and error, good and evil.",
  17: "I frequently am able to judge a person's character based upon first impressions.",
  18: "I can see through phoniness or deceit before it is evident to others.",
  // Encouragement
  19: "I tend to see the potential in people.",
  20: "I enjoy reassuring and strengthening those who are discouraged.",
  21: "I give hope to others by directing them to the promises of God.",
  // Evangelism
  22: "I communicate the gospel to others with clarity and effectiveness.",
  23: "I consistently look for opportunities to build relationships with non-Christians.",
  24: "I am effective at adapting the gospel message so that it connects with an individual's felt needs.",
  // Exhortation
  25: "I urge others to live out their faith with greater commitment.",
  26: "I challenge people to grow in holiness and discipleship.",
  27: "I feel compelled to call others to action in their walk with God.",
  // Exorcism / Deliverance
  28: "I have experienced God setting people free from demonic bondage through my ministry.",
  29: "I can sense when demonic forces are at work in a person or situation.",
  30: "I have authority in prayer to resist and overcome spiritual oppression.",
  // Faith
  31: "I find it natural and easy to trust God to answer my prayers.",
  32: "I have confidence in God's continuing provision and help, even in difficult times.",
  33: "I trust God in circumstances where success cannot be guaranteed by human effort alone.",
  // Giving
  34: "I give liberally and joyfully to people in financial need or to projects requiring support.",
  35: "I give more than a tithe so that kingdom work can be accomplished.",
  36: "I manage my money well in order to free more of it for giving.",
  // Healing
  37: "I have prayed for the sick and seen God restore them to health.",
  38: "I believe God uses me as an instrument of physical or emotional healing.",
  39: "People seem to experience healing when I pray for them.",
  // Helps / Service
  40: "I enjoy working behind the scenes to support the work of others.",
  41: "I enjoy doing routine tasks that support the ministry.",
  42: "I willingly take on a variety of odd jobs around the church to meet the needs of others.",
  // Hospitality
  43: "I view my home as a place to minister to people in need.",
  44: "I enjoy meeting new people and helping them to feel welcomed.",
  45: "I like to create a place where people do not feel that they are alone.",
  // Intercession
  46: "I take prayer requests from others and consistently pray for them.",
  47: "I enjoy praying for long periods of time and receive leadings as to what God wants me to pray for.",
  48: "I pray with confidence because I know that God works in response to prayer.",
  // Interpretation of Tongues
  49: "I have been able to interpret a message spoken in tongues.",
  50: "I sense a supernatural understanding of what is being communicated in tongues.",
  51: "God has used me to give the meaning of an unknown tongue in a public setting.",
  // Knowledge
  52: "I am approached by people who want to know my perspective on a particular passage or biblical truth.",
  53: "I receive information from the Spirit that I did not acquire through natural means.",
  54: "I have insight or just know something to be true.",
  // Leadership
  55: "I am able to motivate others to accomplish a goal.",
  56: "I am able to influence others to achieve a vision.",
  57: "I set goals and manage people and resources effectively to accomplish them.",
  // Mercy
  58: "I empathize with hurting people and desire to help in their healing process.",
  59: "I can patiently support those going through painful experiences as they try to stabilize their lives.",
  60: "I have great compassion for hurting people.",
  // Miracles
  61: "I have witnessed God performing miracles in answer to my prayers.",
  62: "God has used me to perform an act that could not be explained naturally.",
  63: "I believe God calls me to be an instrument of His miraculous power.",
  // Missionary
  64: "I have a burden to bring the gospel to unreached peoples.",
  65: "I am willing to relocate to serve cross-culturally for an extended period.",
  66: "I sense a special calling to international or cross-cultural ministry.",
  // Music
  67: "I use music as a primary way to worship God and minister to others.",
  68: "I have a musical gift (voice, instrument, or composition) I dedicate to God's glory.",
  69: "Leading others in musical worship is a deep passion of mine.",
  // Next Generation
  70: "I have a special burden for children and teenagers.",
  71: "I find great joy in investing spiritually in the lives of young people.",
  72: "I feel called to shape the next generation of believers.",
  // Production
  73: "I use technical and production skills to enhance ministry.",
  74: "I enjoy working with audio, video, or lighting equipment in a ministry context.",
  75: "I help ministry happen effectively through behind-the-scenes technical work.",
  // Prophecy
  76: "I can speak in a way that results in conviction and change in the lives of others.",
  77: "I feel responsible to confront others with the truth.",
  78: "I boldly expose cultural trends, teachings, or events, which contradict Biblical principles.",
  // Service
  79: "I see serving others as central to my calling as a Christian.",
  80: "I find deep satisfaction in meeting practical needs for others.",
  81: "I feel energized when I serve, regardless of recognition.",
  // Shepherding / Pastoring
  82: "I enjoy spending time nurturing and caring for others.",
  83: "I have compassion for wandering believers and want to protect them.",
  84: "I enjoy giving guidance and practical support to a small group of people.",
  // Teaching
  85: "I am able to communicate God's word effectively.",
  86: "I can spend time in study knowing that presenting truth will make a difference in the lives of people.",
  87: "I can present information and skills to others at a level that makes it easy for them to grasp and apply to their lives.",
  // Tongues
  88: "I have spoken in a language I have never learned as a form of prayer or praise.",
  89: "I feel a spiritual burden lifted when I pray in tongues.",
  90: "The gift of tongues builds my personal faith and intimacy with God.",
  // Voluntary Poverty
  91: "I feel God has called me to live well below my means for the sake of ministry.",
  92: "I can willingly give up material comforts to better serve others.",
  93: "I sense freedom rather than deprivation when I choose to live simply.",
  // Wisdom
  94: "I am often sought out by others for advice about spiritual or personal matters.",
  95: "I can often find simple, practical solutions in the midst of conflict or confusion.",
  96: "I can anticipate the likely consequences of an individual's or a group's action.",
};

// ─── DISC Rows ─────────────────────────────────────────────────────────────────

export const DISC_ROWS = [
  { row: 1,  D: "Forceful",     I: "Expressive",       S: "Restrained",      C: "Careful"       },
  { row: 2,  D: "Pioneering",   I: "Exciting",          S: "Satisfied",       C: "Correct"       },
  { row: 3,  D: "Bold",         I: "Animated",          S: "Willing",         C: "Precise"       },
  { row: 4,  D: "Argumentative",I: "Unpredictable",     S: "Indecisive",      C: "Doubting"      },
  { row: 5,  D: "Daring",       I: "Outgoing",          S: "Patient",         C: "Respectful"    },
  { row: 6,  D: "Persuasive",   I: "Self-reliant",      S: "Gentle",          C: "Logical"       },
  { row: 7,  D: "Decisive",     I: "Life of the party", S: "Even-tempered",   C: "Cautious"      },
  { row: 8,  D: "Assertive",    I: "Popular",           S: "Generous",        C: "Perfectionist" },
  { row: 9,  D: "Unyielding",   I: "Colorful",          S: "Easy-going",      C: "Modest"        },
  { row: 10, D: "Persistent",   I: "Optimistic",        S: "Accommodating",   C: "Systematic"    },
  { row: 11, D: "Relentless",   I: "Talkative",         S: "Neighborly",      C: "Humble"        },
  { row: 12, D: "Strong-willed",I: "Playful",           S: "Friendly",        C: "Observant"     },
  { row: 13, D: "Adventurous",  I: "Charming",          S: "Deliberate",      C: "Disciplined"   },
  { row: 14, D: "Aggressive",   I: "Attractive",        S: "Steady",          C: "Restrained"    },
  { row: 15, D: "Determined",   I: "Enthusiastic",      S: "Sympathetic",     C: "Analytical"    },
  { row: 16, D: "Commanding",   I: "Impulsive",         S: "Slow-paced",      C: "Critical"      },
  { row: 17, D: "Forceful",     I: "Lively",            S: "Consistent",      C: "Laid back"     },
  { row: 18, D: "Independent",  I: "Influential",       S: "Kind",            C: "Orderly"       },
  { row: 19, D: "Outspoken",    I: "Popular",           S: "Pleasant",        C: "Idealistic"    },
  { row: 20, D: "Impatient",    I: "Emotional",         S: "Procrastinator",  C: "Serious"       },
  { row: 21, D: "Competitive",  I: "Spontaneous",       S: "Loyal",           C: "Thoughtful"    },
  { row: 22, D: "Courageous",   I: "Convincing",        S: "Self-sacrificing",C: "Considerate"   },
  { row: 23, D: "Pushy",        I: "Flighty",           S: "Dependent",       C: "Stoic"         },
  { row: 24, D: "Directing",    I: "Stimulating",       S: "Tolerant",        C: "Conventional"  },
] as const;

// ─── Passions ──────────────────────────────────────────────────────────────────

export const PASSIONS = [
  { title: "Acquire / Possess",  desc: "I love to shop, collect, or obtain things; getting the highest quality for the best price." },
  { title: "Design / Develop",   desc: "I love to make something out of nothing; getting something started from scratch." },
  { title: "Excel",              desc: "I love to be the best and make my team the best; setting and attaining the highest standard." },
  { title: "Follow the Rules",   desc: "I love to operate by policies and procedures; meeting the expectations of an organization." },
  { title: "Improve",            desc: "I love to make things better; taking something someone else started and improving it." },
  { title: "Influence",          desc: "I love to convert people to my way of thinking; shaping the attitudes and behavior of others." },
  { title: "Lead",               desc: "I love to lead the way, oversee, and supervise; determining how things will be done." },
  { title: "Repair",             desc: "I love to fix and repair mechanical things and inanimate objects." },
  { title: "Organize",           desc: "I love to bring order out of chaos; organizing something that is already started." },
  { title: "Perform",            desc: "I love to be on stage and receive the attention of others; being in the limelight." },
  { title: "Persevere",          desc: "I love to see things to completion; persisting at something until it is finished." },
  { title: "Evangelize",         desc: "I love sharing the plan of salvation with anyone I meet." },
  { title: "Prevail",            desc: "I love to fight for what is right and oppose what is wrong; overcoming injustice." },
  { title: "Writing",            desc: "I love to write articles, stories, and/or books." },
  { title: "Proofreading",       desc: "I love proofreading written material as well as articles written by others." },
  { title: "Serve / Help",       desc: "I love to assist others in their responsibility; helping others succeed." },
];

// ─── People Groups ─────────────────────────────────────────────────────────────

export const PEOPLE_GROUPS = [
  "Children", "College Students", "Disabled", "Divorced", "Elderly",
  "Empty Nesters", "Homeless", "Hospitalized", "Infants", "Men",
  "Parents", "Prisoners", "Single Parents", "Singles", "Teen Moms",
  "Unemployed", "Widowed", "Women", "Young Married", "Youth", "Poor",
];

// ─── Causes ────────────────────────────────────────────────────────────────────

export const CAUSES = [
  "Abuse/Violence", "Alcoholism", "At-risk children", "Compulsive behavior",
  "Deafness", "Disabilities", "Divorce", "Drug Abuse", "Education",
  "Environment", "Ethics", "Finances", "Health/Fitness", "HIV/AIDS",
  "Homelessness", "Injustice issues", "Law/Justice system", "Marriage/Family",
  "Parenting", "Policy/Politics", "Poverty/Hunger", "Sanctity of Life",
  "Sexuality", "Spiritual apathy",
];

// ─── Abilities ─────────────────────────────────────────────────────────────────

export const ABILITIES = [
  "Administration Skills", "Artistic", "Audio-Visual", "Career Counseling",
  "Childcare", "Clerical Skills", "Coaching", "Communication", "Compassion",
  "Computer Graphics", "Computer Skills", "Computerized Photography",
  "Construction", "Cooking/Providing Meals", "CPR/First Aid", "Craftsmanship",
  "Creative", "Creative Communications", "Data Entry", "Decorating",
  "Desktop Publishing", "Editing", "Elementary Education", "Encourager",
  "Event Planning", "Facilitation", "Floral Design", "Foreign Language",
  "Gardening", "Good Listener", "Graphic Design", "Intercession",
  "Landscaping", "Leadership Skills", "Legal Knowledge", "Marketing",
  "Mechanical Aptitude", "Medical Knowledge", "Music – Instrumental",
  "Music – Vocal", "Organization", "Painting", "Photography", "Prayer",
  "Pre-press Production", "Problem Solving", "Public Speaking", "Puppets",
  "Script Writing", "Set Design/Construction", "Sewing", "Sound Mixing",
  "Sports Coach", "Teaching", "Team Building", "Team Player",
  "Technical Skills", "Video Production", "Word Processing", "Writing",
  "Youth Games",
];

// ─── Step Bar Labels (V5: 8 steps) ─────────────────────────────────────────────

export const SHAPE_STEPS = [
  { id: 1, label: "Intro",        letter: null },
  { id: 2, label: "Gifts",        letter: "S"  },
  { id: 3, label: "Heart",        letter: "H"  },
  { id: 4, label: "Abilities",    letter: "A"  },
  { id: 5, label: "DISC",         letter: "P"  },
  { id: 6, label: "16 Types",     letter: "P"  },
  { id: 7, label: "Experiences",  letter: "E"  },
  { id: 8, label: "Summary",      letter: null },
];

// ─── DISC type metadata ────────────────────────────────────────────────────────

export const DISC_TYPES = {
  D: { name: "Dominant",    animal: "Lion",             desc: "Direct, decisive, confident, risk-takers, and problem-solvers." },
  I: { name: "Influencing", animal: "Otter",            desc: "Enthusiastic, optimistic, talkative, persuasive, center of attention." },
  S: { name: "Steady",      animal: "Golden Retriever", desc: "Stable, even-tempered, friendly, sympathetic, a great listener and loyal team player." },
  C: { name: "Careful",     animal: "Beaver",           desc: "Accurate, precise, detail-oriented, analytical, and systematic." },
} as const;

// ─── 16 Personalities Questions ────────────────────────────────────────────────
// TODO: Populate all 60 questions verbatim from V5 HTML.
// Each question needs: id (1–60), text, dimension (E|N|T|J|A), polarity (1|–1).
// polarity +1 = response toward E/N/T/J/A; polarity -1 = response toward I/S/F/P/T(urbulent).

export type P16Dimension = "E" | "N" | "T" | "J" | "A";

export const P16_QUESTIONS: Array<{
  id: number;
  text: string;
  dimension: P16Dimension;
  polarity: 1 | -1;
}> = [
  // ── Mind (E vs I) ── questions 1–12
  { id: 1,  text: "You feel comfortable approaching people you don't know.",                                  dimension: "E", polarity:  1 },
  { id: 2,  text: "You regularly make new friends.",                                                          dimension: "E", polarity:  1 },
  { id: 3,  text: "You enjoy being the centre of attention at social events.",                                dimension: "E", polarity:  1 },
  { id: 4,  text: "You often feel energised after spending time with a large group of people.",               dimension: "E", polarity:  1 },
  { id: 5,  text: "You find it easy to start conversations with strangers.",                                  dimension: "E", polarity:  1 },
  { id: 6,  text: "Being around people for a long time drains your energy, even if you enjoy the interaction.", dimension: "E", polarity: -1 },
  { id: 7,  text: "You prefer to have a few close friends rather than a large circle of acquaintances.",      dimension: "E", polarity: -1 },
  { id: 8,  text: "You tend to reflect carefully before speaking or acting.",                                 dimension: "E", polarity: -1 },
  { id: 9,  text: "You enjoy solitary activities such as reading, writing, or creating things alone.",        dimension: "E", polarity: -1 },
  { id: 10, text: "You feel more comfortable expressing yourself in writing than in conversation.",            dimension: "E", polarity: -1 },
  { id: 11, text: "You spend a lot of your free time exploring various random topics that pique your interest.", dimension: "E", polarity: -1 },
  { id: 12, text: "Engaging in social events for a long time wears you out.",                                 dimension: "E", polarity: -1 },

  // ── Energy (N vs S) ── questions 13–24
  { id: 13, text: "You are more interested in the big picture than in specific details.",                     dimension: "N", polarity:  1 },
  { id: 14, text: "You often think about what things could be rather than what they are.",                    dimension: "N", polarity:  1 },
  { id: 15, text: "You are drawn to abstract ideas and theoretical concepts.",                                dimension: "N", polarity:  1 },
  { id: 16, text: "You often find yourself imagining creative or unconventional ways to solve problems.",     dimension: "N", polarity:  1 },
  { id: 17, text: "You enjoy pondering why things are the way they are.",                                     dimension: "N", polarity:  1 },
  { id: 18, text: "You prefer to focus on tangible facts and practical details rather than abstract concepts.", dimension: "N", polarity: -1 },
  { id: 19, text: "You trust experience over theory and prefer proven solutions over untested ideas.",        dimension: "N", polarity: -1 },
  { id: 20, text: "You tend to notice small details that others often overlook.",                             dimension: "N", polarity: -1 },
  { id: 21, text: "You prefer to stick with established methods rather than experimenting with new approaches.", dimension: "N", polarity: -1 },
  { id: 22, text: "You usually find it easier to learn from real-life examples than from theory.",            dimension: "N", polarity: -1 },
  { id: 23, text: "You believe that practical experience is worth more than theoretical knowledge.",          dimension: "N", polarity: -1 },
  { id: 24, text: "You find hands-on tasks more rewarding than imaginative exercises.",                       dimension: "N", polarity: -1 },

  // ── Nature (T vs F) ── questions 25–36
  { id: 25, text: "When making decisions, you prioritise logic and objective reasoning over personal feelings.", dimension: "T", polarity:  1 },
  { id: 26, text: "You find it easy to stay calm and rational even in emotionally charged situations.",       dimension: "T", polarity:  1 },
  { id: 27, text: "You believe that being honest is more important than being diplomatic.",                   dimension: "T", polarity:  1 },
  { id: 28, text: "You tend to evaluate situations objectively without letting emotions cloud your judgement.", dimension: "T", polarity:  1 },
  { id: 29, text: "You feel more comfortable analysing problems than expressing emotions.",                   dimension: "T", polarity:  1 },
  { id: 30, text: "You put the needs and feelings of others before logical considerations when making decisions.", dimension: "T", polarity: -1 },
  { id: 31, text: "You find it difficult to raise your voice or be confrontational, even when you know you are right.", dimension: "T", polarity: -1 },
  { id: 32, text: "You are deeply moved by the stories and feelings of those around you.",                    dimension: "T", polarity: -1 },
  { id: 33, text: "You focus on how others might feel when making decisions, even at the cost of efficiency.", dimension: "T", polarity: -1 },
  { id: 34, text: "You find it hard to stay detached when someone shares their problem with you.",            dimension: "T", polarity: -1 },
  { id: 35, text: "You value harmony and avoid conflict even if it means compromising your own position.",    dimension: "T", polarity: -1 },
  { id: 36, text: "You often allow your feelings to guide your actions more than rational analysis.",         dimension: "T", polarity: -1 },

  // ── Tactics (J vs P) ── questions 37–48
  { id: 37, text: "You like to have a clear plan before starting any task.",                                  dimension: "J", polarity:  1 },
  { id: 38, text: "You prefer structured environments over unpredictable or spontaneous ones.",               dimension: "J", polarity:  1 },
  { id: 39, text: "You find it easy to stay organised and on schedule.",                                      dimension: "J", polarity:  1 },
  { id: 40, text: "You feel more comfortable when decisions are made and things are settled.",                dimension: "J", polarity:  1 },
  { id: 41, text: "You make to-do lists and enjoy checking things off.",                                      dimension: "J", polarity:  1 },
  { id: 42, text: "You prefer to keep your options open rather than committing to a definite plan.",          dimension: "J", polarity: -1 },
  { id: 43, text: "You enjoy improvising and adapting to new situations as they arise.",                      dimension: "J", polarity: -1 },
  { id: 44, text: "You often leave things to the last minute and work well under pressure.",                  dimension: "J", polarity: -1 },
  { id: 45, text: "You find strict deadlines and schedules restrictive rather than helpful.",                 dimension: "J", polarity: -1 },
  { id: 46, text: "You tend to start many projects but find it hard to finish all of them.",                  dimension: "J", polarity: -1 },
  { id: 47, text: "You prefer flexibility and spontaneity over a fixed routine.",                             dimension: "J", polarity: -1 },
  { id: 48, text: "You enjoy exploring multiple possibilities before settling on a single course of action.", dimension: "J", polarity: -1 },

  // ── Identity (A vs T) ── questions 49–60
  { id: 49, text: "You are generally confident and comfortable with who you are.",                            dimension: "A", polarity:  1 },
  { id: 50, text: "You rarely feel stressed or anxious about the future.",                                    dimension: "A", polarity:  1 },
  { id: 51, text: "You believe your decisions and actions are correct even when others challenge them.",      dimension: "A", polarity:  1 },
  { id: 52, text: "You recover quickly from setbacks and disappointments.",                                   dimension: "A", polarity:  1 },
  { id: 53, text: "You seldom worry about whether you have made the right decision.",                         dimension: "A", polarity:  1 },
  { id: 54, text: "You often feel insecure or doubt yourself even when you succeed.",                         dimension: "A", polarity: -1 },
  { id: 55, text: "You can get irritated or upset easily under pressure.",                                    dimension: "A", polarity: -1 },
  { id: 56, text: "You tend to worry about what others think of you.",                                        dimension: "A", polarity: -1 },
  { id: 57, text: "You are prone to overthinking and replaying situations in your head.",                     dimension: "A", polarity: -1 },
  { id: 58, text: "Small setbacks can affect your mood for a long time.",                                     dimension: "A", polarity: -1 },
  { id: 59, text: "You feel the need to constantly improve and are rarely fully satisfied with your performance.", dimension: "A", polarity: -1 },
  { id: 60, text: "You feel nervous when facing uncertainty or situations you cannot control.",               dimension: "A", polarity: -1 },
];

// ─── 16 Personality Types ──────────────────────────────────────────────────────
// TODO: Replace descriptions with verbatim content from V5 HTML.

export const P16_TYPES: Record<string, { name: string; role: string; desc: string }> = {
  "INTJ": { name: "Architect",     role: "Analyst",  desc: "Imaginative and strategic thinkers with a plan for everything." },
  "INTP": { name: "Logician",      role: "Analyst",  desc: "Innovative inventors with an unquenchable thirst for knowledge." },
  "ENTJ": { name: "Commander",     role: "Analyst",  desc: "Bold, imaginative and strong-willed leaders who always find a way." },
  "ENTP": { name: "Debater",       role: "Analyst",  desc: "Smart and curious thinkers who cannot resist an intellectual challenge." },
  "INFJ": { name: "Advocate",      role: "Diplomat", desc: "Quiet and mystical, yet very inspiring and tireless idealists." },
  "INFP": { name: "Mediator",      role: "Diplomat", desc: "Poetic, kind and altruistic people, always eager to help a good cause." },
  "ENFJ": { name: "Protagonist",   role: "Diplomat", desc: "Charismatic and inspiring leaders who can mesmerise their listeners." },
  "ENFP": { name: "Campaigner",    role: "Diplomat", desc: "Enthusiastic, creative and sociable free spirits who can always find a reason to smile." },
  "ISTJ": { name: "Logistician",   role: "Sentinel", desc: "Practical and fact-minded individuals whose reliability cannot be doubted." },
  "ISFJ": { name: "Defender",      role: "Sentinel", desc: "Very dedicated and warm protectors, always ready to defend loved ones." },
  "ESTJ": { name: "Executive",     role: "Sentinel", desc: "Excellent administrators, unsurpassed at managing things or people." },
  "ESFJ": { name: "Consul",        role: "Sentinel", desc: "Extraordinarily caring, social and popular people, always eager to help." },
  "ISTP": { name: "Virtuoso",      role: "Explorer", desc: "Bold and practical experimenters, masters of all kinds of tools." },
  "ISFP": { name: "Adventurer",    role: "Explorer", desc: "Flexible and charming artists, always ready to explore and experience something new." },
  "ESTP": { name: "Entrepreneur",  role: "Explorer", desc: "Smart, energetic and very perceptive people who truly enjoy living on the edge." },
  "ESFP": { name: "Entertainer",   role: "Explorer", desc: "Spontaneous, energetic and enthusiastic people – life is never boring around them." },
};

// ─── Ministry Units ────────────────────────────────────────────────────────────
// TODO: Populate all 37 units verbatim from V5 HTML.

export interface MinistryUnit {
  name: string;
  team: string;
  gifts: string[];
  disc: string[];
  p16types: string[];
  passions: string[];
  people: string[];
  causes: string[];
  abilities: string[];
}

export const MINISTRY_UNITS: MinistryUnit[] = [
  // ── Ministry Team ──
  { name: "Pastoral Care", team: "Ministry Team", gifts: ["Mercy", "Shepherding / Pastoring", "Intercession"], disc: ["S", "I"], p16types: ["INFJ", "ISFJ", "ENFJ"], passions: ["Serve / Help"], people: ["Elderly", "Hospitalized", "Widowed"], causes: ["Spiritual apathy"], abilities: ["Compassion", "Good Listener", "Prayer"] },
  { name: "Prayer Ministry", team: "Ministry Team", gifts: ["Intercession", "Faith", "Prophecy"], disc: ["S", "C"], p16types: ["INFJ", "INTJ", "ISFJ"], passions: ["Persevere"], people: [], causes: ["Spiritual apathy"], abilities: ["Intercession", "Prayer"] },

  // ── Maturity Team ──
  { name: "Discipleship", team: "Maturity Team", gifts: ["Teaching", "Shepherding / Pastoring", "Knowledge"], disc: ["S", "C"], p16types: ["INTJ", "INFJ", "ISTJ"], passions: ["Influence"], people: [], causes: ["Spiritual apathy", "Education"], abilities: ["Teaching", "Coaching", "Facilitation"] },
  { name: "Biblical Counseling", team: "Maturity Team", gifts: ["Wisdom", "Mercy", "Knowledge"], disc: ["S", "I"], p16types: ["INFJ", "ISFJ", "ENFJ"], passions: ["Serve / Help"], people: [], causes: ["Spiritual apathy", "Abuse/Violence"], abilities: ["Good Listener", "Compassion", "Career Counseling"] },

  // ── Membership Team ──
  { name: "New Members Class", team: "Membership Team", gifts: ["Teaching", "Evangelism", "Administration"], disc: ["I", "C"], p16types: ["ENFJ", "ENTJ", "ESFJ"], passions: ["Influence", "Lead"], people: [], causes: ["Spiritual apathy"], abilities: ["Communication", "Public Speaking", "Teaching"] },
  { name: "Guest Experience", team: "Membership Team", gifts: ["Hospitality", "Helps / Service", "Mercy"], disc: ["I", "S"], p16types: ["ESFJ", "ENFP", "ESFP"], passions: ["Serve / Help"], people: [], causes: [], abilities: ["Communication", "Compassion"] },

  // ── Magnification ──
  { name: "Worship Team", team: "Magnification", gifts: ["Music", "Evangelism", "Creative Communication"], disc: ["I", "S"], p16types: ["ENFP", "ESFP", "ENFJ"], passions: ["Perform", "Evangelize"], people: [], causes: [], abilities: ["Music – Vocal", "Music – Instrumental"] },
  { name: "Creative Arts", team: "Magnification", gifts: ["Creative Communication", "Craftsmanship"], disc: ["I", "C"], p16types: ["ENFP", "INFP", "ISFP"], passions: ["Design / Develop"], people: [], causes: [], abilities: ["Artistic", "Graphic Design", "Set Design/Construction"] },

  // ── Missions ──
  { name: "Local Outreach", team: "Missions", gifts: ["Evangelism", "Mercy", "Helps / Service"], disc: ["I", "D"], p16types: ["ENFP", "ENTJ", "ESFJ"], passions: ["Evangelize", "Prevail"], people: ["Homeless", "Poor", "Prisoners"], causes: ["Poverty/Hunger", "Homelessness"], abilities: ["Communication", "Compassion"] },
  { name: "Global Missions", team: "Missions", gifts: ["Missionary", "Apostleship / Missions", "Faith"], disc: ["D", "I"], p16types: ["ENTJ", "ENFJ", "ENTP"], passions: ["Evangelize"], people: [], causes: [], abilities: ["Foreign Language", "Communication"] },

  // ── Production ──
  { name: "Audio Team", team: "Production", gifts: ["Production", "Helps / Service", "Service"], disc: ["C", "S"], p16types: ["ISTJ", "INTJ", "ISTP"], passions: ["Serve / Help"], people: [], causes: [], abilities: ["Audio-Visual", "Technical Skills", "Sound Mixing"] },
  { name: "Video Team", team: "Production", gifts: ["Production", "Creative Communication"], disc: ["C", "I"], p16types: ["ISTP", "INTJ", "INFP"], passions: ["Design / Develop"], people: [], causes: [], abilities: ["Video Production", "Audio-Visual", "Technical Skills"] },
  { name: "Lighting Team", team: "Production", gifts: ["Production", "Craftsmanship"], disc: ["C", "S"], p16types: ["ISTJ", "ISTP", "INTJ"], passions: ["Design / Develop"], people: [], causes: [], abilities: ["Technical Skills", "Audio-Visual"] },

  // ── Guest Services ──
  { name: "Ushers / Greeters", team: "Guest Services", gifts: ["Hospitality", "Helps / Service", "Mercy"], disc: ["I", "S"], p16types: ["ESFJ", "ENFP", "ESFP"], passions: ["Serve / Help"], people: [], causes: [], abilities: ["Communication", "Compassion"] },
  { name: "Parking & Traffic", team: "Guest Services", gifts: ["Helps / Service", "Administration"], disc: ["D", "S"], p16types: ["ESTJ", "ESTP", "ISFJ"], passions: ["Serve / Help", "Follow the Rules"], people: [], causes: [], abilities: ["Team Player"] },
  { name: "Children's Ministry", team: "Guest Services", gifts: ["Next Generation", "Teaching", "Mercy"], disc: ["S", "I"], p16types: ["ENFJ", "ESFJ", "ISFJ"], passions: ["Serve / Help"], people: ["Children", "Youth"], causes: ["Education"], abilities: ["Childcare", "Teaching", "Elementary Education"] },

  // ── Service Programming ──
  { name: "Drama / Theater", team: "Service Programming", gifts: ["Creative Communication", "Encouragement"], disc: ["I", "D"], p16types: ["ENFP", "ENTP", "ESFP"], passions: ["Perform", "Design / Develop"], people: [], causes: [], abilities: ["Artistic", "Creative Communications"] },
  { name: "Decoration / Staging", team: "Service Programming", gifts: ["Craftsmanship", "Creative Communication"], disc: ["C", "I"], p16types: ["ISFP", "INFP", "ESFP"], passions: ["Design / Develop"], people: [], causes: [], abilities: ["Decorating", "Set Design/Construction", "Floral Design"] },

  // ── Creative Arts Department ──
  { name: "Graphic Design", team: "Creative Arts Department", gifts: ["Creative Communication", "Craftsmanship"], disc: ["C", "I"], p16types: ["INFP", "ISFP", "INTJ"], passions: ["Design / Develop"], people: [], causes: [], abilities: ["Graphic Design", "Computer Graphics", "Artistic"] },
  { name: "Photography", team: "Creative Arts Department", gifts: ["Creative Communication", "Craftsmanship"], disc: ["C", "I"], p16types: ["ISFP", "INFP", "ISTP"], passions: ["Design / Develop"], people: [], causes: [], abilities: ["Photography", "Computerized Photography", "Artistic"] },
  { name: "Social Media Content", team: "Creative Arts Department", gifts: ["Creative Communication", "Evangelism"], disc: ["I", "C"], p16types: ["ENFP", "ENTP", "INFJ"], passions: ["Design / Develop", "Influence"], people: [], causes: [], abilities: ["Creative Communications", "Computer Skills", "Writing"] },

  // ── Brand Communications ──
  { name: "Communications Team", team: "Brand Communications", gifts: ["Creative Communication", "Knowledge", "Administration"], disc: ["C", "I"], p16types: ["ENTJ", "INTJ", "ENTP"], passions: ["Influence", "Design / Develop"], people: [], causes: [], abilities: ["Communication", "Marketing", "Writing"] },
  { name: "Copywriting", team: "Brand Communications", gifts: ["Creative Communication", "Knowledge"], disc: ["C", "I"], p16types: ["INTJ", "INFJ", "INTP"], passions: ["Writing"], people: [], causes: [], abilities: ["Writing", "Editing", "Script Writing"] },

  // ── Group Life ──
  { name: "Small Group Leader", team: "Group Life", gifts: ["Shepherding / Pastoring", "Teaching", "Encouragement"], disc: ["S", "I"], p16types: ["ENFJ", "INFJ", "ISFJ"], passions: ["Influence", "Lead"], people: [], causes: [], abilities: ["Teaching", "Facilitation", "Good Listener"] },
  { name: "Men's Ministry", team: "Group Life", gifts: ["Leadership", "Shepherding / Pastoring", "Encouragement"], disc: ["D", "S"], p16types: ["ENTJ", "ESTJ", "ENFJ"], passions: ["Lead", "Influence"], people: ["Men"], causes: [], abilities: ["Leadership Skills", "Coaching"] },
  { name: "Women's Ministry", team: "Group Life", gifts: ["Shepherding / Pastoring", "Mercy", "Hospitality"], disc: ["S", "I"], p16types: ["ENFJ", "ESFJ", "INFJ"], passions: ["Serve / Help"], people: ["Women"], causes: [], abilities: ["Good Listener", "Compassion"] },
  { name: "Youth Ministry", team: "Group Life", gifts: ["Next Generation", "Evangelism", "Shepherding / Pastoring"], disc: ["I", "D"], p16types: ["ENFP", "ENTP", "ENFJ"], passions: ["Influence", "Evangelize"], people: ["Youth", "College Students"], causes: ["Education"], abilities: ["Teaching", "Coaching", "Youth Games"] },
  { name: "Young Adults", team: "Group Life", gifts: ["Evangelism", "Encouragement", "Hospitality"], disc: ["I", "S"], p16types: ["ENFP", "ESFP", "ENFJ"], passions: ["Evangelize", "Serve / Help"], people: ["College Students", "Singles", "Young Married"], causes: [], abilities: ["Communication", "Facilitation"] },
  { name: "Marriage & Family", team: "Group Life", gifts: ["Shepherding / Pastoring", "Wisdom", "Mercy"], disc: ["S", "I"], p16types: ["ISFJ", "INFJ", "ESFJ"], passions: ["Serve / Help"], people: ["Parents", "Young Married", "Empty Nesters"], causes: ["Marriage/Family", "Parenting"], abilities: ["Good Listener", "Compassion", "Career Counseling"] },
  { name: "Senior Ministry", team: "Group Life", gifts: ["Hospitality", "Mercy", "Helps / Service"], disc: ["S", "I"], p16types: ["ISFJ", "ESFJ", "INFJ"], passions: ["Serve / Help"], people: ["Elderly", "Widowed"], causes: [], abilities: ["Compassion", "Good Listener"] },
  { name: "Benevolence / Care", team: "Group Life", gifts: ["Mercy", "Giving", "Helps / Service"], disc: ["S", "I"], p16types: ["ISFJ", "INFJ", "ESFJ"], passions: ["Serve / Help", "Prevail"], people: ["Homeless", "Poor", "Unemployed", "Single Parents"], causes: ["Poverty/Hunger", "Homelessness"], abilities: ["Compassion", "Cooking/Providing Meals"] },
  { name: "Special Needs Ministry", team: "Group Life", gifts: ["Mercy", "Helps / Service", "Shepherding / Pastoring"], disc: ["S", "I"], p16types: ["ISFJ", "INFJ", "ESFJ"], passions: ["Serve / Help"], people: ["Disabled"], causes: ["Disabilities"], abilities: ["Compassion", "Childcare"] },
  { name: "Outreach & Evangelism", team: "Group Life", gifts: ["Evangelism", "Apostleship / Missions", "Mercy"], disc: ["D", "I"], p16types: ["ENFP", "ENTJ", "ENTP"], passions: ["Evangelize", "Prevail"], people: ["Homeless", "Prisoners", "Poor"], causes: ["Spiritual apathy", "Poverty/Hunger"], abilities: ["Communication", "Public Speaking"] },
  { name: "Administration Support", team: "Group Life", gifts: ["Administration", "Helps / Service", "Service"], disc: ["C", "S"], p16types: ["ISTJ", "ESTJ", "ISFJ"], passions: ["Follow the Rules", "Organize"], people: [], causes: [], abilities: ["Administration Skills", "Clerical Skills", "Data Entry"] },
  { name: "Events Team", team: "Group Life", gifts: ["Administration", "Hospitality", "Helps / Service"], disc: ["D", "I"], p16types: ["ENTJ", "ESTJ", "ESFJ"], passions: ["Organize", "Lead"], people: [], causes: [], abilities: ["Event Planning", "Organization", "Administration Skills"] },
  { name: "Finance & Stewardship", team: "Group Life", gifts: ["Administration", "Giving", "Knowledge"], disc: ["C", "D"], p16types: ["INTJ", "ISTJ", "ENTJ"], passions: ["Follow the Rules", "Acquire / Possess"], people: [], causes: ["Finances"], abilities: ["Administration Skills", "Legal Knowledge"] },
];
