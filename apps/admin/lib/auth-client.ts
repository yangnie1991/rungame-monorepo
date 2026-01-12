import { createAuthClient } from "better-auth/react"

// 获取基础 URL，优先使用环境变量，回退到当前域名或默认值
function getBaseURL() {
    // 1. 优先使用环境变量
    if (process.env.NEXT_PUBLIC_APP_URL) {
        return process.env.NEXT_PUBLIC_APP_URL
    }
    // 2. 在浏览器中，使用当前域名
    if (typeof window !== 'undefined') {
        return window.location.origin
    }
    // 3. 开发环境默认值
    return 'http://localhost:4000'
}

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
})
