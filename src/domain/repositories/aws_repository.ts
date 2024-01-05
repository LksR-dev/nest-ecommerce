export interface AWSRepository {
  sendEmailWithSES(params: {
    Destination: { ToAddresses: string[] };
    Message: {
      Body: { Text: { Data: string }; Subject: { Data: string } };
      Subject: { Data: string };
    };
    Source: string;
  });
  uploadImagesWithS3(params: {
    Bucket: string;
    Key: string;
    Body: Buffer;
    ContentType: string;
  }): string;
}
