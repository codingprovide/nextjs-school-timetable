import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";

interface ClassScheduleList {
  classPeriod: string;
  classTime: string;
  classPeriodNumber: number;
}

type ClassScheduleListArray = ClassScheduleList[];

export default function ScheduleBlock({
  classScheduleList,
}: {
  classScheduleList: ClassScheduleListArray;
}) {
  return (
    <Grid2
      container
      spacing={4}
      gap={2}
      className=" w-1/4 border-0 border-r-2 border-solid border-neutral-200 m-0"
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
  );
}
