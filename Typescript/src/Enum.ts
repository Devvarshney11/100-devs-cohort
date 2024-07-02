enum Direction {
  up,
  down,
  left,
  right,
}

function Check(keyPressed: Direction): boolean {
  if (keyPressed == Direction.up) return true;
  return false;
}

console.log(Check(Direction.up));
