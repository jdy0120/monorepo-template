const showMemoryUsage = () => {
  type Unit = keyof typeof convertBytesTo;

  const convertBytesTo = {
    KB: (bytes: number) => bytes / 1024, // 10^3 Bytes
    MB: (bytes: number) => convertBytesTo.KB(bytes) / 1024, // 10^6 Bytes
    GB: (bytes: number) => convertBytesTo.MB(bytes) / 1024, // 10^9 Bytes
    TB: (bytes: number) => convertBytesTo.GB(bytes) / 1024, // 10^12 Bytes
    PB: (bytes: number) => convertBytesTo.TB(bytes) / 1024, // 10^15 Bytes
    EB: (bytes: number) => convertBytesTo.PB(bytes) / 1024, // 10^18 Bytes
    ZB: (bytes: number) => convertBytesTo.EB(bytes) / 1024, // 10^21 Bytes
    YB: (bytes: number) => convertBytesTo.ZB(bytes) / 1024, // 10^24 Bytes
  };

  const toHuman = (bytes: number, unit: Unit) =>
    `${convertBytesTo[unit](bytes).toFixed(2)}${unit}`;
  const memory = process.memoryUsage();
  const usedHeap = toHuman(memory.heapUsed, "MB");
  const totalHeap = toHuman(memory.heapTotal, "MB");
  const rss = toHuman(memory.rss, "MB"); // RSS: Resident Set Size

  return `Used ${usedHeap} of ${totalHeap} - RSS: ${rss}`;
};

export { showMemoryUsage };
