import { act, fireEvent, render, screen } from '@testing-library/react'
import { Password } from '../password'
describe('password', () => {
  it('Toggle the visibility of the password input content.', async () => {
    const { container } = render(<Password />)

    const toggleButton = container.querySelector('div.absolute') as HTMLElement
    const input = container.querySelector('input[type=password]') as HTMLElement
    expect(toggleButton).not.toBeNull()
    expect(input).not.toBeNull()

    await act(() => {
      fireEvent.change(input, { target: { value: 'aaaa' } })
      fireEvent.click(toggleButton)
    })
    expect(container.querySelector('input[type=text]')).toBeInTheDocument()
    screen.getByDisplayValue('aaaa')

    await act(() => {
      fireEvent.click(toggleButton)
    })

    expect(container.querySelector('input[type=text]')).not.toBeInTheDocument()
  })
})
