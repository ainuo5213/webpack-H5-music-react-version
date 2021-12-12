export async function get(url, options) {
    try {
        let res = await window.fetch(url, options);
        return await res.json();
    }
    catch (e) {
        throw e;
    }
}