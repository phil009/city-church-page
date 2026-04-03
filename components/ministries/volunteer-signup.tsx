"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface Unit {
  name: string;
  hint: string;
  desc: string;
}

interface Calling {
  id: string;
  group: "purpose" | "support";
  icon: string;
  title: string;
  subtitle: string;
  teamName: string;
  units: Unit[];
}

const CALLINGS: Calling[] = [
  // FIVE PURPOSES
  {
    id: "ministry",
    group: "purpose",
    icon: "🧭",
    title: "I feel called to help people find their place and purpose",
    subtitle: "Connecting members to ministry, care, outreach and self-discovery",
    teamName: "Ministry Team",
    units: [
      { name: "Ministry Match", hint: "Help people discover where they fit in the church", desc: "Ministry Match walks alongside people as they discover their God-given place in the church — matching gifts, passion and personality to the right service unit." },
      { name: "Pathway Monitors", hint: "Ensure new sign-ups are properly onboarded across the church", desc: "Pathway Monitors make sure that everyone who signs up to serve is properly welcomed and integrated into their unit, so no one is left without a home." },
      { name: "Elevate", hint: "Support and sharpen church leaders and ministers", desc: "Elevate manages the leadership and minister communities — maintaining databases, organising events, and creating opportunities that sharpen those who lead." },
      { name: "Ministry Operations", hint: "Organise, plan and keep ministry running smoothly", desc: "The engine behind ministry life — handling planning, scheduling and coordination so that every team and programme runs smoothly." },
      { name: "Ministry Development Centre", hint: "Train and equip ministry leaders and volunteers", desc: "MDC equips volunteers and leaders with the tools and training they need to serve with excellence and grow in their calling." },
      { name: "Wellspring", hint: "Publish and share inspiring material from ministry leadership", desc: "When the Ministry Team leadership meets, they share from the Word and other texts to encourage one another. Wellspring curates and publishes this material for the broader community." },
      { name: "Hope Bearers", hint: "Visit hospitals and bring encouragement to the sick", desc: "Hope Bearers visit hospitals and care facilities to pray for, encourage, and support those who are ill — and where possible, bring relief and support materials to those in need." },
      { name: "iCARE", hint: "Use medical skills to care for church and community", desc: "iCARE is a team of medical professionals who provide basic healthcare and education to church members and extend the same care to communities during Missions Outreaches." },
      { name: "School of Ministry", hint: "Help people discover who they are and how they are wired", desc: "School of Ministry runs programmes centred on self-awareness and self-discovery, including Live By Design — the signature programme built on SHAPE that helps people understand how God has uniquely designed them to serve." },
    ],
  },
  {
    id: "maturity",
    group: "purpose",
    icon: "📖",
    title: "I feel called to help people grow deeper in their faith",
    subtitle: "Prayer, Bible study, discipleship and stewardship",
    teamName: "Maturity Team",
    units: [
      { name: "Word Recipe", hint: "Unpack and share the Bible in fresh, accessible ways", desc: "Word Recipe makes Scripture come alive — helping people connect with the Bible in fresh and life-giving ways." },
      { name: "Prayer Team", hint: "Pray for people, the church and the community", desc: "The Prayer Team is the spiritual backbone of the church — interceding for members, leadership and the community. If prayer is your passion, this is your home." },
      { name: "School of Maturity", hint: "Facilitate spiritual growth classes and programmes", desc: "School of Maturity runs classes and programmes that help members deepen their faith, develop Christian character and mature in their walk with God." },
      { name: "Stewards", hint: "Serve meals and prepare communion at church gatherings", desc: "Stewards are the hosts and hostesses of the church — serving meals at select gatherings and preparing the communion table, honouring these sacred moments with care and excellence." },
    ],
  },
  {
    id: "membership",
    group: "purpose",
    icon: "🏡",
    title: "I feel called to help people feel they truly belong",
    subtitle: "Welcoming, assimilating and caring for members",
    teamName: "Membership Team",
    units: [
      { name: "Big Nestle", hint: "Celebrate members' birthdays, anniversaries and milestones", desc: "Big Nestle is the celebrations team — honouring members on their birthdays, anniversaries and other special milestones, making every person feel truly valued and cherished by the church family." },
      { name: "The Care Team", hint: "Check in on and care for members regularly", desc: "The Care Team stays connected with members through visits, calls and follow-ups — making sure no one in the church family feels forgotten." },
      { name: "Guest Assimilation", hint: "Help newcomers transition from visitor to member", desc: "Guest Assimilation bridges the gap between first visit and full belonging — walking newcomers through the journey of becoming part of the church." },
    ],
  },
  {
    id: "magnification",
    group: "purpose",
    icon: "🎵",
    title: "I feel called to lead or support worship",
    subtitle: "Singing, instruments and praise",
    teamName: "Magnification",
    units: [
      { name: "Sweet Incense", hint: "Sing or lead others in praise and worship", desc: "Sweet Incense is the vocal worship ministry — singers and praise leaders who help the congregation encounter God through music and song." },
      { name: "Vertical Blade", hint: "Play an instrument in the worship band", desc: "Vertical Blade is the worship band — musicians who create the sound of praise. If you play an instrument and love worship, this is your stage." },
    ],
  },
  {
    id: "missions",
    group: "purpose",
    icon: "🌍",
    title: "I feel called to take the gospel beyond these walls",
    subtitle: "Outreach, evangelism and mobilising the church",
    teamName: "Missions",
    units: [
      { name: "Missions", hint: "Reach people outside the church with the Good News", desc: "Missions mobilises the church for Evangelism — the fifth purpose. Whether locally or beyond, you'll be part of carrying the Good News to people who haven't yet heard it." },
    ],
  },
  // SUPPORT & OPERATIONS
  {
    id: "production",
    group: "support",
    icon: "🎛️",
    title: "I feel called to serve behind the scenes with technology",
    subtitle: "Sound, lighting, screens, streaming and photography",
    teamName: "Production",
    units: [
      { name: "Live Streaming", hint: "Broadcast services online for remote viewers", desc: "Live Streaming takes the service beyond the building — managing the broadcast so members and viewers everywhere can participate in real time." },
      { name: "Screen – Pixel", hint: "Manage slides, lyrics and visual displays", desc: "Pixel runs the visual displays during service — lyrics, scriptures, announcements and graphics — ensuring everything on screen is crisp and on cue." },
      { name: "Sound Craft", hint: "Handle audio, microphones and mixing", desc: "Sound Craft manages the audio experience — microphones, mixers and speakers — so every word spoken and every note played is heard clearly." },
      { name: "Lighting", hint: "Operate stage and event lighting rigs", desc: "Lighting sets the atmosphere for worship and events — a creative and technical role for those who love working behind the scenes to create impact." },
      { name: "Photography / Videography", hint: "Capture photos and videos of church life", desc: "This team captures the life and moments of the church through compelling photos and video that tell the story of the community." },
    ],
  },
  {
    id: "guestservices",
    group: "support",
    icon: "🤝",
    title: "I feel called to be the face people see when they arrive",
    subtitle: "Welcoming, ushering, information and hospitality",
    teamName: "Guest Services",
    units: [
      { name: "City Marshalls", hint: "Direct people around the building and coordinate parking", desc: "City Marshalls are the navigators of the church — coordinating parking, directing traffic and guiding foot flow so that everyone arrives safely, smoothly and without confusion." },
      { name: "Greeters", hint: "Welcome people with warmth the moment they walk in", desc: "Greeters are often the first human face a guest sees. Your warmth and genuine welcome sets the tone for their entire experience." },
      { name: "Ushers", hint: "Help people find their seats and feel comfortable", desc: "Ushers ensure the auditorium runs with order and warmth — seating guests, distributing materials and creating a hospitable atmosphere." },
      { name: "Info Desk", hint: "Answer questions and share information about the church", desc: "The Info Desk is the knowledge hub — a go-to resource for guests and members with questions about the church and its programmes." },
      { name: "Sparkles", hint: "Keep the church space clean, tidy and beautiful", desc: "Sparkles maintains the cleanliness and beauty of the church environment — because the space we worship in reflects the God we worship." },
      { name: "Guest Connect", hint: "Follow up with guests and host the guest reception", desc: "Guest Connect goes beyond the service — following up with first-time and returning guests, and planning and hosting the guest reception so that every visitor feels genuinely welcomed into the community." },
      { name: "Protocol", hint: "Host VIPs, dignitaries and special guests with excellence", desc: "Protocol handles the care of all special guests — dignitaries, ministers and VIPs, including the pastoral team — ensuring each is received and served with honour and excellence." },
    ],
  },
  {
    id: "serviceprog",
    group: "support",
    icon: "📋",
    title: "I feel called to coordinate what happens during service",
    subtitle: "Planning and sequencing the order of service",
    teamName: "Service Programming",
    units: [
      { name: "Service Programming", hint: "Plan and sequence every element of the church service", desc: "Service Programming plans and sequences each element of the church service — working with teams to ensure everything comes together beautifully and on time." },
    ],
  },
  {
    id: "creativearts",
    group: "support",
    icon: "🎭",
    title: "I feel called to express faith through the arts",
    subtitle: "Dance, drama and spoken word",
    teamName: "Creative Arts Department",
    units: [
      { name: "Dance", hint: "Use movement and dance as an act of worship", desc: "The Dance ministry uses movement as worship — choreographing and performing pieces that minister to the congregation and glorify God." },
      { name: "Drama", hint: "Act or perform on stage to bring the Word to life", desc: "Drama uses storytelling and performance to bring biblical truth to the stage — making the Word tangible and emotionally powerful." },
      { name: "Spoken Word", hint: "Write or perform poetry, spoken word and declarations", desc: "Spoken Word is where language becomes art — crafting and delivering poems and declarations that stir hearts and glorify God." },
    ],
  },
  {
    id: "brandcomm",
    group: "support",
    icon: "📱",
    title: "I feel called to tell the church's story creatively",
    subtitle: "Design, video, content and social media",
    teamName: "Brand Communications",
    units: [
      { name: "Video Editors", hint: "Edit and produce video content for the church", desc: "Video Editors shape how the church is seen — cutting, crafting and producing video content that captures the life and message of the ministry." },
      { name: "Graphics Design", hint: "Design graphics, posters and visual materials", desc: "Graphics Design gives the church its visual identity — creating everything from service slides to event posters with creativity and excellence." },
      { name: "Content Creators", hint: "Write articles, captions and devotional content", desc: "Content Creators craft the written and digital voice of the church — articles, captions, devotionals and more — making the message clear and compelling." },
      { name: "Social Media Managers", hint: "Manage and grow the church's social media platforms", desc: "Social Media Managers steward the church's online presence — growing community, posting content and engaging with followers across digital platforms." },
    ],
  },
  {
    id: "grouplife",
    group: "support",
    icon: "🏘️",
    title: "I feel called to connect people through small groups",
    subtitle: "Hosting and coordinating community groups",
    teamName: "Group Life",
    units: [
      { name: "Group Life", hint: "Host, lead or coordinate a small group community", desc: "Group Life coordinates the small group network — the heartbeat of real community where members do life together, grow in faith and care for one another." },
    ],
  },
];

// ─── Step bar ────────────────────────────────────────────────────────────────

const STEPS = ["Your Calling", "Your Role", "Your Match", "Sign Up"];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex justify-center bg-appDark border-b border-appBorderGray sticky top-0 z-10 overflow-x-auto">
      {STEPS.map((label, i) => {
        const num = i + 1;
        const isActive = num === current;
        const isDone = num < current;
        return (
          <div
            key={label}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
              isActive
                ? "border-appRed text-appRed"
                : isDone
                  ? "border-transparent text-appGhost/60"
                  : "border-transparent text-appGhost/30"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                isActive
                  ? "bg-appRed text-white"
                  : isDone
                    ? "bg-green-600 text-white"
                    : "bg-white/10 text-appGhost/40"
              }`}
            >
              {isDone ? <Check className="w-3 h-3" /> : num}
            </span>
            {label}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 5;

export default function VolunteerSignup() {
  const [step, setStep] = useState<Step>(1);
  const [selectedCalling, setSelectedCalling] = useState<Calling | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [learnMode, setLearnMode] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const stepBarIndex = step === 4 ? 3 : step === 5 ? 4 : step <= 3 ? step : step;

  const purposeCallings = CALLINGS.filter((c) => c.group === "purpose");
  const supportCallings = CALLINGS.filter((c) => c.group === "support");

  function goTo(s: Step) {
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSelectCalling(c: Calling) {
    setSelectedCalling(c);
    setSelectedUnit(null);
  }

  function handleSelectUnit(u: Unit) {
    setSelectedUnit(u);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCalling || !selectedUnit) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/join-unit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "Full Name": `${firstName} ${lastName}`.trim(),
          "Email Address": email,
          "Phone Number": phone,
          "Activities You Enjoy": selectedCalling.title,
          "Previous Service Experience": notes || "",
          "Service Group 1": `${selectedUnit.name} (${selectedCalling.teamName})`,
        }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setDone(true);
      toast.success("You're signed up! We'll be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="bg-appOffWhite min-h-[60vh] flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.15 }}
            className="w-20 h-20 rounded-full bg-appRed mx-auto mb-6 flex items-center justify-center text-3xl shadow-lg shadow-appRed/30"
          >
            🙌
          </motion.div>
          <h2 className="text-2xl font-bold text-appDark mb-3">
            You&apos;re on your way!
          </h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Your sign-up has been received. A team coordinator will reach out
            shortly to welcome you aboard.
          </p>
          <div className="inline-block bg-white border border-gray-200 rounded-xl px-6 py-4 mb-8">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
              Signed up for
            </p>
            <p className="font-bold text-appDark">
              {selectedUnit?.name} — {selectedCalling?.teamName}
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                setDone(false);
                setSelectedCalling(null);
                setSelectedUnit(null);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
                setNotes("");
                goTo(1);
              }}
              className="text-sm text-gray-400 border border-gray-300 rounded-full px-5 py-2 hover:text-appDark hover:border-gray-400 transition-colors"
            >
              ← Start over
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-appOffWhite min-h-screen">
      <StepBar current={stepBarIndex} />

      <AnimatePresence mode="wait">
        {/* ── STEP 1: Calling ─────────────────────────── */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto px-4 py-10"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-appRed mb-2">
              Step 1 of 4
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-appDark mb-2 leading-tight">
              Which of these feels most like you?
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Choose the one that best describes where you feel called to serve.
            </p>

            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3 flex items-center gap-3">
              The Five Purposes
              <span className="flex-1 h-px bg-gray-200" />
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {purposeCallings.map((c) => (
                <CallingCard
                  key={c.id}
                  calling={c}
                  selected={selectedCalling?.id === c.id}
                  onSelect={() => handleSelectCalling(c)}
                />
              ))}
            </div>

            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3 flex items-center gap-3">
              Support &amp; Operations
              <span className="flex-1 h-px bg-gray-200" />
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {supportCallings.map((c) => (
                <CallingCard
                  key={c.id}
                  calling={c}
                  selected={selectedCalling?.id === c.id}
                  onSelect={() => handleSelectCalling(c)}
                />
              ))}
            </div>

            <Button
              onClick={() => goTo(2)}
              disabled={!selectedCalling}
              className="bg-appRed hover:bg-appRed/90 text-white rounded-full px-8 gap-2"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* ── STEP 2: Unit ────────────────────────────── */}
        {step === 2 && selectedCalling && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto px-4 py-10"
          >
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
              <span className="font-semibold text-appDark">
                {selectedCalling.teamName}
              </span>
              <ChevronRight className="w-3 h-3" />
              <span>Choose your role</span>
            </div>

            <p className="text-xs font-bold tracking-widest uppercase text-appRed mb-2">
              Step 2 of 4
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-appDark mb-2 leading-tight">
              How would you like to serve?
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Pick the role that fits you best within the{" "}
              {selectedCalling.teamName}.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {selectedCalling.units.map((u) => (
                <UnitCard
                  key={u.name}
                  unit={u}
                  selected={selectedUnit?.name === u.name}
                  onSelect={() => handleSelectUnit(u)}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => goTo(1)}
                variant="outline"
                className="rounded-full gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
              <Button
                onClick={() => { setLearnMode(false); goTo(3); }}
                disabled={!selectedUnit}
                className="bg-appRed hover:bg-appRed/90 text-white rounded-full px-8 gap-2"
              >
                See My Match <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Match ────────────────────────────── */}
        {step === 3 && selectedCalling && selectedUnit && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto px-4 py-10"
          >
            {learnMode ? (
              // Learn More view
              <>
                <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-4">
                  <p className="text-xs font-bold tracking-widest uppercase text-appRed mb-2">
                    {selectedCalling.teamName}
                  </p>
                  <h2 className="text-2xl font-bold text-appDark mb-1">
                    {selectedUnit.name}
                  </h2>
                  <p className="text-sm text-gray-400 mb-5">
                    Part of the {selectedCalling.teamName}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedUnit.desc}
                  </p>

                  <div className="mt-6 bg-appOffWhite rounded-xl p-4 flex items-center gap-4 flex-wrap">
                    <span className="text-2xl">💬</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-appDark">
                        Want to speak with a coordinator first?
                      </p>
                      <p className="text-xs text-gray-400">
                        Someone from this team will get back to you shortly.
                      </p>
                    </div>
                    <Button
                      onClick={() => { setLearnMode(false); goTo(4); }}
                      className="bg-appRed hover:bg-appRed/90 text-white text-xs"
                    >
                      Contact Team
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => { setLearnMode(false); goTo(4); }}
                  className="w-full bg-appRed hover:bg-appRed/90 text-white rounded-xl py-5"
                >
                  Sign Me Up ✍️
                </Button>
                <div className="mt-3">
                  <button
                    onClick={() => setLearnMode(false)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-appDark transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3" /> Back to my match
                  </button>
                </div>
              </>
            ) : (
              // Match card view
              <>
                <p className="text-xs font-bold tracking-widest uppercase text-appRed mb-2">
                  Your Match
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-appDark mb-2">
                  We found your place!
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Based on what you shared, here&apos;s where we think
                  you&apos;ll thrive.
                </p>

                <div className="bg-appDark rounded-2xl p-8 text-white mb-5 relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-appRed/10 pointer-events-none" />
                  <div className="absolute -bottom-16 -left-8 w-36 h-36 rounded-full bg-appRed/5 pointer-events-none" />
                  <p className="text-xs font-bold tracking-widest uppercase text-appRed mb-3 relative">
                    {selectedCalling.teamName}
                  </p>
                  <div className="inline-flex items-center gap-2 bg-appRed/15 border border-appRed/30 rounded-full px-3 py-1 text-xs text-appRed mb-4 relative">
                    {selectedCalling.icon} {selectedCalling.title}
                  </div>
                  <h3 className="text-3xl font-bold leading-tight mb-1 relative">
                    {selectedUnit.name}
                  </h3>
                  <p className="text-sm text-white/50 mb-5 relative">
                    Part of the {selectedCalling.teamName}
                  </p>
                  <p className="text-sm text-white/65 leading-relaxed border-t border-white/10 pt-5 relative">
                    {selectedUnit.desc}
                  </p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Button
                    variant="outline"
                    onClick={() => setLearnMode(true)}
                    className="flex-1 min-w-32"
                  >
                    📖 Learn More
                  </Button>
                  <Button
                    onClick={() => goTo(4)}
                    className="flex-1 min-w-32 bg-appRed hover:bg-appRed/90 text-white"
                  >
                    ✍️ Sign Me Up
                  </Button>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => goTo(2)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-appDark transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3" /> Back to role selection
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* ── STEP 4: Sign-up form ─────────────────────── */}
        {step === 4 && selectedCalling && selectedUnit && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto px-4 py-10"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
              <p className="text-xs font-bold tracking-widest uppercase text-appRed mb-1">
                Signing up for
              </p>
              <h2 className="text-xl font-bold text-appDark mb-6">
                {selectedUnit.name} — {selectedCalling.teamName}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs uppercase tracking-wide text-gray-400">
                      First Name
                    </Label>
                    <Input
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Grace"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs uppercase tracking-wide text-gray-400">
                      Last Name
                    </Label>
                    <Input
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Okonkwo"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs uppercase tracking-wide text-gray-400">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="grace@email.com"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs uppercase tracking-wide text-gray-400">
                    Phone Number
                  </Label>
                  <Input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs uppercase tracking-wide text-gray-400">
                    Team &amp; Unit
                  </Label>
                  <Input
                    readOnly
                    value={`${selectedUnit.name} (${selectedCalling.teamName})`}
                    className="bg-gray-50 cursor-default text-gray-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs uppercase tracking-wide text-gray-400">
                    Anything you&apos;d like us to know?{" "}
                    <span className="normal-case">(optional)</span>
                  </Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Skills, availability, previous experience…"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-appRed hover:bg-appRed/90 text-white rounded-xl py-5 mt-2"
                >
                  {submitting ? "Submitting…" : "Submit →"}
                </Button>
              </form>
            </div>

            <div className="mt-4">
              <button
                onClick={() => goTo(3)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-appDark transition-colors"
              >
                <ChevronLeft className="w-3 h-3" /> Back to my match
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CallingCard({
  calling,
  selected,
  onSelect,
}: {
  calling: Calling;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group text-left flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
        selected
          ? "border-appRed bg-red-50"
          : "border-gray-200 bg-white hover:border-appRed/40 hover:translate-x-1"
      }`}
    >
      <span className="text-2xl w-11 h-11 rounded-xl bg-appOffWhite flex items-center justify-center flex-shrink-0">
        {calling.icon}
      </span>
      <div className="flex-1 pr-6">
        <p className="text-sm font-semibold text-appDark leading-snug mb-0.5">
          {calling.title}
        </p>
        <p className="text-xs text-gray-400">{calling.subtitle}</p>
      </div>
      {selected && (
        <span className="absolute right-4 w-6 h-6 bg-appRed rounded-full flex items-center justify-center flex-shrink-0">
          <Check className="w-3 h-3 text-white" />
        </span>
      )}
    </button>
  );
}

function UnitCard({
  unit,
  selected,
  onSelect,
}: {
  unit: Unit;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group text-left flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
        selected
          ? "border-appRed bg-red-50"
          : "border-gray-200 bg-white hover:border-appRed/40 hover:translate-x-1"
      }`}
    >
      <span
        className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors ${
          selected ? "bg-appRed" : "bg-gray-300"
        }`}
      />
      <div className="flex-1 pr-6">
        <p className="text-sm font-semibold text-appDark">{unit.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{unit.hint}</p>
      </div>
      {selected && (
        <span className="w-5 h-5 bg-appRed rounded-full flex items-center justify-center flex-shrink-0">
          <Check className="w-3 h-3 text-white" />
        </span>
      )}
    </button>
  );
}
