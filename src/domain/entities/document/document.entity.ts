

export class DocumentEntity {

    constructor(
        public readonly id : number | null,
        public readonly user_id : number,
        public readonly title : string,
        public readonly file_name : string,
        public readonly file_path : string,
        public readonly total_pages : number
    ){}
    

}