import prisma from "../../connect"
import { NextResponse } from "next/server";

// GET VIEW COUNT FOR A POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }, { status: 404 })
      );
    }

    const viewCount = await prisma.view.count({
      where: {
        postId: post.id,
      },
    });

    return new NextResponse(JSON.stringify({ viewCount }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};