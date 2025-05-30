import { Calendar } from "lucide-react";

interface Service {
  day: string;
  time: string;
  type: string;
}

interface ServiceScheduleProps {
  services: Service[];
}

export default function ServiceSchedule({ services }: ServiceScheduleProps) {
  return (
    <div className="border border-appBorderGray text-appOffWhite rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Calendar className="mr-2 h-5 w-5 text-appRed" />
        <h2 className="text-xl font-bold">Service Schedule</h2>
      </div>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="border-b border-appBorderGray pb-3 last:border-0 last:pb-0">
            <div className="font-semibold">{service.day}</div>
            <div className="text-sm ">{service.time}</div>
            <div className="text-sm ">{service.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
