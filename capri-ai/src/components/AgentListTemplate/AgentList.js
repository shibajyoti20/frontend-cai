import React from 'react';
import '../LinkedAccountItem/LinkedAccountItem.css';

import ResultField from '../ResultField/ResultField';

function AgentsList({agentData}){
    return(
        <div className="linked-account-wrapper">

            {/* Agent ID */}
            {
                agentData !== undefined &&
                <ResultField FieldLabel={"Agent_ID: "} 
                FieldContent={agentData}/>
            }

        </div>
    );
}

export default AgentsList;