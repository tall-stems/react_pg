import { http, HttpResponse } from 'msw'

import { LOCAL_DJANGO_API } from '../api/tasks';

export const handlers = [
    // Intercept getTasks request
    http.get(`${LOCAL_DJANGO_API}/notes`, () => {
        // Respond with a JSON object of the tasks
        return HttpResponse.json({
            count: 2,
            results: [
                {
                    id: 1,
                    title: "Test Task",
                    text: "This is a test task",
                    completed: false,
                },
                {
                    id: 2,
                    title: "Test Task 2",
                    text: "This is a second test task",
                    completed: true,
                },
            ],
        })
    }),
]