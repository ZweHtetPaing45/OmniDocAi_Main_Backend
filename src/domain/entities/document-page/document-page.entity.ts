


export class DocumentPage{

   constructor(
            public readonly pageId : number | null,
            public readonly documentId : number | null,
            public readonly document_name : string,
            public readonly pageNumber: number |null,
            public readonly content: string | null,
            public readonly imageUrl: string | null,
            public readonly deleteId : string | null,
            public readonly audio_path : string | null
   ){}

}