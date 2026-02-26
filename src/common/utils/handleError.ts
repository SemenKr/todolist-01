import type {BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue} from '@reduxjs/toolkit/query';

export const handleError = (
    api: BaseQueryApi,
    result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
    setError: (error: string) => any
) => {
    let error = "Some error occurred"

    if (result.error) {
        error = JSON.stringify(result.error)
        api.dispatch(setError(error))
    }
}
