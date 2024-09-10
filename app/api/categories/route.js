import { auth } from "../../auth";
import prisma from "../../connect";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
const API_ENDPOINT = "https://data.mongodb-api.com/app/data-gaysilx/endpoint/data/v1/action";
const API_KEY = "LrQxxcEGBwP57LQDSZ61eOI68spn5htYfsTuTPEUAUUdNMtzvyJhuIzDt3yGh8UG";

// GET ALL Categories old
// export const GET = async (req) => {
//   const { searchParams } = new URL(req.url);

//   const slug = searchParams.get("slug");
//   try {
//     const categories = await prisma.category.findMany({
//       include: {
//         posts: {
//           include: {
//             views: true,
//             comments: true
//           }
//         },
//       },
//       where: slug ? { slug: slug } : {},
//     });

//     return new NextResponse(JSON.stringify(categories), { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };

// CREATE A Category
// export const GET = async (req) => {
//   const { searchParams } = new URL(req.url);

//   const slug = searchParams.get("slug");
//   const includeParam = searchParams.get("include");
//   const selectParam = searchParams.get("select");

//   let queryOptions = { where: slug ? { slug: slug } : {} };

//   if (includeParam && !selectParam) {
//     queryOptions.include = JSON.parse(includeParam);
//   } else if (selectParam && !includeParam) {
//     queryOptions.select = JSON.parse(selectParam);
//   }

//   try {
//     const categories = await prisma.category.findMany(queryOptions);

//     return new NextResponse(JSON.stringify(categories), { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };

// export const GET = async (req) => {
//   const { searchParams } = new URL(req.url);

//   const slug = searchParams.get("slug");
//   const includeParam = searchParams.get("include");
//   const selectParam = searchParams.get("select");

//   // Default include options
//   const defaultInclude = {
//     posts: {
//       include: {
//         views: true,
//         comments: true,
//       },
//     },
//   };

//   let queryOptions = { where: slug ? { slug: slug } : {} };

//   if (includeParam && !selectParam) {
//     const customInclude = JSON.parse(includeParam);
//     queryOptions.include = { ...defaultInclude, ...customInclude };
//   } else if (!includeParam && !selectParam) {
//     queryOptions.include = defaultInclude;
//   } else if (selectParam && !includeParam) {
//     queryOptions.select = JSON.parse(selectParam);
//   }

//   try {
//     const categories = await prisma.category.findMany(queryOptions);
//     return new NextResponse(JSON.stringify(categories), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const locale = searchParams.get('locale') || 'en'; // اللغة الافتراضية هي الإنجليزية
//   const fields = searchParams.get('fields') ? searchParams.get('fields').split(',') : []; // الحقول المطلوبة

//   // بناء مرحلة المشروع حسب الحقول المطلوبة
//   let projectStage = {
//     _id: 1,
//     slug: 1,
//     img: 1,
//     userEmail: 1,
//     createdAt: 1,
//     updatedAt: 1,
//     [`title.${locale}`]: 1, // العنوان باللغة المحددة
//     [`desc.${locale}`]: 1,  // الوصف باللغة المحددة
//     [`keywords.${locale}`]: 1, // الكلمات المفتاحية باللغة المحددة
//     postViews: 1,
//   };

//   // تحديث الحقول بناءً على المدخلات إذا تم تمريرها
//   if (fields.length > 0) {
//     projectStage = fields.reduce((acc, field) => {
//       acc[field] = 1;
//       return acc;
//     }, {});
//   }

//   const response = await fetch(`${API_ENDPOINT}/find`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/ejson',
//       'api-key': API_KEY,
//     },
//     body: JSON.stringify({
//       collection: 'Category',
//       database: 'blog',
//       dataSource: 'aqraaz',
//       projection: projectStage, // استخدام الإسقاط بدلاً من $project
//     }),
//   });

//   const data = await response.json();
//   return NextResponse.json(data);
// }

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get('locale'); // اللغة الافتراضية هي الإنجليزية
  const fields = searchParams.get('fields') ? searchParams.get('fields').split(',') : []; // الحقول المطلوبة
  const categories = searchParams.get('categories') ? searchParams.get('categories').split(',') : [];   

  let matchStage = {};

  if (categories.length > 0) {
    matchStage = {
      slug: { $in: categories },
    };
  }

  // بناء مرحلة المشروع حسب الحقول المطلوبة
  let projectStage = {
    _id: 1,
    slug: 1,
    img: 1,
    userEmail: 1,
    createdAt: 1,
    updatedAt: 1,
    postViews: 1,
    posts: {
      _id: 1,
      title: 1,
      slug: 1,
      keywords: 1,
      desc: 1,
      views: 1, // المشاهدات لكل منشور
      comments: 1, // التعليقات لكل منشور
    },
  };

  // إذا تم تمرير اللغة، نعرض فقط العنوان، الوصف، والكلمات المفتاحية الخاصة بها
  if (locale) {
    projectStage[`title.${locale}`] = 1;
    projectStage[`desc.${locale}`] = 1;
    projectStage[`keywords.${locale}`] = 1;
  } else {
    // إذا لم يتم تمرير لغة، نعرض الحقول لجميع اللغات المتاحة
    projectStage['title'] = 1;
    projectStage['desc'] = 1;
    projectStage['keywords'] = 1;
  }

  // تحديث الحقول بناءً على المدخلات إذا تم تمريرها
  if (fields.length > 0) {
    projectStage = fields.reduce((acc, field) => {
      acc[field] = 1;
      return acc;
    }, {});
  }

  const response = await fetch(`${API_ENDPOINT}/aggregate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ejson',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      collection: 'Category',
      database: 'blog',
      dataSource: 'aqraaz',
      pipeline: [
        {
          $match: matchStage, 
        },
        {
          $lookup: {
            from: 'Post',
            localField: 'slug',
            foreignField: 'catSlug',
            as: 'posts',
          },
        },
        {
          $lookup: {
            from: 'View',
            localField: 'posts._id',
            foreignField: 'postId',
            as: 'views',
          },
        },
        {
          $lookup: {
            from: 'Comment',
            localField: 'posts.slug',
            foreignField: 'postSlug',
            as: 'comments',
          },
        },
        {
          $project: projectStage, 
        },
      ],
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();

  const response = await fetch(`${API_ENDPOINT}/insertOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      collection: 'Category',
      database: 'blog',
      dataSource: 'aqraaz',
      document: {
        // _id: uuidv4(),
        ...body,
        userEmail: "ezoozm24@gmail.com",
        updatedAt: new Date().toISOString(),
      },
    }),
  });

  const result = await response.json();
  return NextResponse.json(result);
};

// UPDATE a Category
// export const PUT = async (req) => {
//   const session = await auth();

//   if (!session) {
//     return new NextResponse(
//       JSON.stringify({ message: "Not Authenticated!" }), 
//       { status: 401 }
//     );
//   }

//   try {
//     const body = await req.json();
//     const { id, ...data } = body;

//     if (!id) {
//       return new NextResponse(
//         JSON.stringify({ message: "Category ID is required!" }), 
//         { status: 400 }
//       );
//     }

//     const updatedCategory = await prisma.category.update({
//       where: { id: id },
//       // data: { ...data, userEmail: session.user.email },
//       data: { ...data },
//     });

//     return new NextResponse(JSON.stringify(updatedCategory), { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }), 
//       { status: 500 }
//     );
//   }
// };
export async function PUT(req) {
  // const session = await auth();

  // if (!session) {
  //   return new NextResponse(
  //     JSON.stringify({ message: "Not Authenticated!" }), 
  //     { status: 401 }
  //   );
  // }

  const body = await req.json();

  const response = await fetch(`${API_ENDPOINT}/updateOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      collection: 'Category',
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

// DELETE a Category
// export const DELETE = async (req) => {
//   const session = await auth();

//   if (!session) {
//     return new NextResponse(
//       JSON.stringify({ message: "Not Authenticated!" }), 
//       { status: 401 }
//     );
//   }

//   try {
//     const body = await req.json();
//     const { id } = body;

//     if (!id) {
//       return new NextResponse(
//         JSON.stringify({ message: "Category ID is required!" }), 
//         { status: 400 }
//       );
//     }

//     await prisma.category.delete({
//       where: { id: id },
//     });

//     return new NextResponse(JSON.stringify({ message: "Category deleted successfully!" }), { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }), 
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
      collection: 'Category',
      database: 'blog',
      dataSource: 'aqraaz',
      filter: {"_id": id}
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}