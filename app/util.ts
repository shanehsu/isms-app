export function RandomString(length: number) : string {
  var str = "";
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var size = charset.length;
  
  for(var i = 0; i < length; i++) {
    str += charset.charAt(Math.floor(Math.random() * size));
  }
  return str;
}