import { SvgIcon, SvgIconProps } from "@mui/material";

export default function MoreVert(props: SvgIconProps) {
  const { fill, height, width, ...otherProps } = props;

  return (
    <SvgIcon {...otherProps} viewBox="0 0 24 24" style={{ width, height }}>
      <circle cx="12" cy="6" r="1.5" fill={fill || "#343330"} />
      <circle cx="12" cy="12" r="1.5" fill={fill || "#343330"} />
      <circle cx="12" cy="18" r="1.5" fill={fill || "#343330"} />
    </SvgIcon>
  );
}
