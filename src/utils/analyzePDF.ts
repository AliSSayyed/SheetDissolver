import { BalanceSheetData } from "../types";

export async function analyzePDF(
  base64PdfData: string
): Promise<BalanceSheetData> {
  const prompt = `You are a financial data extraction expert. Analyze the provided balance sheet PDF and extract the following values for the CURRENT YEAR ONLY.

Return ONLY a valid JSON object with these exact fields. 
All values execpt for the company name should be numbers, use 0 if not found.
If the company name is not found or you are not sure, return an empty string.
The output should follow this exact format:

{
  "companyName" : string,
  "currentAssets": number,
  "currentLiabilities": number,
  "inventory": number,
  "prepaidExpenses": number,
  "cashAndEquivalents": number,
  "totalLiabilities": number,
  "shareholdersEquity": number,
  "totalAssets": number,
  "longTermDebt": number,
  "fixedAssets": number,
  "accountsReceivable": number
}

Do not include any other text, explanations, or markdown formatting. Return ONLY the JSON object.`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              mimeType: "application/pdf",
              data: base64PdfData,
            },
          },
        ],
      },
    ],
  };

  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Gemini API error: ${error.error?.message || "Unknown error"}`
    );
  }
  const data = await response.json();

  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) {
    throw new Error("No content in API response");
  }

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not parse JSON from API response");
  }

  const extractedData = JSON.parse(jsonMatch[0]);

  const balanceSheetData: BalanceSheetData = {
    companyName: extractedData.companyName ?? "",
    currentAssets: extractedData.currentAssets ?? 0,
    currentLiabilities: extractedData.currentLiabilities ?? 0,
    inventory: extractedData.inventory ?? 0,
    prepaidExpenses: extractedData.prepaidExpenses ?? 0,
    cashAndEquivalents: extractedData.cashAndEquivalents ?? 0,
    totalLiabilities: extractedData.totalLiabilities ?? 0,
    shareholdersEquity: extractedData.shareholdersEquity ?? 0,
    totalAssets: extractedData.totalAssets ?? 0,
    longTermDebt: extractedData.longTermDebt ?? 0,
    fixedAssets: extractedData.fixedAssets ?? 0,
    accountsReceivable: extractedData.accountsReceivable ?? 0,
  };

  return balanceSheetData;
}
