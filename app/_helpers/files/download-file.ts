import toast from "react-hot-toast";

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