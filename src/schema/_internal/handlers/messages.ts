//@ts-nocheck

export const e = {
  required: (field) => `${field} é obrigatório`,
  notEmpty: (field) => `${field} não pode ser vazio`,
  number: (field) => `${field} deve ser um número`,
  string: (field) => `${field} deve ser uma string`,
  int: (field) => `${field} deve ser um número inteiro`,
  positive: (field) => `${field} deve ser um número positivo`,
  length: (field, length) =>
    `${field} deve conter exatamente ${length || 0} caracteres`,
  enum: (field, values) =>
    `${field} deve ser um dos seguintes valores: ${values.join(", ") || ""}`,
  date: (field) => `${field} deve ser uma data válida`,
  email: (field) => `${field} deve ser válido`,
  phone: (field) => `${field} deve ser válido`,
  cpf: (field) => `${field} deve ser um válido`,
  boolean: (field) => `${field} deve ser um boolean`,
  cep: (field) => `${field} deve ser válido`,
  password: (field) => `${field} deve ser válida`,
  max: (field, max) => `${field} deve ser menor que ${max}`,
  min: (field, min) => `${field} deve ser maior que ${min}`,
  notAllowed: (local) => `Campo não identificado`,
  passwordConfirmation: (field, ref) =>
    `${field} deve ser igual ao campo ${ref.toLowerCase()}`,
  cnpj: (field) => `${field} deve ser válido`,
  coordinates: (field) => `${field} deve ser válido`,

  major: (field1, field2) =>
    `${field1} não pode ser maior que ${field2?.toLowerCase()}`,
  orArray: (fields) =>
    `Um dos itens: '${fields
      .map((i) => i?.toLowerCase())
      ?.join(", ")}', é obrigatório`,
  reverse: (fields) =>
    `Os campos ${fields
      .map((i) => i?.toLowerCase())
      ?.join(", ")
      ?.replace(/,([^,]*)$/, " e$1")}, não podem ser enviados ao mesmo tempo`,
  mutual: (fields) =>
    `Os campos ${fields
      .map((i) => i?.toLowerCase())
      ?.join(", ")
      ?.replace(/,([^,]*)$/, " e$1")}, devem ser enviados juntos`,
  oneOfRequired: (fields) =>
    `Um dos campos ${fields
      .map((i) => i?.toLowerCase())
      ?.join(", ")
      ?.replace(/,([^,]*)$/, " ou$1")}, deve ser enviado`,
  equal: (fields) =>
    `Os campos ${fields
      .map((i) => i?.toLowerCase())
      ?.join(", ")
      ?.replace(/,([^,]*)$/, " e$1")}, devem ser iguais`,

  notGreater: (ref, field) =>
    `O valor de ${field?.toLowerCase()} deve ser menor que ${ref?.toLowerCase()}`,

  null: (field) => `${field} deve ser nulo`,
};
