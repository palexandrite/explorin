/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * 0d1821 - чёрный, 1
 * a2a4af - серый, 2 
 * f5f5f5 - белый, 3
 * f2ece3 - бежевый, 4
 * f7e3b6 - жёлтый, 5
 * e8c087 - оранжевый, 6
 * 886b57 - коричневый, 7
 * 5e776b - зелёный, 8
 */

const tintColorLight = "#886b57";
const tintColorDark = "#f5f5f5";

export const Colors = {
  light: {
    text: "#0d1821",
    background: "#f2ece3",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    progress: "#e8c087",
  },
  dark: {
    text: "#f5f5f5",
    background: "#886b57",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    progress: "#e8c087",
  },
};
