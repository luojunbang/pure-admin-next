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
  it('Renders a form', async () => {
    render(<Login />)
    const accountInput = screen.getByLabelText('account')
    expect(accountInput).toBeInTheDocument()

    const passwordInput = screen.getByLabelText('password')
    expect(passwordInput).toBeInTheDocument()
  })

  it('If the account input or password input is invalid, provide a tip.', async () => {
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

    await act(() => {
      // 填入正确内容
      fireEvent.change(accountInput, { target: { value: 'a'.repeat(33) } })
    })
    expect(screen.queryByText('account_invalid')).toBeInTheDocument()
  })
  it('Sign in fail.', async () => {
    render(<Login />)
    fetchMock.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(JSON.stringify(failData)), 1000),
        ),
    )

    await act(() => {
      // 填入正确内容
      const accountInput = screen.getByLabelText('account')
      const passwordInput = screen.getByLabelText('password')

      fireEvent.change(accountInput, { target: { value: '1' } })
      fireEvent.change(passwordInput, { target: { value: '1' } })
    })
    await act(() => {
      // 登录
      fireEvent.click(screen.getByText(/signIn/))
    })

    expect(screen.queryByRole('button')).toBeDisabled()

    await screen.findByText('Account or password is not right.')
  })
  it('Sign in success.', async () => {
    render(<Login />)
    fetchMock.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(JSON.stringify(successData)), 1000),
        ),
    )
    await act(() => {
      // 填入正确内容
      const accountInput = screen.getByLabelText('account')
      const passwordInput = screen.getByLabelText('password')

      fireEvent.change(accountInput, { target: { value: 'account' } })
      fireEvent.change(passwordInput, { target: { value: 'password' } })
    })
    await act(() => {
      // 登录
      fireEvent.click(screen.getByText(/signIn/))
    })
    expect(screen.queryByRole('button')).toBeDisabled()

    await screen.findByText('signInSuccess')

    expect(
      screen.queryByText('Account or password is not right.'),
    ).not.toBeInTheDocument()
  })
})

const failData = {
  code: '500',
  msg: 'Account or password is not right.',
  data: {},
}

const successData = {
  code: '200',
  msg: '',
  data: {
    id: '65b74f970368404567739e30',
    account: 'admin',
    username: 'admin',
    updateDate: '2024-01-29T07:11:18.544Z',
    createDate: '2024-01-29T07:11:19.284Z',
    roleIds: [],
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1Yjc0Zjk3MDM2ODQwNDU2NzczOWUzMCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MDY1MTMxNDAsImlzcyI6InB1cmUtYWRtaW4ifQ.SEmx-hykhs1XOEDBd7DeOSKYzxFq1lY7Fmw-asN3oPY',
  },
}
