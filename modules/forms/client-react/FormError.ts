export const isFormError = (err: any) => err instanceof FormError;

export class FormError {
  private readonly _errors: { [key: string]: any };

  constructor(errorMsg: string, err?: any) {
    if (err) {
      throw err;
    } else {
      this._errors = { errorMsg };
    }
  }

  get errors() {
    return this._errors;
  }
}
