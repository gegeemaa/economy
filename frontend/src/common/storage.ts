// Helper methods to access LocalStorage

const getItem = (id: string) => {
  try {
    const authState = localStorage.getItem(id);
    return authState ? authState : null;
  } catch (e: any) {
    console.error("Aldaa: ", e);
  }
  return null;
};

// const setItem = (id: string, value: any | undefined) => {
//   localStorage.setItem(id, value ? JSON.stringify(value) : "");
// };

export const getAuthenticationData = (): any => {
  return getItem("userToken");
};

// export const setAuth = (token?: AuthResponse) => {
//   return setItem("auth", token);
// };
