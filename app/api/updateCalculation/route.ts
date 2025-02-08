import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Calculation from "../../../models/Calculation";

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { calculationId, userId, semesters, result } = body;
    if (!calculationId || !userId || !result) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: calculationId, userId, and/or result",
        },
        { status: 400 }
      );
    }
    const calc = await Calculation.findOne({ _id: calculationId, userId });
    if (!calc) {
      return NextResponse.json(
        { error: "Calculation not found" },
        { status: 404 }
      );
    }
    // Update semesters if provided; otherwise, keep existing value.
    calc.semesters = semesters || calc.semesters;
    calc.result = result;
    calc.updatedAt = new Date();
    const updatedCalc = await calc.save();
    return NextResponse.json({ calculation: updatedCalc }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating calculation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
