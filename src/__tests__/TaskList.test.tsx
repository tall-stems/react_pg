import { screen, waitFor } from "@testing-library/react";
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
vi.mock("../hooks/query-hooks/useTasksQuery", () => {
    return mocks;
});
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
    it("shows loading state before tasks load", () => {
        mocks.default.mockReturnValue({
            status: "pending",
        });
        renderWithClient(<TaskList setCurrentPage={() => {}} />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });


    it("displays list of tasks from mock query", async () => {
        mocks.default.mockReturnValue(successData);
        const result = renderWithClient(<TaskList setCurrentPage={() => {}} />);
        await waitFor(() => screen.findByText(/task list/i));
        expect(await result.findByText(/task list/i)).toBeInTheDocument();
    });

    it("displays all tasks from mock query", async () => {
        mocks.default.mockReturnValue(successData);
        const result = renderWithClient(<TaskList setCurrentPage={() => {}} />);
        await waitFor(() => screen.findByText(/task list/i));
        expect(await result.findAllByRole("checkbox")).toHaveLength(3);
    });

    it("displays task title and text from mock query", async () => {
        mocks.default.mockReturnValue(successData);
        const result = renderWithClient(<TaskList setCurrentPage={() => {}} />);
        await waitFor(() => screen.findByText(/task list/i));
        screen.debug(screen.getByText(/task list/i));
        expect(await result.findByText(/Task 1 title/i)).toBeInTheDocument();
        expect(await result.findByText(/Task 2 title/i)).toBeInTheDocument();
        expect(await result.findByText(/Task 3 title/i)).toBeInTheDocument();
        expect(await result.findByText(/Task 1 text/i)).toBeInTheDocument();
        expect(await result.findByText(/Task 2 text/i)).toBeInTheDocument();
        expect(await result.findByText(/Task 3 text/i)).toBeInTheDocument();
    });
});
