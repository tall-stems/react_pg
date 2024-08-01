import { screen } from "@testing-library/react";
import TaskList from "../components/TaskList";
import { renderWithClient } from "./utils";
import { vi } from "vitest";

const mocks = vi.hoisted(() => {
    return {
        default: vi.fn(),
    };
});
// Uncomment this section to mock the response using vi.mock
// Otherwise, the test will use msw to mock the response
// vi.mock("../hooks/query-hooks/useTasksQuery", () => {
//     return mocks;
// });
const successData = {
    status: "success",
    data: {
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
    },
};

describe("Check if TaskList renders and displays tasks", () => {
    beforeEach(() => {
        mocks.default.mockReturnValue(successData);
    });

    afterEach(() => {
        mocks.default.mockReset();
    });

    it("shows loading state before tasks load", () => {
        mocks.default.mockReturnValueOnce({
            status: "pending",
        });
        renderWithClient(<TaskList setCurrentPage={() => {}} />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });


    it("displays list of tasks from mock query", async () => {
        const result = renderWithClient(<TaskList setCurrentPage={() => {}} />);
        expect(await result.findByText(/task list/i)).toBeInTheDocument();
    });

    it("displays all tasks from mock query", async () => {
        const result = renderWithClient(<TaskList setCurrentPage={() => {}} />);
        expect(await result.findAllByRole("checkbox")).toHaveLength(3);
    });

    it("displays task title and text from mock query", async () => {
        const result = renderWithClient(<TaskList setCurrentPage={() => {}} />);
        expect(await result.findByText(/Task 1 title/i)).toBeInTheDocument();
        expect(await result.findByText(/Task 2 title/i)).toBeInTheDocument();
        expect(await result.findByText(/Task 3 title/i)).toBeInTheDocument();
        expect(await result.findByText(/Task 1 text/i)).toBeInTheDocument();
        expect(await result.findByText(/Task 2 text/i)).toBeInTheDocument();
        expect(await result.findByText(/Task 3 text/i)).toBeInTheDocument();
    });
});

describe("React testing class basic tests", () => {
    // Call mock before each test
    beforeEach(() => {
        mocks.default.mockReturnValue(successData);
    });

    afterEach(() => {
        mocks.default.mockReset();
    });

    // Test numbers
    it("total should be 3 items", () => {
        const result = renderWithClient(<TaskList setCurrentPage={() => {}} />);
        const allTasks = result.getAllByTestId(/task-[\d]+$/);
        expect(allTasks.length).toBe(3);
    });

    // Test strings
    it("should display the title of the first task", () => {
        const result = renderWithClient(<TaskList setCurrentPage={() => {}} />);
        expect(result.getByText(/Task 1 title/i)).toBeInTheDocument();
    });

    // Test arrays
    it("should have titles for all 3 tasks", () => {
        const result = renderWithClient(<TaskList setCurrentPage={() => {}} />);
        const allTasks = result.getAllByTestId(/task-[\d]+$/);
        allTasks.forEach((task) => {
            expect(task).toHaveProperty("title");
        });
    });

    it("should match text content from mocked data", () => {
        const result = renderWithClient(<TaskList setCurrentPage={() => {}} />);
        const allTasksText = result.getAllByTestId(/task-[\d]+-text$/).map((task) => task.textContent);
        expect(allTasksText).toEqual(expect.arrayContaining(successData.data.results.map((task) => task.text)));
    });


});