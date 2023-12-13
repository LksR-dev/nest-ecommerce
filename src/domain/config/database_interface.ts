export interface DatabaseConfig {
  getDatabaseHost(): string;
  getDatabasePort(): number;
  getDatabaseUser(): string;
  getDatabasePassword(): string;
  getDatabaseName(): string;
  getSengridAPIKey(): string;
  getSengridSenderEmail(): string;
}
