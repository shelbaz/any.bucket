import toast from "react-hot-toast";

export function dataUrlToFile(dataUrl: string, filename: string): File | undefined {
  const arr = dataUrl.split(',');
  if (arr.length < 2) { return undefined; }
  const mimeArr = arr[0].match(/:(.*?);/);
  if (!mimeArr || mimeArr.length < 2) { return undefined; }
  const mime = mimeArr[1];
  const buff = Buffer.from(arr[1], 'base64');
  return new File([buff], `${filename}.png`, {type:mime});
}

export const downloadFile = (url: string) => {
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      let tempUrl = URL.createObjectURL(file);
      const aTag = document.createElement("a");
      aTag.href = tempUrl;
      aTag.download = url.replace(/^.*[\\\/]/, "");
      document.body.appendChild(aTag);
      aTag.click();
      URL.revokeObjectURL(tempUrl);
      aTag.remove();
      toast.success("File downloaded!");
    })
    .catch(() => {
      toast.error("Failed to download file!");
    });
};

export const downloadBase64File = (base64: string, fileName: string) => {
  const a = document.createElement("a"); //Create <a>
    a.href = "data:image/png;base64, " + base64; //Image Base64 Goes here
    a.download = fileName; //File name Here
    a.click(); //Downloaded file
    toast.success("Image downloaded!");
};