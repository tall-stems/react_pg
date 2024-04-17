import { render, screen } from "@testing-library/react";
import TaskList from "./TaskList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";

interface WrapperProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();
const wrapper = ({ children }: WrapperProps) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

vi.mock("getTasks")

describe("Check if TaskList renders and displays tasks", () => {
    // const tasks = {
    //     count: 1,
    //     results: [
    //         {
    //             id: 1,
    //             title: "Test Task",
    //             text: "This is a test task",
    //             completed: false,
    //         },
    //         {
    //             id: 2,
    //             title: "Test Task 2",
    //             text: "This is a second test task",
    //             completed: true,
    //         },
    //     ],
    // };

    it("renders without crashing", () => {
        render(<TaskList setCurrentPage={() => {}} />, { wrapper });
        screen.debug();
    });

    it("displays list of tasks from mock query", () => {
        render(<TaskList setCurrentPage={() => {}} />, { wrapper });
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    })
});
