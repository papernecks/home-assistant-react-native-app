import { PlatformOSType } from "react-native";
import { Fonts } from "react-native-paper/lib/typescript/types";

const fontConfig: {
  [platform in PlatformOSType | "default"]?: Fonts;
} = {
  default: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  },
};

export default fontConfig;
