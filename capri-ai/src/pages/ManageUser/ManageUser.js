import React from 'react';
import axios from 'axios';
import { urls } from '../../components/Request';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './ManageUser.css';

import CustomButton from '../../components/button/Button';
import LinkedAccountItem from '../../components/LinkedAccountItem/LinkedAccountItem';
import AgentsList from '../../components/AgentListTemplate/AgentList';

function ManageUser(){
    const[SearchText, setSearchText] = React.useState('');
    const[AgentList, setAgentList] = React.useState('');
    const[LinkedAccounts, setLinkedAccounts] = React.useState([]);

    // States For Filters
    const[StartDate, setStartDate] = React.useState('');
    const[EndDate, setEndDate] = React.useState('');


    //Email Validation Checker
    const[IsValidEmail, setIsValidEmail] = React.useState(true);

    function onDatepickerRef(el) { 
        if (el && el.input) { 
            el.input.readOnly = true; 
        } 
    }
    
    let DateFormatter = (unformattedDate) => {
        var d = new Date(unformattedDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        let date = [year, month, day].join('-');
        return date;
    }

    function SetBaseUrlForAgentIDBasedSearch(){

        let BaseUrl = `${urls.listAccounts}?agentID=${SearchText}`;
    
        // Setting Start Date and End Date
        if(StartDate === '' && EndDate !== ''){
            let endDate = DateFormatter(EndDate);
            BaseUrl = `${BaseUrl}&sessionsStartDate=${endDate}&sessionsEndDate=${endDate}`;
    
        }else if(StartDate !== '' && EndDate === ''){
            let startDate = DateFormatter(StartDate);
            let endDate = DateFormatter(new Date());
    
            BaseUrl = `${BaseUrl}&sessionsStartDate=${startDate}&sessionsEndDate=${endDate}`;
    
        }else if(StartDate !== '' && EndDate !== ''){
            let startDate = DateFormatter(StartDate);
            let endDate = DateFormatter(EndDate);
    
            BaseUrl = `${BaseUrl}&sessionsStartDate=${startDate}&sessionsEndDate=${endDate}`;
        }
        return BaseUrl;
    }

    const CheckSearchTextEqualsEmailType = () => {
        const specialCharacters = "><,?/:;\"'][}{|\\+=-)(*&^%$#!~`";
        const specialCharacterSet = new Set(specialCharacters.split(''));

        let isEmail = true;

        // If SearchText contains @ then further validation is done  
        if(SearchText.search('@') !== -1){

            //Email Containing any special characters other than @ and . is invalid
            for(let i = 0; i < SearchText.length; i++){
                
                if(specialCharacterSet.has(SearchText[i])){
                    setIsValidEmail(false);
                    break;
                }
            }

            // // Email length less than three is an invalid email
            // if(IsValidEmail){
            //     setIsValidEmail(SearchText.length >= 3);
            // }

        }else{
            isEmail = false;
        }
        return isEmail;
    }

    const EvaluateSearchText = () => {
        let BaseUrl = '';
        let isEmail = CheckSearchTextEqualsEmailType();

        if(isEmail && IsValidEmail){
            BaseUrl = `${urls.listAccounts}?email=${SearchText}`;
        }else if(!isEmail){
            BaseUrl = SetBaseUrlForAgentIDBasedSearch();
        }else if(isEmail && !IsValidEmail){
            return null;
        }

        return BaseUrl;
    }

    const setResponseDataToSuitableState = (responseData, isEmail) => {
        if(isEmail){
            setAgentList(responseData.agentIDs);
            setLinkedAccounts([]);
        }else{
            setLinkedAccounts(responseData.locations);
            setAgentList('');
        }
    }

    const SubmitHandler = async(e) => {
        e.preventDefault();

        if(!IsValidEmail){
            setIsValidEmail(true);
        }

        let isEmail = CheckSearchTextEqualsEmailType();
        let BaseUrl = EvaluateSearchText();
        
        if(BaseUrl === null){
            return;
        }

        let listElement = document.getElementById('account-list-area');
    
        try{
            
            if(listElement !== null){
                listElement.innerText = "Loading...";
            }
    
            const response = await axios.get(BaseUrl);
            
            if(response.status === 200){
                if(listElement !== null) {
                    listElement.innerText = "";
                }
                console.log(response);
                setResponseDataToSuitableState(response.data, isEmail);
            }else{
                throw new Error("404");
            }
        }catch(err){
            setAgentList('');
            setLinkedAccounts('');
            if(listElement !== null) {
                listElement.innerText = "No Results";
            }
        }
    }

    return(
        <div className="manage-user-wrapper">
            <div className="manage-user-left-wrapper">
                <div className="form-wrapper">
                    <h2 id="agentid-form-header">DialogFlow Agent</h2>
                    <form className="agentid-form" onSubmit={(e) => SubmitHandler(e)}>
                        <span className="glyphicon glyphicon-search agentid-glyph"></span>
                        <div className="form-group agentid-form-group">
                            <input type="text" 
                            placeholder="Enter Email or DialogFlow Agent ID"
                            className="form-control agentid-formfield" 
                            value={SearchText} 
                            onChange={(e) => setSearchText(e.target.value)}
                            required/>
                        </div>
                        <div className="form-group">
                            <CustomButton type={"submit"} 
                            classname={"form-control agentid-btn"}
                            buttonText={"List Connected Accounts"}/>
                        </div>
                    </form>

                    {/* If Entered Mail is not Valid, show Error Text */}
                    {
                        IsValidEmail === false &&
                        <div class="invalid-email-text-wrapper">
                            Enter a valid email address
                        </div>
                    }


                    {/* Date Filters */}
                    <div className="filter-wrapper">
                        <div className="filter-header-wrapper">
                            <div className="filter-header">
                                <b>Filter Session Usage</b>
                            </div>
                        </div>

                        <div className="search-filters-form">
                            <div className="form-group">
                                <DatePicker className="search-filter"
                                selected={StartDate} 
                                ref={el => onDatepickerRef(el)}
                                onChange={(date) => setStartDate(date)}
                                dateFormat = "yyyy-MM-dd"
                                maxDate={new Date()}
                                placeholderText="Start Date" />
                            </div>
                            {
                                StartDate !== '' &&
                                <div className="form-group">
                                    <button onClick={() => setStartDate('')}
                                    className="clear-btn">
                                        X
                                    </button>
                                </div>
                            }
                            <div className="form-group">
                                <h4 id="divider-text">to</h4>
                            </div>
                            <div className="form-group">
                                <DatePicker className="search-filter"
                                selected={EndDate} 
                                ref={el => onDatepickerRef(el)}
                                onChange={(date) => setEndDate(date)}
                                dateFormat = "yyyy-MM-dd"
                                maxDate={new Date()}
                                placeholderText="End Date" />
                            </div>
                            {
                                EndDate !== '' &&
                                <div className="form-group">
                                    <button 
                                    onClick={() => setEndDate('')}
                                    className="clear-btn">
                                        X
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="manage-user-right-wrapper">
                <div className="connected-account-list-wrapper">

                    {/* Display Number of Matched Items */}
                    {(LinkedAccounts.length !== 0 || AgentList.length !== 0)&&
                        <div className="result-number-wrapper">

                            <span className="result-section-sideheader">
                                {LinkedAccounts.length === 0 ? 
                                    AgentList.length :
                                    LinkedAccounts.length
                                } matching results
                            </span>

                        </div>
                    }   

                    {/* Display No Results in Result Section if 
                    LinkedAccounts or AgentList is Empty */}

                    {
                        (LinkedAccounts.length === 0 && AgentList.length === 0) && 
                    
                        <div className="status-text">
                            <h4 id="account-list-area">No Results</h4>
                        </div>
                    }

                    {/* Display Items in LinkedAccounts State if 
                    LinkedAccounts is not Empty */}

                    {
                        LinkedAccounts.length !== 0 &&

                        LinkedAccounts.map((item, index) => (
                            <LinkedAccountItem accountData={item} key={index}/>
                        ))
                    }

                    {/* Display Items in AgentList State if 
                    AgentList is not Empty */}

                    {
                        AgentList.length !== 0 &&

                        AgentList.map((item, index) => (
                            <AgentsList agentData={item} key={index}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ManageUser;