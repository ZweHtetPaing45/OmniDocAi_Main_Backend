


export interface OCRResultDTO{

    pageId: number;
    pageNumber: number;
    confidence : number;
    text: string;
    lines: string[];

}

export interface OCRResponseDTO{

    success: boolean;
    count: number;
    results: OCRResultDTO[];

}