export interface Topic {
    topic: string;
    messages: string[];
    id: string;
}

export interface ITopicsById {
    [id: string]: Topic;
}

export interface ICredentials {
    hostname: string;
    username: string;
    password: string;
}