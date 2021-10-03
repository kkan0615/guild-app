export interface FileAttachment extends File {
  id: string
  status: 'CREATE' | 'UPDATE' | 'DELETE'
}
