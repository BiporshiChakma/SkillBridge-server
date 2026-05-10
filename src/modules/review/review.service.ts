import { prisma } from "../../lib/prisma";

const createReview = async (
  data: { bookingId: string; rating: number; comment?: string },
  userId: string
) => {
  // check booking exists
  const booking = await prisma.booking.findUnique({
    where: {
      id: data.bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const review = await prisma.review.create({
    data: {
      bookingId: data.bookingId,
      rating: data.rating,
      comment: data.comment??null,
      studentId: userId,
      tutorId: booking.tutorId,
    },
  });

  return review;
};

export const ReviewService = {
  createReview
}