export interface IAWSService {
  sendEmail(toAddresses: string[], subject: string, body: string);
  uploadImages(images: string[]);
}
