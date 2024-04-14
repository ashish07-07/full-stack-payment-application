"use server";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
export async function CreateOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);

  const token = Math.random().toString();

  const userId = session.user.id;

  if (!userId) {
    return {
      message: "User not logged in ",
    };
  }
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount,
      status: "Processing",
      startTime: new Date(),
      provider,
      token: token,
    },
  });
  return { message: "Error Creating on Ramp" };
}
