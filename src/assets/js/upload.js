import Compressor from "@/assets/js/rely/compressor.js";
//压缩处理,旋转图片
//file 图片对象，callback回调函数
export function Compress(file, callback) {
  new Compressor(file, {
    quality: 0.6,
    maxWidth: 1000,
    maxHeight: 1000,
    checkOrientation: true, //开启图片方位定向
    success(result) {
      var reader = new FileReader();
      reader.readAsDataURL(result);
      reader.onload = function (e) {
        let dataurl = e.target.result;
        let filename = "initpicture.jpeg";
        //base64转file
        function dataURLtoFile(dataurl, filename) {
          var arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, { type: mime });
        }
        //获取file
        const file = dataURLtoFile(dataurl, filename);
        callback({ file, dataurl });
      };
    },
    error(err) {
      console.log(err.message);
    },
  });
}
