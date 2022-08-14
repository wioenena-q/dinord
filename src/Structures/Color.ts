import { isKeyOf, isNumber, isObject, isString } from '../Utils/Utils.ts';

/**
 * @class
 * @classdesc Handles color
 */
export class Color extends null {
  /**
   * Default colors
   */
  public static readonly DefaultColors = Object.freeze({
    AliceBlue: 0xf0f8ff,
    AntiqueWhite: 0xfaebd7,
    Aqua: 0x00ffff,
    Aquamarine: 0x7fffd4,
    Azure: 0xf0ffff,
    Beige: 0xf5f5dc,
    Bisque: 0xffe4c4,
    Black: 0x000,
    BlanchedAlmond: 0xffebcd,
    Blue: 0x0000ff,
    BlueViolet: 0x8a2be2,
    Brown: 0xa52a2a,
    BurlyWood: 0xdeb887,
    CadetBlue: 0x5f9ea0,
    Chartreuse: 0x7fff00,
    Chocolate: 0xd2691e,
    Coral: 0xff7f50,
    CornflowerBlue: 0x6495ed,
    Cornsilk: 0xfff8dc,
    Crimson: 0xdc143c,
    Cyan: 0x00ffff,
    DarkBlue: 0x00008b,
    DarkCyan: 0x008b8b,
    DarkGoldenRod: 0xb8860b,
    DarkGray: 0xa9a9a9,
    DarkGrey: 0xa9a9a9,
    DarkGreen: 0x006400,
    DarkKhaki: 0xbdb76b,
    DarkMagenta: 0x8b008b,
    DarkOliveGreen: 0x556b2f,
    DarkOrange: 0xff8c00,
    DarkOrchid: 0x9932cc,
    DarkRed: 0x8b0000,
    DarkSalmon: 0xe9967a,
    DarkSeaGreen: 0x8fbc8f,
    DarkSlateBlue: 0x483d8b,
    DarkSlateGray: 0x2f4f4f,
    DarkSlateGrey: 0x2f4f4f,
    DarkTurquoise: 0x00ced1,
    DarkViolet: 0x9400d3,
    DeepPink: 0xff1493,
    DeepSkyBlue: 0x00bfff,
    DimGray: 0x696969,
    DimGrey: 0x696969,
    DodgerBlue: 0x1e90ff,
    FireBrick: 0xb22222,
    FloralWhite: 0xfffaf0,
    ForestGreen: 0x228b22,
    Fuchsia: 0xff00ff,
    Gainsboro: 0xdcdcdc,
    GhostWhite: 0xf8f8ff,
    Gold: 0xffd700,
    GoldenRod: 0xdaa520,
    Gray: 0x808080,
    Grey: 0x808080,
    Green: 0x008000,
    GreenYellow: 0xadff2f,
    HoneyDew: 0xf0fff0,
    HotPink: 0xff69b4,
    IndianRed: 0xcd5c5c,
    Indigo: 0x4b0082,
    Ivory: 0xfffff0,
    Khaki: 0xf0e68c,
    Lavender: 0xe6e6fa,
    LavenderBlush: 0xfff0f5,
    LawnGreen: 0x7cfc00,
    LemonChiffon: 0xfffacd,
    LightBlue: 0xadd8e6,
    LightCoral: 0xf08080,
    LightCyan: 0xe0ffff,
    LightGoldenRodYellow: 0xfafad2,
    LightGray: 0xd3d3d3,
    LightGrey: 0xd3d3d3,
    LightGreen: 0x90ee90,
    LightPink: 0xffb6c1,
    LightSalmon: 0xffa07a,
    LightSeaGreen: 0x20b2aa,
    LightSkyBlue: 0x87cefa,
    LightSlateGray: 0x778899,
    LightSlateGrey: 0x778899,
    LightSteelBlue: 0xb0c4de,
    LightYellow: 0xffffe0,
    Lime: 0x00ff00,
    LimeGreen: 0x32cd32,
    Linen: 0xfaf0e6,
    Magenta: 0xff00ff,
    Maroon: 0x800000,
    MediumAquaMarine: 0x66cdaa,
    MediumBlue: 0x0000cd,
    MediumOrchid: 0xba55d3,
    MediumPurple: 0x9370db,
    MediumSeaGreen: 0x3cb371,
    MediumSlateBlue: 0x7b68ee,
    MediumSpringGreen: 0x00fa9a,
    MediumTurquoise: 0x48d1cc,
    MediumVioletRed: 0xc71585,
    MidnightBlue: 0x191970,
    MintCream: 0xf5fffa,
    MistyRose: 0xffe4e1,
    Moccasin: 0xffe4b5,
    NavajoWhite: 0xffdead,
    Navy: 0x000080,
    OldLace: 0xfdf5e6,
    Olive: 0x808000,
    OliveDrab: 0x6b8e23,
    Orange: 0xffa500,
    OrangeRed: 0xff4500,
    Orchid: 0xda70d6,
    PaleGoldenRod: 0xeee8aa,
    PaleGreen: 0x98fb98,
    PaleTurquoise: 0xafeeee,
    PaleVioletRed: 0xd87093,
    PapayaWhip: 0xffefd5,
    PeachPuff: 0xffdab9,
    Peru: 0xcd853f,
    Pink: 0xffc0cb,
    Plum: 0xdda0dd,
    PowderBlue: 0xb0e0e6,
    Purple: 0x800080,
    Red: 0xff0000,
    RosyBrown: 0xbc8f8f,
    RoyalBlue: 0x4169e1,
    SaddleBrown: 0x8b4513,
    Salmon: 0xfa8072,
    SandyBrown: 0xf4a460,
    SeaGreen: 0x2e8b57,
    SeaShell: 0xfff5ee,
    Sienna: 0xa0522d,
    Silver: 0xc0c0c0,
    SkyBlue: 0x87ceeb,
    SlateBlue: 0x6a5acd,
    SlateGray: 0x708090,
    SlateGrey: 0x708090,
    Snow: 0xfffafa,
    SpringGreen: 0x00ff7f,
    SteelBlue: 0x4682b4,
    Tan: 0xd2b48c,
    Teal: 0x008080,
    Thistle: 0xd8bfd8,
    Tomato: 0xff6347,
    Turquoise: 0x40e0d0,
    Violet: 0xee82ee,
    Wheat: 0xf5deb3,
    White: 0xffffff,
    WhiteSmoke: 0xf5f5f5,
    Yellow: 0xffff00,
    YellowGreen: 0x9acd32
  });

  /**
   *
   * Resolves a color.
   * @param color The color to resolve
   */
  public static resolve(color: DefaultColors): number;
  public static resolve(color: HexColor): number;
  public static resolve(color: RGBColor): number;
  public static resolve(color: ColorResolvable): number;
  public static resolve(color: unknown): number {
    if (isNumber(color)) return color;
    else if (isString(color)) {
      // If hex string, return hex color
      if (hexRegex.test(color)) {
        color = color.slice(1);
        if (color === '000') color = color.padEnd(6, '0');
        else if (color === 'FFF' || color === 'fff') color = color.padEnd(6, 'F');
        return parseInt(color as string, 16);
      } else if (isKeyOf(this.DefaultColors, color)) {
        // If color is in DefaultColors, return its color
        return this.DefaultColors[color];
      } else throw new Error('Unknown color: ' + color);
    } else if (isObject<RGBColor>(color) && isKeyOf(color, 'r') && isKeyOf(color, 'g') && isKeyOf(color, 'b')) {
      // If color is rgb object, return rgb color
      if (!isValidRGB(color)) throw new Error('Invalid rgb color: ' + color);
      const { r, g, b } = color;
      return (r << 16) + (g << 8) + b;
    } else throw new TypeError(`${color} is not a valid color.`);
  }

  /**
   *
   * Return a random color.
   */
  public static random() {
    return Math.floor(Math.random() * 0xffffff);
  }

  /**
   * Convert resolvable color or number value to hex string.
   * @param color - The color to convert to hex.
   */
  public static toHex(color: DefaultColors): string;
  public static toHex(color: RGBColor): string;
  public static toHex(color: number): string;
  public static toHex(color: unknown): string {
    const resolved = isNumber(color) ? color : this.resolve(color as ColorResolvable);
    return '#' + resolved.toString(16).padStart(6, '0');
  }

  /**
   * Convert resolvable color or number value to rgb object.
   * @param color - The color to convert to rgb.
   */
  public static toRGB(color: DefaultColors): RGBColor;
  public static toRGB(color: HexColor): RGBColor;
  public static toRGB(color: number): RGBColor;
  public static toRGB(color: unknown): RGBColor {
    const resolved = isNumber(color) ? color : this.resolve(color as ColorResolvable);
    return {
      r: (resolved >> 16) & 0xff,
      g: (resolved >> 8) & 0xff,
      b: resolved & 0xff
    };
  }
}

const hexRegex = /^#(?:[0-9a-f]{3}){1,2}$/i;

export type ColorResolvable = HexColor | RGBColor | DefaultColors | number;
export type HexColor = `#${string}`;
export type RGBColor = { r: number; g: number; b: number };
export type DefaultColors = keyof typeof Color.DefaultColors;

const isValidRGB = (rgb: RGBColor) => {
  const { r, g, b } = rgb;
  return (
    isNumber(r) && isNumber(g) && isNumber(b) && r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255
  );
};
