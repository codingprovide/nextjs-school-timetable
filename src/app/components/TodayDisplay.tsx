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
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"48px"}
        >
          {currentToday}
        </Stack>
        <Stack
          justifyContent={"center"}
          alignItems={"start"}
          fontSize={"12px"}
          direction={"column"}
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
