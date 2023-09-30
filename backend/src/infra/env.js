/* eslint-disable */
const dotenv = require('dotenv')

module.exports = () => {
  const nodeEnv = ((process?.env?.NODE_ENV) != null) ? process.env.NODE_ENV : 'local'

  const AVAILABLE_ENV = {
    local: '.env.local',
    dev: '.env.local',
    stg: '.env.staging',
    staging: '.env.staging',
    prd: '.env.production',
    production: '.env.production'
  }

  const path = AVAILABLE_ENV[nodeEnv.toLowerCase()] || '.env.local'

  dotenv.config({ path })
}
