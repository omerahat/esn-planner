import html2canvas from "html2canvas";

export const exportElementToPng = async (
  element: HTMLElement,
  filename: string,
): Promise<void> => {
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#fcf8ff",
  });

  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
};
