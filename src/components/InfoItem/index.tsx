import { Stack, SxProps, Theme, Typography } from "@mui/material";

type InfoItemProps = {
  title: string;
  value: string | number;
  size?: "medium" | "small";
  sx?: SxProps<Theme>;
};

export default function InfoItem({
  title,
  value,
  size = "medium",
  sx,
}: InfoItemProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ justifyContent: "space-between", ...sx }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: size === "small" ? "0.8125rem" : "1rem",
          lineHeight: size === "small" ? "0.975rem" : "1.2rem",
          color: (theme) =>
            size === "small"
              ? theme.palette.lorem.gray[500]
              : theme.palette.lorem.gray[800],
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 700,
          fontSize: size === "small" ? "0.8125rem" : "1rem",
          lineHeight: size === "small" ? "0.975rem" : "1.2rem",
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
