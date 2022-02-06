import * as bcrypt from 'bcrypt';

export const bcryptHash = (plainText: string, saltOrRound = 10): Promise<string> => {
  return bcrypt.hash(plainText, saltOrRound)
}

export const bcryptCompare =
  (plainText: string, hashedMessage: string): Promise<boolean> => bcryptCompare(plainText, hashedMessage)
