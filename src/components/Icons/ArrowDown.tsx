import { SvgIcon, SvgIconProps } from "@mui/material";

export default function ArrowDown(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M23.8411 6.52024C23.8411 6.2842 23.751 6.04816 23.5711 5.86823C23.2112 5.50811 22.6272 5.50811 22.2673 5.86823L11.9864 16.1489L1.70574 5.86823C1.34562 5.50811 0.761847 5.50811 0.401728 5.86823C0.041872 6.22835 0.041872 6.81213 0.401728 7.17225L11.3344 18.1049C11.6942 18.465 12.2783 18.465 12.6381 18.1049L23.5708 7.17225C23.751 6.99232 23.8411 6.75628 23.8411 6.52024Z"
          fill="#424242"
        />
      </svg>
    </SvgIcon>
  );
}
