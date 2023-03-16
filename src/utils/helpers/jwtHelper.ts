export const getJWt = (authHeader: string) => {
  const token = authHeader.replace('Bearer', '');
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};
