export interface IDownload {
    downloadId: number;
    externalId: string;

    downloadStatus: DownloadStatus;
    size: number;
    downloaded: number;
    
    files: File[];

    image: string;
}

export enum DownloadStatus {
    None,
    Pending,
    Downloading,
    Downloaded,
    Uploading,
    Done
}