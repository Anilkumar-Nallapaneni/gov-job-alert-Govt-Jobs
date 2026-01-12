import React from 'react';

interface Props {
  onStateClick: (stateId: string) => void;
}

const StateSelectionPanel: React.FC<Props> = ({ onStateClick }) => {
  const INDIAN_STATES = [
    { id: 'maharashtra', name: 'Maharashtra', jobs: '12,345' },
    { id: 'up', name: 'Uttar Pradesh', jobs: '10,234' },
    { id: 'karnataka', name: 'Karnataka', jobs: '8,765' },
    { id: 'tamilnadu', name: 'Tamil Nadu', jobs: '7,890' },
    { id: 'delhi', name: 'Delhi', jobs: '6,543' },
    { id: 'westbengal', name: 'West Bengal', jobs: '5,432' },
    { id: 'gujarat', name: 'Gujarat', jobs: '4,321' },
    { id: 'rajasthan', name: 'Rajasthan', jobs: '3,210' },
    { id: 'andhra', name: 'Andhra Pradesh', jobs: '2,987' },
    { id: 'telangana', name: 'Telangana', jobs: '2,876' },
    { id: 'kerala', name: 'Kerala', jobs: '2,765' },
    { id: 'madhyapradesh', name: 'Madhya Pradesh', jobs: '2,654' }
  ];

  const getStateInitials = (stateName: string) => {
    return stateName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="state-selection-panel">
      <div className="state-selection-header">
        <h3>Select a State</h3>
        <p>Choose from popular states</p>
      </div>

      <div className="states-grid">
        {INDIAN_STATES.map((state) => (
          <div
            key={state.id}
            className="state-item"
            onClick={() => onStateClick(state.id)}
          >
            <div className="state-icon">
              {getStateInitials(state.name)}
            </div>
            <span className="state-name">{state.name}</span>
            <span className="state-jobs-count">{state.jobs} Jobs</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StateSelectionPanel;
