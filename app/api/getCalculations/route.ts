import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Calculation from "../../../models/Calculation";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "Missing required parameter: userId" },
        { status: 400 }
      );
    }
    const calculations = await Calculation.find({ userId }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ calculations }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching calculations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
