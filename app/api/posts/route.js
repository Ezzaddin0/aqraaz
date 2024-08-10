import { auth  } from "../../auth";
import prisma from "../../connect";
import { NextResponse } from "next/server";

// export const GET = async (req) => {
//   const { searchParams } = new URL(req.url);

//   const page = searchParams.get("page");
//   const cat = searchParams.get("cat");
//   const searchQuery = searchParams.get("search");

//   // استرجاع كائن select أو include وتحويله من JSON
//   const selectParam = searchParams.get("select");
//   const includeParam = searchParams.get("include");

//   let select = null;
//   let include = null;

//   if (selectParam) {
//     try {
//       select = JSON.parse(selectParam);
//     } catch (err) {
//       return new NextResponse(
//         JSON.stringify({ message: "Invalid select format" }),
//         { status: 400 }
//       );
//     }
//   }

//   if (includeParam) {
//     try {
//       include = JSON.parse(includeParam);
//     } catch (err) {
//       return new NextResponse(
//         JSON.stringify({ message: "Invalid include format" }),
//         { status: 400 }
//       );
//     }
//   }

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
//     ...(select && { select }), // استخدام select إذا كان موجودًا
//     ...(include && { include }), // استخدام include إذا كان موجودًا
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

// CREATE A POST

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const cat = searchParams.get("cat");
  const searchQuery = searchParams.get("search");
  const includeParam = searchParams.get("include");
  const selectParam = searchParams.get("select");

  const POST_PER_PAGE = 7;

  // Building the query based on available values
  const query = {
    ...(page && { take: POST_PER_PAGE, skip: POST_PER_PAGE * (page - 1) }),
    where: {
      ...(cat && { catSlug: cat }),
      ...(searchQuery && {
        slug: {
          contains: searchQuery,
          mode: 'insensitive',
        }
      }),      
    },
    orderBy: {
      createdAt: 'desc',
    }
  };

  // If include or select parameters are provided, add them to the query
  if (includeParam && !selectParam) {
    query.include = JSON.parse(includeParam);
  } else if (selectParam && !includeParam) {
    query.select = JSON.parse(selectParam);
  } else {
    // Default include fields
    query.include = {
      user: true,
      cat: true,
      comments: {
        include: {
          user: true,
        }
      },
      views: true,
    };
  }

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
      prisma.view.aggregate({
        _sum: {
          id: true, // Assuming 'id' is unique for each view, this will count the total views.
        },
        where: {
          postId: {
            in: (await prisma.post.findMany({
              where: query.where,
              select: { id: true },
            })).map(post => post.id),
          },
        },
      }),
    ]);

    // Calculate the total views for each post
    const totalViews = viewsCount._sum.id || 0;

    return new NextResponse(JSON.stringify({ posts, count, totalViews }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  const session = await auth()

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


// UPDATE a Post
export const PUT = async (req) => {
  const session = await auth();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }), 
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Category ID is required!" }), 
        { status: 400 }
      );
    }

    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: { ...data, userEmail: session.user.email },
      // data: { ...data },
    });

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), 
      { status: 500 }
    );
  }
};

// DELETE a Post
export const DELETE = async (req) => {
  console.log("DELETE request received");
  
  const session = await auth();
  console.log("Session: ", session);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }), 
      { status: 401 }
    );
  }

  try {
    const requestData = await req.json();
    console.log("Request JSON parsed:", requestData);

    const { id } = requestData;

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Post ID is required!" }), 
        { status: 400 }
      );
    }

    // First, delete related View records
    await prisma.view.deleteMany({
      where: { postId: id },
    });
    console.log("Related views deleted for post ID:", id);

    // Then, delete the Post
    const deletedPost = await prisma.post.delete({
      where: { id: id },
    });
    console.log("Post deleted successfully:", deletedPost);

    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully!" }), 
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in DELETE handler:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!", error: err.message }), 
      { status: 500 }
    );
  }
};