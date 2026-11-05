


export interface IPdfAnalysisRepository {
  updateContent(user_id: number, pageId: number, content: string): Promise<void>;
}
