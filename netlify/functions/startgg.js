export async function handler(event) {
  const slug = event.queryStringParameters?.slug || "tournament/blossom";

  const res = await fetch("https://api.start.gg/gql/alpha", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.STARTGG_TOKEN}`
    },
    body: JSON.stringify({
      query: `
        query TournamentQuery($slug: String!) {
          tournament(slug: $slug) {
            name
            numAttendees
            startAt
            events {
              name
              numEntrants
            }
          }
        }
      `,
      variables: { slug }
    })
  });

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
