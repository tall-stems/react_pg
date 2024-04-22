import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { vi } from "vitest";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export function renderWithClient(ui: React.ReactElement) {
    const { rerender, ...result } = render(
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <QueryClientProvider client={queryClient}>
                    {rerenderUi}
                </QueryClientProvider>
            ),
    };
}

export function executMockAfterDelay(func: typeof vi.mock, ms: number) {
    setTimeout(func, ms);
}

export function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
