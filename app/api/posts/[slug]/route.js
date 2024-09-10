import prisma from "../../../connect";
import { NextResponse } from "next/server";
import crypto from 'crypto';
const API_ENDPOINT = "https://data.mongodb-api.com/app/data-gaysilx/endpoint/data/v1/action";
const API_KEY = "LrQxxcEGBwP57LQDSZ61eOI68spn5htYfsTuTPEUAUUdNMtzvyJhuIzDt3yGh8UG";

// GET SINGLE POST
// export const GET = async (req, { params }) => {
//   const { slug } = params;
  

//   try {
//     const post = await prisma.post.findUnique({
//       where: { slug },
//       include: { user: true, comments: true, views: true },
//     });

//     if (!post) {
//       return new NextResponse(
//         JSON.stringify({ message: "Post not found!" }, { status: 404 })
//       );
//     }

//     // Add a view with timestamp
//     await prisma.view.create({
//       data: {
//         postId: post.id,
//       },
//     });

//     return new NextResponse(JSON.stringify(post, { status: 200 }));
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };

export async function GET(req, { params }) {
  const { slug } = params;

  // مرحلة $match للعثور على المنشور المطلوب حسب slug
  const pipeline = [
    {
      $match: { slug: slug }
    },
    {
      $lookup: {
        from: 'User',
        localField: 'userEmail',
        foreignField: 'email',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $lookup: {
        from: 'View',
        localField: '_id',
        foreignField: 'postId',
        as: 'views'
      }
    }
  ];

  // 1. جلب بيانات المنشور والمشاهدات
  const response = await fetch(`${API_ENDPOINT}/aggregate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      collection: 'Post',
      database: 'blog',
      dataSource: 'aqraaz',
      pipeline: pipeline,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Post, user, or views not found' }, { status: 404 });
  }

  const data = await response.json();
  const post = data.documents[0]; // تأكد من أن المنشور موجود

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // 2. توليد _id عشوائي لمشاهدة جديدة
  const newViewId = crypto.randomUUID();

  // 3. إضافة مشاهدة جديدة لزيادة عدد المشاهدات
  const responseView = await fetch(`${API_ENDPOINT}/insertOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      collection: 'View',
      database: 'blog',
      dataSource: 'aqraaz',
      document: {
        _id: newViewId,            // _id عشوائي
        createdAt: new Date(),     // تاريخ إنشاء المشاهدة
        postId: post._id,          // استخدام _id الخاص بالمنشور كـ postId
      }
    }),
  });

  if (!responseView.ok) {
    return NextResponse.json({ error: 'Failed to increase views' }, { status: 500 });
  }

  // 4. إعادة البيانات مع المشاهدات الجديدة
  return NextResponse.json(post);
}