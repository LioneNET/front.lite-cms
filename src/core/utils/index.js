export let bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (!bytes) {
    return '0 Byte'
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}


export const makeID = (length = 16) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const getStrDate = () => {
  let today = new Date();
  let strDate = 'Y_m_d_H_i_s'
    .replace('Y', today.getFullYear())
    .replace('m', today.getMonth() + 1)
    .replace('d', today.getDate())
    .replace('H', today.getHours())
    .replace('i', today.getMinutes())
    .replace('s', today.getSeconds())
  return strDate
}