export async function executeBatch<T>(
  tasks: (() => Promise<T>)[]
) {
  return Promise.allSettled(
    tasks.map((task) => task())
  );
}