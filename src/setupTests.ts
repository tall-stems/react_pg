import * as matchers from '@testing-library/jest-dom/matchers'
import {cleanup} from '@testing-library/react'
import {afterEach, expect} from 'vitest'
import {server} from './mocks/node'

expect.extend(matchers)

beforeAll(() => {
    server.listen()
})

afterEach(() => {
    cleanup();
    server.resetHandlers();
});

afterAll(() => {
    server.close()
})
