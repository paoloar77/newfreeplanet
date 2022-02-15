export class Patterns {
  /**
   * Alphanumeric, spaces and dashes allowed. Min 2 characters length.
   */
  public static DisplayName = /^[0-9a-zA-Z\s-]{2,}/i

  /**
   * Same pattern used by JQuery userName validation
   */
  public static Email = /^((“[\w-\s]+”)|([\w-]+(?:\.[\w-]+)*)|(“[\w-\s]+”)([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}[0-9];{1,2})\]?$)/i

  /**
   *  6 to 20 characters string with at least one digit, one upper case letter, one lower case letter and one special symbol
   *
   *         public static Password: RegExp = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!\-]).{6,20})/i
   *

   *  6 to 30 characters string with at least one digit, one upper case letter, one lower case letter and one special symbol
   */
  public static Username = /^[a-zA-Z0-9]+([_@.-]?[a-zA-Z0-9])*$/i

  // *  8 to 20 characters string with at least one digit, one upper case letter, one lower case letter
  public static Password = /^((?=.*[A-Z])(?=.*\d)(?!.* ).{8,30})/i
}
