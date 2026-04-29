import { Download } from "lucide-react";
import type { RefObject } from "react";
import { exportElementToPng } from "../lib/export";

type ExportButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
};

export const ExportButton = ({ targetRef }: ExportButtonProps) => {
  return (
    <button
      type="button"
      onClick={async () => {
        if (!targetRef.current) return;
        await exportElementToPng(targetRef.current, "esn-calendar.png");
      }}
      className="inline-flex items-center gap-2 rounded-lg bg-[#00aeef] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-105"
    >
      <Download size={16} />
      Takvimi Indir
    </button>
  );
};
