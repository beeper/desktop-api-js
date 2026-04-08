import * as SecureStore from "expo-secure-store";

function isWeb(): boolean {
  return process.env.EXPO_OS === "web";
}

function tokenKey(id: string): string {
  return `sdk-lab:token:${id}`;
}

export async function loadToken(id: string): Promise<string> {
  if (isWeb()) {
    return localStorage.getItem(tokenKey(id)) ?? "";
  }
  return (await SecureStore.getItemAsync(tokenKey(id))) ?? "";
}

export async function saveToken(id: string, token: string): Promise<void> {
  const key = tokenKey(id);
  if (isWeb()) {
    if (token.trim()) {
      localStorage.setItem(key, token);
    } else {
      localStorage.removeItem(key);
    }
    return;
  }
  if (token.trim()) {
    await SecureStore.setItemAsync(key, token);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

export async function deleteToken(id: string): Promise<void> {
  const key = tokenKey(id);
  if (isWeb()) {
    localStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

