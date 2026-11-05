import { AppError } from "../../errors/app-error";
import { IPdfAnalysisRepository } from "../../interface/repositories/pdf.analysis/i.pdf.analysis";
import { uploadPdfAnalysis } from "../../../services/pdf.analyzer.api.service";
import { PageInput } from "../../dto/pdf.analysis/pdf.analysis.dto";

interface OcrPageResult {
  pageId: string;
  pageNumber: number;
  text?: string;
  lines?: string[];
}

export class PdfAnalyzerUseCase {
  constructor(
    private pdfAnalysisRepository: IPdfAnalysisRepository
) {}

async execute(file: Express.Multer.File, pages: PageInput[], user_id: number) {
  const imageResult = await uploadPdfAnalysis(file, pages);
  const results: OcrPageResult[] = imageResult?.data?.data?.results ?? [];

  if (!Array.isArray(results) || results.length === 0) {
    throw new AppError("No page results returned from PDF analyzer", 400);
  }

  // pageNumber -> DB pageId ("69", "70")
  const pageIdByNumber = new Map(
    pages.map((p) => [Number(p.pageNumber), String(p.pageId)])
  );

  for (const [index, result] of results.entries()) {
    const realPageId =
      pageIdByNumber.get(Number(result.pageNumber)) ?? pages[index]?.pageId;

    if (realPageId === undefined) continue;

    // ✅ response ထဲက pageId ကိုပါ 69, 70 ဖြစ်အောင် ပြောင်း
    result.pageId = String(realPageId);

    const pageId = Number(realPageId);
    if (!Number.isInteger(pageId)) continue;

    const content = Array.isArray(result.lines)
      ? result.lines.map((l) => l.trim()).filter(Boolean).join("\n")
      : (result.text ?? "");

    await this.pdfAnalysisRepository.updateContent(user_id, pageId, content);
  }

  return imageResult.data; // results ထဲမှာ pageId "69", "70" ဖြစ်သွားပြီ
}


}
