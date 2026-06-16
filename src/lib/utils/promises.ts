export async function sleep(
  ms: number
): Promise<void> {
  await new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

export async function settle<T>(
  promises: Promise<T>[]
) {
  return Promise.allSettled(promises);
}