export function writeToSS(current, prev) {
  sessionStorage.setItem(JSON.stringify(current), JSON.stringify(prev));
}

export function readFromSS(current) {
  let query = JSON.stringify(current);
  const excludes = ["/cast", "/reviews", "/videos"];
  excludes.forEach((exclude) => {
    query = query.replace(exclude, "");
  });
  const data = sessionStorage.getItem(query);
  const parsedData = JSON.parse(data);
  return parsedData;
}
