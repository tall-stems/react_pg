import { render, screen, waitFor } from "@testing-library/react";
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

    it("renders without crashing", () => {
        render(<TaskList setCurrentPage={() => {}} />, { wrapper });
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it("displays list of tasks from mock query", async () => {
        // const { result } = renderHook(() => TaskList({ setCurrentPage: () => vi.fn }), { wrapper });
        const result = render(<TaskList setCurrentPage={() => {}} />, { wrapper });
        // screen.debug(baseElement);
        await waitFor(() => screen.findByText(/task list/i));
        expect(await result.findByText(/task list/i)).toBeInTheDocument();
    })

    it("displays both tasks from mock query", async () => {
        const result = render(<TaskList setCurrentPage={() => {}} />, { wrapper });
        await waitFor(() => screen.findByText(/task list/i));
        expect(await result.findAllByRole("checkbox")).toHaveLength(2);
    })
});
