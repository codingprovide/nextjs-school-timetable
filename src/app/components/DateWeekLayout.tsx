import { Stack } from "@mui/material";

export default function DateWeekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems={"center"}
      direction={"row"}
      className=" mx-4 mb-3 "
    >
      {children}
    </Stack>
  );
}
