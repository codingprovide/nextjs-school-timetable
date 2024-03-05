import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Stack, Typography, Box } from "@mui/material";
import { ClassScheduleList } from "../type/type";

export default function ScheduleBlock({
  classScheduleList,
}: {
  classScheduleList: ClassScheduleList[];
}) {
  return (
    <Stack
      className=" w-2/6 border-solid border-0 border-neutral-300 border-r"
      direction={"row"}
      justifyContent={"space-around"}
    >
      <Grid2
        container
        spacing={0}
        gap={2}
        className=" w-2/5 border-solid border-0 border-neutral-300 border-r"
      >
        {classScheduleList.map((data) => (
          <Grid2 key={data.classPeriodNumber} xs={12}>
            <Typography
              variant="body1"
              color="initial"
              className=" h-full text-center flex justify-center items-center text-base"
            >
              {data.classPeriodNumber}
            </Typography>
          </Grid2>
        ))}
      </Grid2>
      <Grid2 container spacing={0} gap={2} className=" w-3/5">
        {classScheduleList.map((data) => (
          <Grid2 key={data.classPeriodNumber} xs={12}>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              className=" h-full"
              spacing={0.5}
            >
              <Typography variant="body1" color="initial" className=" text-xs">
                {data.classTimeStart}
              </Typography>
              <Typography variant="body1" color="initial" className=" text-xs">
                {data.classTimeEnd}
              </Typography>
            </Stack>
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}
