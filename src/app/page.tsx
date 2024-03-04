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
  getWeek,
  subDays,
} from "date-fns";
import { zhTW } from "date-fns/locale/zh-TW";
import { useEffect, useState } from "react";
import WeekList from "./components/WeekList";
import { initialCourseData, classScheduleList } from "./data/courseDataList";
import CourseRender from "./components/CourseRender";
import ScheduleBlock from "./components/ScheduleBlock";
import {
  CourseColors,
  CourseData,
  CourseRenderArray,
  CourseRenderData,
} from "./type/type";

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
  newCourseData.forEach((course: CourseRenderData[]) => {
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

const handleEvenWeekCourse = (
  courses: CourseRenderArray,
  currentDate: Date
) => {
  const weekNumber = getWeek(currentDate);
  const courseName = weekNumber % 2 === 0 ? "國文" : "英文聽講";
  courses[1].forEach((course: CourseRenderData) => {
    course.course = courseName;
  });
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

  const handleCourseData = (
    currentDate: Date,
    courseColors: CourseColors[]
  ) => {
    const newCourseData = JSON.parse(JSON.stringify(initialCourseRender));
    handleEvenWeekCourse(newCourseData, currentDate);
    assignColorsToCourse(newCourseData, courseColors);

    return newCourseData;
  };

  const [courseRender, setCourseRender] = useState(
    handleCourseData(currentDate, courseColors)
  );

  useEffect(() => {
    setCourseRenderIndex(getDay(currentDate));
    setFormattedDate(useFormattedDate(currentDate));
    setCourseRender(handleCourseData(currentDate, courseColors));
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
