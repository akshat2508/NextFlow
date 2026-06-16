export class ImportExportService {
  exportWorkflow(
    workflow: unknown
  ) {
    return JSON.stringify(
      workflow,
      null,
      2
    );
  }

  importWorkflow(
    json: string
  ) {
    return JSON.parse(json);
  }
}