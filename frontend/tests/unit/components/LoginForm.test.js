import { render, fireEvent, screen } from '@testing-library/vue'
import LoginForm from '@/features/Login/components/LoginForm.vue'
import loginAuthService from '@/features/Login/services/loginAuthServices'
import { cleanup } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// mocked login service
vi.mock('@/features/Login/services/loginAuthServices', () => ({
    default: {
        login: vi.fn()
    }
}))

beforeEach(() => {
  cleanup() // reset DOM between tests
})

describe('LoginForm.vue', () => {
    it('UT04 - Displays success when no error message appears after valid login', async () => {
      loginAuthService.login.mockResolvedValue({ ok: true }) // mock successful login

    render(LoginForm)

    await fireEvent.update(screen.getByLabelText('Email'), '123@email.com')
    await fireEvent.update(screen.getByLabelText('Password'), 'password')

    await fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(loginAuthService.login).toHaveBeenCalled()

    // Check that no error message is displayed (assuming error is shown with specific text or role)
    const error = screen.queryByText(/Incorrect Username and Password/i)
    expect(error).toBeNull()
    })
})

it('UT05 - Displays error message when credentials are invalid', async () => {
    loginAuthService.login.mockRejectedValue(new Error('Invalid credentials'))

    render(LoginForm)

    await fireEvent.update(screen.getByLabelText('Email'), '123@gmail.com')
    await fireEvent.update(screen.getByLabelText('Password'), 'passwor')

    await fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(loginAuthService.login).toHaveBeenCalled()
    expect(await screen.findByText(/Incorrect Username and Password/i)).toBeTruthy()
})

it('UT06 - Prevents login when either email or password field is empty', async () => {
    const { unmount } = render(LoginForm)

    const loginSpy = vi.spyOn(loginAuthService, 'login')

    // case 1: password is empty
    await fireEvent.update(screen.getByLabelText('Email'), '123@gmail.com')
    const passwordInput = screen.getByLabelText('Password') // empty password field

    await fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(loginSpy).not.toHaveBeenCalled() // login should not be called, if email is empty

    unmount()
    render(LoginForm)

    // case 2: email is empty
    await fireEvent.update(screen.getByLabelText('Password'), 'password')
    const emailInput = screen.getByLabelText('Email') // empty email field 

    await fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(loginSpy).not.toHaveBeenCalled() // login should not be called, if password is empty
})

describe('LoginForm.vue', () => {
    it('UT07 - Blocks SQL injection attempts and displays error message', async () => {
    loginAuthService.login.mockRejectedValue(new Error('Invalid credentials'))

    render(LoginForm)

    await fireEvent.update(screen.getByLabelText('Email'), '123@email.com')  // simulated SQL injection
    await fireEvent.update(screen.getByLabelText('Password'), `' OR '1'='1`)

    await fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(loginAuthService.login).toHaveBeenCalledWith({ // ensure login was attempted with raw input
        email: '123@email.com',
        password: `' OR '1'='1`
    })

    expect(await screen.findByText(/Incorrect Username and Password/i)).toBeTruthy() // expect error
    })
})

