import prisma from "../../../connect";
import { NextResponse } from "next/server";
const API_ENDPOINT = "https://data.mongodb-api.com/app/data-gaysilx/endpoint/data/v1/action";
const API_KEY = "LrQxxcEGBwP57LQDSZ61eOI68spn5htYfsTuTPEUAUUdNMtzvyJhuIzDt3yGh8UG";

// GET VIEW COUNT FOR A POST
// export const GET = async (req, { params }) => {
//   const { slug } = params;

//   try {
//     const post = await prisma.post.findUnique({
//       where: { slug },
//     });

//     if (!post) {
//       return new NextResponse(
//         JSON.stringify({ message: "Post not found!" }, { status: 404 })
//       );
//     }

//     const viewCount = await prisma.view.count({
//       where: {
//         postId: post.id,
//       },
//     });

//     return new NextResponse(JSON.stringify({ viewCount }, { status: 200 }));
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };

export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    // الخطوة 1: جلب المنشور بناءً على الـ slug
    const postResponse = await fetch(`${API_ENDPOINT}/findOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        collection: 'Post',
        database: "blog",
        dataSource: "aqraaz",
        filter: { slug: slug },
      }),
    });

    if (!postResponse.ok) {
      return NextResponse.json({ message: 'Post not found!' }, { status: 404 });
    }

    const postData = await postResponse.json();

    if (!postData.document) {
      return NextResponse.json({ message: 'Post not found!' }, { status: 404 });
    }

    const post = postData.document;

    // الخطوة 2: حساب عدد المشاهدات للمنشور
    const viewCountResponse = await fetch(`${API_ENDPOINT}/count`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        collection: 'View',
        database: "blog",
        dataSource: "aqraaz",
        filter: {
          postId: post._id, // استخدام معرف المنشور
        },
      }),
    });

    if (!viewCountResponse.ok) {
      return NextResponse.json({ message: 'Failed to count views!' }, { status: 500 });
    }

    const viewCountData = await viewCountResponse.json();

    return NextResponse.json({ viewCount: viewCountData.count }, { status: 200 });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
};