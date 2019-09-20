export class FormError {
  private readonly _errors: { [key: string]: any };

  constructor(message: string, err?: any) {
    if (err) {
      throw err;
    } else {
      this._errors = { message };
    }
  }

  get errors() {
    return this._errors;
  }
}
