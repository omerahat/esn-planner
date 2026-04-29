import html2canvas from "html2canvas";

export const exportElementToPng = async (
  element: HTMLElement,
  filename: string,
): Promise<void> => {
  try {
    if ("fonts" in document) {
      await document.fonts.ready;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#f8fafc",
    });

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  } catch (error) {
    console.error("Failed to export calendar PNG", error);
  }
};
