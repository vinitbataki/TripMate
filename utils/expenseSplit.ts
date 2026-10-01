export type EqualSplitResult = {
  userId: string;
  amount: number;
};

export function calculateEqualSplit(
  totalAmount: number,
  userIds: string[]
): EqualSplitResult[] {
  if (totalAmount <= 0 || userIds.length === 0) {
    return [];
  }

  const totalPaise = Math.round(totalAmount * 100);
  const participantCount = userIds.length;

  const baseShare = Math.floor(
    totalPaise / participantCount
  );

  const remainder = totalPaise % participantCount;

  return userIds.map((userId, index) => {
    const shareInPaise =
      baseShare + (index < remainder ? 1 : 0);

    return {
      userId,
      amount: shareInPaise / 100,
    };
  });
}