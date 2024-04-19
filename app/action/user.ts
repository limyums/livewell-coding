export const getUser = async () => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/user`;

    console.log(baseUrl);
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
