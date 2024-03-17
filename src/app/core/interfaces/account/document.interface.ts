export interface DocumentRequestInterface {
  title: string;
  user: string;
}

export interface DocumentResponseInterface {
  id: string;
  title: string;
  uploaded_at: string;
  document: string;
  user: string;
}
