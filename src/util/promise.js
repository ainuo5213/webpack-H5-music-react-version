
export function withWrapPromise() {
    let result;
    let status = "pending";
    return promise => {
        let suspender = promise.then(
            r => {
                status = "success";
                result = r;
            },
            e => {
                status = "error";
                result = e;
            }
        );
        if (status === "pending") {
            // throw err让Suspense捕获，显示fallback
            throw suspender;
        } else if (status === "error") {
            throw result;
        } else if (status === "success") {
            return result;
        }
    }
}