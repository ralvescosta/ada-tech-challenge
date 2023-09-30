import { type Logger } from '../infra/logger'

export interface LoginService {
  perform: () => Promise<void>
}

export class LoginServiceImpl implements LoginService {
  constructor (private readonly logger: Logger) {}

  public async perform (): Promise<void> {}
}
