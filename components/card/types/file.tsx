import React, { FC, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

import { Blob } from "../../../src/api/query";

export interface Properties {
  blob: Blob;
  onLoad?: () => void;
}

export const FileCard: FC<Properties> = ({ blob, onLoad }) => {
  useEffect(() => {
    onLoad?.();
  }, []);

  return (
    <div>
      <FontAwesomeIcon icon={faFile} size="10x" />
      <span>{blob.meta.name}</span>
    </div>
  );
};
