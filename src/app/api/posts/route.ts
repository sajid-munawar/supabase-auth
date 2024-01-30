import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  console.log("body", body);
  const user = await prisma.user.create({
    data: { name: body.username, email: body.email },
  });
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Alice",
  //     email: "alice@prisma.io",
  //   },
  // });
  console.log(user);
  return NextResponse.json(user);
}

export async function GET(request: NextRequest, response: NextResponse) {
  const users = await prisma.user.findMany();
  console.log(users);
  return NextResponse.json(users);
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  console.log(body);
  // const users = await prisma.user.findMany();
  const deleteUser = await prisma.user.delete({
    where: {
      id: body,
    },
  });
  console.log("delete res", deleteUser);
  return NextResponse.json("users");
}
