export interface IEmailService {
  sendCodeEmail(to: string, code: string): Promise<void>;
}
