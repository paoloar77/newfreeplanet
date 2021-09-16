import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

export interface IEstimate {
  id?: number
  title: string
  advanced?: boolean
  description?: string
  viewlist?: number[] | null
  listsel?: number
  qtaName?: string
  icon?: string
  numpag: number
  qta?: number
  price: number
  pricebase: number
  checksel?: boolean
}
