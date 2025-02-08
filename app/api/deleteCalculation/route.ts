/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Calculation from "../../../models/Calculation";

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const calculationId = searchParams.get("calculationId");
    const userId = searchParams.get("userId");
    if (!calculationId || !userId) {
      return NextResponse.json(
        { error: "Missing required parameters: calculationId and/or userId" },
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
    await Calculation.deleteOne({ _id: calculationId });
    return NextResponse.json(
      { message: "Calculation deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting calculation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
