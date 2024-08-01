import { http, HttpResponse } from "msw";

import { LOCAL_DJANGO_API } from "../api/tasks";

export const handlers = [
    // Intercept getTasks request
    http.get(`${LOCAL_DJANGO_API}/notes`, () => {
        // Respond with a JSON object of the tasks
        return HttpResponse.json({
            count: 3,
            results: [
                {
                    id: 1,
                    title: "Task 1 title",
                    text: "Task 1 text",
                    completed: false,
                },
                {
                    id: 2,
                    title: "Task 2 title",
                    text: "Task 2 text",
                    completed: true,
                },
                {
                    id: 3,
                    title: "Task 3 title",
                    text: "Task 3 text",
                    completed: false,
                },
            ],
        });
    }),
];
