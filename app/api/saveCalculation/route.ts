import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Calculation from "../../../models/Calculation";

export async function POST(request: Request) {
  try {
    // Connect using mongoose
    await connectToDatabase();
    const body = await request.json();
    const { userId, semesters, result } = body;
    if (!userId || !semesters || !result) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const newCalculation = new Calculation({
      userId,
      semesters,
      result,
    });
    const savedCalc = await newCalculation.save();
    return NextResponse.json({ calculation: savedCalc }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error saving calculation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
