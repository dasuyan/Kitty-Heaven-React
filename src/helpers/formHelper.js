const FormMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
}
export const formValidationKeys = {
    notEmpty: "notEmpty",
    isEmail: "isEmail",
    isInt: "isInt",
    isDecimal: "isDecimal",
    isDate: "isDate",
    len_2_50: "len_2_50",
    len_0_50: "len_0_50",
    min_0: "min_0",
    max_50: "max_50",
    max_1000000: "max_1000000",
    futureDate: "futureDate",
    dateBefore: "dateBefore"
}

export function getValidationErrorKey(error) {
    if (error === "") {
        return error
    } else return `validation.messages.${error}`
}
export default FormMode