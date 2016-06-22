export const SWITCH_LOGIN_MODE = 'SWITCH_LOGIN_MODE'
export const REGISTER_RESET = 'REGISTER_RESET'
export const LOGIN_RESET = 'LOGIN_RESET'

export function switchLoginMode(mode) {
  return {
    type: SWITCH_LOGIN_MODE,
    mode: mode
  }
}

export function registerReset(message) {
  return {
    type:REGISTER_RESET,
    message:message
  }

}

export function loginReset() {
  return {
    type:LOGIN_RESET
  }

}