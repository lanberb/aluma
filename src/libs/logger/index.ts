const color = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  default: "\x1b[39m",
  reset: "\x1b[0m",
} as const;

export class Logger {
  private color;
  private text: string;

  constructor() {
    this.text = "";
    this.color = color;
  }

  public log(text: string) {
    this.text = text;

    const keys = Object.keys(this.color) as (keyof typeof this.color)[];

    this.text = keys.reduce((value, key) => {
      const regex = new RegExp(`<${key}>`, "g");
      const text = value.replaceAll(regex, color[key]);

      return text;
    }, this.text);

    console.log(this.text);
  }
}
