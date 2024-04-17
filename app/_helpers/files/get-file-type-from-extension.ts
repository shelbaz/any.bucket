export const getFileTypeFromExtension = (extension: string) => {
    switch (extension) {
      case "pdf":
      case "doc":
      case "docx":
        return "document";
      case "xls":
      case "xlsx":
      case "ppt":
      case "pptx":
        return "spreadsheet";
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "svg":
        return "image";
      case "mp4":
      case "avi":
      case "mov":
      case "mkv":
        return "video";
      case "mp3":
      case "wav":
      case "flac":
        return "audio";
      default:
        return "file";
    }
  };