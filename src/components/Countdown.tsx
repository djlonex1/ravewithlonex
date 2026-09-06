"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const initialTime: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export default function Countdown({
  targetDate,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] =
    useState<TimeLeft>(initialTime);

  useEffect(() => {
    const calculateTime = () => {
      const difference =
        new Date(targetDate).getTime() -
        new Date().getTime();

      if (difference <= 0) {
        setTimeLeft(initialTime);
        return;
      }

      setTimeLeft({
        days: Math.floor(
          difference / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      });
    };

    calculateTime();

    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    {
      label: "DAYS",
      value: timeLeft.days,
    },
    {
      label: "HOURS",
      value: timeLeft.hours,
    },
    {
      label: "MINS",
      value: timeLeft.minutes,
    },
    {
      label: "SECS",
      value: timeLeft.seconds,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-5">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="text-center"
        >
          <div className="font-display text-3xl text-[#efff00] sm:text-5xl md:text-6xl lg:text-7xl">
            {String(unit.value).padStart(2, "0")}
          </div>

          <div className="mt-1 text-[9px] tracking-[0.25em] text-white/50 md:text-xs">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
