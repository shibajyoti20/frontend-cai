import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './ManageUser.css';

import CustomButton from '../../components/button/Button';
import LinkedAccountItem from '../../components/LinkedAccountItem/LinkedAccountItem';

function ManageUser(){
    const[agentid, setAgentid] = React.useState('');
    const[LinkedAccounts, setLinkedAccounts] = React.useState([]);

    // States For Filters
    const[StartDate, setStartDate] = React.useState('');
    const[EndDate, setEndDate] = React.useState('');


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

    function onDatepickerRef(el) { 
        if (el && el.input) { 
            el.input.readOnly = true; 
        } 
    }

    const SubmitHandler = async(e) => {
        e.preventDefault();

        let listElement = document.getElementById('account-list-area');
        let BaseUrl = `https://systems.capriai.us/listAllAccounts?agentID=${agentid}`;


        if(DateFormatter(EndDate) === '1970-01-01') setEndDate('');
        if(DateFormatter(StartDate) === '1970-01-01') setStartDate('');

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
        
        try{
            if(listElement !== null){
                listElement.innerText = "Loading...";
            }

            const response = await axios.get(BaseUrl);
            if(response.status === 200){
                setLinkedAccounts(response.data);
            }else{
                throw new Error("404");
            }
        }catch(err){
            listElement.innerText = "No Result";
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
                            <input type="text" placeholder="Enter Your DialogFlow Agent ID Here"
                            className="form-control agentid-formfield" 
                            value={agentid} 
                            onChange={(e) => setAgentid(e.target.value)}
                            required/>
                        </div>
                        <div className="form-group">
                            <CustomButton type={"submit"} 
                            classname={"form-control agentid-btn"}
                            buttonText={"List Connected Accounts"}/>
                        </div>
                    </form>

                    {/* Date Filters */}
                    <div className="filter-wrapper">
                        <div className="filter-header-wrapper">
                            <div className="filter-header"><b>Filters</b></div>
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
                    {LinkedAccounts.length !== 0 &&
                        <div className="result-number-wrapper">
                            <span className="result-section-sideheader">
                                {LinkedAccounts.length} matching results
                            </span>
                        </div>
                    }   
                    {LinkedAccounts.length === 0 ? 
                    
                    <div className="status-text">
                        <h4 id="account-list-area">No Results</h4>
                    </div>
                    :
                    LinkedAccounts.map((item, index) => (
                        <LinkedAccountItem accountData={item} key={index}/>
                    ))
                    
                    }
                </div>
            </div>
        </div>
    )
}

export default ManageUser;