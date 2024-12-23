
export class LocalsMiddleware {

    public static sendResultArray<T>(payload: T[], code: number) {
        return {
            status: code,
            data: payload,
        };
    }

    public static sendResultJson<T>(payload: T, code: number) {
        return {
            status: code,
            data: payload,
        };
    }

    public static sendError<T>(payload: T) {
        return {
            error: payload,
        };
    }
}