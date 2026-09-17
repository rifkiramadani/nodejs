export class MyException extends Error {}

export const callMe = (name) => {
  if (name === "Rifky") {
    throw new MyException("Ups My Exception Happens");
  } else {
    return "OK";
  }
};
