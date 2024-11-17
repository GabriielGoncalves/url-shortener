import bcrypt from "bcrypt";

const salt = Number(process.env.CRYPT_SALT!);

export default class Encryption {
  static async encrypt(text: string): Promise<string> {
    try {
      return await bcrypt.hash(text, salt);
    } catch (error) {
      throw new Error("Failed to encrypt text.");
    }
  }

  static async decrypt(encryptedText: string, simpleText: string): Promise<boolean> {
    try {
      return await bcrypt.compare(encryptedText, simpleText);
    } catch (error) {
      throw new Error("Failed to decrypt text.");
    }
  }
}
