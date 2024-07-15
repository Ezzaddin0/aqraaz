import prisma from "../../connect"
import { NextResponse } from "next/server";

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
  // التحقق من وجود params وslug
  if (!params || !params.slug) {
    return NextResponse.json({ message: "Missing slug parameter!" }, { status: 400 });
  }

  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found!" }, { status: 404 });
    }

    const viewCount = await prisma.view.count({
      where: {
        postId: post.id,
      },
    });

    return NextResponse.json({ viewCount }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};