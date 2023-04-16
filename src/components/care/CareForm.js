import {Link, useNavigate, useParams} from 'react-router-dom'
import {addCareApiCall, getCareByIdApiCall, getCaresApiCall, updateCareApiCall} from '../../apiCalls/careApiCalls'
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
import {getCatsApiCall} from "../../apiCalls/catApiCalls";
import {getFormattedDate} from "../../helpers/dateHelper";
import {useTranslation} from "react-i18next";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";

function CareForm() {
    const { t } = useTranslation();
    const allCats = getCatsApiCall()
    const allCaretakers = getCaretakersApiCall()

    const [cats, setCats] = useState([])
    const [caretakers, setCaretakers] = useState([])

    function fetchCatList() {
        getCatsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setCats(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }
    useEffect(() => {
        fetchCatList()
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

    const [care, setCare] = useState({
        'cat_id': '',
        'caretaker_id': '',
        'totalCost': '',
        'dateFrom': '',
        'dateTo': ''
    })
    const [errors, setErrors] = useState({
        'cat_id': '',
        'caretaker_id': '',
        'totalCost': '',
        'dateFrom': '',
        'dateTo': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { careId } = useParams()
    const currentFormMode = careId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function fetchCareDetails() {
        getCareByIdApiCall(careId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setCare(data)
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
            fetchCareDetails()
        }
    }, [])
    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'cat_id') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if (fieldName === 'caretaker_id') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if (fieldName === 'totalCost') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkNumber(fieldValue)) {
                errorMessage = formValidationKeys.isDecimal
            } else if (!checkNumberRange(fieldValue, 0, 1_000_000)) {
                if(fieldValue < 0)
                    errorMessage = formValidationKeys.min_0
                else errorMessage = formValidationKeys.max_1000000
            }
        }
        if (fieldName === 'dateFrom') {
            const nowDate = new Date();
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (checkDateIfAfter(fieldValue, nowDate)) {
                errorMessage = formValidationKeys.futureDate
            }

        }
        if (fieldName === 'dateTo') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkDateIfAfter(fieldValue, care['dateFrom'])) {
                errorMessage = formValidationKeys.dateBefore
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
        setCare({
            ...care,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addCareApiCall(care)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateCareApiCall(careId, care)
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
        Object.entries(care).forEach(([key, value]) => {
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
            navigate("/cares")
        }
    }, [redirect])

    const errorsSummary = hasErrors() ? t('care.misc.error') : ''
    const fetchError = error ? `${t('care.misc.error')}: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message

    const pageTitle = currentFormMode === FormMode.NEW ? t('care.form.add.pageTitle') : t('care.form.edit.pageTitle')

    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="cat_id">{t('care.fields.cat')}: <abbr title="required" aria-label="required">*</abbr></label>
                <select id="cat_id" name="cat_id" onChange={handleChange} required value={care.cat_id}   >
                    <option value="" selected hidden >--- {t('care.form.chooseCat')} ---</option>
                    {cats.map(cat =>
                        (<option key={cat._id} value={cat._id} label={cat.name + ", " + cat.age}></option>)
                    )}
                </select>
                <span id="errorCat" className="errors-text">{errors["cat"]}</span>
                <label htmlFor="caretaker_id">{t('care.fields.caretaker')}: <abbr title="required" aria-label="required">*</abbr></label>
                <select id="caretaker_id" name="caretaker_id" onChange={handleChange} required value={care.caretaker_id} >
                    <option value="" selected hidden >--- {t('care.form.chooseCaretaker')} ---</option>
                    {caretakers.map(caretaker =>
                        (<option key={caretaker._id} value={caretaker._id} label={caretaker.name + " " + caretaker.surname} ></option>)
                    )}
                </select>
                <span id="errorCaretaker" className="errors-text">{errors["caretaker"]}</span>
                <FormInput
                    type="number"
                    label={t('care.fields.totalCost')}
                    error={t(errors['totalCost'])}
                    required
                    name="totalCost"
                    placeholder=""
                    onChange={handleChange}
                    value={care.totalCost}
                />
                <FormInput
                    type="datetime-local"
                    label={t('care.fields.dateFrom')}
                    required
                    error={t(errors['dateFrom'])}
                    name="dateFrom"
                    placeholder=""
                    onChange={handleChange}
                    value={care.dateFrom}
                />
                <FormInput
                    type="datetime-local"
                    label={t('care.fields.dateTo')}
                    required
                    error={t(errors['dateTo'])}
                    name="dateTo"
                    placeholder=""
                    onChange={handleChange}
                    value={care.dateTo}
                />
                <FormButtons
                    formMode={currentFormMode}
                    error={globalErrorMessage}
                    cancelPath="/cares"
                />
            </form>
        </main>
    )
}

export default CareForm