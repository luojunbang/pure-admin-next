// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'), // use actual for all non-hook parts
  useParams: () => ({ lang: 'zh' }),
}))

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}))

import jestFetch from 'jest-fetch-mock'
jestFetch.enableMocks()
