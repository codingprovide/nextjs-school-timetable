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
      className=" px-4 py-2 mb-2"
    >
      {children}
    </Stack>
  );
}
