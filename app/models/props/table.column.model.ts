export interface TableColumn {
  title: string
  align: 'start' | 'end' | 'center'
  key: string
  sortable?: boolean
}
