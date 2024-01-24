import { useTranslation } from '@/i18n'
import Login from '../components/login'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Login', () => {
  it('renders a form', () => {
    render(<Login />)

    // const heading = screen.getByRole('heading', { level: 1 })

    // expect(heading).toBeInTheDocument()

    const en = screen.getByText(/signIn/i)

    expect(en).toBeInTheDocument()
  })
})
