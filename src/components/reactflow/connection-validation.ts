import { Connection } from "@xyflow/react";

const HANDLE_TYPES: Record<
  string,
  string
> = {
  text: "TEXT",

  image: "IMAGE",

  prompt: "TEXT",

  response: "TEXT"
};

export function isValidConnectionType(
  connection: Connection
) {
  const sourceType =
    HANDLE_TYPES[
      connection.sourceHandle ?? ""
    ];

  const targetType =
    HANDLE_TYPES[
      connection.targetHandle ?? ""
    ];

  if (
    !sourceType ||
    !targetType
  ) {
    return false;
  }

  return sourceType === targetType;
}