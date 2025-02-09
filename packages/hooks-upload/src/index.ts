import {
  HttpMethod,
  HttpTriggerType,
  Operator,
  OperatorType,
  HttpTrigger,
  useContext,
  FileRecord,
} from '@midwayjs/hooks-core'
import type { UploadFileInfo } from '@midwayjs/upload'
import groupBy from 'lodash.groupby'

export function useFiles<T = string>() {
  const ctx = useContext()
  const files: UploadFileInfo<T>[] = ctx.files
  return groupBy(files, 'fieldName')
}

export function useFields(): Record<string, string> {
  const ctx = useContext()
  return ctx.fields
}

type Input = {
  files: FileRecord
}

export function Upload(path?: string): Operator<Input> {
  return {
    name: 'Upload',
    input: true,
    metadata({ setMetadata }) {
      setMetadata<HttpTrigger>(OperatorType.Trigger, {
        type: HttpTriggerType,
        method: HttpMethod.POST,
        path,
        requestClient: {
          fetcher: 'upload',
          client: '@midwayjs/rpc',
        },
      })
    },
  }
}
