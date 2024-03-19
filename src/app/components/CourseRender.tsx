import { Box, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import SwipeableViews from "react-swipeable-views";
import { CourseRenderArray } from "../type/type";
import PlaceIcon from "@mui/icons-material/Place";
import clsx from "clsx";
import { classScheduleList } from "../data/courseDataList";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
export default function CourseRender({
  courseRender,
  courseRenderIndex,
  handleChangeIndex,
}: {
  courseRender: CourseRenderArray;
  courseRenderIndex: number;
  handleChangeIndex: (index: number) => void;
}) {
  return (
    <Grid2 container spacing={4} gap={0.5} className="w-5/6 m-0 relative">
      {Array.from({ length: 10 }).map((_, index) => (
        <Grid2
          key={index}
          xs={12}
          className=" border-solid border-0 border-b-2 border-neutral-100"
        ></Grid2>
      ))}
      <SwipeableViews
        className="w-full absolute top-0"
        enableMouseEvents
        index={courseRenderIndex}
        onChangeIndex={handleChangeIndex}
      >
        {courseRender.map((course, courseIndex) => (
          <Grid2
            container
            spacing={4}
            gap={0.5}
            className="w-full m-0 px-1"
            key={courseIndex}
          >
            {course.map((data, index) => (
              <Grid2
                key={data.classPeriodNumber}
                xs={12}
                className={clsx(
                  ["p-2 border-l-8 rounded-lg border-solid border-0"],
                  [data.backgroundColor],
                  [data.borderColor]
                )}
              >
                <Stack direction="column" spacing={1}>
                  <Stack
                    className="select-none px-2"
                    direction="row"
                    justifyContent="start"
                    alignItems="center"
                  >
                    {data.course}
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography
                      variant="body1"
                      className="select-none"
                      component={"div"}
                    >
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        className="text-xs"
                      >
                        <PlaceIcon className={clsx(data.iconColor)} />
                        {data.location} - {data.classroom}
                      </Stack>
                    </Typography>
                    <Typography variant="body1" component={"div"}>
                      <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        className="text-xs"
                      >
                        <QueryBuilderIcon className={clsx(data.iconColor)} />
                        <Box>
                          {classScheduleList[index].classTimeStart}
                          {"-"}
                          {classScheduleList[index].classTimeEnd}
                        </Box>
                      </Stack>
                    </Typography>
                  </Stack>
                </Stack>
              </Grid2>
            ))}
          </Grid2>
        ))}
      </SwipeableViews>
    </Grid2>
  );
}
