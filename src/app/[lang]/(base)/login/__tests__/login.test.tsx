import { useTranslation } from '@/i18n'
import Login from '../components/login'
import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'

import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
  act,
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

    await act(() => {
      // 填入正确内容
      fireEvent.change(accountInput, { target: { value: 'account' } })
      fireEvent.change(passwordInput, { target: { value: 'password' } })
    })

    expect(screen.queryByText('pleaseEnterAccount')).not.toBeInTheDocument()
    expect(screen.queryByText('pleaseEnterPassword')).not.toBeInTheDocument()
    fetchMock.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () => resolve(JSON.stringify({ msg: 'ok', code: '3200' })),
            100,
          ),
        ),
    )

    await act(() => {
      // 登录
      fireEvent.click(screen.getByText(/signIn/))
    })

    expect(screen.queryByText('pleaseEnterAccount')).not.toBeInTheDocument()
    expect(screen.queryByText('pleaseEnterPassword')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).toBeDisabled()

    await screen.findByText('ok')
  })
})
