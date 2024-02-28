"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import DateWeekLayout from "./components/DateWeekLayout";
import TodayDisplay from "./components/TodayDisplay";
import {
  format,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  subDays,
  addDays,
} from "date-fns";
import { zhTW } from "date-fns/locale/zh-TW";
import { useEffect, useState } from "react";
import WeekList from "./components/WeekList";
import { initialCourseData, classScheduleList } from "./data/courseDataList";
import CourseRender from "./components/CourseRender";
import ScheduleBlock from "./components/ScheduleBlock";
export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  interface CourseData {
    [key: string]: {
      course: string;
      classroom: string;
      classPeriodNumber: number;
    }[];
  }
  const [courseData, setcourseData] = useState<CourseData>(initialCourseData);
  const [courseRenderIndex, setCourseRenderIndex] = useState(1);
  const handleChangeIndex = (index: number) => {
    // 當我用滑動元件往右滑時，日期增加一天，反之減少一天
    if (index > courseRenderIndex) {
      setCurrentDate((currentDate) => addDays(currentDate, 1));
    } else if (index < courseRenderIndex) {
      setCurrentDate((currentDate) => subDays(currentDate, 1));
    }
    // setCourseRenderIndex(index);
  };
  // 當我使用滑動元件改變課程內容時，改變課程內容的陣列順序

  const [yesterday, setYesterday] = useState(subDays(currentDate, 1));
  const [yesterdayOfweekShort, setYesterdayOfweekShort] = useState(
    format(yesterday, "E")
  );
  const [tomorrow, setTomorrow] = useState(addDays(currentDate, 1));
  const [tomorrowOfWeekShort, setTomorrowOfWeekShort] = useState(
    format(tomorrow, "E")
  );
  const [currentDayOfWeekShort, setCurrentDayOfWeekShort] = useState(
    format(currentDate, "E")
  );
  const [courseRender, setCourseRender] = useState([
    courseData[yesterdayOfweekShort],
    courseData[currentDayOfWeekShort],
    courseData[tomorrowOfWeekShort],
  ]);

  const [currentToday, setCurretToday] = useState(format(currentDate, "d"));
  const [currentWeek, setCurrentWeek] = useState(
    format(currentDate, "eeee", { locale: zhTW })
  );
  const [currentMonth, setCurrentMonth] = useState(
    format(currentDate, "MMMM", { locale: zhTW })
  );
  const [currentYear, setCurrentYear] = useState(format(currentDate, "yyyy"));
  const [dayOfweeks, setDayOfWeeks] = useState(
    eachDayOfInterval({
      start: startOfWeek(currentDate),
      end: endOfWeek(currentDate),
    })
  );

  dayOfweeks.map((date) => {
    console.log(format(date, "E"));
  });

  useEffect(() => {
    setCurretToday(format(currentDate, "d"));
    setCurrentMonth(format(currentDate, "MMMM", { locale: zhTW }));
    setCurrentYear(format(currentDate, "yyyy"));
    setCurrentWeek(format(currentDate, "eeee", { locale: zhTW }));
    const yesterdayDate = subDays(currentDate, 1);
    const tomorrowDate = addDays(currentDate, 1);
    const yesterdayOfweekShort = format(yesterdayDate, "E");
    const tomorrowOfWeekShort = format(tomorrowDate, "E");
    const currentDayOfWeekShort = format(currentDate, "E");
    setYesterday(yesterdayDate);
    setYesterdayOfweekShort(yesterdayOfweekShort);
    setTomorrow(tomorrowDate);
    setTomorrowOfWeekShort(tomorrowOfWeekShort);
    setCurrentDayOfWeekShort(currentDayOfWeekShort);
    setCourseRenderIndex(1);
    setDayOfWeeks(
      eachDayOfInterval({
        start: startOfWeek(currentDate),
        end: endOfWeek(currentDate),
      })
    );
    setCourseRender([
      courseData[yesterdayOfweekShort],
      courseData[currentDayOfWeekShort],
      courseData[tomorrowOfWeekShort],
    ]);
  }, [courseData, currentDate]);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

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
