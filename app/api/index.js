import { POST } from './axiosMiddleware'

const queryHandler = async (func) => {
    try {
        const res = await func()
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}

export const loginUserFunction = (data) => queryHandler(POST('login', data))
