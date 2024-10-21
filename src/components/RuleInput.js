// src/components/RuleInput.js
import React, { useState } from 'react';
import axios from 'axios';

const RuleInput = ({ onRuleAdded }) => {
  const [ruleString, setRuleString] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/rules', { rule_string: ruleString });
      onRuleAdded(response.data); // Notify parent of new rule
      setRuleString(''); // Clear input
    } catch (error) {
      console.error("Error adding rule:", error);
      // Handle error (e.g., display message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        placeholder="Enter your rule here..."
        required
      />
      <button type="submit">Add Rule</button>
    </form>
  );
};

export default RuleInput;
