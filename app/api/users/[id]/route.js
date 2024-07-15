import { auth } from "../../../auth";
import prisma from "../../../connect";
import { NextResponse } from "next/server";

// export async function GET(req, { params }) {
//   const { id } = req.query;
//   console.log(req);

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id },
//       include: {
//         comments: true, // assuming you have a relation named `comments`
//         Post: true
//       },
//     });

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     return NextResponse.json(user, { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json(
//       { message: "Something went wrong!" },
//       { status: 500 }
//     );
//   }
// }

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        Comment: {
          include: {
            user: true
          }
        }, // assuming you have a relation named `comments`
        Post: {
          include: {
            comments: true
          }
        }
      },
    });

    return new NextResponse(JSON.stringify(user, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// UPDATE a User
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
    // console.log(body);

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required!" }), 
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { ...data },
      // data: { ...data },
    });

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), 
      { status: 500 }
    );
  }
};