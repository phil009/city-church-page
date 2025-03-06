import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  testimony: string;
  avatarUrl?: string;
}

export default function TestimonialCard({
  name,
  testimony,
  avatarUrl,
}: TestimonialCardProps) {
  return (
    <div className="bg-white border-t-2 border-appRed p-6 rounded-lg shadow-sm w-full max-w-72 mx-auto">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full border-b-4 border-appRed overflow-hidden bg-gray-200 mb-4">
          <Image
            src={avatarUrl || "/images/avatar.png"}
            alt={`${name}'s avatar`}
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
        <p className="text-gray-600 text-center mb-6">{testimony}</p>
        <h3 className="font-semibold text-lg">{name}</h3>
      </div>
    </div>
  );
}
