import { Box, Stack, Button, Typography } from "@mui/material";
import clsx from "clsx";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale/zh-TW";
export default function WeekList({
  dayOfweeks,
  currentDate,
  handleChangeDate,
}: {
  dayOfweeks: Date[];
  currentDate: Date;
  handleChangeDate: (date: Date) => void;
}) {
  return (
    <Box className=" bg-white w-full  rounded-t-[40px] pt-3">
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
        m={1}
        spacing={1}
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
            className={clsx(" rounded-xl min-w-0")}
            size="small"
            onClick={() => handleChangeDate(date)}
          >
            <Stack>
              <Typography variant="button">
                {format(date, "eeeee", { locale: zhTW })}
              </Typography>
              <Typography
                variant="button"
                fontSize={
                  date.toLocaleDateString() === currentDate.toLocaleDateString()
                    ? "30px"
                    : "20px"
                }
              >
                {format(date, "dd")}
              </Typography>
            </Stack>
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
