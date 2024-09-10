import prisma from "../../connect";
import { NextResponse } from "next/server";
const API_ENDPOINT="https://data.mongodb-api.com/app/data-gaysilx/endpoint/data/v1/action"
const API_KEY ="LrQxxcEGBwP57LQDSZ61eOI68spn5htYfsTuTPEUAUUdNMtzvyJhuIzDt3yGh8UG"

// export const GET = async () => {
//   try {
//     const categories = await prisma.user.findMany({
//       include: {
//         Comment: true
//       }
//     });

//     return new NextResponse(JSON.stringify(categories, { status: 200 }));
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };

export async function GET(req) { 

  const response = await fetch(`${API_ENDPOINT}/aggregate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ejson',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      collection: 'User',
      database: 'blog',
      dataSource: 'aqraaz',
      pipeline: [
        {
          $lookup: {
            from: 'Comment',
            localField: 'email',
            foreignField: 'userEmail',
            as: 'comments',
          },
        },
      ]
    })
  })

  const data = await response.json();
  return NextResponse.json(data);
}