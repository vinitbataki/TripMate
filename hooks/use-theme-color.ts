import Colors from "@/constants/colors";

export function useThemeColor(
  props: {
    light?: string;
    dark?: string;
  },
  colorName: keyof typeof Colors
) {
  const colorFromProps = props.light || props.dark;

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[colorName];
}