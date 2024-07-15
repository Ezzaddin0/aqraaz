import prisma from "../../../connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { user: true, comments: true, views: true },
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }, { status: 404 })
      );
    }

    // Add a view with timestamp
    await prisma.view.create({
      data: {
        postId: post.id,
      },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
