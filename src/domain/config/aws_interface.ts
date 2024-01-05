export interface AWSConfig {
  getAWSAccessKeyID(): string;
  getAWSSecretAccesKeyID(): string;
  getAWSSourceEmail(): string;
  getAWSBucketName(): string;
}
