// src/hooks/useComplianceCheck.tsx
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const API_URL = 'https://api.circle.com/v1/w3s/compliance/screening/addresses';
const API_KEY = 'YOUR_ACTUAL_API_KEY'; // Replace with the actual API key

interface ComplianceResult {
  address: string;
  status: string;
  details: string;
}

export const useComplianceCheck = () => {
  const [results, setResults] = useState<ComplianceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkCompliance = async (addresses: string[], chain: string = 'AVAX-FUJI') => {
    setLoading(true);
    setError(null);

    const complianceResults: ComplianceResult[] = [];
    for (const address of addresses) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            address,
            chain,
            idempotencyKey: uuidv4()
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        complianceResults.push({
          address,
          status: data.status,
          details: data.details || "No additional information"
        });
      } catch (err) {
        setError(`Error with address ${address}: ${err}`);
      }
    }

    setResults(complianceResults);
    setLoading(false);
  };

  return { results, checkCompliance, loading, error };
};
