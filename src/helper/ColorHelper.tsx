import { RGBAColor } from "../structures/RGBAColor"

export function toRGBAColor(hex: string): RGBAColor {
    const color = {
        r: parseInt(hex.substr(1, 2), 16),
        g: parseInt(hex.substr(3, 2), 16),
        b: parseInt(hex.substr(5, 2), 16),
        a: parseInt(hex.substr(7, 2), 16) / 255,
    };
    return color;
}

export function toHexColor(color: RGBAColor): string {
    return getRGB(color)
        + to2dHex(Math.floor(color.a * 255))
}

function to2dHex(num: number): string {
    return getAnalog(Math.floor(num / 16)) + getAnalog(num % 16);
}

const hex = [
    '0', '1', '2', '3',
    '4', '5', '6', '7',
    '8', '9', 'A', 'B',
    'C', 'D', 'E', 'F']
function getAnalog(num: number) {
    return hex[num];
}

export function getRGB(color: RGBAColor): string {
    return '#' + to2dHex(color.r)
        + to2dHex(color.g)
        + to2dHex(color.b)
}
