import type { PropType } from 'vue'

import clsx from 'clsx'
import { NCheckbox, NImage } from 'naive-ui'
import { defineComponent } from 'vue'

import audioSvg from '../../../static/icon/audio.svg'
import excelSvg from '../../../static/icon/excel.svg'
import folderSvg from '../../../static/icon/folder.svg'
import pdfSvg from '../../../static/icon/pdf.svg'
import pptSvg from '../../../static/icon/ppt.svg'

import videoSvg from '../../../static/icon/video.svg'
import wordSvg from '../../../static/icon/word.svg'

import { useDialog } from '../../dialog'

export const DuxFileManageItem = defineComponent({
  name: 'DuxFileManageItem',
  props: {
    name: String,
    url: String,
    type: String as PropType<'file' | 'folder'>,
    mime: String,
    time: String,
    value: Boolean,
    onContextmenu: Function as PropType<(e: MouseEvent) => void>,
    onSelect: Function,
  },
  setup(props) {
    const dialog = useDialog()

    const mimeMap = {
      image: 'image/',
      video: 'video/',
      audio: 'audio/',
      pdf: 'application/pdf',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      doc: 'application/msword',
      xls: 'application/vnd.ms-excel',
      ppt: 'application/vnd.ms-powerpoint',
    }

    return () => (
      <div
        class="flex flex-col items-center justify-center hover:bg-primary/10 cursor-pointer p-2 rounded-sm relative group"
        onContextmenu={props.onContextmenu}
        onClick={() => {
          props.onSelect?.(!props.value)
        }}
      >
        <div class="mb-2">
          {props.type === 'folder' && (
            <img src={folderSvg} class="size-12" />
          )}
          {props.type === 'file' && (
            <>
              {props.mime?.includes(mimeMap.image) && (
                <div
                  class="size-12 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <NImage width="100%" height="100%" src={props.url} />
                </div>
              )}
              {props.mime?.includes('video/') && (
                <div onClick={(e) => {
                  e.stopPropagation()
                  dialog.node({
                    title: '预览',
                    render: () => (
                      <div class="flex items-center justify-center">
                        <video class="w-120 max-w-full" controls>
                          <source src={props.url} type={props.mime} />
                        </video>
                      </div>
                    ),
                  })
                }}
                >
                  <img src={videoSvg} class="size-12" />
                </div>
              )}
              {props.mime?.includes(mimeMap.audio) && (
                <div onClick={(e) => {
                  e.stopPropagation()
                  dialog.node({
                    title: '预览',
                    render: () => (
                      <div class="flex items-center justify-center">
                        <audio class="w-120 max-w-full" controls>
                          <source src={props.url} type={props.mime} />
                        </audio>
                      </div>
                    ),
                  })
                }}
                >
                  <div>
                    <img src={audioSvg} class="size-12" />
                  </div>
                </div>
              )}

              {(props.mime?.includes(mimeMap.doc) || props.mime?.includes(mimeMap.docx)) && (
                <img src={wordSvg} class="size-12" />
              )}

              {(props.mime?.includes(mimeMap.xls) || props.mime?.includes(mimeMap.xlsx)) && (
                <img src={excelSvg} class="size-12" />
              )}

              {(props.mime?.includes(mimeMap.ppt) || props.mime?.includes(mimeMap.pptx)) && (
                <img src={pptSvg} class="size-12" />
              )}

              {props.mime?.includes(mimeMap.pdf) && (
                <img src={pdfSvg} class="size-12" />
              )}

            </>
          )}
        </div>
        <div class="truncate">
          {props.name}
        </div>
        <div class="text-xs text-gray-6">
          {props.time}
        </div>

        <div class={clsx([
          'absolute top-2 right-2',
          props.value ? 'block' : ' hidden group-hover:block',
        ])}
        >
          {props.type === 'file' && <NCheckbox checked={props.value} />}
        </div>
      </div>
    )
  },
})
