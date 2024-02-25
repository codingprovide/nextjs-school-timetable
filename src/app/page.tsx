"use client";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import DateWeekLayout from "./components/DateWeekLayout";
import TodayDisplay from "./components/TodayDisplay";
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { zhTW } from "date-fns/locale/zh-TW";
import { useEffect, useState } from "react";
import WeekList from "./components/WeekList";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

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

  const classScheduleList = [
    { classPeriod: "第10節", classTime: "18:10-18:55", classPeriodNumber: 10 },
    { classPeriod: "第11節", classTime: "19:10-18:55", classPeriodNumber: 11 },
    { classPeriod: "第12節", classTime: "19:50-20:35", classPeriodNumber: 12 },
    { classPeriod: "第13節", classTime: "20:40-21:25", classPeriodNumber: 13 },
    { classPeriod: "第14節", classTime: "21:30-22:15", classPeriodNumber: 14 },
  ];

  const courseList = [
    { course: "國文", classroom: "國秀樓", classPeriodNumber: 10 },
    { course: "國文", classroom: "國秀樓", classPeriodNumber: 11 },
    { course: "國文", classroom: "國秀樓", classPeriodNumber: 12 },
    { course: "國文", classroom: "國秀樓", classPeriodNumber: 13 },
    { course: "國文", classroom: "國秀樓", classPeriodNumber: 14 },
  ];

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
                <Grid2 xs={12} key={data.classPeriodNumber}>
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
            <Grid2 container spacing={4} gap={2} className="w-3/4 m-0 px-2">
              {courseList.map((data, index) => (
                <Grid2
                  key={index}
                  xs={12}
                  className="  border-red-300 border-l-8 rounded-lg border-solid border-0 bg-red-50"
                >
                  <Stack direction={"column"}>
                    <Stack
                      direction={"row"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {data.course}
                    </Stack>
                    {data.classroom}
                  </Stack>
                </Grid2>
              ))}
            </Grid2>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
