export type Song = {
  id: number;
  nickname: string;
  youtubeUrl: string;
  comment: string;
  thumbnailUrl: string;
  title: string;
  votes: number;
  voters: string[];
  createdAt: string;
};

type CsvRecord = Record<string, string>;

function parseCsvRows(csv: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let isQuoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const nextChar = csv[index + 1];

    if (char === '"') {
      if (isQuoted && nextChar === '"') {
        value += '"';
        index += 1;
      } else {
        isQuoted = !isQuoted;
      }
      continue;
    }

    if (char === "," && !isQuoted) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !isQuoted) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }

      row.push(value);

      if (row.some((cell) => cell.length > 0)) {
        rows.push(row);
      }

      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  row.push(value);

  if (row.some((cell) => cell.length > 0)) {
    rows.push(row);
  }

  return rows;
}

function rowsToRecords(rows: string[][]) {
  const [headers, ...dataRows] = rows;

  if (!headers) {
    return [];
  }

  return dataRows.map((row) =>
    headers.reduce<CsvRecord>((record, header, index) => {
      record[header.trim()] = row[index]?.trim() ?? "";
      return record;
    }, {})
  );
}

function parseVoters(value: string) {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((voter): voter is string => typeof voter === "string")
      : [];
  } catch {
    return value
      .split(",")
      .map((voter) => voter.trim())
      .filter(Boolean);
  }
}

export function parseSeason1SongsCsv(csv: string): Song[] {
  return rowsToRecords(parseCsvRows(csv)).map((record, index) => ({
    id: Number(record.id) || index + 1,
    createdAt: record.created_at ?? "",
    nickname: record.nickname ?? "",
    youtubeUrl: record.youtube_url ?? "",
    comment: record.comment ?? "",
    thumbnailUrl: record.thumbnail_url ?? "",
    title: record.title ?? "",
    votes: Number(record.votes) || 0,
    voters: parseVoters(record.voters ?? ""),
  }));
}
