export class ApiError extends Error {
  constructor(issues) {
    super('api error');
    this.issues = issues;
  }
}