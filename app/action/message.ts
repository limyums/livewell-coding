import { NewMessage } from "@/type/type";

export const getMessage = async () => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/message`;
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

export const getMessageByUserList = async (id: string) => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/message/list/${id}`;
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

export const getMessageByUser = async (id: string, selectedId: string) => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/message/${id}&${selectedId}`;
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

export const createMessage = async (message: NewMessage) => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/message`;

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return true;
  } catch (error: any) {
    console.error(error);
    throw new Error(`An error occurred: ${error.message}`);
  }
};
