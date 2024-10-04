import { REACT_BASE_LOCAL_URL } from "../../../../config";

export const handleGetSchema = async ({ DB_NAME }) => {
  const apiURL = `${REACT_BASE_LOCAL_URL}/api/connections/${DB_NAME}/schemas`;

  try {
    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching schema:", error);
  }
};
