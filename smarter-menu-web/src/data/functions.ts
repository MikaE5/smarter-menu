export const functionRequest = async (enpoint: string, body?: object) => {
  return await fetch(`/.netlify/functions/${enpoint}`, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
