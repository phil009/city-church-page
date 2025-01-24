import SignalLogo from "../signal-logo";

export default function VisionMission() {
  return (
    <div className="relative flex flex-col w-full p-6 rounded-lg shadow-sm">
      {/* Vision Section */}
      <div className="mb-6">
        <h2 className="text-appRed sm:mb-2 text-base sm:text-xl">Vision</h2>
        <p className="text-lg sm:text-2xl text-appDark">
          To raise change agents.
        </p>
      </div>
      <div className="flex justify-center">
        <SignalLogo />
      </div>
      {/* Mission Section */}
      <div className="items-end flex flex-col text-end">
        <h2 className="text-appRed sm:mb-2 text-base sm:text-xl">Mission</h2>
        <p className="text-lg sm:text-2xl sm:max-w-[36ch] text-appDark leading-relaxed">
          We are a church with a heart for people who are far from Jesus and
          create environments that help them take their next steps towards Him.
        </p>
      </div>
    </div>
  );
}
