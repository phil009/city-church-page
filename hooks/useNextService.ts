"use client";

import { useState, useEffect } from "react";

export function useNextService() {
  const [nextServiceTime, setNextServiceTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const calculateNextService = () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 = Sunday
      const hour = now.getHours();
      const nextService = new Date();

      if (dayOfWeek === 0) {
        // It's Sunday
        if (hour < 9) {
          nextService.setHours(9, 30, 0, 0);
        } else if (hour < 11) {
          nextService.setHours(11, 0, 0, 0);
        } else {
          // After last service, set to next Sunday 9 AM
          nextService.setDate(nextService.getDate() + 7);
          nextService.setHours(9, 0, 0, 0);
        }
      } else {
        // Any other day, set to next Sunday 9 AM
        const daysUntilSunday = 7 - dayOfWeek;
        nextService.setDate(nextService.getDate() + daysUntilSunday);
        nextService.setHours(9, 30, 0, 0);
      }

      return nextService;
    };

    const updateCountdown = () => {
      if (!nextServiceTime) {
        setNextServiceTime(calculateNextService());
        return;
      }

      const now = new Date();
      const diff = nextServiceTime.getTime() - now.getTime();

      if (diff <= 0) {
        setNextServiceTime(calculateNextService());
        return;
      }

      // Calculate remaining time
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(
        `${days > 0 ? days + "d " : ""}${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    };

    if (!nextServiceTime) {
      setNextServiceTime(calculateNextService());
    }

    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => clearInterval(countdownInterval);
  }, [nextServiceTime]);

  return { nextServiceTime, timeRemaining };
}
