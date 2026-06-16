import {
  CONNECTION_COMPATIBILITY
} from "@/lib/constants/node-types";

import { PortType } from "@/lib/types/node.types";

export function isConnectionValid(
  sourceType: PortType,
  targetType: PortType
): boolean {
  return (
    CONNECTION_COMPATIBILITY[
      sourceType
    ]?.includes(targetType) ?? false
  );
}