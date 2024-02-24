"use client";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import DateWeekLayout from "./components/DateWeekLayout";
import TodayDisplay from "./components/TodayDisplay";
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { zhTW } from "date-fns/locale/zh-TW";
import { useEffect, useState } from "react";
import WeekList from "./components/WeekList";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const currentToday = format(currentDate, "d");
  const currentWeek = format(currentDate, "eeee", { locale: zhTW });
  const currentMonth = format(currentDate, "MMMM", { locale: zhTW });
  const currentYear = format(currentDate, "yyyy");
  const dayOfweeks = eachDayOfInterval({
    start: startOfWeek(currentDate),
    end: endOfWeek(currentDate),
  });
  const handleChangeDate = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <Container maxWidth={"lg"} className=" p-0">
      <Box className=" bg-slate-100 w-full h-screen ">
        <DateWeekLayout>
          <TodayDisplay
            currentToday={currentToday}
            currentMonth={currentMonth}
            currentWeek={currentWeek}
            currentYear={currentYear}
          />
        </DateWeekLayout>
        <WeekList
          dayOfweeks={dayOfweeks}
          currentDate={currentDate}
          handleChangeDate={handleChangeDate}
        />
      </Box>
    </Container>
  );
}
