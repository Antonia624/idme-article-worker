export async function onRequest(context) {
  const { params } = context;
  const dateParam = params.date;
  const sheetUrl = "https://docs.google.com/spreadsheets/d/1lET5b_CyVZJjSJwIBKlZlMC57jR6LUPSRTDfj4kV6gg/gviz/tq?tqx=out:csv";

  const res = await fetch(sheetUrl);
  const csvText = await res.text();

  const [headerLine, ...rows] = csvText.trim().split("\n");
  const headers = headerLine.split(",");

  const articles = rows.map(row => {
    const values = row.split(",");
    const article = {};
    headers.forEach((header, i) => {
      article[header.trim()] = values[i] ? values[i].trim() : "";
    });
    return article;
  }).filter(article => article.date === dateParam);

  return new Response(JSON.stringify({ articles }), {
    headers: { "Content-Type": "application/json" }
  });
}