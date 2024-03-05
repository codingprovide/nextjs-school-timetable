import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Stack, Typography, Box } from "@mui/material";
import { ClassScheduleList } from "../type/type";

export default function ScheduleBlock({
  classScheduleList,
}: {
  classScheduleList: ClassScheduleList[];
}) {
  return (
    <Grid2
      container
      spacing={4}
      gap={2}
      className=" w-2/6 border-0 border-r-2 border-solid border-neutral-200 m-0  px-0"
    >
      {classScheduleList.map((data) => (
        <Grid2 xs={12} key={data.classPeriodNumber} className=" p-0 mx-1 my-0">
          <Stack
            direction={"row"}
            spacing={1}
            justifyContent={"space-around"}
            alignItems={"center"}
            className=" h-full"
          >
            <Typography
              variant="body1"
              textAlign={"center"}
              className=" text-xs"
            >
              {data.classPeriod}
            </Typography>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                variant="body1"
                gutterBottom
                textAlign={"center"}
                className=" m-0 p-0 leading-none text-xs"
              >
                {data.classTimeStart}
              </Typography>
              <span>|</span>
              <Typography
                variant="body1"
                gutterBottom
                textAlign={"center"}
                className=" m-0 p-0 leading-none text-xs"
              >
                {data.classTimeEnd}
              </Typography>
            </Stack>
          </Stack>
        </Grid2>
      ))}
    </Grid2>
  );
}
