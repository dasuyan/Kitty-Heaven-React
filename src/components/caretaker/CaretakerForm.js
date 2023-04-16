import {Link, useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import FormMode, {formValidationKeys} from "../../helpers/formHelper";
import {addCaretakerApiCall, getCaretakerByIdApiCall, updateCaretakerApiCall} from "../../apiCalls/caretakerApiCalls";
import {
    checkEmail,
    checkNumber,
    checkNumberRange,
    checkRequired,
    checkTextLengthRange
} from "../../helpers/validationCommon";
import {useTranslation} from "react-i18next";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";

function CaretakerForm() {
    const { t } = useTranslation();
    const [caretaker, setCaretaker] = useState({
        'name': '',
        'surname': '',
        'email': '',
        'primaryRole': '',
        'password': ''
    })
    const [errors, setErrors] = useState({
        'name': '',
        'surname': '',
        'email': '',
        'primaryRole': '',
        'password': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { caretakerId } = useParams()
    const currentFormMode = caretakerId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function fetchCaretakerDetails() {
        getCaretakerByIdApiCall(caretakerId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setCaretaker(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                })
    }
    useEffect(() => {
        if (currentFormMode === FormMode.EDIT) {
            fetchCaretakerDetails()
        }
    }, [])
    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 50)) {
                errorMessage = formValidationKeys.len_2_50
            }
        }
        if (fieldName === 'surname') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 50)) {
                errorMessage = formValidationKeys.len_2_50
            }
        }
        if (fieldName === 'email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkEmail(fieldValue)) {
                errorMessage = formValidationKeys.isEmail
            }
            else if (!checkTextLengthRange(fieldValue, 2, 50)) {
                errorMessage = formValidationKeys.len_2_50
            }
        }
        if (fieldName === 'primaryRole') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 50)) {
                errorMessage = formValidationKeys.len_2_50
            }
        }
        return errorMessage;
    }
    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setCaretaker({
            ...caretaker,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addCaretakerApiCall(caretaker)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateCaretakerApiCall(caretakerId, caretaker)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        }
                    )
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                const serverFieldsErrors = {...errors}
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    serverFieldsErrors[fieldName] = errorMessage
                                }
                                setErrors(serverFieldsErrors)
                                setError(null)
                            } else {
                                setRedirect(true)
                            }
                        },
                        (error) => {
                            setError(error)
                        }
                    )
            }
        }
    }
    function validateForm() {
        let isValid = true
        let serverFieldsErrors = {...errors}
        Object.entries(caretaker).forEach(([key, value]) => {
            const errorMessage = validateField(key, value)
            serverFieldsErrors[key] = errorMessage
            if (errorMessage.length > 0) {
                isValid = false
            }
        })
        setErrors(serverFieldsErrors)
        return isValid
    }
    function hasErrors() {
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                return true
            }
        })
        return false
    }

    useEffect(() => {
        if (redirect) {
            navigate("/caretakers")
        }
    }, [redirect])

    const errorsSummary = hasErrors() ? t('caretaker.misc.error') : ''
    const fetchError = error ? `${t('caretaker.misc.error')}: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message

    const pageTitle = currentFormMode === FormMode.NEW ? t('caretaker.form.add.pageTitle') : t('caretaker.form.edit.pageTitle')
    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    label={t('caretaker.fields.name')}
                    required
                    error={t(errors['name'])}
                    name="name"
                    placeholder=""
                    onChange={handleChange}
                    value={caretaker.name}
                />
                <FormInput
                    type="text"
                    label={t('caretaker.fields.surname')}
                    required
                    error={t(errors['surname'])}
                    name="surname"
                    placeholder=""
                    onChange={handleChange}
                    value={caretaker.surname}
                />
                <FormInput
                    type="email"
                    label={t('caretaker.fields.email')}
                    required
                    error={t(errors['email'])}
                    name="email"
                    placeholder=""
                    onChange={handleChange}
                    value={caretaker.email}
                />
                <FormInput
                    type="text"
                    label={t('caretaker.fields.primaryRole')}
                    required
                    error={t(errors['primaryRole'])}
                    name="primaryRole"
                    placeholder=""
                    onChange={handleChange}
                    value={caretaker.primaryRole}
                />
                <FormInput
                    type="password"
                    label={t('caretaker.fields.password')}
                    required
                    error={t(errors['password'])}
                    name="password"
                    placeholder=""
                    onChange={handleChange}
                    value={caretaker.password}
                />
                <FormButtons
                    formMode={currentFormMode}
                    error={globalErrorMessage}
                    cancelPath="/caretakers"
                />
            </form>
        </main>
    )
}

export default CaretakerForm