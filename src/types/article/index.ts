export interface ArticleJSON {
    "id": number | string;
    "timestamp": number;
    "title": string;
    "description": string;
    "content": string;
    "bannerImg": string;
    "author": {
        "username": string;
        "avatarURL": string;
    },
    "parts": {
        "title": string;
        "img": {
            "url": string;
            "alt": string;
            "position": "left" | "right";
        },
        "content": string;
        "url"?: string;
        "id"?: number;
    }[]
}