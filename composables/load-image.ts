
const loadImage = async path => {
  // set the relative path to assets
  const module = await import(/* @vite-ignore */ `${path}`)
  return module.default.replace(/^\/@fs/, '')
}


export default loadImage;
