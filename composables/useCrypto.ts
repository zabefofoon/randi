import CryptoJS from "crypto-js"

export const useCrypto = () => {
  const runtimeConfig = useRuntimeConfig()

  return {
    encrypted(data: string) {
      return CryptoJS.AES.encrypt(data, runtimeConfig.public.cryptoKey).toString()
    },
    decrypted(encrypted: string) {
      if (!encrypted) return
      return CryptoJS.AES.decrypt(encrypted, runtimeConfig.public.cryptoKey).toString(
        CryptoJS.enc.Utf8
      )
    },
  }
}
