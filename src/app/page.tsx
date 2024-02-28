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
  getDay,
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

  const [courseRenderIndex, setCourseRenderIndex] = useState(
    getDay(currentDate)
  );

  //處理當滑動元件左右滑時的index
  const handleChangeIndex = (index: number) => {
    if (index > courseRenderIndex) {
      setCurrentDate(addDays(currentDate, 1));
    } else if (index < courseRenderIndex) {
      setCurrentDate(subDays(currentDate, 1));
    }
  };

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

  /* 初始化課程render 內容 */
  const initialCourseRender = dayOfweeks.map((date) => {
    return courseData[format(date, "E")] || [];
  });

  const [courseRender, setCourseRender] = useState([...initialCourseRender]);
  /**/

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
    setCourseRenderIndex(getDay(currentDate));
    setDayOfWeeks(
      eachDayOfInterval({
        start: startOfWeek(currentDate),
        end: endOfWeek(currentDate),
      })
    );
    // setCourseRender([
    //   courseData[yesterdayOfweekShort],
    //   courseData[currentDayOfWeekShort],
    //   courseData[tomorrowOfWeekShort],
    // ]);
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
