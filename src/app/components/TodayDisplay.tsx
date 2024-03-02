import { Stack, Box, Button } from "@mui/material";

import TodayButton from "./TodayButton";
export default function TodayDisplay({
  currentToday,
  currentWeek,
  currentMonth,
  currentYear,
}: {
  currentToday: string;
  currentWeek: string;
  currentMonth: string;
  currentYear: string;
}) {
  return (
    <>
      <Stack direction={"row"} spacing={2}>
        <Stack
          className=" text-4xl"
          justifyContent={"center"}
          alignItems={"center"}
        >
          {currentToday}
        </Stack>
        <Stack
          justifyContent={"center"}
          alignItems={"start"}
          direction={"column"}
          className=" text-xs"
        >
          <Box>{currentWeek}</Box>
          <Stack spacing={1} direction={"row"}>
            <Box>{currentMonth}</Box>
            <Box>{currentYear}</Box>
          </Stack>
        </Stack>
      </Stack>
      <TodayButton />
    </>
  );
}
