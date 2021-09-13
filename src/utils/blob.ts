/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param useMetric True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param decimal Number of decimal places to display.
 *
 * @return Formatted string.
 */
export const humanReadableFileSize = (
  bytes: number,
  useMetric = false,
  decimal = 1
): string => {
  const threshold = useMetric ? 1000 : 1024;

  if (Math.abs(bytes) < threshold) {
    return `${bytes} B`;
  }

  const units = useMetric
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let unitIndex = -1;
  const round = 10 ** decimal;

  do {
    bytes /= threshold;
    ++unitIndex;
  } while (
    Math.round(Math.abs(bytes) * round) / round >= threshold &&
    unitIndex < units.length - 1
  );

  return `${bytes.toFixed(decimal)} ${units[unitIndex] || ""}`;
};
