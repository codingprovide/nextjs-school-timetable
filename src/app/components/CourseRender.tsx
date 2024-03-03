import { Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import SwipeableViews from "react-swipeable-views";
import { CourseRenderArray, CourseRenderData } from "../type/type";
import PlaceIcon from "@mui/icons-material/Place";
import clsx from "clsx";

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
    <Grid2 container spacing={4} gap={0.5} className="w-3/4 m-0 relative">
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
                  <Typography
                    variant="body1"
                    className="select-none"
                    component={"div"}
                  >
                    <Stack
                      direction="row"
                      justifyContent="start"
                      alignItems="center"
                      className="text-sm"
                    >
                      <PlaceIcon className={clsx(data.iconColor)} />
                      {data.location} - {data.classroom}
                    </Stack>
                  </Typography>
                </Stack>
              </Grid2>
            ))}
          </Grid2>
        ))}
      </SwipeableViews>
    </Grid2>
  );
}
