
import { put } from 'redux-saga/effects';
import {
    USER_SIGNOUT,
    SIGN_OUT
} from '../../constants'

export function* signOut (){
    yield put(userSignOut());
    localStorage.removeItem("userData");
}

export const userSignOut = ()=>{
    return {
        type:SIGN_OUT
    }
}
  export const runSignOut = ()=>{
      return {
          type:USER_SIGNOUT
      }
  }
  