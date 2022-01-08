import './AgentList.css';

import React from 'react';
import ResultField from '../ResultField/ResultField';

function AgentsList({agentData}){
    return(
        <div className="agent-list-wrapper">

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