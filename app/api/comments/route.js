import prisma from "../../connect";
import { NextResponse } from "next/server";
import { auth } from "../../auth";
// const API_ENDPOINT= "https://data.mongodb-api.com/app/data-gaysilx/endpoint/data/v1/action"
// const API_KEY = "LrQxxcEGBwP57LQDSZ61eOI68spn5htYfsTuTPEUAUUdNMtzvyJhuIzDt3yGh8UG"

// GET ALL COMMENTS OF A POST
// export const GET = async (req) => {
//   const { searchParams } = new URL(req.url);

//   const postSlug = searchParams.get("postSlug");

//   try {
//     const comments = await prisma.comment.findMany({
//       where: {
//         ...(postSlug && { postSlug }),
//       },
//       include: { user: true },
//     });

//     return new NextResponse(JSON.stringify(comments, { status: 200 }));
//   } catch (err) {
//     // console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };

export async function GET(req) {  
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");

  let matchStage = {};
  if (postSlug) {
    matchStage = { "postSlug": postSlug };
  }

  const response = await fetch(`${process.env.API_ENDPOINT}/aggregate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ejson',
      'api-key': process.env.API_KEY,
    },
    body: JSON.stringify({
      collection: 'Comment',
      database: 'blog',
      dataSource: 'aqraaz',
      pipeline: [
        {
          "$match": matchStage
        },
        {
          $lookup: {
            from: 'User',
            localField: 'userEmail',
            foreignField: 'email',
            as: 'user',
          },
        },
      ],
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}

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