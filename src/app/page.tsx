/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Box, Container, Stack } from "@mui/material";
import DateWeekLayout from "./components/DateWeekLayout";
import TodayDisplay from "./components/TodayDisplay";
import {
  format,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addDays,
  getDay,
} from "date-fns";
import { zhTW } from "date-fns/locale/zh-TW";
import { useEffect, useState } from "react";
import WeekList from "./components/WeekList";
import { initialCourseData, classScheduleList } from "./data/courseDataList";
import CourseRender from "./components/CourseRender";
import ScheduleBlock from "./components/ScheduleBlock";
import { CourseData } from "./type/type";

const useFormattedDate = (date: Date) => {
  return {
    day: format(date, "d"),
    month: format(date, "MMMM", { locale: zhTW }),
    year: format(date, "yyyy"),
    week: format(date, "eeee", { locale: zhTW }),
    shortOfWeek: format(date, "E"),
  };
};

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [courseData, setcourseData] = useState<CourseData>(initialCourseData);

  const [formattedDate, setFormattedDate] = useState(
    useFormattedDate(currentDate)
  );

  const [courseRenderIndex, setCourseRenderIndex] = useState(
    getDay(currentDate)
  );

  const [dayOfweeks, setDayOfWeeks] = useState(
    eachDayOfInterval({
      start: startOfWeek(currentDate),
      end: endOfWeek(currentDate),
    })
  );
  //處理當滑動元件左右滑時的index
  const handleChangeIndex = (index: number) => {
    const direction = index > courseRenderIndex ? 1 : -1;
    setCurrentDate(addDays(currentDate, direction));
  };

  const initialCourseRender = dayOfweeks.map((date) => {
    return courseData[format(date, "E")] || [];
  });

  const [courseRender, setCourseRender] = useState([...initialCourseRender]);

  useEffect(() => {
    setCourseRenderIndex(getDay(currentDate));
    setFormattedDate(useFormattedDate(currentDate));
  }, [currentDate]);

  const handleChangeDate = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <Container maxWidth={"lg"} className=" p-0">
      <Box className=" bg-slate-100 w-full h-screen ">
        <DateWeekLayout>
          <TodayDisplay
            currentToday={formattedDate.day}
            currentMonth={formattedDate.month}
            currentWeek={formattedDate.week}
            currentYear={formattedDate.year}
          />
        </DateWeekLayout>
        <WeekList
          dayOfweeks={dayOfweeks}
          currentDate={currentDate}
          handleChangeDate={handleChangeDate}
        />
        <Box className=" bg-white w-full">
          <Stack direction={"row"}>
            <ScheduleBlock classScheduleList={classScheduleList} />
            <CourseRender
              courseRender={courseRender}
              courseRenderIndex={courseRenderIndex}
              handleChangeIndex={handleChangeIndex}
            />
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
