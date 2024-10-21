// src/App.js
import React, { useEffect, useState } from 'react';
import RuleInput from './components/RuleInput';
import RuleList from './components/RuleList';
import axios from 'axios';

const App = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get('/rules');
        setRules(response.data.rules);
      } catch (error) {
        console.error("Error fetching rules:", error);
      }
    };

    fetchRules();
  }, []);

  const handleRuleAdded = (newRule) => {
    setRules((prevRules) => [...prevRules, newRule]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/rules/${id}`);
      setRules((prevRules) => prevRules.filter((rule) => rule.id !== id));
    } catch (error) {
      console.error("Error deleting rule:", error);
    }
  };

  return (
    <div>
      <h1>Rule Engine</h1>
      <RuleInput onRuleAdded={handleRuleAdded} />
      <RuleList rules={rules} onDelete={handleDelete} />
    </div>
  );
};

export default App;
