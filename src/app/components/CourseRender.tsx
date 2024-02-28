import { Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import SwipeableViews from "react-swipeable-views";
import { CourseRenderArray, CourseRender } from "../type/type";

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
    <SwipeableViews
      className=" w-3/4"
      enableMouseEvents
      index={courseRenderIndex}
      onChangeIndex={handleChangeIndex}
    >
      {courseRender.map((course, courseIndex) => (
        <Grid2
          container
          spacing={4}
          gap={2}
          className="w-full m-0 px-2"
          key={courseIndex}
        >
          {course.map((data, index) => (
            <Grid2
              key={index}
              xs={12}
              className="border-red-300 border-l-8 rounded-lg border-solid border-0 bg-red-50"
            >
              <Stack direction="column">
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {data.course}
                </Stack>
                <Typography variant="body1">{data.classroom}</Typography>
              </Stack>
            </Grid2>
          ))}
        </Grid2>
      ))}
    </SwipeableViews>
  );
}
