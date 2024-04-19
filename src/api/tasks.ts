import { Task } from "../App";

export interface TasksResponse {
    "count": number,
    "next"?: number,
    "previous"?: number,
    "results": Task[],
}

export const LOCAL_DJANGO_API = 'http://localhost:8000/api/v1';

export async function getTasks(): Promise<TasksResponse> {
    return fetch(`${LOCAL_DJANGO_API}/notes/`).then((res) => res.json());
}

export async function getTask(id: number): Promise<Task> {
    return fetch(`${LOCAL_DJANGO_API}/notes/${id}/`).then((res) => res.json());
}

export async function createTask({title, text}: Partial<Task>): Promise<Task> {
    const taskToCreate = {
        title,
        text,
        user: 1,
        completed: false,
    }
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskToCreate),
    }
    return fetch(`${LOCAL_DJANGO_API}/notes/create`, options).then((res) => res.json());
}