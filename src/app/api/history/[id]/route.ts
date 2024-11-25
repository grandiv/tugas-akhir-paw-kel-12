import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    // Update the history status to "DIBATALKAN"
    const updatedHistory = await prisma.history.update({
      where: { id },
      data: { status: "DIBATALKAN" },
    });

    return NextResponse.json({
      message: "Order cancelled successfully",
      updatedHistory,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return NextResponse.json(
      { error: "Failed to cancel order" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "History ID not provided." },
        { status: 400 }
      );
    }

    // Query untuk mendapatkan satu history berdasarkan ID, termasuk detail user dan items
    const history = await prisma.history.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true, // Detail produk pada setiap item
          },
        },
        user: true, // Detail user terkait history ini
      },
    });

    if (!history) {
      return NextResponse.json(
        { message: "History not found." },
        { status: 404 }
      );
    }

    // Format data untuk dikirimkan ke klien
    const formattedHistory = {
      id: history.id,
      date: history.createdAt.toISOString().split("T")[0],
      status: history.status,
      totalAmount: history.totalAmount,
      user: {
        id: history.user?.id || "Unknown User ID",
        name: history.user?.nama || "Unknown User Name",
        email: history.user?.email || "Unknown Email",
        profilePicture:
          history.user?.profilePicture || "/default-profile.png",
      },
      items: history.items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        product: {
          id: item.product?.id || "Unknown Product ID",
          name: item.product?.name || "Unknown Product Name",
          image: item.product?.image || "/default-image.png",
          price: item.product?.price || 0,
          stock: item.product?.stock || 0,
        },
      })),
    };

    return NextResponse.json(formattedHistory, { status: 200 });
  } catch (error) {
    console.error("Error fetching history:", error);

    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}