import { config } from "../../../config";

export const LIMIT = 20;

const normalizeOptions = (data) => {
  const results = data?.results || [];
  return {
    options: results.map((item) => ({
      name: item.Name,
      id: item.objectId,
    })),
    count: data?.count || 0,
  };
};

export const getOptions = async (skip = 0) => {
  try {
    const response = await fetch(
      `${config.apiUrl}/Complete_List_Names?count=1&skip=${skip}&limit=${LIMIT}&keys=Name`,
      {
        headers: config.defaultHeaders,
      }
    );
    const data = await response.json();

    return normalizeOptions(data);
  } catch (err) {
    return {
      options: [],
      count: 0,
    };
  }
};
