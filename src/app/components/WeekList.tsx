import { Box, Stack, Button, Typography } from "@mui/material";
import clsx from "clsx";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale/zh-TW";
export default function WeekList({
  dayOfweeks,
  currentDate,
}: {
  dayOfweeks: Date[];
  currentDate: Date;
}) {
  return (
    <Box className=" bg-white w-full  rounded-t-[40px]  pt-10">
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
        spacing={1}
        m={2}
      >
        {dayOfweeks.map((date: Date, index: number) => (
          <Button
            key={index}
            variant="contained"
            color={
              date.toLocaleDateString() === currentDate.toLocaleDateString()
                ? "secondary"
                : "primary"
            }
            className={clsx(
              date.toLocaleDateString() === currentDate.toLocaleDateString()
                ? "rounded-xl p-0 min-w-0 px-1 h-[90px] w-[55px] shadow-2xl"
                : " rounded-xl p-0 min-w-0 px-1"
            )}
            size="small"
          >
            <Stack>
              <Typography variant="button">
                {format(date, "eeeee", { locale: zhTW })}
              </Typography>
              <Typography
                variant="button"
                fontSize={
                  date.toLocaleDateString() === currentDate.toLocaleDateString()
                    ? "40px"
                    : "30px"
                }
              >
                {format(date, "d")}
              </Typography>
            </Stack>
          </Button>
        ))}
      </Stack>
    </Box>
  );
}