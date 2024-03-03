/* eslint-disable react-hooks/exhaustive-deps */
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
import { CourseColors, CourseData, CourseRenderArray } from "./type/type";

const useFormattedDate = (date: Date) => {
  return {
    day: format(date, "d"),
    month: format(date, "MMMM", { locale: zhTW }),
    year: format(date, "yyyy"),
    week: format(date, "eeee", { locale: zhTW }),
    shortOfWeek: format(date, "E"),
  };
};

const assignColorsToCourse = (
  newCourseData: CourseRenderArray,
  courseColors: CourseColors[]
) => {
  let currentCourseValue: string | undefined;
  let colorsIndex = 0;
  newCourseData.forEach((course: any[]) => {
    course.forEach((courseData, index) => {
      if (index === 0) {
        currentCourseValue = courseData.course;
        colorsIndex = 0;
      }
      if (currentCourseValue === courseData.course) {
        Object.assign(courseData, courseColors[colorsIndex]);
      } else {
        currentCourseValue = courseData.course;
        colorsIndex = (colorsIndex + 1) % courseColors.length;
        Object.assign(courseData, courseColors[colorsIndex]);
      }
    });
  });

  return newCourseData;
};

const courseColors = [
  {
    borderColor: "border-blue-300",
    backgroundColor: "bg-blue-50",
    iconColor: "text-blue-300",
  },
  {
    borderColor: "border-emerald-300",
    backgroundColor: "bg-emerald-50",
    iconColor: "text-emerald-300",
  },
];

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

  const newCourseData = JSON.parse(JSON.stringify(initialCourseRender));

  const [courseRender, setCourseRender] = useState(
    assignColorsToCourse(newCourseData, courseColors)
  );

  useEffect(() => {
    setCourseRenderIndex(getDay(currentDate));
    setFormattedDate(useFormattedDate(currentDate));
  }, [currentDate]);

  const handleChangeDate = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <Container maxWidth={"lg"} className=" p-0 bg-gray-100">
      <Box className=" w-full h-screen ">
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
        <Box className=" bg-white w-full pt-3">
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
