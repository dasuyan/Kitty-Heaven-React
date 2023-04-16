import {Link, useNavigate, useParams} from 'react-router-dom'
import {addSpecializationApiCall, getSpecializationByIdApiCall, getSpecializationsApiCall, updateSpecializationApiCall} from '../../apiCalls/specializationApiCalls'
import { getCaretakersApiCall } from '../../apiCalls/caretakerApiCalls'
import {useEffect, useState} from "react";
import FormMode, {formValidationKeys} from "../../helpers/formHelper";
import {
    checkDateIfAfter,
    checkNumber,
    checkNumberRange,
    checkRequired,
    checkTextLengthRange
} from "../../helpers/validationCommon";
import {getTreatmentsApiCall} from "../../apiCalls/treatmentApiCalls";
import {getFormattedDate} from "../../helpers/dateHelper";
import {useTranslation} from "react-i18next";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";

function SpecializationForm() {
    const { t } = useTranslation();
    const allTreatments = getTreatmentsApiCall()
    const allCaretakers = getCaretakersApiCall()

    const [treatments, setTreatments] = useState([])
    const [caretakers, setCaretakers] = useState([])

    function fetchTreatmentList() {
        getTreatmentsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setTreatments(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }
    useEffect(() => {
        fetchTreatmentList()
    }, [])

    function fetchCaretakerList() {
        getCaretakersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setCaretakers(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }
    useEffect(() => {
        fetchCaretakerList()
    }, [])

    const [specialization, setSpecialization] = useState({
        'treatment_id': '',
        'caretaker_id': '',
        'certificate': '',
        'certificationYear': ''
    })
    const [errors, setErrors] = useState({
        'treatment_id': '',
        'caretaker_id': '',
        'certificate': '',
        'certificationYear': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { specializationId } = useParams()
    const currentFormMode = specializationId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function fetchSpecializationDetails() {
        getSpecializationByIdApiCall(specializationId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setSpecialization(data)
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
            fetchSpecializationDetails()
        }
    }, [])
    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'treatment_id') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if (fieldName === 'caretaker_id') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if (fieldName === 'certificate') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if (fieldName === 'certificationYear') {
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
        setSpecialization({
            ...specialization,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addSpecializationApiCall(specialization)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateSpecializationApiCall(specializationId, specialization)
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
        Object.entries(specialization).forEach(([key, value]) => {
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
            navigate("/specializations")
        }
    }, [redirect])

    const errorsSummary = hasErrors() ? t('specialization.misc.error') : ''
    const fetchError = error ? `${t('specialization.misc.error')}: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message

    const pageTitle = currentFormMode === FormMode.NEW ? t('specialization.form.add.pageTitle') : t('specialization.form.edit.pageTitle')

    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="treatment_id">{t('specialization.fields.treatment')}: <abbr title="required" aria-label="required">*</abbr></label>
                <select id="treatment_id" name="treatment_id" onChange={handleChange} required value={specialization.treatment_id}   >
                    <option value="" selected hidden >--- {t('specialization.form.chooseTreatment')} ---</option>
                    {treatments.map(treatment =>
                        (<option key={treatment._id} value={treatment._id} label={treatment.name + ", " + treatment.cost}></option>)
                    )}
                </select>
                <span id="errorTreatment" className="errors-text">{errors["treatment"]}</span>
                <label htmlFor="caretaker_id">{t('specialization.fields.caretaker')}: <abbr title="required" aria-label="required">*</abbr></label>
                <select id="caretaker_id" name="caretaker_id" onChange={handleChange} required value={specialization.caretaker_id} >
                    <option value="" selected hidden >--- {t('specialization.form.chooseCaretaker')} ---</option>
                    {caretakers.map(caretaker =>
                        (<option key={caretaker._id} value={caretaker._id} label={caretaker.name + " " + caretaker.surname} ></option>)
                    )}
                </select>
                <span id="errorCaretaker" className="errors-text">{errors["caretaker"]}</span>
                <FormInput
                    type="text"
                    label={t('specialization.fields.certificate')}
                    required
                    error={t(errors['certificate'])}
                    name="certificate"
                    placeholder=""
                    onChange={handleChange}
                    value={specialization.certificate}
                />
                <FormInput
                    type="number"
                    label={t('specialization.fields.certificationYear')}
                    error={t(errors['certificationYear'])}
                    required
                    name="certificationYear"
                    placeholder=""
                    onChange={handleChange}
                    value={specialization.certificationYear}
                />

                <FormButtons
                    formMode={currentFormMode}
                    error={globalErrorMessage}
                    cancelPath="/specializations"
                />
            </form>
        </main>
    )
}

export default SpecializationForm