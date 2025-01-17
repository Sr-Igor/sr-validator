export interface IValidationParams {
  /**
   * Key da chave que irá construir o objeto de validação
   */
  key: string;

  /**
   * É o nome que será utilizado na situaçÕes de erro para comport o texto, Caso não seja informado, será utilizado o valor de key
   * @default key
   */
  name?: string;

  /**
   * Utilizado quando field é do tipo date, para limitar a data ao dia de hoje
   * @default false
   */
  today?: boolean;

  /**
   * Utilizado quando field é do tipo enum, para definir os valores possíveis
   * @default []
   */
  values?: string[];

  /**
   * Utilizado quando field é do tipo number, para definir se o valor é inteiro
   * @default false
   */
  int?: boolean;

  /**
   * Utilizado quando field é do tipo number, para definir se o valor é positivo
   * @default false
   */
  positive?: boolean;

  /**
   * Utilizado quando field é do tipo number ou string, para definir o valor máximo ou quantidade máxima de caracteres
   * @default undefined
   */
  max?: number;

  /**
   * Utilizado quando field é do tipo number ou string, para definir o valor mínimo ou quantidade mínima de caracteres
   * @default undefined
   */
  min?: number;

  /**
   * Utilizado quando field é do tipo string, para formatar o texto
   * @default undefined
   */
  format?: "upper" | "lower";
}
