
export interface ResponseLoginDTO {

    user : {
        id: number,
        username: string,
        email: string,
        create_at: Date
    },
    token: string

}