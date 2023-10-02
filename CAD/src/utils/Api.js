export const doTriangulation = (data) => {
  console.log(JSON.stringify(data));
  return fetch("http://localhost:3000", {
    credentials: "include",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка рассчета триангуляции");
  });
};
