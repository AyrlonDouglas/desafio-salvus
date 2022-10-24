export const getFirstAndLastName = (fullname: string | null) => {
  if (!fullname) return "";

  return fullname
    ?.trim()
    .split(/(\s).+\s/)
    .join("");
};

export const capitalizeText = (words: string | null) => {
  if (words) {
    return words
      .toLowerCase()
      .split(" ")
      .map((text: string) => {
        return (text = text.charAt(0).toUpperCase() + text.substring(1));
      })
      .join(" ");
  } else return "";
};

export function validateCPF(strCPF: string) {
  let Soma;
  let Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

export function validatePhone(phone: string | undefined) {
  if (!phone) return false;

  let regex = new RegExp(
    "^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$"
  );
  return regex.test(phone);
}

export function telMask(value: string | null | number) {
  if (!value) return;
  value = value?.toString();
  value = value?.replace(/\D/g, ""); //Remove tudo o que não é dígito
  value = value?.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
  value = value?.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
  return value;
}
