import { Patterns } from '@/common'

export function complexity(password: string) {
    return Patterns.Password.test(password)
}

export function complexityUser(username: string) {
    return Patterns.Username.test(username)
}
