export const getEmojiFromExtension = (extension: string) => {
    switch (extension.toLowerCase()) {
        case "pdf":
        case "doc":
        case "docx":
            return "📄";
        case "xls":
        case "xlsx":
        case "ppt":
        case "pptx":
            return "📊";
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
        case "svg":
            return "🖼️";
        case "mp4":
        case "avi":
        case "mov":
        case "mkv":
            return "🎥";
        case "mp3":
        case "wav":
        case "flac":
            return "🎵";
        default:
            return "📄";
    }
};