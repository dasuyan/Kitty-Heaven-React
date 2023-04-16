import {Link, useNavigate, useParams} from "react-router-dom"
import FormMode, {getValidationErrorKey} from '../../helpers/formHelper'
import {useEffect, useState} from "react";
import {addTreatmentApiCall, getTreatmentByIdApiCall, updateTreatmentApiCall} from "../../apiCalls/treatmentApiCalls";
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

function TreatmentForm() {
    const { t } = useTranslation();
    const [treatment, setTreatment] = useState({
        'name': '',
        'cost': '',
        'contraindications': ''
    })
    const [errors, setErrors] = useState({
        'name': '',
        'cost': '',
        'contraindications': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { treatmentId } = useParams()
    const currentFormMode = treatmentId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function fetchTreatmentDetails() {
        getTreatmentByIdApiCall(treatmentId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setTreatment(data)
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
            fetchTreatmentDetails()
        }
    }, [])
    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if (fieldName === 'cost') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if (fieldName === 'contraindications') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
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
        setTreatment({
            ...treatment,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addTreatmentApiCall(treatment)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateTreatmentApiCall(treatmentId, treatment)
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
        Object.entries(treatment).forEach(([key, value]) => {
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
            navigate("/treatments")
        }
    }, [redirect])

    const errorsSummary = hasErrors() ? t('treatment.misc.error') : ''
    const fetchError = error ? `${t('treatment.misc.error')}: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message

    const pageTitle = currentFormMode === FormMode.NEW ? t('treatment.form.add.pageTitle') : t('treatment.form.edit.pageTitle')

    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    label={t('treatment.fields.name')}
                    required
                    error={t(errors['name'])}
                    name="name"
                    placeholder=""
                    onChange={handleChange}
                    value={treatment.name}
                />
                <FormInput
                    type="number"
                    label={t('treatment.fields.cost')}
                    required
                    error={t(errors['cost'])}
                    name="cost"
                    placeholder=""
                    onChange={handleChange}
                    value={treatment.cost}
                />
                <FormInput
                    type="text"
                    label={t('treatment.fields.contraindications')}
                    error={t(errors['contraindications'])}
                    name="contraindications"
                    placeholder=""
                    onChange={handleChange}
                    value={treatment.contraindications}
                />
                <FormButtons
                    formMode={currentFormMode}
                    error={globalErrorMessage}
                    cancelPath="/treatments"
                />
            </form>
        </main>
    )
}

export default TreatmentForm