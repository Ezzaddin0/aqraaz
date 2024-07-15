import { auth } from "../../auth";
import prisma from "../../connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const slug = searchParams.get("slug");
  try {
    const categories = await prisma.category.findMany({
      include: {
        posts: {
          include: {
            views: true,
            comments: true
          }
        },
      },
      where: slug ? { slug: slug } : {},
    });

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// CREATE A Category
export const POST = async (req) => {
  const session = await auth()

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const category = await prisma.category.create({
      data: { ...body, userEmail: session.user.email },
      // data: { ...body },
    });

    return new NextResponse(JSON.stringify(category, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// UPDATE a Category
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

    const updatedCategory = await prisma.category.update({
      where: { id: id },
      // data: { ...data, userEmail: session.user.email },
      data: { ...data },
    });

    return new NextResponse(JSON.stringify(updatedCategory), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), 
      { status: 500 }
    );
  }
};

// DELETE a Category
export const DELETE = async (req) => {
  const session = await auth();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }), 
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Category ID is required!" }), 
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id: id },
    });

    return new NextResponse(JSON.stringify({ message: "Category deleted successfully!" }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), 
      { status: 500 }
    );
  }
};