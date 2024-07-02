function print(fn: () => void) {
  setTimeout(fn, 1000);
}
print(() => {
  console.log("Hello world");
});
