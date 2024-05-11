export function generateSlug (text: string): string{
    return text
    .normalize("NFD")
    .replace(/[\u0300-\u036fr]/g, "")
    .toLocaleLowerCase()
    .replace(/[^\w]s-]/g, "")
    .replace(/\s+/g, "-")
}