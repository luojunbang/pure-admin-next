import { useTranslation } from '@/i18n'
import Login from '../components/login'
import '@testing-library/jest-dom'
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react'

describe('Login', () => {
  it('renders a form', async () => {
    render(<Login />)
    const accountInput = screen.getByLabelText('account')
    expect(accountInput).toBeInTheDocument()

    const passwordInput = screen.getByLabelText('password')
    expect(passwordInput).toBeInTheDocument()
  })

  it('sign in action', async () => {
    render(<Login />)
    const signInButton = screen.getByText(/signIn/)
    expect(signInButton).toBeInTheDocument()

    // 空白提交
    fireEvent.click(signInButton)

    await screen.findAllByText('pleaseEnterAccount')

    // 空白登录报错
    expect(screen.queryByText('pleaseEnterAccount')).toBeInTheDocument()
    expect(screen.queryByText('pleaseEnterPassword')).toBeInTheDocument()

    expect(
      screen.queryByText('account')?.className.includes('text-destructive'),
    ).toBeTruthy()
    expect(
      screen.queryByText('password')?.className.includes('text-destructive'),
    ).toBeTruthy()

    const accountInput: HTMLInputElement = screen.getByLabelText('account')
    const passwordInput: HTMLInputElement = screen.getByLabelText('password')

    // 填入正确内容
    fireEvent.change(accountInput, { target: { value: 'account' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })

    await waitFor(() => {
      expect(screen.queryByText('pleaseEnterAccount')).not.toBeInTheDocument()
      expect(screen.queryByText('pleaseEnterPassword')).not.toBeInTheDocument()
    })

    // 登录
    fireEvent.click(signInButton)
  })
})
