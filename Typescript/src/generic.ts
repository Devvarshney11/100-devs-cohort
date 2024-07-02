function getValue<T>(arg: T[]): T {
  return arg[0];
}

const el1 = getValue<string>(["Dev", "Varshney"]);
