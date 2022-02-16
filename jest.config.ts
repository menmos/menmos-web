import type { Config } from '@jest/types'
import { defaults as tsjPreset } from 'ts-jest/presets'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  projects: [
    {
      rootDir: '.',
      testMatch: ['<rootDir>/tests/*.test.ts'],
      displayName: { name: 'Menmos-Web', color: 'red' },
      globals: {
        'ts-jest': {
          tsconfig: '<rootDir>/tsconfig.base.json'
        }
      },
      transform: {
        ...tsjPreset.transform
      },
      testEnvironment: 'jsdom'
    }
  ]
}

export default config
