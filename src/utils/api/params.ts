export function fetchParams(url: string) {
    return new URL(url).href.split("/").pop();
}