import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PowerIcon } from 'lucide-react';

function App() {
  const [status, setStatus] = useState('off');
  const [isLoading, setIsLoading] = useState(false);

  const ESP32_IP = process.env.ESP32_IP || '';

  const fetchStatus = async () => {
    try {
      const response = await fetch(`http://${ESP32_IP}/status`);
      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const toggleLight = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://${ESP32_IP}/toggle`);
      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      console.error('Error toggling light:', error);
    }
    setIsLoading(false);
    fetchStatus();
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Light Control</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="text-lg font-medium">
          Status: <span className="capitalize">{status}</span>
        </div>
        <Button 
          onClick={toggleLight} 
          disabled={isLoading}
          className={`w-32 ${status === 'on' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-500 hover:bg-gray-600'}`}
        >
          <PowerIcon className="mr-2 h-4 w-4" />
          {isLoading ? 'Toggling...' : 'Toggle'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default App
