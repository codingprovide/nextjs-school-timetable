"use client";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
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
import { FormEvent, use, useEffect, useState } from "react";
import WeekList from "./components/WeekList";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import SwipeableViews from "react-swipeable-views";
import { initialCourseData, classScheduleList } from "./data/courseDataList";
export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  interface CourseData {
    [key: string]: {
      course: string;
      classroom: string;
      classPeriodNumber: number;
    }[];
  }
  const [courseDate, setCourseDate] = useState<CourseData>(initialCourseData);
  const [courseRenderIndex, setCourseRenderIndex] = useState(1);
  const handleChangeIndex = (index: any) => {
    console.log("Changed to index:", index);
    console.log("courseRenderIndex", courseRenderIndex);
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
  const [courseRender, setCourseRender] = useState([
    courseDate[yesterdayOfweekShort],
    courseDate[currentDayOfWeekShort],
    courseDate[tomorrowOfWeekShort],
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
      courseDate[yesterdayOfweekShort],
      courseDate[currentDayOfWeekShort],
      courseDate[tomorrowOfWeekShort],
    ]);
  }, [courseDate, currentDate]);

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
            <Grid2
              container
              spacing={4}
              gap={2}
              className=" w-1/4 border-0 border-r-2 border-solid border-slate-200 m-0"
            >
              {classScheduleList.map((data) => (
                <Grid2
                  xs={12}
                  key={data.classPeriodNumber}
                  p={0}
                  className=" flex justify-center items-center flex-col"
                >
                  <Typography
                    variant="body1"
                    fontSize={12}
                    gutterBottom
                    textAlign={"center"}
                  >
                    {data.classTime}
                  </Typography>
                  <Typography variant="body1" textAlign={"center"}>
                    {data.classPeriod}
                  </Typography>
                </Grid2>
              ))}
            </Grid2>
            <SwipeableViews
              className=" w-3/4"
              enableMouseEvents
              index={courseRenderIndex}
              onChangeIndex={handleChangeIndex}
            >
              {courseRender.map((course, courseIndex) => (
                <Grid2
                  container
                  spacing={4}
                  gap={2}
                  className="w-full m-0 px-2"
                  key={courseIndex}
                >
                  {course.map((data, index) => (
                    <Grid2
                      key={index}
                      xs={12}
                      className="border-red-300 border-l-8 rounded-lg border-solid border-0 bg-red-50"
                    >
                      <Stack direction="column">
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          {data.course}
                        </Stack>
                        <Typography variant="body1">
                          {data.classroom}
                        </Typography>
                      </Stack>
                    </Grid2>
                  ))}
                </Grid2>
              ))}
            </SwipeableViews>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
