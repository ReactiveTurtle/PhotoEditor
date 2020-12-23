export enum ExportFormat {
    JPEG, PNG
}

export function formatToString(format: ExportFormat): string {
    switch (format) {
        case ExportFormat.JPEG:
            return "jpeg";
        case ExportFormat.PNG:
            return "png";
        default:
            return "unknown";
    }
}
