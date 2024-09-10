import { auth  } from "../../auth";
import prisma from "../../connect";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
const API_ENDPOINT = "https://data.mongodb-api.com/app/data-gaysilx/endpoint/data/v1/action";
const API_KEY = "LrQxxcEGBwP57LQDSZ61eOI68spn5htYfsTuTPEUAUUdNMtzvyJhuIzDt3yGh8UG";

// export const GET = async (req) => {
//   const { searchParams } = new URL(req.url);

//   const page = searchParams.get("page");
//   const cat = searchParams.get("cat");
//   const searchQuery = searchParams.get("search");

//   const POST_PER_PAGE = 9;

//   const query = {
//     ...(page && { take: POST_PER_PAGE, skip: POST_PER_PAGE * (page - 1) }),
//     where: {
//       ...(cat && { catSlug: cat }),
//       ...(searchQuery && {
//         slug: {
//           contains: searchQuery,
//           mode: 'insensitive',
//         }
//       }),
//     },
//     include: {
//       user: true,
//       cat: true,
//       comments: {
//         include: {
//           user: true,
//         }
//       },
//       views: true,
//     },
//     orderBy: {
//       createdAt: 'desc',
//     }
//   };

//   try {
//     const [posts, count] = await prisma.$transaction([
//       prisma.post.findMany(query),
//       prisma.post.count({ where: query.where }),
//     ]);
//     return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };

// this is new code but have same problem if deployed
// export const GET = async (req) => {
//   const { searchParams } = new URL(req.url);
//   const page = searchParams.get("page");
//   const cat = searchParams.get("cat");
//   const searchQuery = searchParams.get("search");
//   const includeParam = searchParams.get("include");
//   const selectParam = searchParams.get("select");

//   const POST_PER_PAGE = 7;

//   // Building the query based on available values
//   const query = {
//     ...(page && { take: POST_PER_PAGE, skip: POST_PER_PAGE * (page - 1) }),
//     where: {
//       ...(cat && { catSlug: cat }),
//       ...(searchQuery && {
//         slug: {
//           contains: searchQuery,
//           mode: 'insensitive',
//         }
//       }),      
//     },
//     orderBy: {
//       createdAt: 'desc',
//     }
//   };

//   // If include or select parameters are provided, add them to the query
//   if (includeParam && !selectParam) {
//     query.include = JSON.parse(includeParam);
//   } else if (selectParam && !includeParam) {
//     query.select = JSON.parse(selectParam);
//   } else {
//     // Default include fields
//     query.include = {
//       user: true,
//       cat: true,
//       comments: {
//         include: {
//           user: true,
//         }
//       },
//       views: true,
//     };
//   }

//   try {
//     const [posts, count] = await prisma.$transaction([
//       prisma.post.findMany(query),
//       prisma.post.count({ where: query.where }),
//       // prisma.view.aggregate({
//       //   _sum: {
//       //     id: true, // Assuming 'id' is unique for each view, this will count the total views.
//       //   },
//       //   where: {
//       //     postId: {
//       //       in: (await prisma.post.findMany({
//       //         where: query.where,
//       //         select: { id: true },
//       //       })).map(post => post.id),
//       //     },
//       //   },
//       // }),
//     ]);

//     // Calculate the total views for each post
//     // const totalViews = viewsCount._sum.id || 0;

//     return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };

// export async function GET() {
//   const response = await fetch(`${API_ENDPOINT}/aggregate`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/ejson',
//       'api-key': API_KEY,
//     },
//     body: JSON.stringify({
//       collection: 'Post',
//       database: 'blog',
//       dataSource: 'aqraaz',
//       pipeline: [
//         {
//           $lookup: {
//             from: 'View',
//             localField: '_id',
//             foreignField: 'postId',
//             as: 'postViews',
//           },
//         },
//         {
//           $project: {
//             _id: 1,
//             title: 1,
//             desc: 1,
//             body: 1,
//             keywords: 1,
//             img: 1,
//             catSlug: 1,
//             userEmail: 1,
//             createdAt: 1,
//             updatedAt: 1,
//             postViews: 1,
//           },
//         },
//       ],
//     }),
//   });

//   const data = await response.json();
//   return NextResponse.json(data);
// }

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get('locale') || 'en'; 
  const fields = searchParams.get('fields') ? searchParams.get('fields').split(',') : []; 
  const categories = searchParams.get('categories') ? searchParams.get('categories').split(',') : []; 
  const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit')) : null; // null if no limit provided
  const page = parseInt(searchParams.get('page')) || 1; // current page
  const query = searchParams.get('q'); // get the search query  

  const skip = (page - 1) * (limit || 0); // calculate skip based on page and limit

  let projectStage = {
    _id: 1,
    slug: 1,
    img: 1,
    catSlug: 1,
    userEmail: 1,
    createdAt: 1,
    updatedAt: 1,
    [`title.${locale}`]: 1,
    [`desc.${locale}`]: 1,
    [`body.${locale}`]: 1,
    [`keywords.${locale}`]: 1,
    views: 1,  // Keep the detailed post views
    comments: 1,
  };

  if (fields.length > 0) {
    projectStage = fields.reduce((acc, field) => {
      acc[field] = 1;
      return acc;
    }, {});
  }

  let matchStage = {};

  if (categories.length > 0) {
    matchStage = {
      catSlug: { $in: categories },
    };
  }
  // Add search functionality for 'q' on title fields (en and ar)
  if (query) {
    matchStage.$or = [
      { 'title.en': { $regex: query, $options: 'i' } },  // Case-insensitive search in English title
      { 'title.ar': { $regex: query, $options: 'i' } },  // Case-insensitive search in Arabic title
    ];
  }

  const pipeline = [
    {
      $match: matchStage, // Filter by categories if provided
    },
    {
      $lookup: {
        from: 'View',
        localField: '_id',
        foreignField: 'postId',
        as: 'views',
      },
    },
    {
      $lookup: {
        from: 'Comment',
        localField: 'slug',
        foreignField: 'postSlug',
        as: 'comments',
      },
    },
    {
      $addFields: {
        totalPostViews: { $size: "$views" } // حساب عدد العناصر في المصفوفة postViews
      },
    },
    {
      $project: {
        ...projectStage,  // جميع الحقول المطلوبة
        totalPostViews: 1 // التأكد من تضمين الحقل في العرض النهائي
      }
    },
    {
      $sort: { createdAt: -1 }, // Sort by latest posts
    },
  ];

  // إضافة مرحلة الـ $skip إذا تم توفير limit
  if (limit) {
    pipeline.push(
      {
        $skip: skip, // Skip posts based on pagination
      },
      {
        $limit: limit, // Limit number of posts per page
      }
    );
  }

  const response = await fetch(`${API_ENDPOINT}/aggregate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ejson',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      collection: 'Post',
      database: 'blog',
      dataSource: 'aqraaz',
      pipeline: pipeline,
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}

// CREATE A POST

// export const POST = async (req) => {
//   const session = await auth()

//   if (!session) {
//     return new NextResponse(
//       JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
//     );
//   }

//   try {
//     const body = await req.json();
//     const post = await prisma.post.create({
//       data: { ...body, userEmail: session.user.email },
//     });

//     return new NextResponse(JSON.stringify(post, { status: 200 }));
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };
export async function POST(req) {
  const body = await req.json();

  const response = await fetch(`${API_ENDPOINT}/insertOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      collection: 'Post',
      database: 'blog',
      dataSource: 'aqraaz',
      document: {
        _id: uuidv4(),
        ...body,
        userEmail: "ezoozm24@gmail.com",
        updatedAt: new Date().toISOString(),
      },
    }),
  });

  const result = await response.json();
  return NextResponse.json(result);
}

// UPDATE a Post
export async function PUT(req)  {
  const body = await req.json();

  const response = await fetch(`${API_ENDPOINT}/updateOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      collection: 'Post',
      database: 'blog',
      dataSource: 'aqraaz',
      filter: {_id: body._id},
      update: {
        $set: {
          ...body, // Spread the existing request body for the update
          userEmail: 'ezoozm24@gmail.com',
          updatedAt: new Date().toISOString(), // Set the `updatedAt` field
        },
      },
    }),
  });

  const result = await response.json();
  return NextResponse.json(result);
};

// DELETE a Post
// export const DELETE = async (req) => {
//   console.log("DELETE request received");
  
//   const session = await auth();
//   console.log("Session: ", session);

//   if (!session) {
//     return new NextResponse(
//       JSON.stringify({ message: "Not Authenticated!" }), 
//       { status: 401 }
//     );
//   }

//   try {
//     const requestData = await req.json();
//     console.log("Request JSON parsed:", requestData);

//     const { id } = requestData;

//     if (!id) {
//       return new NextResponse(
//         JSON.stringify({ message: "Post ID is required!" }), 
//         { status: 400 }
//       );
//     }

//     // First, delete related View records
//     await prisma.view.deleteMany({
//       where: { postId: id },
//     });
//     console.log("Related views deleted for post ID:", id);

//     // Then, delete the Post
//     const deletedPost = await prisma.post.delete({
//       where: { id: id },
//     });
//     console.log("Post deleted successfully:", deletedPost);

//     return new NextResponse(
//       JSON.stringify({ message: "Post deleted successfully!" }), 
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("Error in DELETE handler:", err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!", error: err.message }), 
//       { status: 500 }
//     );
//   }
// };

export async function DELETE(req) {
  const requestData = await req.json();
  const { id } = requestData;

  const response = await fetch(`${process.env.API_ENDPOINT}/deleteOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ejson',
      'api-key': process.env.API_KEY,
    },
    body: JSON.stringify({
      collection: 'Post',
      database: 'blog',
      dataSource: 'aqraaz',
      filter: {"_id": id}
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}