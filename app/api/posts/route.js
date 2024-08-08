import { auth  } from "../../auth";
import prisma from "../../connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");
  const searchQuery = searchParams.get("search");

  // استرجاع كائن select أو include وتحويله من JSON
  const selectParam = searchParams.get("select");
  const includeParam = searchParams.get("include");

  let select = {};
  let include = {};

  if (selectParam) {
    try {
      select = JSON.parse(selectParam);
    } catch (err) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid select format" }),
        { status: 400 }
      );
    }
  }

  if (includeParam) {
    try {
      include = JSON.parse(includeParam);
    } catch (err) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid include format" }),
        { status: 400 }
      );
    }
  }

  const POST_PER_PAGE = 9;

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
    ...(Object.keys(select).length > 0 && { select }), // استخدام select إذا كان موجودًا
    ...(Object.keys(include).length > 0 && { include }), // استخدام include إذا كان موجودًا
    orderBy: {
      createdAt: 'desc',
    }
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// CREATE A POST
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