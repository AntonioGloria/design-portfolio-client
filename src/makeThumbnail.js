function makeThumbnail(url) {
  const urlParts = url.split("/");
  const transforms = "ar_1.0,c_fill,w_200";
  const first = urlParts.slice(0, 6).join("/");
  const second = urlParts.slice(6).join("/")
  return `${first}/${transforms}/${second}`;
}

export default makeThumbnail;