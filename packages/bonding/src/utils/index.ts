export class HexUtils {
  static jsonEncode(params: { [k: string]: string }) {
    return this.stringToHex(JSON.stringify(params));
  }
  static jsonDecode(str: string) {
    try {
      return JSON.parse(this.hexToString(str));
    } catch (e) {
      return null;
    }
  }
  static stringToHex(str: string) {
    let hex = "";
    for (let i = 0; i < str.length; i++) {
      hex += str.charCodeAt(i).toString(16);
    }
    return hex;
  }
  static hexToString(hex: string) {
    let str = "";
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }
}

// export function openTelegramLinkHexJsonParams(
//   tg_url: string,
//   params: { [k: string]: string }
// ) {
//   tgapp?.openTelegramLink(`${tg_url}?startapp=${HexUtils.jsonEncode(params)}`)
//   setTimeout(() => {
//     tgapp?.close()
//   }, 1500)
// }
