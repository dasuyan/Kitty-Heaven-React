import React from 'react'
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import Footer from './components/fragments/Footer';
import {Routes, Route} from 'react-router-dom';

import CatList from './components/cat/CatList'
import CatDetails from "./components/cat/CatDetails";
import CatForm from "./components/cat/CatForm";

import CareList from "./components/care/CareList";
import CareDetails from "./components/care/CareDetails";
import CareForm from "./components/care/CareForm";

import CaretakerList from "./components/caretaker/CaretakerList";
import CaretakerDetails from "./components/caretaker/CaretakerDetails";
import CaretakerForm from "./components/caretaker/CaretakerForm";
import LoginForm from "./components/other/LoginForm";
import {getCurrentUser} from "./helpers/authHelper";
import TreatmentList from "./components/treatment/TreatmentList";
import TreatmentDetails from "./components/treatment/TreatmentDetails";
import TreatmentForm from "./components/treatment/TreatmentForm";
import SpecializationDetails from "./components/specialization/SpecializationDetails";
import SpecializationForm from "./components/specialization/SpecializationForm";
import SpecializationList from "./components/specialization/SpecializationList";
import {deleteCatApiCall} from "./apiCalls/catApiCalls";
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            prevPath: ''
        }
    }

    handleLogin = (user) => {
        localStorage.setItem("user", user)
        this.setState({ user: user })
    }

    handleLogout = () => {
        localStorage.removeItem("user");
        this.setState({ user: undefined })
    }

    componentDidMount() {
        const currentUser = getCurrentUser()
        this.setState({ user: currentUser })
    }

    render() {
        return (
            <>
            <Header />
            <Navigation handleLogout={this.handleLogout} />
            <Routes>
                <Route path="/" element={<MainContent />} />
                <Route exact path="/login"
                       element={<LoginForm handleLogin={this.handleLogin} />}
                />
                <Route path="cats">
                    <Route index={true} element={<CatList />} />
                    <Route path="/cats/details/:catId" element={<CatDetails />} />
                    <Route path="/cats/add" element={<CatForm />} />
                    <Route path="/cats/edit/:catId" element={<CatForm />} />
                </Route>
                <Route path="cares">
                    <Route index={true} element={<CareList />} />
                    <Route path="/cares/details/:careId" element={<CareDetails />} />
                    <Route path="/cares/add" element={<CareForm />} />
                    <Route path="/cares/edit/:careId" element={<CareForm />} />
                </Route>
                <Route path="caretakers">
                    <Route index={true} element={<CaretakerList />} />
                    <Route path="/caretakers/details/:caretakerId" element={<CaretakerDetails />} />
                    <Route path="/caretakers/add" element={<CaretakerForm />} />
                    <Route path="/caretakers/edit/:caretakerId" element={<CaretakerForm />} />
                </Route>
                <Route path="treatments">
                    <Route index={true} element={<TreatmentList />} />
                    <Route path="/treatments/details/:treatmentId" element={<TreatmentDetails />} />
                    <Route path="/treatments/add" element={<TreatmentForm />} />
                    <Route path="/treatments/edit/:treatmentId" element={<TreatmentForm />} />
                </Route>
                <Route path="specializations">
                    <Route index={true} element={<SpecializationList />} />
                    <Route path="/specializations/details/:specializationId" element={<SpecializationDetails />} />
                    <Route path="/specializations/add" element={<SpecializationForm />} />
                    <Route path="/specializations/edit/:specializationId" element={<SpecializationForm />} />
                </Route>
            </Routes>
            <Footer />
        </>
        )
    }
}

export default App;