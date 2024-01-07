export interface IAWSService {
  sendEmail(
    toAddresses: string[],
    code: string,
    bodyType: 'login' | 'recoverPassword',
  );
  uploadImages(images: string[]);
}
