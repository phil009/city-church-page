"use client";

import { useMemo, useState } from "react";
import { Calendar, Clock, MapPin, Globe } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface ServiceEvent {
  id: string;
  title: string;
  date: Date;
  type: "live" | "on-demand" | "special";
  location?: string;
  description?: string;
}

export default function ServiceSchedule() {
  const [selectedTimezone] = useState("(GMT+1:00) Lagos");

  const generateNext4Weeks = (): ServiceEvent[] => {
    const events: ServiceEvent[] = [];
    const today = new Date();
    const start = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const end = new Date(start);
    end.setDate(end.getDate() + 28);

    const isLastFridayOfMonth = (d: Date) => {
      const test = new Date(d);
      test.setDate(d.getDate() + 7);
      return test.getMonth() !== d.getMonth() && d.getDay() === 5;
    };

    const isLastSundayOfQuarter = (d: Date) => {
      const month = d.getMonth() + 1;
      if (d.getDay() !== 0) return false;
      if (![3, 6, 9, 12].includes(month)) return false;
      const test = new Date(d);
      test.setDate(d.getDate() + 7);
      return test.getMonth() + 1 !== month;
    };

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      const date = new Date(d);
      let type: ServiceEvent["type"] | null = null;
      let title = "";

      if (day === 0) {
        const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const firstSunday = new Date(firstOfMonth);
        firstSunday.setDate(1 + ((7 - firstOfMonth.getDay()) % 7));
        if (date.getDate() === firstSunday.getDate()) {
          title = "Heritage Sunday";
          type = "special";
        } else if (isLastSundayOfQuarter(date)) {
          title = "Night of Incense";
          type = "special";
        } else {
          title = "Sunday Service";
          type = "live";
        }
      } else if (isLastFridayOfMonth(date)) {
        title = "Power Point";
        type = "live";
      }

      if (type) {
        let hour = 0,
          minute = 0;
        if (title === "Heritage Sunday" || title === "Sunday Service") {
          hour = 9;
          minute = 30;
        } else if (title === "Power Point") {
          hour = 18;
          minute = 0;
        } else if (title === "Night of Incense") {
          hour = 18;
          minute = 0;
        }

        const eventDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hour,
          minute
        );

        events.push({
          id: eventDate.toISOString(),
          title,
          date: eventDate,
          type,
          location: ["Sunday Service", "Heritage Sunday"].includes(title)
            ? "The Big Tent"
            : undefined,
          description:
            title === "Sunday Service"
              ? "Weekly gathering"
              : title === "Heritage Sunday"
              ? "First Sunday celebration"
              : title === "Power Point"
              ? "End-of-month special"
              : title === "Night of Incense"
              ? "Quarterly night vigil"
              : undefined,
        });
      }
    }
    return events;
  };

  const upcomingServices = useMemo(generateNext4Weeks, []);

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "live":
        return (
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        );
      case "special":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getServiceBadge = (type: string) => {
    switch (type) {
      case "live":
        return <Badge variant="destructive">Live</Badge>;
      case "special":
        return <Badge variant="default">Special Event</Badge>;
      default:
        return null;
    }
  };

  const byDate = upcomingServices.reduce<Record<string, ServiceEvent[]>>(
    (acc, ev) => {
      const key = ev.date.toDateString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(ev);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-semibold mb-2">Service Schedule</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Globe className="h-4 w-4" />
          <span>{selectedTimezone}</span>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {Object.entries(byDate).map(([dateStr, services]) => (
            <div key={dateStr}>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                  {dateStr.toUpperCase()}
                </h4>
              </div>
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow mb-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getServiceIcon(service.type)}
                      <h5 className="font-semibold text-lg">
                        {service.date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </h5>
                    </div>
                    {getServiceBadge(service.type)}
                  </div>

                  <h6 className="font-medium text-gray-900 mb-1">
                    {service.title}
                  </h6>
                  {service.description && (
                    <p className="text-gray-600 text-sm mb-2">
                      {service.description}
                    </p>
                  )}
                  {service.location && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{service.location}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
