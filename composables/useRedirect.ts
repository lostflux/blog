const isInternalLink = (url: string) => url.startsWith("/")

export default (url: string) => {
  // only modify internal links
  if (isInternalLink(url)) {
    // enforce trailing slash
    if (!url.endsWith("/") && !url.includes("#")) {
      return { path: `${url}/` }
    }
    return { path: url }
  }

  // if external, open in new tab
  // return { url, target: "_blank", rel: "nofollow noopener noreferrer" };
  return url
}
