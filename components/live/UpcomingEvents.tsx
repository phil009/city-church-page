"use client";

import { Button } from "@/components/ui/button";

export default function UpcomingEvents() {
  return (
    <div className="bg-appDark text-appOffWhite rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      {/* <div className="space-y-3">
        <div className="border-l-4 border-appRed pl-3">
          <div className="font-medium">Easter Service</div>
          <p className="text-sm text-gray-50">April 20, 2024 • 11:30 AM</p>
        </div>
        <div className="border-l-4 border-appRed pl-3">
          <div className="font-medium">Easter Movie Night</div>
          <p className="text-sm text-gray-50">April 18, 2024</p>
        </div>
      </div> */}
      <Button
        variant="outline"
        className="w-full mt-4"
        onClick={() => (window.location.href = "/events")}
      >
        View All Events
      </Button>
    </div>
  );
}
