import {Link, useNavigate, useParams} from "react-router-dom"
import FormMode, {getValidationErrorKey} from '../../helpers/formHelper'
import {useEffect, useState} from "react";
import {addCatApiCall, getCatByIdApiCall, updateCatApiCall} from "../../apiCalls/catApiCalls";
import {
    checkRequired,
    checkTextLengthRange,
    checkNumberRange,
    checkNumber
} from '../../helpers/validationCommon';
import {useTranslation} from "react-i18next";
import {formValidationKeys} from "../../helpers/formHelper";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";

function CatForm() {
    const { t } = useTranslation();
    const [cat, setCat] = useState({
        'name': '',
        'age': '',
        'breed': ''
    })
    const [errors, setErrors] = useState({
        'name': '',
        'age': '',
        'breed': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { catId } = useParams()
    const currentFormMode = catId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function fetchCatDetails() {
        getCatByIdApiCall(catId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setCat(data)
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
            fetchCatDetails()
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
        if (fieldName === 'age') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkNumber(fieldValue)){
                errorMessage = formValidationKeys.isInt
            } else if (!checkNumberRange(fieldValue, 0, 50)) {
                errorMessage = formValidationKeys.len_0_50
            }
        }
        if (fieldName === 'breed') {
            if (fieldValue && !checkTextLengthRange(fieldValue, 2, 50)) {
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
        setCat({
            ...cat,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addCatApiCall(cat)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateCatApiCall(catId, cat)
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
        Object.entries(cat).forEach(([key, value]) => {
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
            navigate("/cats")
        }
    }, [redirect])

    const errorsSummary = hasErrors() ? t('cat.misc.error') : ''
    const fetchError = error ? `${t('cat.misc.error')}: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message

    const pageTitle = currentFormMode === FormMode.NEW ? t('cat.form.add.pageTitle') : t('cat.form.edit.pageTitle')

    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    label={t('cat.fields.name')}
                    required
                    error={t(errors['name'])}
                    name="name"
                    placeholder=""
                    onChange={handleChange}
                    value={cat.name}
                />
                <FormInput
                    type="number"
                    label={t('cat.fields.age')}
                    required
                    error={t(errors['age'])}
                    name="age"
                    placeholder=""
                    onChange={handleChange}
                    value={cat.age}
                />
                <FormInput
                    type="text"
                    label={t('cat.fields.breed')}
                    error={t(errors['breed'])}
                    name="breed"
                    placeholder=""
                    onChange={handleChange}
                    value={cat.breed}
                />
                <FormButtons
                    formMode={currentFormMode}
                    error={globalErrorMessage}
                    cancelPath="/cats"
                />
            </form>
        </main>
    )
}

export default CatForm