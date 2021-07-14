import React from 'react';
import '../LinkedAccountItem/LinkedAccountItem.css';

import ResultField from '../ResultField/ResultField';

function AgentsList({agentData}){
    return(
        <div className="linked-account-wrapper">

            {/* Agent ID */}
            {
                agentData.Agent_ID !== undefined &&
                <ResultField FieldLabel={"Agent_ID: "} 
                FieldContent={agentData.Agent_ID}/>
            }

        </div>
    );
}

export default AgentsList;