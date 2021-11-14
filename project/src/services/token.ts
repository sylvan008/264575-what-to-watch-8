/**
 * Токен авторизации
 */
import {AUTH_TOKEN_KEY_NAME} from '../utils/const';

export type Token = string;

/**
 * Сохраняет token авторизации в localStorage
 */
export function saveToken(token: Token): void {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
}

/**
 * Читает token авторизации с localStorage или возвращает пустую строку
 */
export function getToken(): Token {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
}

/**
 * Удаляет из localStorage токен авторизации
 */
export function dropToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
}
