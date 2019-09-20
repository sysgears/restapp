export default class UserFormatter {
  public static trimExtraSpaces(inputValues: { [key: string]: any }) {
    const userValues = { ...inputValues };
    const propsForTrim = ['username', 'email', 'firstName', 'lastName'];

    for (const prop in userValues) {
      if (userValues.hasOwnProperty(prop)) {
        if (propsForTrim.includes(prop) && userValues[prop]) {
          userValues[prop] = userValues[prop].trim();
        }
      }
    }

    return userValues;
  }
}
