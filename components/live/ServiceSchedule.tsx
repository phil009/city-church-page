"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Globe } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface ServiceEvent {
  id: string
  title: string
  date: string
  time: string
  type: "live" | "on-demand" | "special"
  location?: string
  description?: string
}

const upcomingServices: ServiceEvent[] = [
  {
    id: "1",
    title: "Sunday Morning Service",
    date: "SUNDAY, JUNE 8",
    time: "9:30 AM",
    type: "live",
    location: "Main Sanctuary",
    description: "First Service",
  },
  {
    id: "2",
    title: "Sunday Morning Service",
    date: "SUNDAY, JUNE 8",
    time: "11:00 AM",
    type: "live",
    location: "Main Sanctuary",
    description: "Second Service",
  },
  {
    id: "3",
    title: "Sunday Service - On Demand",
    date: "SUNDAY, JUNE 8",
    time: "12:30 PM",
    type: "on-demand",
    location: "Online",
    description: "Replay of morning service",
  },
  {
    id: "4",
    title: "Midweek Service",
    date: "WEDNESDAY, JUNE 11",
    time: "5:30 PM",
    type: "live",
    location: "Main Sanctuary",
    description: "Bible Study & Prayer",
  },
  {
    id: "5",
    title: "Midweek Service - On Demand",
    date: "WEDNESDAY, JUNE 11",
    time: "8:00 PM",
    type: "on-demand",
    location: "Online",
    description: "Replay of midweek service",
  },
  {
    id: "6",
    title: "Sunday Morning Service",
    date: "SUNDAY, JUNE 15",
    time: "9:30 AM",
    type: "live",
    location: "Main Sanctuary",
    description: "First Service",
  },
  {
    id: "7",
    title: "Sunday Morning Service",
    date: "SUNDAY, JUNE 15",
    time: "11:00 AM",
    type: "live",
    location: "Main Sanctuary",
    description: "Second Service",
  },
  {
    id: "8",
    title: "Youth Conference",
    date: "SATURDAY, JUNE 21",
    time: "10:00 AM",
    type: "special",
    location: "Youth Center",
    description: "Special youth event",
  },
]

export default function ServiceSchedule() {
  const [selectedTimezone] = useState("(GMT+1:00) Lagos")

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "live":
        return <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      case "on-demand":
        return <Globe className="h-4 w-4 text-blue-500" />
      case "special":
        return <Calendar className="h-4 w-4 text-purple-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getServiceBadge = (type: string) => {
    switch (type) {
      case "live":
        return <Badge variant="destructive">Live</Badge>
      case "on-demand":
        return <Badge variant="secondary">On Demand</Badge>
      case "special":
        return <Badge variant="default">Special Event</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-semibold mb-2">Service Schedule</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Globe className="h-4 w-4" />
          <span>{selectedTimezone}</span>
        </div>
      </div>

      {/* Schedule List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {upcomingServices.reduce((acc, service, index) => {
            const currentDate = service.date
            const prevDate = index > 0 ? upcomingServices[index - 1].date : null

            if (currentDate !== prevDate) {
              acc.push(
                <div key={`date-${currentDate}`} className="mb-4">
                  <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">{currentDate}</h4>
                </div>,
              )
            }

            acc.push(
              <div key={service.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getServiceIcon(service.type)}
                    <h5 className="font-semibold text-lg">{service.time}</h5>
                  </div>
                  {getServiceBadge(service.type)}
                </div>

                <h6 className="font-medium text-gray-900 mb-1">{service.title}</h6>

                {service.description && <p className="text-gray-600 text-sm mb-2">{service.description}</p>}

                {service.location && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span>{service.location}</span>
                  </div>
                )}
              </div>,
            )

            return acc
          }, [] as JSX.Element[])}
        </div>
      </ScrollArea>
    </div>
  )
}
