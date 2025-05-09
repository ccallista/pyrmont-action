import { render, fireEvent, screen } from '@testing-library/vue'
import JoinUsForm from '@/features/JoinUs/components/JoinUsForm.vue'
import joinUsService from '@/features/JoinUs/services/joinUsAuthService'
import { cleanup } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/features/JoinUs/services/joinUsAuthService', () => ({ // mocked dependency (fake input or sample data to test functions) 
    default: {
        joinus: vi.fn()
    }
}))

describe('JoinUsForm.vue', () => {
    beforeEach(() => cleanup())

    it('UT01 - Creates a new user and adds a new entry to the database', async () => {
        joinUsService.joinus.mockResolvedValue({ ok: true }) 

        render(JoinUsForm) // isolated test environment to test modularity of functions

        // simulating user input
        await fireEvent.update(screen.getByPlaceholderText('Email address'), 'UNIT_TEST@gmail.com')
        await fireEvent.update(screen.getByPlaceholderText('Password'), 'password')
        await fireEvent.update(screen.getByPlaceholderText('First Name'), 'UNIT')
        await fireEvent.update(screen.getByPlaceholderText('Last Name'), 'TEST')
        await fireEvent.update(screen.getByPlaceholderText('Mobile Phone'), '0411111111')
        await fireEvent.update(screen.getByPlaceholderText('Area of Interest'), '123')
        await fireEvent.update(screen.getByPlaceholderText('Street Name'), '123 Testing Street')
        await fireEvent.update(screen.getByPlaceholderText('City'), 'Pyrmont')
        await fireEvent.update(screen.getByPlaceholderText('Postcode'), '2009')

        await fireEvent.change(screen.getByDisplayValue('State'), { target: { value: 'NSW' } }) // not a field, but a dropdown

        await fireEvent.click(screen.getByRole('button', { name: /sign up/i })) // simulates clicking sign up

        expect(joinUsService.joinus).toHaveBeenCalled() 
    })

    it('UT02 - Prevents creating a duplicate user with the same form input', async () => {
        joinUsService.joinus.mockClear() // reset the counter, as it was called in UT01 

        joinUsService.joinus.mockResolvedValueOnce({ ok: true })
        joinUsService.joinus.mockRejectedValueOnce(new Error('User already exists'))
    
        const { unmount } = render(JoinUsForm)
    
        const fillForm = async () => {
            await fireEvent.update(screen.getByPlaceholderText('Email address'), 'duplicate@gmail.com')
            await fireEvent.update(screen.getByPlaceholderText('Password'), 'password')
            await fireEvent.update(screen.getByPlaceholderText('First Name'), 'John')
            await fireEvent.update(screen.getByPlaceholderText('Last Name'), 'Doe')
            await fireEvent.update(screen.getByPlaceholderText('Mobile Phone'), '0411111111')
            await fireEvent.update(screen.getByPlaceholderText('Area of Interest'), 'Design')
            await fireEvent.update(screen.getByPlaceholderText('Street Name'), '123 Sample Street')
            await fireEvent.update(screen.getByPlaceholderText('City'), 'Sydney')
            await fireEvent.update(screen.getByPlaceholderText('Postcode'), '2000')
            await fireEvent.update(screen.getByDisplayValue('State'), 'NSW')
        }
    
        await fillForm()
        await fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
    
        // clear the form inputs before attempting to call fillForm again 
        unmount()
        render(JoinUsForm)
        await fillForm()
        await fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
    
        expect(joinUsService.joinus).toHaveBeenCalledTimes(2) 
    })

    it('UT03 - Display error fields if users attempt to create a user with incorrect or incomplete fields', async () => {
        joinUsService.joinus.mockClear() // reset the mock
    
        render(JoinUsForm)
    
        // Either incomplete or empty fields 
        await fireEvent.update(screen.getByPlaceholderText('Email address'), 'invalid-email') // invalid email format
        await fireEvent.update(screen.getByPlaceholderText('Password'), '') // missing
        await fireEvent.update(screen.getByPlaceholderText('First Name'), '') // missing
        await fireEvent.update(screen.getByPlaceholderText('Last Name'), '') // missing
        await fireEvent.update(screen.getByPlaceholderText('Mobile Phone'), 'abc123') // invalid pattern
        await fireEvent.update(screen.getByPlaceholderText('Postcode'), '') // missing
    
        await fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

        // expect that the joinus service was NOT called because form validation should prevent it
        expect(joinUsService.joinus).not.toHaveBeenCalled()
    })
})
