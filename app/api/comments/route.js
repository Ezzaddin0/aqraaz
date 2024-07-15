import prisma from "../../connect";
import { NextResponse } from "next/server";
import { auth } from "../../auth";

// GET ALL COMMENTS OF A POST
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const postSlug = searchParams.get("postSlug");

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A COMMENT
export const POST = async (req) => {
    const session = await auth()

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(comment, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// DELETE A COMMENT
export const DELETE = async (req) => {
  const session = await auth();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }), { status: 401 }
    );
  }

  try {
    const { id } = await req.json();

    console.log(id);
    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Comment ID is required!" }), { status: 400 }
      );
    }

    const comment = await prisma.comment.findUnique({
      where: { id: id },
    });

    if (!comment || comment.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "Not authorized to delete this comment!" }), { status: 403 }
      );
    }

    await prisma.comment.delete({
      where: { id: id },
    });

    return new NextResponse(
      JSON.stringify({ message: "Comment deleted successfully!" }), { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 }
    );
  }
};