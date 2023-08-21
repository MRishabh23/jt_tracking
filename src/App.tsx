import React from 'react';
import Dashboard from './routes/main/dashboard';

const App: React.FC = () => (
  <div className="h-full bg-gray-50">
    <Dashboard/>
  </div>
);

export default React.memo(App);
