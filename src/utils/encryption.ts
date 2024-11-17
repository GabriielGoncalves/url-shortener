import bcrypt from "bcrypt";
import environment from "./enviroment";

export default class Encryption {
  static async encrypt(text: string): Promise<string> {
    try {
      return await bcrypt.hash(text, environment.salt);
    } catch (error) {
      throw new Error("Failed to encrypt text.");
    }
  }

  static async decrypt(encryptedText: string, simpleText: string): Promise<boolean> {
    try {
      return await bcrypt.compare(simpleText, encryptedText);
    } catch (error) {
      throw new Error("Failed to decrypt text.");
    }
  }
}
